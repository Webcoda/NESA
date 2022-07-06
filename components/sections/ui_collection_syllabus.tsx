import { UiCollectionSyllabus } from '@/models/ui_collection_syllabus'
import { Syllabus } from '@/models/syllabus'
import { RichtextSectionProps } from '.'
import SyllabusCard, {
	SyllabusCardColor,
} from '@/legacy-ported/components/syllabus/SyllabusCard'
import { getLinkFromLinkUI, getTagFromYears } from '@/utils'
import { CollectionSyllabus } from '@/models/collection_syllabus'

export default function ui_collection_syllabus(
	props: RichtextSectionProps<UiCollectionSyllabus>,
) {
	const { linkedItem, mappings } = props
	const collection = linkedItem.elements.collection
		.linkedItems[0] as CollectionSyllabus

	return (
		<div className="syllabus-group">
			<div className="syllabus-group__card-grid">
				{collection.elements.items.linkedItems.map(
					(syllabus: Syllabus, index) => {
						const { url = '#', isExternal } = getLinkFromLinkUI(
							syllabus,
							mappings,
						)
						const year = getTagFromYears(
							syllabus.elements.stages__stage_years.value,
						)
						const s = {
							headline: syllabus.elements.title.value,
							body: `${year} Syllabus`,
							url: {
								title: syllabus.elements.title.value,
								external: isExternal,
								url,
							},
							colour: linkedItem.elements.tile_colour.value[0]
								?.codename as SyllabusCardColor,
						}
						return (
							<SyllabusCard
								// eslint-disable-next-line react/no-array-index-key
								key={syllabus.system.id}
								className="syllabus-group__card"
								{...s}
							/>
						)
					},
				)}
			</div>
		</div>
	)
}
