import SanitisedHTMLContainer from '@/components/SanitisedHTMLContainer'
import { Mapping } from '@/types'
import React from 'react'
import Anchor from '@/components/Anchor'
import { Weblinkext } from '@/models/weblinkext'
import { Weblinkint } from '@/models/weblinkint'
import { UiMenu } from '@/models/ui_menu'

export interface SiteFooterProps {
	acknowledge: string
	mappings: Mapping[]
	menu: any
	copyrightLink: Weblinkext | Weblinkint | UiMenu
}

const SiteFooter = (props: SiteFooterProps): JSX.Element => (
	<footer className="site-footer">
		<div className="nsw-container">
			<SanitisedHTMLContainer className="site-footer__acknowledgement">
				{props.acknowledge}
			</SanitisedHTMLContainer>
			<div className="site-footer__link-list">
				{props.menu.map((link) => {
					return (
						<Anchor
							key={link.system.id}
							className="site-footer__link"
							link={link}
							mappings={props.mappings}
						/>
					)
				})}
			</div>
			{props.copyrightLink && (
				<small className="site-footer__copyright">
					<Anchor
						link={props.copyrightLink}
						mappings={props.mappings}
					>
						Copyright &copy; {new Date().getFullYear()}
					</Anchor>
				</small>
			)}
		</div>
	</footer>
)

export default SiteFooter
