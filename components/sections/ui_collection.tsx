import { SyllabusCardColor } from '@/legacy-ported/components/syllabus/SyllabusCard'
import SyllabusGroup from '@/legacy-ported/components/syllabus/SyllabusGroup'
import { CollectionSyllabus } from '@/models/collection_syllabus'
import { CollectionWeblink } from '@/models/collection_weblink'
import { Syllabus } from '@/models/syllabus'
import { UiCollection } from '@/models/ui_collection'
import { LinkType } from '@/types'
import { getLinkFromLinkUI, getTagFromYears } from '@/utils'
import { RichtextSectionProps } from '.'

export type UiCollectionCollectionTypes = CollectionSyllabus | CollectionWeblink

export default function ui_collection(
	props: RichtextSectionProps<UiCollection>,
) {
	const { linkedItem, mappings } = props
	const collection = linkedItem.elements.items
		.linkedItems[0] as UiCollectionCollectionTypes
	const tileColor = (linkedItem.elements.tile_colour.value[0]?.codename ||
		'primary') as SyllabusCardColor

	const renderCollectionSyllabus = (collection: CollectionSyllabus) => {
		return collection.elements.items.linkedItems.map(
			(syllabus: Syllabus, index) => {
				const { url, isExternal } = getLinkFromLinkUI(
					syllabus,
					mappings,
				)
				const year = getTagFromYears(
					syllabus.elements.stages__stage_years.value,
				)
				return {
					headline: syllabus.elements.title.value,
					body: `${year} Syllabus`,
					url: {
						title: syllabus.elements.title.value,
						external: isExternal,
						url: url || '#',
					},
					colour: tileColor,
					codenameHeadline: 'title',
				}
			},
		)
	}

	const renderCollectionWebLink = (collection: CollectionWeblink) => {
		return collection.elements.items.linkedItems.map(
			(menu: LinkType, index) => {
				const { url, isExternal } = getLinkFromLinkUI(menu, mappings)
				return {
					headline: menu.elements.title.value,
					body: menu.elements.subtitle.value,
					url: {
						title: menu.elements.title.value,
						external: isExternal,
						url: url || '#',
					},
					colour: tileColor,
					codenameTitle: 'title',
					codenameBody: 'subtitle',
				}
			},
		)
	}

	const renderCollection = (collection: UiCollectionCollectionTypes) => {
		if (!collection) return []
		if (collection.system.type === 'collection_syllabus') {
			return renderCollectionSyllabus(collection)
		}
		return renderCollectionWebLink(collection)
	}

	return (
		<SyllabusGroup
			heading={linkedItem.elements.title.value}
			items={renderCollection(collection)}
			data-kontent-item-id={linkedItem.system.id}
		/>
	)
}
