import type { Glossary } from '@/models/glossary'
import type { KeyLearningArea } from '@/models/key_learning_area'
import type { Stage } from '@/models/stage'
import type { StageGroup } from '@/models/stage_group'
import type {
	HomepageConfig,
	KontentCurriculumResult,
	Mapping,
	Seo,
} from '@/types/index'
import { DeliveryClient, IContentItem } from '@kentico/kontent-delivery'
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

async function loadWebsiteConfig(preview = false): Promise<HomepageConfig> {
	const config = await client
		.item('homepage')
		.depthParameter(10)
		// This overfetching by ignoring `subpages` element
		// https://docs.kontent.ai/reference/delivery-api#tag/Projection
		.elementsParameter([
			'title',
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
			'content',
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
			'footer_top_top_sections',
			'footer_top_menu_sections',
			'footer_bottom_menu',
			'menu',
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
		const pageSlug = parentSlug.concat(currentItem.elements.slug.value)
		const currentItemContentWrapper =
			data.linkedItems[currentItem.elements.content.value[0]]
		paths.push({
			params: {
				slug: pageSlug,
				navigationItem: currentItem.system, // will be ignored by next in getContentPaths
				contentItem: currentItemContentWrapper?.system || {}, // will be ignored by next in getContentPaths
			},
		})

		// Listing pages
		if (
			currentItemContentWrapper &&
			currentItemContentWrapper.system.type === 'listing_page'
		) {
			const subItemsData = await client
				.items()
				.type(currentItemContentWrapper.elements.content_type.value)
				.elementsParameter(['slug'])
				.queryConfig({
					usePreviewMode: preview,
				})
				.toPromise()
				.then(fnReturnData)

			subItemsData.items.forEach((subItem) => {
				const subItemSlug = pageSlug.concat(subItem.elements.slug.value)
				paths.push({
					params: {
						slug: subItemSlug,
						navigationItem: subItem.system, // will be ignored by next in getContentPaths
						// Listing items contains navigation and content item in one content model
						contentItem: subItem.system, // will be ignored by next in getContentPaths
					},
				})
			})
		}

		const subPaths = await getSubPaths(
			data,
			currentItem.elements.subpages.value,
			pageSlug,
			preview,
		)
		paths.push(...subPaths)
	}

	return paths
}

export async function getSitemapMappings(preview = false): Promise<Mapping[]> {
	const data = await client
		.item('homepage')
		.depthParameter(4) // depends on the sitemap level (+1 for content type to download)
		.elementsParameter(['subpages', 'slug', 'content', 'content_type'])
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
				contentItem:
					data.linkedItems[data.item.elements.content.value[0]]
						.system, // will be ignored by next in getContentPaths
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
	const config = await loadWebsiteConfig(preview) // TODO could be cached
	const mappings = await getSitemapMappings(preview) // TODO could be cached

	const slugValue = params && params.slug ? params.slug : []

	const pathMapping = mappings.find(
		(path) => path.params.slug.join('#') === slugValue.join('#'),
	) // condition works for array of basic values

	const navigationItemSystemInfo =
		pathMapping && pathMapping.params.navigationItem
	const contentItemSystemInfo = pathMapping && pathMapping.params.contentItem

	if (
		!navigationItemSystemInfo?.codename ||
		!contentItemSystemInfo?.codename
	) {
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
	const pageResponse = await client
		.item(contentItemSystemInfo.codename)
		.depthParameter(5)
		.queryConfig({
			usePreviewMode: preview,
		})
		.toPromise()
		.then(fnReturnData)

	const result = {
		seo: seoData,
		mappings: mappings,
		data: {
			config: config,
			page: pageResponse,
		},
	}

	const isListingPage = pageResponse.item.system.type === 'listing_page'
	const isLandingPage = pageResponse.item.system.type === 'landing_page'
	const isStagePage = pageResponse.item.system.type === 'page_stage'
	const isSyllabusPage = pageResponse.item.system.type === 'page_kla_syllabus'

	if (isListingPage) {
		const _result = {
			...result,
			data: {
				...result.data,
				listingItems: {},
			},
		}

		const linkedItemsResponse = await client
			.items()
			.type(pageResponse.item.elements.content_type.value)
			.queryConfig({
				usePreviewMode: preview,
			})
			.toPromise()
			.then(fnReturnData)

		_result.data.listingItems[pageResponse.item.system.codename] =
			linkedItemsResponse

		return _result
	} else if (isLandingPage) {
		const _result = {
			...result,
			data: {
				...result.data,
				listingSections: {},
			},
		}
		const listingSections = pageResponse.item.elements.sections.value
			.map((sectionCodename) => pageResponse.linkedItems[sectionCodename])
			.filter((section) => section.system.type === 'listing_section')

		if (listingSections.length > 0) {
			_result.data.listingSections = {}
		}

		for (const listingSection of listingSections) {
			const linkedItemsResponse = await client
				.items()
				.type(listingSection.elements.content_type.value)
				.orderByDescending(listingSection.elements.order_by.value)
				.limitParameter(listingSection.elements.number_of_items.value)
				.queryConfig({
					usePreviewMode: preview,
				})
				.toPromise()
				.then(fnReturnData)

			_result.data.listingSections[listingSection.system.codename] =
				linkedItemsResponse
			return _result
		}
	} else if (isStagePage || isSyllabusPage) {
		const _result: KontentCurriculumResult = {
			...result,
			data: {
				...result.data,
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
	}

	return result
}
