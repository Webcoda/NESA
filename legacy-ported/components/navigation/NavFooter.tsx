// import useNavGroups, { NavGroup, NavGroupSection, useRowCount } from '../../utilities/hooks/useNavGroups'
import ActionComponent from '@/components/Action'
import SanitisedHTMLContainer from '@/components/SanitisedHTMLContainer'
import {
	FOOTER_TOP_SECTION_SOCIAL_MENU,
	FOOTER_TOP_SECTION_TITLE,
} from '@/constants/codenames'
import { NavPageProps } from '@/legacy-ported/containers/NavPage'
import {
	NavGroup,
	NavGroupSection,
	useRowCount as getRowCount,
} from '@/legacy-ported/utilities/hooks/useNavGroups'
import { Mapping } from '@/types'
import { IContentItem } from '@kentico/kontent-delivery'
import React, { Fragment } from 'react'
import RichText from '@/components/RichText'
import { flattenCollectionWebLinks } from '@/utils/collectionWebLinks'
import { CollectionWeblink } from '@/models/collection_weblink'
import { UiMenu } from '@/models/ui_menu'
import Anchor from '@/components/Anchor'

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
				const rowCount = getRowCount(section.links.length)

				const columns = section.links.reduce<UiMenu[][]>((acc, val) => {
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
					<div
						className="nav-footer-group__section"
						key={section.label}
					>
						<p className="nav-footer-group__section-header">
							{section.label}
						</p>
						<div className="nav-footer-group__section-body">
							{columns.map((c) => (
								<ul
									className="nav-footer-group__section-column"
									key={c[0].system.id}
								>
									{c.map((action) => {
										console.log(
											'🚀 ~ file: NavFooter.tsx ~ line 67 ~ {c.map ~ action',
											action,
										)
										return (
											<li
												className="nav-footer-group__section-link"
												key={action.system.id}
											>
												<Anchor
													key={action.system.id}
													link={action}
													mappings={mappings}
												/>
												{/* <ActionComponent
													action={action}
													mappings={mappings}
												/> */}
											</li>
										)
									})}
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

export const PureNavFooter = (props: NavPageProps): JSX.Element => {
	const topSections = props.data.config.item.elements.footer_top_content
	const menus = flattenCollectionWebLinks(
		props.data.config.item.elements.footer_menu_links
			.linkedItems as CollectionWeblink[],
	)
	console.log('🚀 ~ file: NavFooter.tsx ~ line 103 ~ menus', menus)

	return (
		<footer className="nav-footer nsw-container">
			<div className="nav-footer__nesa">
				<RichText
					{...props}
					className="nav-footer__nesa"
					richTextElement={topSections}
				/>
			</div>
			{/* TODO: fix */}
			<div className="nav-footer__sections">
				{menus
					// ?.filter((g) => !!g.elements.actions.value.length)
					?.map((g: UiMenu) => {
						const sections: NavGroupSection[] = [
							{
								label: g.elements.title.value,
								links: g.elements.subitems.linkedItems.map(
									(item) => item as UiMenu,
								),
							},
						]

						return (
							<FooterGroup
								key={g.system.id}
								sections={sections}
								mappings={props.mappings}
							/>
						)
					})}
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
