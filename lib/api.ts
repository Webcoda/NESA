import {
	DataBuilder,
	dataBuilders,
	getDefaultPageResponse,
} from '@/databuilders/index'
import { Syllabus } from '@/models/syllabus'
import { WpHomepage } from '@/models/wp_homepage'
import type { KontentCurriculumResult, Mapping } from '@/types/index'
import {
	DeliveryClient,
	IContentItem,
	IContentItemElements,
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
import slugify from 'slugify'
import packageInfo from '../package.json'

/**
 * Notes
 * loadWebsiteConfig and getSiteMappings calls can't be combined
 * since there will depth parameters might be different
 *
 * loadWebsiteConfig depth is determined by how deep is the content that you want to get
 * getSiteMappings is determined by how deep is the the paths /a/b/c + 1 level for the content
 */

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

export async function getAllAssets(): Promise<{
	items: AssetModels.Asset[]
	responses: AssetResponses.AssetsListResponse[]
}> {
	return await managementClient.listAssets().toPromise().then(fnReturnData)
}

export async function getAllTaxonomies(): Promise<{
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
	const config = await getItemByCodename<WpHomepage>({
		codename: 'homepage',
		depth: 4,
		elementsParameter: [
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
		],
		preview,
	})

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
	const [data, syllabusMappings] = await Promise.all([
		getItemByCodename<WpHomepage>({
			codename: 'homepage',
			depth: 3 + 1,
			elementsParameter: [
				'subpages',
				'slug',
				'title',
				'web_content_rtb__content',
			],
			preview,
		}),

		// there's no subpages specified for syllabus, that's why we created the paths
		// based on the syllabus list
		getAllSyllabusMappings(preview),
	])

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

	return pathsFromKontent.concat(...subPaths, ...syllabusMappings)
}

interface FilterParams {
	element: string
	value: string[]
}

export function getItemByCodename<T extends IContentItem>({
	codename,
	depth = 1,
	elementsParameter,
	preview,
}: {
	codename: string
	depth?: number
	elementsParameter?: string[]
	preview: boolean
}): Promise<Responses.IViewContentItemResponse<T>> {
	let temp = client.item<T>(codename).depthParameter(depth)
	if (elementsParameter) {
		temp = temp.elementsParameter(elementsParameter)
	}
	return temp
		.queryConfig({ usePreviewMode: preview })
		.toPromise()
		.then(fnReturnData)
}

export function getAllItemsByType<T extends IContentItem>({
	type,
	depth = 1,
	order = null,
	elementsParameter,
	containsFilter = null,
	allFilter = null,
	anyFilter = null,
	equalsFilter = null,
	notEmptyFilter = null,
	notEqualsFilter = null,
	preview,
}: {
	type: string
	depth?: number
	order?: { element: string; sortOrder: SortOrder }
	elementsParameter?: string[]
	containsFilter?: FilterParams
	allFilter?: FilterParams
	anyFilter?: FilterParams
	equalsFilter?: { element: string; value: string }
	notEmptyFilter?: { element: string }
	notEqualsFilter?: { element: string; value: string }
	preview: boolean
}): Promise<Responses.IListContentItemsResponse<T>> {
	let temp = client.items<T>().type(type).depthParameter(depth)
	if (order) {
		temp = temp.orderParameter(order.element, order.sortOrder)
	}
	if (elementsParameter) {
		temp = temp.elementsParameter(elementsParameter)
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
	if (equalsFilter) {
		temp.equalsFilter(equalsFilter.element, equalsFilter.value)
	}
	if (notEmptyFilter) {
		temp.notEmptyFilter(notEmptyFilter.element)
	}
	if (notEqualsFilter) {
		temp.notEqualsFilter(notEqualsFilter.element, notEqualsFilter.value)
	}
	return temp
		.queryConfig({ usePreviewMode: preview })
		.toPromise()
		.then(fnReturnData)
}

export function getTaxonomy(
	taxonomyGroup: string,
): Promise<Responses.IViewTaxonomyResponse> {
	return client.taxonomy(taxonomyGroup).toPromise().then(fnReturnData)
}

async function getAllSyllabusMappings(preview): Promise<Mapping[]> {
	// This should be filtered by whether it's doing redirect or not
	const data = await getAllItemsByType<Syllabus>({
		type: 'syllabus',
		depth: 0,
		preview,
		elementsParameter: ['title', 'syllabus', 'key_learning_area__items'],
		containsFilter: {
			element: 'elements.doredirect',
			value: ['no'],
		},
	})
	return data.items.map((_syllabus) => {
		const { title, key_learning_area__items, syllabus } = _syllabus.elements
		return {
			params: {
				pageTitle: title.value,
				slug: [
					'learning-areas',
					slugify(
						key_learning_area__items?.value?.[0]?.codename.replace(
							/_/g,
							'-',
						) || '',
					),
					slugify(
						syllabus?.value?.[0]?.codename.replace(/_/g, '-') || '',
					),
				].filter((item) => !!item),
				navigationItem: _syllabus.system,
				contentItem: null,
			},
		} as Mapping
	})
}

export async function getPageStaticPropsForPath(
	params,
	preview = false,
): Promise<KontentCurriculumResult<IContentItem<IContentItemElements>>> {
	let [config, mappings] = await Promise.all([
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

	// Loading content data
	const { getPageResponse, buildData } = (dataBuilders[
		navigationItemSystemInfo.type
	] || {}) as DataBuilder

	const { type, codename } = navigationItemSystemInfo

	const pageResponse = await (getPageResponse
		? getPageResponse({ codename, preview })
		: getDefaultPageResponse({
				codename,
				type,
				preview,
		  }))

	const result = {
		mappings,
		data: {
			config,
			pageResponse,
		},
	}

	if (buildData) {
		return buildData({
			result,
			preview,
			pageResponse,
		})
	}
	return result
}
