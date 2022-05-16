import React from 'react'
import Link from "next/link";
// import { UrlLink } from '../../utilities/frontendTypes'
import SanitisedHTMLContainer from '@/components/SanitisedHTMLContainer'
import { NavGroup } from '@/legacy-ported/utilities/hooks/useNavGroups'
// import { NavGroupSection, useRowCount } from '../../utilities/hooks/useNavGroups'

export interface NavBarMenuSectionProps {
	/**
	 * Section title, displayed above all the links
	 */
	title: string

	/**
	 * The list of links to be displayed, sorted into columns
	 */
	links: UrlLink[]

	/**
	 * Call back when link click
	 */
	onLinkClick?: () => void
}

const NavBarMenuSection = (props: NavBarMenuSectionProps): JSX.Element => {
	const { title, links, onLinkClick } = props
	// const rowCount = useRowCount(links.length)
	// const colCount = Math.floor((links.length - 1) / rowCount) + 1
	// const useShortBody = rowCount === 4

	const rowCount = links.length
	const colCount = Math.floor((links.length - 1) / rowCount) + 1
	const useShortBody = false

	return (
		<div className="navbar-menu-section">
			<h5 className="navbar-menu-section__heading">{title}</h5>
			<ul
				className={`navbar-menu-section__body ${
					useShortBody ? 'navbar-menu-section__body--short' : ''
				} navbar-menu-section__body--${colCount}-column`}
			>
				{links.map((link, index) => (
					<li
						key={link.id}
						className={`grid-col-${Math.floor(index / rowCount) + 1} grid-row-${(index % rowCount) + 1}`}
					>
						{link.isDisabled ? (
							<div
								className={`navbar-menu-section__link ${
									link.isDisabled ? 'navbar-menu-section__link--disabled' : ''
								} ${link.text === 'View all' ? 'font-bold' : ''}`}
							>
								{link.icon || null}
								<SanitisedHTMLContainer>{link.text}</SanitisedHTMLContainer>
							</div>
						) : (
							<Link href={link.url}>
								<a
									className={`navbar-menu-section__link ${
										link.text === 'View all' ? 'font-bold' : ''
									}`}
									onClick={onLinkClick}
								>
									{link.icon || null}
									<SanitisedHTMLContainer>{link.text}</SanitisedHTMLContainer>
								</a>
							</Link>
						)}
					</li>
				))}
			</ul>
		</div>
	)
}

export interface NavBarMenuProps {
	/**
	 * Sections to show on the menu
	 */
	sections: NavGroup[]

	/**
	 * Call back when link click
	 */
	onLinkClick?: () => void
}

const NavBarMenu = (props: NavBarMenuProps) => {
	const { sections, onLinkClick } = props
	console.log(sections)
	return (
		<div className="navbar-menu">
			{sections.map((sec) => (
				<NavBarMenuSection
					key={`NavBarMenuSection${sec.id}`}
					title={sec.text}
					links={sec.subNav}
					onLinkClick={onLinkClick}
				/>
			))}
		</div>
	)
}

export default NavBarMenu
