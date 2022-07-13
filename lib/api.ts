import { Glossary } from '@/models/glossary'
import { Syllabus } from '@/models/syllabus'
import { WpHomepage } from '@/models/wp_homepage'
import type {
	AssetWithRawElements,
	KontentCurriculumResult,
	Mapping,
	Seo,
} from '@/types/index'
import {
	convertProjectModelTaxonomiesToITaxonomyTerms,
	setTaxonomiesForAssets,
} from '@/utils'
import {
	DeliveryClient,
	Elements,
	IContentItem,
	IContentItemElements,
	IContentItemsContainer,
	ITaxonomyTerms,
	Responses,
	SortOrder,
} from '@kentico/kontent-delivery'
import {
	AssetModels,
	AssetResponses,
	createManagementClient,
	SharedModels,
	TaxonomyModels,
} from '@kentico/kontent-management'
import get from 'lodash.get'
import intersection from 'lodash.intersection'
import packageInfo from '../package.json'
import { WpStage } from './../models/wp_stage'
import { projectModel } from '@/models/_project'
import { title } from 'process'

const sourceTrackingHeaderName = 'X-KC-SOURCE'

const fnReturnData = (result) => result.data

const client = new DeliveryClient({
	projectId: process.env.KONTENT_PROJECT_ID,
	previewApiKey: process.env.KONTENT_PREVIEW_API_KEY,
	globalHeaders: (_queryConfig) => [
		{
			header: sourceTrackingHeaderName,
			value: `${packageInfo.name};${packageInfo.version}`,
		},
	],
})

const managementClient = createManagementClient({
	projectId: process.env.KONTENT_PROJECT_ID,
	apiKey: process.env.KONTENT_MANAGEMENT_API_KEY,
})

async function getAllAssets(): Promise<{
	items: AssetModels.Asset[]
	responses: AssetResponses.AssetsListResponse[]
}> {
	return await managementClient.listAssets().toPromise().then(fnReturnData)
}

async function getAllTaxonomies(): Promise<{
	items: TaxonomyModels.Taxonomy[]
	pagination: SharedModels.Pagination
}> {
	return await managementClient
		.listTaxonomies()
		.toPromise()
		.then(fnReturnData)
}

async function loadWebsiteConfig(
	preview = false,
): Promise<Responses.IViewContentItemResponse<WpHomepage>> {
	const config = await client
		.item('homepage')
		.depthParameter(4)
		// This overfetching by ignoring `subpages` element
		// https://docs.kontent.ai/reference/delivery-api#tag/Projection
		.elementsParameter([
			'title',
			'site_prefix',
			'descriptor',
			'base_font',
			'favicon',
			'palette',
			'label',
			'header_logo',
			'main_menu',
			'actions',
			'label',
			'slug',
			'content',
			'icon',
			'icon_position',
			'icon_only',
			'role',
			'options',
			'footer_sections',
			'image',
			'fields',
			'name',
			'type',
			'value',
			'navigation_item',
			'url',
			'submit_label',
			'form_id',
			'form_action',
			'default_value',
			'configuration',
			'palette',
			'font',
			'acknowledgement',
			'menu',
			'footer_top_content',
			'social_links',
			'footer_menu_links',
			'secondary_links',
			'copyright_link',

			// Footer menu links child
			'items',
			'subtitle',
			'subitems',
			'item',

			// Web External
			'link_url',
		])
		.queryConfig({
			usePreviewMode: preview,
		})
		.toPromise()
		.then(fnReturnData)

	return config
}

async function getSubPaths(data, pagesCodenames, parentSlug, preview = false) {
	const paths = []

	for (const pageCodename of pagesCodenames) {
		const currentItem = data.linkedItems[pageCodename]
		if (!currentItem) continue
		const pageSlug = parentSlug.concat(currentItem.elements.slug.value)
		const currentItemContentWrapper =
			currentItem.elements.web_content_rtb__content

		paths.push({
			params: {
				pageTitle: currentItem.elements.title.value,
				slug: pageSlug,
				navigationItem: currentItem.system, // will be ignored by next in getContentPaths
				contentItem: currentItemContentWrapper, // will be ignored by next in getContentPaths
			},
		})

		if (currentItem.elements?.subpages?.value) {
			const subPaths = await getSubPaths(
				data,
				currentItem.elements.subpages.value,
				pageSlug,
				preview,
			)
			paths.push(...subPaths)
		}
	}

	return paths
}

export async function getSitemapMappings(preview = false): Promise<Mapping[]> {
	const data = await client
		.item('homepage')
		.depthParameter(3 + 1) // depends on the sitemap level (+1 for content type to download)
		.elementsParameter([
			'subpages',
			'slug',
			'title',
			'web_content_rtb__content',
		])
		.queryConfig({
			usePreviewMode: preview,
		})
		.toPromise()
		.then(fnReturnData)

	const rootSlug = []
	const pathsFromKontent: Mapping[] = [
		{
			params: {
				pageTitle: data.item.elements.title.value,
				slug: rootSlug,
				navigationItem: data.item.system, // will be ignored by next in getContentPaths
				contentItem: data.item.elements.web_content_rtb__content,
			},
		},
	]

	const subPaths = await getSubPaths(
		data,
		data.item.elements.subpages.value,
		rootSlug,
		preview,
	)

	return pathsFromKontent.concat(...subPaths)
}

interface FilterParams {
	element: string
	value: string[]
}

function getAllItemsByType<T extends IContentItem>({
	type,
	depth = 1,
	order = null,
	elementParameter,
	containsFilter = null,
	allFilter = null,
	anyFilter = null,
	preview,
}: {
	type: string
	depth?: number
	order?: { element: string; sortOrder: SortOrder }
	elementParameter?: string[]
	containsFilter?: FilterParams
	allFilter?: FilterParams
	anyFilter?: FilterParams
	preview: boolean
}): Promise<Responses.IListContentItemsResponse<T>> {
	let temp = client.items<T>().type(type).depthParameter(depth)
	if (order) {
		temp = temp.orderParameter(order.element, order.sortOrder)
	}
	if (elementParameter) {
		temp = temp.elementsParameter(elementParameter)
	}
	if (containsFilter) {
		temp = temp.containsFilter(containsFilter.element, containsFilter.value)
	}
	if (allFilter) {
		temp = temp.allFilter(allFilter.element, allFilter.value)
	}
	if (anyFilter) {
		temp = temp.anyFilter(anyFilter.element, anyFilter.value)
	}

	return temp
		.queryConfig({ usePreviewMode: preview })
		.toPromise()
		.then(fnReturnData)
}

function getTaxonomy(
	taxonomyGroup: string,
): Promise<Responses.IViewTaxonomyResponse> {
	return client.taxonomy(taxonomyGroup).toPromise().then(fnReturnData)
}

export async function getPageStaticPropsForPath(
	params,
	preview = false,
): Promise<KontentCurriculumResult<IContentItem<IContentItemElements>>> {
	const [config, mappings] = await Promise.all([
		loadWebsiteConfig(preview), // TODO could be cached
		getSitemapMappings(preview), // TODO could be cached
	])

	const slugValue = params && params.slug ? params.slug : []

	const pathMapping = mappings.find(
		(path) => path.params.slug.join('#') === slugValue.join('#'),
	) // condition works for array of basic values

	const navigationItemSystemInfo =
		pathMapping && pathMapping.params.navigationItem

	if (!navigationItemSystemInfo?.codename) {
		return undefined
	}

	const PAGE_RESPONSE_DEPTH = {
		wp_homepage: 3,
		wp_stagegroup: 2,
		wp_stage: 0,
	}

	let depth = PAGE_RESPONSE_DEPTH[navigationItemSystemInfo.type]
	depth = depth == undefined ? 1 : depth

	// Loading content data
	const pageResponse: Responses.IViewContentItemResponse<
		IContentItem<IContentItemElements>
	> = await client
		.item(navigationItemSystemInfo.codename)
		.depthParameter(depth)
		.queryConfig({
			usePreviewMode: preview,
		})
		.toPromise()
		.then(fnReturnData)

	const result = {
		mappings: mappings,
		data: {
			config: config,
			pageResponse,
		},
	}

	const isHomePage = navigationItemSystemInfo.type === 'wp_homepage'
	const isStagePage = navigationItemSystemInfo.type === 'wp_stage'
	const isSyllabusPage = navigationItemSystemInfo.type === 'page_kla_syllabus'
	const isGlossaryPage = navigationItemSystemInfo.type === 'page_glossary'
	const isTeachingAdvicePage =
		navigationItemSystemInfo.type === 'page_teaching_advice'

	if (isHomePage) {
		const _result = {
			...result,
			data: {
				...result.data,
			},
		}
		return _result
	} else if (isStagePage) {
		const pageResponseItem = pageResponse.item as WpStage

		const _result: KontentCurriculumResult<IContentItem> = {
			...result,
			data: {
				...result.data,
				syllabuses: null,
				keyLearningAreas: null,
				glossaries: null,
				stages: null,
				stageGroups: null,
				assets: null,
			},
		}

		const pageStageStages =
			pageResponse.item.elements.stages__stages.value.map(
				(item) => item.codename,
			)

		const syllabuses = await getAllItemsByType<Syllabus>({
			type: 'syllabus',
			depth: 3,
			elementParameter: [
				// 'organisationofcontent',
				'syllabus',
				// 'coursenumbers',
				'doredirect',
				'web_content_rtb__content',
				// 'syllabus_type__items',
				'stages__stage_years',
				// 'enrolment_type__items',
				// 'learning_k10',
				'introduction',
				// 'from_date',
				'aim',
				// 'rosa_hsc',
				// 'prerequisits',
				'rationale',
				'assessments',
				// 'learning_y11',
				// 'related_life_skills_syllabus',
				// 'learning_y12',
				// 'selftuition',
				// 'overview_200hourrules',
				'outcomes',
				'code',
				'stages__stages',
				'stages__stage_groups',
				// 'exclusions',
				// 'rosa_stage4_5',
				// 'to_date',
				'title',
				'redirecturl',
				// 'focus_area_continum_groups',
				'key_learning_area__items',
				// 'eligibility',
				// 'corequisites',
				// 'overview100hourrules',
				// 'requirements',
				// 'otherinfo',
				'focus_areas',

				/** Focus area elements */
				// 'syllabus_type__items',
				'stages__stage_years',
				'outcomes',
				// 'continuumgroups',
				'resources',
				// 'addressedinparallel',
				'accesspointgroups',
				'teachingadvice',
				'content',
				'contentgroups',

				/** Outcome elements */
				'code',
				'description',

				/** Content group */
				'content_items',

				/** Access content group */
				'access_content_items',

				/** contentitem */
				'learningprogression_tags__literacy',
				'learningprogression_tags__numeracy',
			],
			containsFilter: {
				element: 'elements.stages__stages',
				value: pageStageStages,
			},
			preview,
		})

		// all syllabus tags for selected stage (coming from each syllabus in syllabuses)
		const stageSyllabusTags = syllabuses.items.flatMap((item) =>
			item.elements.syllabus.value.map((v) => v.codename),
		)

		const [glossaries, assets, taxonomies] = await Promise.all([
			getAllItemsByType<Glossary>({
				type: 'glossary',
				anyFilter: {
					element: 'elements.syllabus',
					value: stageSyllabusTags,
				},
				preview,
				depth: 0,
			}),
			getAllAssets(),
			getAllTaxonomies(),
		])

		const assetsWithTaxonomies = setTaxonomiesForAssets(
			assets.items,
			taxonomies.items,
		)
		assets.items = assetsWithTaxonomies
			.filter((asset) => {
				return (
					asset.stages.length &&
					intersection(
						asset.stages.map((assetStage) => assetStage.codename),
						pageResponseItem.elements.stages__stages.value.map(
							(stagePageStage) => stagePageStage.codename,
						),
					).length
				)
			})
			.map((item) => {
				const {
					fileReference,
					imageHeight,
					imageWidth,
					lastModified,
					folder,
					_raw,
					...rest
				} = item
				return rest as AssetWithRawElements
			})

		_result.data.syllabuses = syllabuses
		_result.data.glossaries = glossaries
		_result.data.stages = convertProjectModelTaxonomiesToITaxonomyTerms(
			projectModel.taxonomies.stage,
		)
		_result.data.stageGroups =
			convertProjectModelTaxonomiesToITaxonomyTerms(
				projectModel.taxonomies.stage_group,
			)
		_result.data.keyLearningAreas =
			convertProjectModelTaxonomiesToITaxonomyTerms(
				projectModel.taxonomies.key_learning_area,
			)
		_result.data.assets = assets.items as AssetWithRawElements[]

		return _result
	}
	// else if (isStagePage || isSyllabusPage || isGlossaryPage) {
	// 	const _result: KontentCurriculumResult<IContentItem> = {
	// 		...result,
	// 		data: {
	// 			config: result.data.config,
	// 			page: result.data.page,
	// 			syllabuses: null,
	// 			keyLearningAreas: null,
	// 			glossaries: null,
	// 			stages: null,
	// 			stageGroups: null,
	// 		},
	// 	}

	// 	const [syllabuses, keyLearningAreas, glossaries, stages, stageGroups] =
	// 		await Promise.all([
	// 			getAllItemsByType<Syllabus>({
	// 				type: 'syllabus',
	// 				depth: 6,
	// 				preview,
	// 			}),
	// 			getAllItemsByType<Glossary>({
	// 				type: 'glossary',
	// 				preview,
	// 				order: {
	// 					element: 'elements.title',
	// 					sortOrder: 'asc',
	// 				},
	// 			}),
	// 			getAllItemsByType<Stage>({
	// 				type: 'stage',
	// 				preview,
	// 				order: {
	// 					element: 'elements.order',
	// 					sortOrder: 'asc',
	// 				},
	// 			}),
	// 			getAllItemsByType<StageGroup>({
	// 				type: 'stage_group',
	// 				preview,
	// 				order: {
	// 					element: 'elements.order',
	// 					sortOrder: 'asc',
	// 				},
	// 			}),
	// 		])

	// 	_result.data.syllabuses = syllabuses
	// 	_result.data.keyLearningAreas = keyLearningAreas
	// 	_result.data.glossaries = glossaries
	// 	_result.data.stages = stages
	// 	_result.data.stageGroups = stageGroups

	// 	const allYearsAssignedToSyllabus =
	// 		_result.data.syllabuses.items.flatMap((syllabus) =>
	// 			syllabus.elements.stagesyears__years.value.flatMap(
	// 				(item) => item.name,
	// 			),
	// 		)

	// 	_result.data.stageGroups.items = _result.data.stageGroups.items.filter(
	// 		(stageGroup) => {
	// 			return (
	// 				intersection(
	// 					stageGroup.elements.years.value.flatMap(
	// 						(item) => item.name,
	// 					),
	// 					allYearsAssignedToSyllabus,
	// 				).length > 0
	// 			)
	// 		},
	// 	)

	// 	return _result
	// }
	// else if (isTeachingAdvicePage) {
	// 	const _result: KontentCurriculumResult<IContentItem> = {
	// 		...result,
	// 		data: {
	// 			config: result.data.config,
	// 			page: result.data.page,
	// 			syllabuses: null,
	// 			keyLearningAreas: null,
	// 			stages: null,
	// 		},
	// 	}

	// 	const [syllabuses, keyLearningAreas, stages] = await Promise.all([
	// 		getAllItemsByType<Syllabus>({
	// 			type: 'syllabus',
	// 			depth: 6,
	// 			preview,
	// 		}),
	// 		getAllItemsByType<IContentItem>({
	// 			type: 'key_learning_area',
	// 			preview,
	// 			order: {
	// 				element: 'elements.order',
	// 				sortOrder: 'asc',
	// 			},
	// 		}),
	// 		getAllItemsByType<IContentItem>({
	// 			type: 'stage',
	// 			preview,
	// 			order: {
	// 				element: 'elements.order',
	// 				sortOrder: 'asc',
	// 			},
	// 		}),
	// 	])

	// 	_result.data.syllabuses = syllabuses
	// 	_result.data.keyLearningAreas = keyLearningAreas
	// 	_result.data.stages = stages

	// 	return _result
	// }

	return result
}
