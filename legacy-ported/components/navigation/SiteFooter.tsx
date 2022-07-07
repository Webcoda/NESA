import SanitisedHTMLContainer from '@/components/SanitisedHTMLContainer'
import { LinkType, Mapping } from '@/types'
import React from 'react'
import Anchor from '@/components/Anchor'
import { Weblinkext } from '@/models/weblinkext'
import { Weblinkint } from '@/models/weblinkint'
import { UiMenu } from '@/models/ui_menu'
import { CollectionWeblink } from '@/models/collection_weblink'

export interface SiteFooterProps {
	acknowledge: string
	mappings: Mapping[]
	menu: CollectionWeblink[]
	copyrightLink: Weblinkext | Weblinkint | UiMenu
	kontentItemIdMenu?: string
}

const SiteFooter = (props: SiteFooterProps): JSX.Element => {
	const {
		acknowledge,
		mappings,
		menu,
		copyrightLink,
		kontentItemIdMenu = '',
		...rest
	} = props
	return (
		<footer {...rest} className="site-footer">
			<div className="nsw-container">
				<SanitisedHTMLContainer
					className="site-footer__acknowledgement"
					data-kontent-element-codename="acknowledgement"
				>
					{acknowledge}
				</SanitisedHTMLContainer>
				<div
					className="site-footer__link-list"
					data-kontent-item-id={kontentItemIdMenu}
				>
					{menu.flatMap((colLink: CollectionWeblink) => {
						return colLink.elements.items.linkedItems.map(
							(link: LinkType) => {
								return (
									<Anchor
										key={link.system.id}
										className="site-footer__link"
										link={link}
										mappings={mappings}
									/>
								)
							},
						)
					})}
				</div>
				{copyrightLink && (
					<small
						className="site-footer__copyright"
						data-kontent-element-codename="copyright_link"
					>
						<Anchor link={copyrightLink} mappings={mappings}>
							Copyright &copy; {new Date().getFullYear()}
						</Anchor>
					</small>
				)}
			</div>
		</footer>
	)
}

export default SiteFooter
