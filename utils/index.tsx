import sections from '@/components/sections'
import UnknownComponent from '@/components/UnknownComponent'
import type { IGlossary } from '@/legacy-ported/utilities/backendTypes'
import type { Glossary } from '@/models/glossary'
import { Mapping } from '@/types'
import type {
	ElementModels,
	Elements,
	IContentItem,
} from '@kentico/kontent-delivery'
import get from 'lodash.get'
import camelCase from 'lodash.camelcase'
import upperFirst from 'lodash.upperfirst'
import getUrlFromMapping from './getUrlFromMapping'
import kontentImageLoader from './kontentImageLoader'
import srcIsKontentAsset from './srcIsKontentAsset'

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
	years: ElementModels.MultipleChoiceOption[],
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

export const getLinkFromNavigationItem = (
	navigationItem: IContentItem,
	mappings: Mapping[],
): string => {
	if (
		navigationItem.system.type === 'external_url' &&
		'url' in navigationItem.elements
	) {
		return navigationItem.elements.url.value
	}
	return getUrlFromMapping(mappings, navigationItem.system.codename)
}

export const getUrlFromStage = (stageCodename: string, mappings: Mapping[]) => {
	const mapping = mappings.find((map) => {
		const { navigationItem } = map.params
		return navigationItem.codename.includes(
			stageCodename.replace('stage__', `${navigationItem.type}__`),
		)
	})
	return mapping
		? getUrlFromMapping(mappings, mapping.params.navigationItem.codename)
		: ''
}
export const getUrlFromStageGroup = (
	stageGroupCodename: string,
	mappings: Mapping[],
) => {
	const mapping = mappings.find((map) => {
		const { navigationItem } = map.params
		return navigationItem.codename.includes(
			stageGroupCodename.replace(
				'stage_group__',
				`${navigationItem.type}__`,
			),
		)
	})
	console.log('🚀 ~ file: index.ts ~ line 91 ~ mapping ~ mapping', mapping)
	return getUrlFromMapping(mappings, mapping.params.navigationItem.codename)
}

export const isNavItemExternalUrl = (navItem: IContentItem) =>
	navItem.system.type === 'external_url'

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

export { getUrlFromMapping, kontentImageLoader, srcIsKontentAsset }

export default {
	getUrlFromMapping,
	kontentImageLoader,
	srcIsKontentAsset,
}
