// import useNavGroups, { NavGroup, NavGroupSection, useRowCount } from '../../utilities/hooks/useNavGroups'
import Anchor from '@/components/Anchor'
import RichText from '@/components/RichText'
import { NavPageProps } from '@/legacy-ported/containers/NavPage'
import {
	NavGroup,
	NavGroupSection,
	useRowCount as getRowCount,
} from '@/legacy-ported/utilities/hooks/useNavGroups'
import { CollectionWeblink } from '@/models/collection_weblink'
import { UiMenu } from '@/models/ui_menu'
import { Weblinkext } from '@/models/weblinkext'
import { Mapping } from '@/types'
import { getLinkFromLinkUI } from '@/utils'
import { flattenCollectionWebLinks } from '@/utils/collectionWebLinks'
import { Icon } from '@iconify/react'

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
	const socialMenus = props.data.config.item.elements.social_links.linkedItems
	const menus = flattenCollectionWebLinks(
		props.data.config.item.elements.footer_menu_links
			.linkedItems as CollectionWeblink[],
	)
	const { mappings } = props
	return (
		<footer className="nav-footer nsw-container">
			<div className="nav-footer__nesa">
				<RichText
					{...props}
					linkedItems={props.data.pageResponse.linkedItems}
					className="nav-footer__nesa"
					richTextElement={topSections}
				/>
				<div className="nav-footer__icons">
					{socialMenus.map((item: Weblinkext) => {
						return (
							<Anchor
								key={item.system.id}
								link={item}
								className="no-icon"
								mappings={mappings}
							>
								<Icon
									icon={`fa-brands:${item.elements.title.value.toLowerCase()}`}
									width={24}
									height={24}
								/>
							</Anchor>
						)
					})}
				</div>
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
