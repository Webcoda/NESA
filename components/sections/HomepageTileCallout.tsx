import SectionCard from '@/legacy-ported/components/base/SectionCard'

import { HomepageTileCallout as HomepageTileCalloutModel } from '@/models/homepage_tile_callout'
import { HomepageTileCalloutTile } from '@/models/homepage_tile_callout_tile'
import type { Mapping } from '@/types'

export interface HomepageTileCalloutProps {
	section: HomepageTileCalloutModel
	mappings: Mapping[]
}

export const HomepageTileCallout = (props: HomepageTileCalloutProps) => {
	const { section, mappings } = props

	return (
		<section id={section.system.codename}>
			<SectionCard
				backgroundColor={section.elements.background_color.value}
				dividerColor={section.elements.divider_color.value}
				fontColor={section.elements.font_color.value}
				numberOfColumns={section.elements.tiles.value.length}
				title={section.elements.title.value}
				arrowColor={section.elements.arrow_color.value}
				tiles={section.elements.tiles.linkedItems.map(
					(item) => item as HomepageTileCalloutTile,
				)}
				mappings={mappings}
			/>
		</section>
	)
}

export default HomepageTileCallout
