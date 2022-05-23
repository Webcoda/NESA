import Action from '@/components/Action'
import SanitisedHTMLContainer from '@/components/SanitisedHTMLContainer'
import { Action as ActionModel } from '@/models/action'
import { Mapping } from '@/types'
import React from 'react'

export interface SiteFooterProps {
	acknowledge: string
	mappings: Mapping[]
	menu: ActionModel[]
}

const SiteFooter = (props: SiteFooterProps): JSX.Element => (
	<footer className="site-footer">
		<div className="nsw-container">
			<SanitisedHTMLContainer className="site-footer__acknowledgement">
				{props.acknowledge}
			</SanitisedHTMLContainer>
			<div className="site-footer__link-list">
				{props.menu.map((action) => {
					return (
						<Action
							key={action.system.id}
							className="site-footer__link"
							action={action}
							mappings={props.mappings}
						/>
					)
				})}
			</div>
			<small className="site-footer__copyright">
				<a
					href="https://educationstandards.nsw.edu.au/wps/portal/nesa/mini-footer/copyright"
					aria-label="Copyright"
					target="_blank"
					rel="noreferrer"
				>
					Copyright &copy; {(new Date()).getFullYear()}
				</a>
			</small>
		</div>
	</footer>
)

export default SiteFooter
