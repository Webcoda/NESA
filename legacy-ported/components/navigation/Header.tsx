import { Masthead } from '@/lib/nsw-ds-react/src/component/header/masthead';
import { Grid } from '@material-ui/core';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
// import PATHS from '../../constants/pathConstants'
// import { UrlLink } from '../../utilities/frontendTypes'
// import BetaSiteBanner from '../base/BetaSiteBanner'
import get from "lodash.get";
// import { Link, useHistory } from 'react-router-dom'
import Link from "next/link";
import React, { useRef, useState } from 'react';
import NavBar from './NavBar';

export interface HeaderProps {
	/**
	 * A list of urls to display as the breadcrumb links
	 */
	// TODO: fix breadcrumbs?: UrlLink[]
	breadcrumbs?: any

	/**
	 * Callback fired on Download view button pressed. If this is not present the button is hidden.
	 */
	onDownload?: () => void

	/**
	 * Callback fired when search is submitted, either via pressing return or clicking the magnifying
	 * glass icon
	 * @param text the text being searched
	 */
	onSearch?: (text: string) => void

	/**
	 * Classname prop, forwarded to root element
	 */
	className?: string
}

const headers = [
	{ label: 'First Name', key: 'firstname' },
	{ label: 'Last Name', key: 'lastname' },
	{ label: 'Email', key: 'email' },
]

const data = [
	{ firstname: 'Ahmed', lastname: 'Tomi', email: 'ah@smthing.co.com' },
	{ firstname: 'Raed', lastname: 'Labes', email: 'rl@smthing.co.com' },
	{ firstname: 'Yezzi', lastname: 'Min l3b', email: 'ymin@cocococo.com' },
]

/**
 * Site main header
 * @param props
 * @constructor
 */
const Header = (props: HeaderProps): JSX.Element => {
	const { breadcrumbs, onDownload, onSearch, className } = props

	// const history = useHistory()

	const [search, setSearch] = useState(false)
	const [popUp, setPopUp] = useState(false)
	const pdfContentRef = useRef<HTMLDivElement>(null)

	const handleSearchOpen = (status: boolean) => {
		setSearch(status)
	}

	const handleChangeUserType = () => {
		// history.push(PATHS.HOME)
	}

	const handleTextSize = () => {
		// console.log('handleTextSize');
	}

	const handleDownloadView = () => {
		setPopUp(true)
		if (onDownload) {
			onDownload()
		}
	}

	const handleDownloadDoc = () => {
		// TODO
		// console.log('Implement doc once finished from Custom view');
	}

	const handleDownloadPDF = () => {
		// TODO
		// console.log('Implement PDF once finished from Custom view');
	}

	const createNavItem = (item, parentSlug) => {
		const slug = parentSlug + '/' + item.elements.navigation_item?.linkedItems?.[0].elements.slug.value || ''
		const subNav = item.elements?.actions?.linkedItems?.map((_item) => createNavItem(_item, slug))

		return {
			description: '',
			id: item.system.id,
			subNav,
			text: item.elements.label.value,
			url: `${slug}`,
		}
	}

	const navItems = get(
		props,
		'data.config.item.elements.main_menu.linkedItems[0].elements.actions.linkedItems',
		[],
	).map((item) => createNavItem(item, ''))

	return (
		<div className={`header ${className || ''}`}>
			<Masthead text="A NSW Government website" />
			{/* <BetaSiteBanner /> */}
			<div className="header__body nsw-container">
				<NavBar
					navItems={navItems}
					className="header__navbar"
					search={search}
					onSearchOpen={() => handleSearchOpen(true)}
					hideSearchBar={() => handleSearchOpen(false)}
					onSearchSubmit={onSearch}
				/>
				<Grid container item justifyContent="space-between" alignItems="center">
					<div className="header__breadcrumbs">
						{breadcrumbs &&
							breadcrumbs.length > 0 &&
							breadcrumbs.map((bc) => (
								<Link href="#" key={bc.url}>
									<a className="header__breadcrumb-link">
									</a>
								</Link>
							))}
					</div>
					<div className="header__options">
						{/* TODO: Enable after MVP */}
						{/* <Link className="header__view-text" to={PATHS.HOME}>
              Teacher view
            </Link>
            <IconButton className="header__change-user-icon" onClick={handleChangeUserType}>
              <img src={ChangeUser} alt="Change User icon" />
            </IconButton> */}
						{/* <button */}
						{/*  type="button" */}
						{/*  onClick={handleTextSize} */}
						{/*  className="header__font-size button
            button--no-min-width nsw-button nsw-button--primary" */}
						{/* > */}
						{/*  Aa */}
						{/* </button> */}
						{onDownload && (
							<button
								type="button"
								onClick={handleDownloadView}
								className="header__download-view button button--no-min-width nsw-button nsw-button--primary header__option"
							>
								Download view
								<span className="header__download-view-icon">
									<CloudDownloadIcon />
								</span>
							</button>
						)}
					</div>
				</Grid>
			</div>
		</div>
	)
}

export default Header
