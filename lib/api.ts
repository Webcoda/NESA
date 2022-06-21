import type { Glossary } from '@/models/glossary'
import { Homepage as WpHomepage } from '@/models/homepage'
import type { KeyLearningArea } from '@/models/key_learning_area'
import type { Stage } from '@/models/stage'
import type { StageGroup } from '@/models/stage_group'
import type { KontentCurriculumResult, Mapping, Seo } from '@/types/index'
import {
	DeliveryClient,
	IContentItem,
	Responses,
} from '@kentico/kontent-delivery'
import get from 'lodash.get'
import intersection from 'lodash.intersection'
import { Syllabus } from '../models/syllabus'
import packageInfo from '../package.json'

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

async function loadWebsiteConfig(
	preview = false,
): Promise<Responses.IViewContentItemResponse<WpHomepage>> {
	const config = await client
		.item('homepage')
		.depthParameter(10)
		// This overfetching by ignoring `subpages` element
		// https://docs.kontent.ai/reference/delivery-api#tag/Projection
		.elementsParameter([
			'title',
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
	console.log(
		'🚀 ~ file: api.ts ~ line 89 ~ getSubPaths ~ data',
		data,
		pagesCodenames,
		parentSlug,
	)

	for (const pageCodename of pagesCodenames) {
		const currentItem = data.linkedItems[pageCodename]
		const pageSlug = parentSlug.concat(currentItem.elements.slug.value)
		const currentItemContentWrapper =
			currentItem.elements.web_content_rtb__content

		paths.push({
			params: {
				slug: pageSlug,
				navigationItem: currentItem.system, // will be ignored by next in getContentPaths
				contentItem: currentItemContentWrapper, // will be ignored by next in getContentPaths
				webPageItem: currentItem,
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
		.depthParameter(10) // depends on the sitemap level (+1 for content type to download)
		// .elementsParameter(['subpages', 'slug', 'content', 'content_type'])
		.queryConfig({
			usePreviewMode: preview,
		})
		.toPromise()
		.then(fnReturnData)

	const rootSlug = []
	const pathsFromKontent: Mapping[] = [
		{
			params: {
				slug: rootSlug,
				navigationItem: data.item.system, // will be ignored by next in getContentPaths
				contentItem: data.item.elements.web_content_rtb__content,
				webPageItem: data.item,
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

function getAllItemsByType<T extends IContentItem>({
	type,
	depth = 2,
	order = null,
	preview,
}) {
	let temp = client.items<T>().type(type).depthParameter(depth)
	if (order) {
		temp = temp.orderParameter(order?.element, order?.sortOrder)
	}

	return temp
		.queryConfig({ usePreviewMode: preview })
		.toPromise()
		.then(fnReturnData)
}

export async function getPageStaticPropsForPath(params, preview = false) {
	console.log(params)

	const config = await loadWebsiteConfig(preview) // TODO could be cached
	const mappings = await getSitemapMappings(preview) // TODO could be cached

	const slugValue = params && params.slug ? params.slug : []

	const pathMapping = mappings.find(
		(path) => path.params.slug.join('#') === slugValue.join('#'),
	) // condition works for array of basic values

	const navigationItemSystemInfo =
		pathMapping && pathMapping.params.navigationItem
	const contentItemSystemInfo = pathMapping && pathMapping.params.contentItem
	const webPageItem = pathMapping && pathMapping.params.webPageItem

	if (!navigationItemSystemInfo?.codename) {
		return undefined
	}

	// TODO could be loaded right in getSitemapMappings
	const seoData: Seo = await client
		.item(navigationItemSystemInfo.codename)
		.elementsParameter([
			'seo__title',
			'label',
			'seo__description',
			'seo__keywords',
			'seo__canonical_url',
			'seo__options',
		])
		.queryConfig({
			usePreviewMode: preview,
		})
		.toPromise()
		.then(fnReturnData)
		.then((response) => ({
			title:
				get(response, 'item.elements.seo__title.value', null) ||
				get(response, 'item.elements.label.value', null),
			description: get(
				response,
				'item.elements.seo__description.value',
				null,
			),
			keywords: get(response, 'item.elements.seo__keywords.value', null),
			canonicalUrl: get(
				response,
				'item.elements.seo__canonical_url.value',
				null,
			),
			noIndex: get(response, 'item.elements.seo__options.value', []).some(
				(item) => item.codename == 'no_index',
			),
		}))

	// Loading content data
	// const pageResponse = await client
	// 	.item(contentItemSystemInfo.codename)
	// 	.depthParameter(5)
	// 	.queryConfig({
	// 		usePreviewMode: preview,
	// 	})
	// 	.toPromise()
	// 	.then(fnReturnData)

	const result = {
		seo: seoData,
		mappings: mappings,
		data: {
			config: config,
			page: webPageItem,
		},
	}

	const isHomePage = webPageItem.system.type === 'wp_homepage'
	const isStagePage = webPageItem.system.type === 'page_stage'
	const isSyllabusPage = webPageItem.system.type === 'page_kla_syllabus'
	const isGlossaryPage = webPageItem.system.type === 'page_glossary'
	const isTeachingAdvicePage =
		webPageItem.system.type === 'page_teaching_advice'

	if (isHomePage) {
		const _result = {
			...result,
			data: {
				...result.data,
			},
		}
		return _result
	} else if (isStagePage || isSyllabusPage || isGlossaryPage) {
		const _result: KontentCurriculumResult = {
			...result,
			data: {
				config: result.data.config,
				page: result.data.page,
				syllabuses: null,
				keyLearningAreas: null,
				glossaries: null,
				stages: null,
				stageGroups: null,
			},
		}

		const [syllabuses, keyLearningAreas, glossaries, stages, stageGroups] =
			await Promise.all([
				getAllItemsByType<Syllabus>({
					type: 'syllabus',
					depth: 6,
					preview,
				}),
				getAllItemsByType<KeyLearningArea>({
					type: 'key_learning_area',
					preview,
					order: {
						element: 'elements.order',
						sortOrder: 'asc',
					},
				}),
				getAllItemsByType<Glossary>({
					type: 'glossary',
					preview,
					order: {
						element: 'elements.title',
						sortOrder: 'asc',
					},
				}),
				getAllItemsByType<Stage>({
					type: 'stage',
					preview,
					order: {
						element: 'elements.order',
						sortOrder: 'asc',
					},
				}),
				getAllItemsByType<StageGroup>({
					type: 'stage_group',
					preview,
					order: {
						element: 'elements.order',
						sortOrder: 'asc',
					},
				}),
			])

		_result.data.syllabuses = syllabuses
		_result.data.keyLearningAreas = keyLearningAreas
		_result.data.glossaries = glossaries
		_result.data.stages = stages
		_result.data.stageGroups = stageGroups

		const allYearsAssignedToSyllabus =
			_result.data.syllabuses.items.flatMap((syllabus) =>
				syllabus.elements.stagesyears__years.value.flatMap(
					(item) => item.name,
				),
			)

		_result.data.stageGroups.items = _result.data.stageGroups.items.filter(
			(stageGroup) => {
				return (
					intersection(
						stageGroup.elements.years.value.flatMap(
							(item) => item.name,
						),
						allYearsAssignedToSyllabus,
					).length > 0
				)
			},
		)

		return _result
	} else if (isTeachingAdvicePage) {
		const _result: KontentCurriculumResult = {
			...result,
			data: {
				config: result.data.config,
				page: result.data.page,
				syllabuses: null,
				keyLearningAreas: null,
				stages: null,
			},
		}

		const [syllabuses, keyLearningAreas, stages] = await Promise.all([
			getAllItemsByType<Syllabus>({
				type: 'syllabus',
				depth: 6,
				preview,
			}),
			getAllItemsByType<KeyLearningArea>({
				type: 'key_learning_area',
				preview,
				order: {
					element: 'elements.order',
					sortOrder: 'asc',
				},
			}),
			getAllItemsByType<Stage>({
				type: 'stage',
				preview,
				order: {
					element: 'elements.order',
					sortOrder: 'asc',
				},
			}),
		])

		_result.data.syllabuses = syllabuses
		_result.data.keyLearningAreas = keyLearningAreas
		_result.data.stages = stages

		return _result
	}

	return result
}
