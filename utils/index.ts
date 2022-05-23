import { NAVIGATION_ITEM_STAGES } from './../constants/index';
import type { IGlossary } from '@/legacy-ported/utilities/backendTypes';
import type { Glossary } from '@/models/glossary';
import type { DeliveryClient } from '@kentico/kontent-delivery';
import getUrlFromMapping from './getUrlFromMapping';
import kontentImageLoader from './kontentImageLoader';
import srcIsKontentAsset from './srcIsKontentAsset';

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

export { getUrlFromMapping, kontentImageLoader, srcIsKontentAsset };

export default {
	getUrlFromMapping,
	kontentImageLoader,
	srcIsKontentAsset,
}
