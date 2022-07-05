import { RichtextSectionProps } from '@/components/sections'
import SectionCard from '@/legacy-ported/components/base/SectionCard'
import { UiHomepageTileCallout } from '@/models/ui_homepage_tile_callout'
import { UiMenu } from '@/models/ui_menu'

export const HomepageTileCallout = (
	props: RichtextSectionProps<UiHomepageTileCallout>,
) => {
	const { linkedItem, mappings } = props

	const mainTile = linkedItem.elements.tiles.linkedItems[0] as UiMenu

	const tiles = mainTile.elements.subitems.linkedItems as UiMenu[]

	return (
		<section id={linkedItem.system.codename}>
			<SectionCard
				backgroundColor={linkedItem.elements.background_color.value}
				dividerColor={linkedItem.elements.divider_color.value}
				fontColor={linkedItem.elements.font_color.value}
				numberOfColumns={linkedItem.elements.tiles.value.length}
				title={mainTile.elements.title.value}
				arrowColor={linkedItem.elements.arrow_color.value}
				tiles={tiles}
				mappings={mappings}
			/>
		</section>
	)
}

export default HomepageTileCallout
