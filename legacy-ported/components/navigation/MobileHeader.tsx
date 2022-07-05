import { Masthead } from '@/lib/nsw-ds-react/src/component/header/masthead'
import get from 'lodash.get'
import { useEffect, useRef, useState } from 'react'
// import { useHistory } from 'react-router-dom'
import { UrlLinkWithChildrenFlag } from '../../utilities/frontendTypes'
import { NavGroup } from '../../utilities/hooks/useNavGroups'
import BetaSiteBanner from '../base/BetaSiteBanner'
import { createNavItem, HeaderProps } from './Header'
import MobileNavBar from './MobileNavBar'
import MobileNavBarMenu, { MobileNavBarMenuProps } from './MobileNavBarMenu'

export interface PureMobileHeaderProps {
	/**
	 * Whether the menu is open
	 */
	open: boolean

	/**
	 * Current heading to display above links
	 */
	currentHeading?: MobileNavBarMenuProps['currentHeading']

	/**
	 * current set of links to display
	 */
	sections: MobileNavBarMenuProps['sections']

	/**
	 * Whether the search bar should auto focus
	 */
	autoFocusSearchBar?: MobileNavBarMenuProps['autoFocusSearchBar']

	/**
	 * Callback fired when menu button is clicked
	 */
	onClickMenu?: () => void

	/**
	 * Callback fired when search button is clicked
	 */
	onClickSearch?: () => void

	/**
	 * Callback fired when back button is clicked
	 */
	onBack?: MobileNavBarMenuProps['onBack']

	/**
	 * Callback fired when a menu item is clicked
	 */
	onClickLink?: MobileNavBarMenuProps['onClick']

	/**
	 * Callback fired when search is submitted
	 */
	onSearch?: MobileNavBarMenuProps['onSearchSubmit']

	/**
	 * Classname prop, forwarded to root element
	 */
	className?: string
}

/**
 * Site Mobile header. All props are exposed for ease of testing with Storybook
 * @param props
 * @constructor
 */
export const PureMobileHeader = (props: PureMobileHeaderProps): JSX.Element => {
	const {
		open,
		currentHeading,
		sections,
		autoFocusSearchBar,
		onBack,
		onClickMenu,
		onClickLink,
		onClickSearch,
		onSearch,
		className,
	} = props

	const [lastScroll, setLastScroll] = useState(0)
	const [bannerHidden, setBannerHidden] = useState(false)
	const [hidden, setHidden] = useState(false)

	const header = useRef<HTMLDivElement>(null)

	const handleScroll = (event: Event) => {
		// Hide menu on scroll down, show on scroll up
		const scroll = window.pageYOffset
		if (scroll > lastScroll) {
			setHidden(true)
		} else {
			setHidden(false)
			setBannerHidden(true)
		}

		// display the banner back when the scroll gets to 0
		if (scroll === 0) setBannerHidden(false)

		setLastScroll(scroll)
	}

	useEffect(() => {
		// Detect scroll up/down
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	})

	useEffect(() => {
		// Stop body scrolling while menu is open
		if (open) {
			document.body.classList.add('noscroll')
		}
		return () => {
			if (open) {
				document.body.classList.remove('noscroll')
			}
		}
	}, [open])

	// todo set style-top on element based on size of mobile-header
	useEffect(() => {
		if (hidden && !open && header.current) {
			const height = header.current.offsetHeight
			header.current.style.top = `-${height}px`
		}
		return () => {
			if (header.current) {
				header.current.style.removeProperty('top')
			}
		}
	}, [hidden, open])

	return (
		<div className={`mobile-header ${className || ''}`} ref={header}>
			<MobileNavBar
				onClickMenu={onClickMenu}
				onClickSearch={onClickSearch}
			/>
			<Masthead text="A NSW Government website" />
			{!bannerHidden && <BetaSiteBanner />}
			{open && (
				<>
					<MobileNavBarMenu
						currentHeading={currentHeading}
						sections={sections}
						autoFocusSearchBar={autoFocusSearchBar}
						onClick={onClickLink}
						onSearchSubmit={onSearch}
						onBack={onBack}
					/>
					<div
						className="mobile-header__backdrop"
						role="button"
						onClick={onClickMenu}
						tabIndex={0}
						onKeyDown={onClickMenu}
					/>
				</>
			)}
		</div>
	)
}

export type MobileHeaderProps = Pick<
	PureMobileHeaderProps,
	'onSearch' | 'className'
>

/**
 * Site Mobile header.
 * @param props
 * @constructor
 */
const MobileHeader = (props: HeaderProps) => {
	const { onSearch, className, mappings } = props
	// const history = useHistory()
	// TODO: fix
	// const destinations = useNavGroups()
	// const destinations = []

	const destinations: NavGroup[] = get(
		props,
		'data.config.item.elements.main_menu.linkedItems[0].elements.actions.linkedItems',
		[],
	).map((item) => createNavItem(item, mappings))

	// console.log(navItems)

	const [open, setOpen] = useState(false)
	const [group, setGroup] = useState<NavGroup>()
	const [autoFocusSearchBar, setAutoFocusSearchBar] = useState(false)

	const handleToggleMenu = () => {
		setOpen(!open)
		setGroup(undefined)
		setAutoFocusSearchBar(false)
	}

	const handleOpenSearch = () => {
		setOpen(true)
		setGroup(undefined)
		setAutoFocusSearchBar(true)
	}

	const handleBack = () => {
		setGroup(undefined)
	}

	const handleLinkClick = (link: UrlLinkWithChildrenFlag) => {
		if (link.hasChildren) {
			const destGroup = destinations.find((g) => g.url === link.url)
			setGroup(destGroup)
		} else {
			handleToggleMenu()
			// TODO: fix
			// history.push(link.url)
		}
	}

	let sections: MobileNavBarMenuProps['sections']

	if (group) {
		// TODO: fix
		// sections = group.subNav ?? []
		sections = []
	} else {
		sections = [
			{
				label: '',
				links: destinations.map((d) => ({
					title: d.text,
					url: d.url,
					icon: d.icon,
					hasChildren: !!d.subNav?.length,
				})),
			},
		]
	}

	return (
		<PureMobileHeader
			open={open}
			// TODO: Fix
			// currentHeading={group?.label}
			currentHeading={''}
			// TODO: Fix
			// sections={sections}
			sections={[]}
			autoFocusSearchBar={autoFocusSearchBar}
			onClickMenu={handleToggleMenu}
			onClickSearch={handleOpenSearch}
			onBack={handleBack}
			onSearch={onSearch}
			onClickLink={handleLinkClick}
			className={className}
		/>
	)
}

export default MobileHeader
