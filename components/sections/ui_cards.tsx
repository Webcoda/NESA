/** @jsxImportSource @emotion/react */
import { RichtextSectionProps } from '@/components/sections'
import LinkCardLegacy from '@/legacy-ported/components/teachers/LinkCard'
import { Contentblock } from '@/models/contentblock'
import { css } from '@emotion/react'

import { getLinkFromLinkUI } from '@/utils'
import { Grid as MuiGrid } from '@material-ui/core'
import { UiCardNewsletterSubscription } from '@/models/ui_card_newsletter_subscription'
import NewsletterSubscribeBox from '@/components/sections/NewsletterSubscribeBox'
import { UiCards } from '@/models/ui_cards'

export default function LinkCard(props: RichtextSectionProps<UiCards>) {
	const { linkedItem, mappings } = props

	const gapVertical = 26
	const gapHorizontal = 26

	const renderTile = (item: Contentblock | UiCardNewsletterSubscription) => {
		if (item.system.type === 'contentblock') {
			const _item = item as Contentblock
			const { url, isExternal } = getLinkFromLinkUI(
				_item.elements.more_info_link.linkedItems[0],
				mappings,
			)
			return (
				<LinkCardLegacy
					headline={_item.elements.title.value}
					className=""
					link={url}
					linkTarget={isExternal ? '_blank' : ''}
				></LinkCardLegacy>
			)
		}
		return (
			<NewsletterSubscribeBox
				section={item as UiCardNewsletterSubscription}
			/>
		)
	}

	return (
		<section
			css={css`
				margin-top: ${gapVertical}px;
				margin-bottom: ${gapVertical}px;
			`}
		>
			<MuiGrid
				container
				component="div"
				css={css`
					&& {
						width: calc(100% + ${gapHorizontal}px);
						margin-left: -${gapHorizontal / 2}px;
						margin-right: -${gapHorizontal / 2}px;
					}

					&& > .MuiGrid-item {
						padding: ${gapVertical / 2}px ${gapHorizontal / 2}px;
					}
				`}
			>
				{linkedItem.elements.items.linkedItems.map(
					(item: Contentblock) => {
						return (
							<MuiGrid
								key={item.system.id}
								item
								xs={12}
								sm={12}
								md={6}
								lg={6}
							>
								{renderTile(item)}
							</MuiGrid>
						)
					},
				)}
			</MuiGrid>
		</section>
	)
}
