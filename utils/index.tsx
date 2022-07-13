import sections from '@/components/sections'
import UnknownComponent from '@/components/UnknownComponent'
import {
	ASSET_TAXONOMIES,
	EMPTY_KONTENT_RICHTEXT,
	FILE_TYPES,
} from '@/constants'
import type { IGlossary } from '@/legacy-ported/utilities/backendTypes'
import { UrlLink } from '@/legacy-ported/utilities/frontendTypes'
import type { Glossary } from '@/models/glossary'
import { AssetRawElementInner, AssetWithRawElements, Mapping } from '@/types'
import type {
	ElementModels,
	Elements,
	IContentItem,
	ITaxonomyTerms,
} from '@kentico/kontent-delivery'
import camelCase from 'lodash.camelcase'
import intersection from 'lodash.intersection'
import get from 'lodash.get'
import upperFirst from 'lodash.upperfirst'
import getUrlFromMapping from './getUrlFromMapping'
import kontentImageLoader from './kontentImageLoader'
import srcIsKontentAsset from './srcIsKontentAsset'
import { Weblinkint } from '@/models/weblinkint'
import { Weblinkext } from '@/models/weblinkext'
import { UiMenu } from '@/models/ui_menu'
import { AssetModels, TaxonomyModels } from '@kentico/kontent-management'

export const isIntersect = (...arrays) => intersection(...arrays).length > 0

export const convertGlossaryToIGlossary = (
	glossaries: Glossary[],
): IGlossary[] => {
	return glossaries.reduce((acc, glossary: Glossary) => {
		const section = glossary.elements.title.value.slice(0, 1).toLowerCase()
		const foundSection = acc.find((item) => item.section === section)
		if (foundSection) {
			foundSection.records = [...foundSection.records, glossary]
			return acc
		} else {
			return [
				...acc,
				{
					section,
					records: [glossary],
				},
			]
		}
	}, [])
}

// Get year text from yearss
export const getTagFromYears = (
	years: ElementModels.MultipleChoiceOption[] | ElementModels.TaxonomyTerm[],
) => {
	const yearRanges = years.map((item) => item.name)
	let yearText = ''
	if (!yearRanges.length) return yearText
	if (yearRanges.length === 1) {
		yearText = yearRanges[0]
	} else {
		yearText = `${yearRanges[0]}–${yearRanges[yearRanges.length - 1]}`
	}
	return yearText.toUpperCase()
}

/**
 * Find all linkedItems that are used by a richtext element
 * @param richtextElement richtext element
 * @param linkedItems list of linkedItems that are possibly used by richtextElement
 */
export const getLinkElementUsedByRichtext = (
	richtextElement: Elements.RichTextElement,
	linkedItems: IContentItem[],
) => {
	return Object.keys(linkedItems).reduce((acc, curr) => {
		if (richtextElement.linkedItemCodenames.includes(curr)) {
			return {
				...acc,
				[curr]: linkedItems[curr],
			}
		}
		return acc
	}, {})
}

export const getLinkFromLinkUI = (
	navItem: IContentItem,
	mappings: Mapping[],
) => {
	const isExternal = isNavItemExternalUrl(navItem)
	if (isExternal) {
		const _navItem = navItem as Weblinkext
		return {
			url: _navItem.elements.link_url.value,
			isExternal,
		}
	}

	let _navItemCodename = navItem.system.codename
	if (navItem.system.type === 'ui_menu') {
		const _navItem = navItem as UiMenu
		_navItemCodename =
			_navItem.elements.item.linkedItems[0]?.system.codename
	} else if (navItem.system.type === 'weblinkint') {
		const _navItem = navItem as Weblinkint
		_navItemCodename = _navItem.elements.item.linkedItems[0].system.codename
	}

	return {
		url: getUrlFromMapping(mappings, _navItemCodename),
		isExternal,
	}
}

export const isNavItemExternalUrl = (navItem: IContentItem) => {
	if (!navItem) {
		console.error(`navItem is undefined`)
		return false
	}
	return navItem.system.type === 'weblinkext'
}

export const renderSections = (page, props) => {
	return get(page, 'elements.sections.linkedItems', []).map(
		(section, index) => {
			const contentType = upperFirst(
				camelCase(get(section, 'system.type', null)),
			)
			const Component = sections[contentType]

			if (process.env.NODE_ENV === 'development' && !Component) {
				console.error(
					`Unknown section component for section content type: ${contentType}`,
				)
				return (
					<UnknownComponent key={index} {...props}>
						<pre>{JSON.stringify(section, undefined, 2)}</pre>
					</UnknownComponent>
				)
			}

			return (
				<Component
					key={index}
					{...props}
					section={section}
					site={props}
				/>
			)
		},
	)
}

export const isRichtextEmpty = (richtextVal: string) => {
	return !richtextVal || richtextVal === EMPTY_KONTENT_RICHTEXT
}

export const getBreadcrumb = (
	slug: string[],
	mappings: Mapping[],
): UrlLink[] => {
	const slugsWithHome = ['', ...slug.slice(0, slug.length - 1)]

	return slugsWithHome.map((slugUrl: string) => {
		const _mapping = mappings.find((mapping) => {
			const mappingSlugLength = mapping.params.slug.length
			if (!mappingSlugLength && !slugUrl) {
				return true
			}
			return (
				mappingSlugLength &&
				mapping.params.slug[mappingSlugLength - 1] === slugUrl
			)
		})

		if (!_mapping) return

		return {
			title: _mapping.params.pageTitle,
			url: getUrlFromMapping(
				mappings,
				_mapping.params.navigationItem.codename,
			),
		}
	})
}

export const getDataAttributesFromProps = (props) => {
	return {
		...Object.keys(props)
			.filter((key) => key.includes('data-'))
			.reduce((acc, key) => {
				return {
					...acc,
					[key]: props[key],
				}
			}, {}),
	}
}

export const flattenTaxonomies = (
	taxonomies: TaxonomyModels.Taxonomy[],
): TaxonomyModels.Taxonomy[] => {
	return taxonomies.flatMap((item) => {
		const { _raw, ...props } = item
		if (item.terms?.length) {
			return [
				props,
				...flattenTaxonomies(item.terms),
			] as TaxonomyModels.Taxonomy[]
		}
		return props as TaxonomyModels.Taxonomy
	})
}

export const setTaxonomiesForAssets = (
	assets: AssetModels.Asset[],
	taxonomies: TaxonomyModels.Taxonomy[],
) => {
	const taxonomiesFromMAPI = flattenTaxonomies(taxonomies)
	const fnGetTaxonomy = (item: AssetRawElementInner) =>
		taxonomiesFromMAPI.find((tax) => tax.id == item.id)
	return assets.map((asset: AssetWithRawElements) => {
		const taxonomies = ASSET_TAXONOMIES.reduce((acc, key, index) => {
			return {
				...acc,
				[key]: asset._raw.elements[index].value.map(fnGetTaxonomy),
			}
		}, {})
		return {
			...asset,
			...taxonomies,
		}
	})
}

export const convertProjectModelTaxonomiesToITaxonomyTerms = (
	taxonomy,
): ITaxonomyTerms[] => {
	return Object.keys(taxonomy.terms).reduce((acc, key) => {
		const currentTaxonomyTerm = taxonomy.terms[key]
		return [
			...acc,
			{
				name: currentTaxonomyTerm.name,
				codename: currentTaxonomyTerm.codename,
				terms: convertProjectModelTaxonomiesToITaxonomyTerms(
					currentTaxonomyTerm,
				),
			},
		]
	}, [])
}

export const getFileTypeClassification = (type) => {
	if (type.includes('image/')) return 'Image'
	if (type.includes('video/')) return 'Video'
	return FILE_TYPES[type]
}

export function isYes(multipleChoiceElement: Elements.MultipleChoiceElement) {
	return multipleChoiceElement.value?.[0]?.codename === 'yes'
}

export { getUrlFromMapping, kontentImageLoader, srcIsKontentAsset }

export default {
	getUrlFromMapping,
	kontentImageLoader,
	srcIsKontentAsset,
}
