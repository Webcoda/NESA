// import useNavGroups, { NavGroup, NavGroupSection, useRowCount } from '../../utilities/hooks/useNavGroups'
import ActionComponent from '@/components/Action'
import SanitisedHTMLContainer from '@/components/SanitisedHTMLContainer'
import { FOOTER_TOP_SECTION_SOCIAL_MENU, FOOTER_TOP_SECTION_TITLE } from '@/constants/codenames'
import { NavGroup, NavGroupSection, useRowCount } from "@/legacy-ported/utilities/hooks/useNavGroups"
import { Action } from '@/models/action'
import { ContentSection } from '@/models/content_section'
import { Menu } from '@/models/menu'
import { Mapping } from '@/types'
import { IContentItem } from '@kentico/kontent-delivery'
import React, { Fragment } from 'react'

interface SectionProps {
	/**
	 * The list of links to be displayed, sorted into columns
	 */
	sections: NavGroupSection[]
	mappings: Mapping[]
}

const FooterGroup = (props: SectionProps) => {
	const { sections, mappings } = props

	return (
		<div className="nav-footer-group">
			{sections.map((section) => {
				const rowCount = useRowCount(section.links.length)

				const columns = section.links.reduce<Action[][]>((acc, val) => {
					let column = acc[acc.length - 1]
					if (!column) {
						column = []
						acc.push(column)
					} else if (column.length === rowCount) {
						column = []
						acc.push(column)
					}

					column.push(val)
					return acc
				}, [])

				return (
					<div className="nav-footer-group__section" key={section.label}>
						<p className="nav-footer-group__section-header">{section.label}</p>
						<div className="nav-footer-group__section-body">
							{columns.map((c) => (
								<ul className="nav-footer-group__section-column" key={c[0].system.id}>
									{c.map((action) => (
										<li className="nav-footer-group__section-link" key={action.system.id}>
											<ActionComponent
												key={action.system.id}
												className={action.elements.icon.value.length ? 'no-icon' : ''}
												action={action}
												mappings={mappings}
											/>
										</li>
									))}
								</ul>
							))}
						</div>
					</div>
				)
			})}
		</div>
	)
}

export interface NavFooterProps {
	/**
	 * Sections to be displayed in the footer
	 */
	groups: NavGroup[]
}

/**
 * Navigation footer with links to all of the pages grouped by section
 * @param props
 * @constructor
 */
export const PureNavFooter = (props): JSX.Element => {
	const topSections: IContentItem[] = props.data.config.item.elements.footer_top_top_sections?.linkedItems
	const menus : Menu[] = props.data.config.item.elements.footer_top_menu_sections?.linkedItems

	return (
		<footer className="nav-footer nsw-container">
			<div className="nav-footer__nesa">
				{topSections.map((topSectionItem) => {
					const { type, codename } = topSectionItem.system
					if (codename === FOOTER_TOP_SECTION_TITLE) {
						const sectionTitle = topSectionItem as ContentSection

						return (
							<Fragment key={topSectionItem.system.id}>
								{!!sectionTitle?.elements.content.value && (
									<SanitisedHTMLContainer className="nav-footer__nesa-header">
										{sectionTitle?.elements.content.value}
									</SanitisedHTMLContainer>
								)}
							</Fragment>
						)
					} else if (type === 'menu') {
						const menu = topSectionItem as Menu
						const isSocialMenu = menu.system.codename === FOOTER_TOP_SECTION_SOCIAL_MENU
						return (
							<div className={isSocialMenu ? 'nav-footer__icons' : ''} key={menu.system.id}>
								{menu.elements.actions.linkedItems.map((action: Action) => {
									return (
										<ActionComponent
											key={action.system.id}
											className={isSocialMenu ? 'no-icon' : ''}
											action={action}
											mappings={props.mappings}
										/>
									)
								})}
							</div>
						)
					}
				})}
			</div>
			{/* TODO: fix */}
			<div className="nav-footer__sections">
				{menus
					?.filter((g) => !!g.elements.actions.value.length)
					?.map((g) => {
						const sections: NavGroupSection[] = [{
							label: g.elements.label.value,
							links: g.elements.actions.linkedItems.map(item => item as Action)
						}]

						return (
							<FooterGroup
								key={g.system.id}
								sections={sections}
								mappings={props.mappings}
							/>
						)
					})
				}
			</div>
		</footer>
	)
}

/**
 * Navigation footer with links to all of the pages grouped by section
 * @param props
 * @constructor
 */
export default function NavFooter(props) {
	return <PureNavFooter {...props} />
}
