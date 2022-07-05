import SyllabusGroup from '@/legacy-ported/components/syllabus/SyllabusGroup'
import { LinkCard } from '@/models/link_card'
import { LinkCardsListSection as LinkCardsListSectionModel } from '@/models/link_cards_list_section'
import type { Mapping } from '@/types'
import { getLinkFromNavigationItem, isNavItemExternalUrl } from '@/utils'
import { IContentItem } from '@kentico/kontent-delivery'

export interface LinkCardsListSectionProps {
	section: LinkCardsListSectionModel
	mappings: Mapping[]
}

export const LinkCardsListSection = (props: LinkCardsListSectionProps) => {
	const { section, mappings } = props

	return null
	// return (
	// 	<SyllabusGroup
	// 		heading={section.elements.title.value}
	// 		items={section.elements.cards.linkedItems
	// 			.map((item) => item as LinkCard)
	// 			.map((linkCard) => {
	// 				const navItem: IContentItem =
	// 					linkCard.elements.path.linkedItems?.[0]
	// 				const url = getLinkFromNavigationItem(navItem, mappings)
	// 				return {
	// 					headline: linkCard.elements.title.value,
	// 					body: linkCard.elements.body.value,
	// 					url: {
	// 						title: linkCard.elements.title.value,
	// 						external: isNavItemExternalUrl(navItem),
	// 						url,
	// 					},
	// 					colour: linkCard.elements.color.value[0]?.codename,
	// 				}
	// 			})}
	// 	/>
	// )
}

export default LinkCardsListSection
