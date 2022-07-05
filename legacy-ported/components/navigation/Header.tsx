import { Masthead } from '@/lib/nsw-ds-react/src/component/header/masthead'
import { CommonPageProps } from '@/types'
import { getBreadcrumb, getUrlFromMapping } from '@/utils'
import { Grid } from '@material-ui/core'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
// import PATHS from '../../constants/pathConstants'
// import { UrlLink } from '../../utilities/frontendTypes'
import get from 'lodash.get'
import BetaSiteBanner from '../base/BetaSiteBanner'
// import { Link, useHistory } from 'react-router-dom'
import { NavGroup } from '@/legacy-ported/utilities/hooks/useNavGroups'
import { CollectionWeblink } from '@/models/collection_weblink'
import { UiMenu } from '@/models/ui_menu'
import { flattenCollectionWebLinks } from '@/utils/collectionWebLinks'
import Link from 'next/link'
import { useRef, useState } from 'react'
import NavBar from './NavBar'
import { IContentItem } from '@kentico/kontent-delivery'

export interface HeaderProps extends CommonPageProps<IContentItem> {
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

export const createNavItem = (item: UiMenu, mappings): NavGroup => {
	const url = getUrlFromMapping(mappings, item.elements.item.value[0]) || '/'
	const subNav = item.elements?.subitems?.linkedItems?.map((_item: UiMenu) =>
		createNavItem(_item, mappings),
	)
	return {
		description: '',
		id: item.system.id,
		subNav,
		text: item.elements.title.value,
		url,
	}
}

/**
 * Site main header
 * @param props
 * @constructor
 */
const Header = (props: HeaderProps): JSX.Element => {
	const { breadcrumbs, onDownload, onSearch, className, mappings } = props
	const slug = get(props, 'params.slug', [])
	const _breadcrumbs = (
		breadcrumbs?.length ? breadcrumbs : getBreadcrumb(slug, mappings)
	)?.filter((bc) => !!bc.url)

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

	const initialNavs = flattenCollectionWebLinks(
		props.data.config.item.elements.main_menu
			.linkedItems as CollectionWeblink[],
	)
	const navItems = initialNavs.map((item: UiMenu) =>
		createNavItem(item, mappings),
	)

	return (
		<div className={`header ${className || ''}`}>
			<Masthead text="A NSW Government website" />
			<BetaSiteBanner />
			<div className="header__body nsw-container">
				<NavBar
					mappings={mappings}
					title={props.data.config.item.elements.title.value}
					subtitle={props.data.config.item.elements.descriptor.value}
					navItems={navItems}
					className="header__navbar"
					search={search}
					onSearchOpen={() => handleSearchOpen(true)}
					hideSearchBar={() => handleSearchOpen(false)}
					onSearchSubmit={onSearch}
				/>
				<Grid
					container
					item
					justifyContent="space-between"
					alignItems="center"
				>
					<div className="header__breadcrumbs">
						{_breadcrumbs &&
							_breadcrumbs.filter((bc) => !!bc.url).length > 1 &&
							_breadcrumbs
								.filter((bc) => !!bc.url)
								.map((bc) => (
									<Link href={bc.url} key={bc.url}>
										<a className="header__breadcrumb-link">
											<span className="header__breadcrumb-link-inner">
												{bc.title}
											</span>
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
