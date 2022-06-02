import * as React from 'react'
import { stripHtml } from '../../utilities/functions'

export interface PageSection {
	title: string
	content: string
}

export interface IBannerProps {
	/**
	 * Title of component
	 */
	title: string

	/**
	 * List of Links
	 */
	links: PageSection[]

	/**
	 * Call back when link clicked
	 */
	onLinkClick: (link: PageSection) => void
}

export default function CustomInPageNavLinks(props: IBannerProps) {
	const { title, links, onLinkClick } = props

	return (
		<nav className="nsw-page-nav" aria-label="in page navigation">
			<h2 className="nsw-page-nav__title">{title}</h2>
			<ul className="nsw-page-nav__list">
				{links.map((link) => (
					<li key={link.title} className="nsw-page-nav__list-item">
						<div
							className="nsw-page-nav__link"
							role="button"
							tabIndex={0}
							onKeyPress={() => onLinkClick(link)}
							onClick={() => onLinkClick(link)}
						>
							{stripHtml(link.title)}
						</div>
					</li>
				))}
			</ul>
		</nav>
	)
}
