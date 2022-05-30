import LinkCardLegacy from '@/legacy-ported/components/teachers/LinkCard'

import { HomepageLinkCard as HomepageLinkCardModel } from '@/models/homepage_link_card'
import { Mapping } from '@/types'
import { getLinkFromNavigationItem } from '@/utils'

export interface HomepageLinkCardProps {
	section: HomepageLinkCardModel
	mappings: Mapping[]
}

export default function LinkCard(props: HomepageLinkCardProps) {
	const { section, mappings } = props
	const navigationItem = section.elements.path.linkedItems[0]
	const path = navigationItem
		? getLinkFromNavigationItem(navigationItem, mappings)
		: '#'
	console.log(navigationItem)

	return (
		<LinkCardLegacy
			headline={section.elements.title.value}
			className=""
			link={path}
			linkTarget={
				navigationItem.system.type === 'external_url'
					? '_blank'
					: undefined
			}
		></LinkCardLegacy>
	)
}
