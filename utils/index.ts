import { NAVIGATION_ITEM_STAGES } from '../constants/codenames';
import type { IGlossary } from '@/legacy-ported/utilities/backendTypes';
import type { Glossary } from '@/models/glossary';
import getUrlFromMapping from './getUrlFromMapping';
import kontentImageLoader from './kontentImageLoader';
import srcIsKontentAsset from './srcIsKontentAsset';
import type { ElementModels } from '@kentico/kontent-delivery';

export const convertGlossaryToIGlossary = (glossaries: Glossary[]): IGlossary[] => {
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

// Get year text from years
export const getTagFromYears = (years: ElementModels.MultipleChoiceOption[]) => {
	const yearRanges = years.map(item => item.name)
	let yearText = '';
	if(!yearRanges.length) return yearText
	if(yearRanges.length === 1) {
		yearText = yearRanges[0]
	} else {
		yearText = `${yearRanges[0]}–${yearRanges[yearRanges.length - 1]}`
	}
	return yearText.toUpperCase()
}

export { getUrlFromMapping, kontentImageLoader, srcIsKontentAsset };

export default {
	getUrlFromMapping,
	kontentImageLoader,
	srcIsKontentAsset,
}
