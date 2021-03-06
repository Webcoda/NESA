import { Mapping } from '@/types'
import { Paper, Popover } from '@material-ui/core'
// import PATHS from '../../constants/pathConstants'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
// import useFocusTabIndex from '../../utilities/hooks/useFocusTabIndex'
import { NavGroup } from '../../utilities/hooks/useNavGroups'
// import SearchBar from '../base/SearchBar'
import NavBarMenu from './NavBarMenu'
export interface PureNavBarProps {
	/**
	 * Navbar title
	 */
	title: string

	/**
	 * Navbar title
	 */
	subtitle?: string

	/**
	 * List of nav destinations to display
	 */
	destinations: any

	navItems: any

	/**
	 * Whether the bar should display in search mode
	 */
	search?: boolean

	/**
	 * Callback fired when search button is pressed
	 */
	onSearchOpen?: () => void

	/**
	 * Callback fired when needs to hide search bar
	 */
	hideSearchBar?: () => void

	/**
	 * callback fired when search is submitted
	 */
	onSearchSubmit?: (text: string) => void

	/**
	 * Classname prop, forwarded to root element
	 */
	className?: string

	mappings: Mapping[]
}

/**
 * A header navigation bar
 * @param props
 * @constructor
 */
export const PureNavBar = (props: PureNavBarProps): JSX.Element => {
	const {
		title,
		subtitle,
		destinations,
		navItems,
		search,
		onSearchOpen,
		hideSearchBar,
		onSearchSubmit,
		mappings,
		className,
	} = props
	const [hoverLink, setHoverLink] = useState(false)
	const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement | null>(null)
	const [menuContent, setMenuContent] = useState<NavGroup[]>([])
	const [currentNavId, setCurrentNavId] = useState(
		destinations?.length > 0 ? destinations[0].id : '',
	)

	const handleHoverLinkStart = (
		e: React.MouseEvent<HTMLButtonElement>,
		link?: NavGroup,
	) => {
		if (link && link.subNav?.length) {
			setPopoverAnchor(e.currentTarget)
			setMenuContent(link.subNav)
			setHoverLink(true)
			setCurrentNavId(link.id)
		}
	}

	const handleHoverPopoverStart = () => {
		setHoverLink(true)
	}

	const handleHoverPopoverEnd = () => {
		setHoverLink(false)
	}

	const handleLinkClick = () => {
		setHoverLink(false)
	}

	/**
	 * Set focus to current Nav button when popover closed
	 * Ignore focus on first render
	 */
	if (currentNavId) {
		const currentNavButton = document.getElementById(`${currentNavId}-nav`)
		// useFocusTabIndex(hoverLink, currentNavButton)
	}

	const router = useRouter()

	return (
		<header className={`navbar ${className || ''} column`}>
			<Link href="/">
				<a>
					<div className="navbar__title-container">
						<img
							className="navbar__logo"
							src="/nsw-gov-logo-75-high.svg"
							alt="NSW Government Logo"
						/>
						<div className="column">
							{title && (
								<h1 className="navbar__title">{title}</h1>
							)}
							{subtitle && (
								<h2 className="navbar__sub-title">
									{subtitle}
								</h2>
							)}
						</div>
					</div>
				</a>
			</Link>

			<div className="row">
				{!search && (
					<>
						<nav className="nav-links">
							{navItems.map((link) => {
								const { asPath } = router
								let isActive = asPath === link.url

								if (asPath != '/' && link.url != '/') {
									isActive =
										asPath.match(new RegExp(link.url, 'ig'))
											?.length > 0
								}

								if (link.subNav.length) {
									return (
										<button
											key={link.id}
											type="button"
											tabIndex={0}
											id={`${link.id}-nav`}
											className={`button button--transparent button--text-align-center ${
												isActive
													? 'nav-links__link active'
													: 'nav-links__link'
											}`}
											onClick={(e) =>
												handleHoverLinkStart(e, link)
											}
											onMouseEnter={(e) =>
												handleHoverLinkStart(e, link)
											}
											onMouseLeave={handleHoverPopoverEnd}
										>
											<span className="nav-links__link-text">
												{link.text}
											</span>
											{link.icon && (
												<span className="nav-links__link-icon">
													{link.icon}
												</span>
											)}
										</button>
									)
								}
								return (
									<Link key={link.id} href={link.url}>
										<a className="nav-links__link">
											<span className="nav-links__link-text">
												{link.text}
											</span>
											{link.icon && (
												<span className="nav-links__link-icon">
													{link.icon}
												</span>
											)}
										</a>
									</Link>
								)
							})}
						</nav>
						{/* TODO remove after MVP */}
						{/* <button className="navbar__search" type="button" onClick={onSearchOpen}> */}
						{/*  <Search className="navbar__search-icon" /> */}
						{/*  <span className="navbar__search-text">Search</span> */}
						{/* </button> */}
					</>
				)}
				{search && (
					<Paper className="navbar__search-container" elevation={2}>
						{/* <SearchBar onSearch={onSearchSubmit} onBlurEvent={hideSearchBar} autoFocus /> */}
					</Paper>
				)}
			</div>
			<Popover
				className="navbar__menu-container"
				open={hoverLink}
				anchorEl={popoverAnchor}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				onClose={handleHoverPopoverEnd}
				disableRestoreFocus
				PaperProps={{
					onMouseEnter: handleHoverPopoverStart,
					onMouseLeave: handleHoverPopoverEnd,
				}}
			>
				<NavBarMenu
					mappings={mappings}
					sections={menuContent}
					onLinkClick={handleLinkClick}
				/>
			</Popover>
		</header>
	)
}

export default (props: Omit<PureNavBarProps, 'destinations'>) => {
	const destinations = []

	return <PureNavBar {...props} destinations={destinations} />
}
