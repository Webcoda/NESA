import SanitisedHTMLContainer from '@/components/SanitisedHTMLContainer'
import { Button, Grid } from '@material-ui/core'
import {
	ChevronLeft,
	ChevronRight,
	LinkedIn,
	Twitter,
	YouTube,
} from '@material-ui/icons'
import React, { Fragment } from 'react'
import Flickr from '../../assets/images/flickr.svg'
import { UrlLinkWithChildrenFlag } from '../../utilities/frontendTypes'
import { SearchBarProps } from '../base/SearchBar'

export interface MobileNavBarMenuProps {
	sections: {
		label: string
		links: UrlLinkWithChildrenFlag[]
	}[]
	currentHeading?: string
	autoFocusSearchBar?: SearchBarProps['autoFocus']
	onBack?: () => void
	onClick?: (link: UrlLinkWithChildrenFlag) => void
	onSearchSubmit?: (text: string) => void
}

const MobileNavBarMenu = (props: MobileNavBarMenuProps): JSX.Element => {
	const {
		sections,
		currentHeading,
		autoFocusSearchBar,
		onBack,
		onClick,
		onSearchSubmit,
	} = props

	// TODO: fix
	// const history = useHistory()

	const handleLinkClick = (link: UrlLinkWithChildrenFlag) => () => {
		if (onClick) {
			onClick(link)
		}
	}

	const handleChangeUserType = () => {
		// TODO: fix
		// history.push(PATHS.ROOT)
	}

	return (
		<div className="mobile-navbar-menu">
			{currentHeading ? (
				<Button
					className="mobile-navbar-menu__section"
					onClick={onBack}
				>
					<ChevronLeft /> {currentHeading}
				</Button>
			) : (
				<></>
				// TODO: Enable after MVP
				// <SearchBar
				//   className="mobile-navbar-menu__section mobile-navbar-menu__search"
				//   onSearch={onSearchSubmit}
				//   autoFocus={autoFocusSearchBar}
				// />
			)}
			{sections.map(({ label, links }) => (
				<Fragment key={label}>
					{/* TODO: Enable after MVP. Remove && label === 'Primary (K–6)' */}
					{sections.length > 1 && label === 'Primary (K–6)' && (
						<div className="mobile-navbar-menu__section mobile-navbar-menu__section-heading">
							{label}
						</div>
					)}
					{links.map((link) => {
						// TODO: Enable after MVP
						if (link.isDisabled) return null
						return (
							<Button
								className={`mobile-navbar-menu__section ${
									link.hasChildren
										? 'mobile-navbar-menu__section--more'
										: ''
								}`}
								onClick={handleLinkClick(link)}
								key={link.url}
							>
								<span className="mobile-navbar-menu__link">
									<SanitisedHTMLContainer>
										{link.title}
									</SanitisedHTMLContainer>
									{link.icon && (
										<span className="mobile-navbar-menu__link-icon">
											{link.icon}
										</span>
									)}
								</span>
								{link.hasChildren && <ChevronRight />}
							</Button>
						)
					})}
				</Fragment>
			))}
			{/* TODO: Enable after MVP */}

			{/* <div className="mobile-navbar-menu__section"> */}
			{/*  <button */}
			{/*    type="button" */}
			{/*    onClick={() => {}} */}
			{/*    className="mobile-navbar-menu__font-size button
      button--no-min-width nsw-button nsw-button--primary" */}
			{/*  > */}
			{/*    Aa */}
			{/*  </button> */}
			{/* </div> */}
			<div className="mobile-navbar-menu__footer">
				{/* TODO: Enable after MVP */}
				{/* <span>
          <Link to={PATHS.ROOT} className="mobile-navbar-menu__view-text">
            Teacher view
          </Link>
          <IconButton className="nav-page__change-user-icon" onClick={handleChangeUserType}>
            <img src={ChangeUser} alt="Change User icon" />
          </IconButton>
        </span> */}
				{/* TODO: Remove after MVP */}
				<Grid
					container
					justifyContent="flex-end"
					className="mobile-navbar-menu__icons"
				>
					{/* TODO: Enable after MVP */}
					{/* <Grid className="mobile-navbar-menu__icons"> */}
					<span>Share</span>
					<a
						href="https://twitter.com/NewsAtNesa"
						aria-label="Twitter"
						target="_blank"
						rel="noreferrer"
						className="no-icon"
					>
						<Twitter />
					</a>
					<a
						href="https://www.linkedin.com/company/nsw-education-standards-authority?trk=top_nav_home"
						aria-label="LinkedIn"
						target="_blank"
						rel="noreferrer"
						className="no-icon"
					>
						<LinkedIn />
					</a>
					<a
						href="https://www.youtube.com/user/BoardOfStudiesNSW"
						aria-label="YouTube"
						target="_blank"
						rel="noreferrer"
						className="no-icon"
					>
						<YouTube />
					</a>
					<a
						href="https://www.flickr.com/photos/128432248@N02/"
						aria-label="Flickr"
						target="_blank"
						rel="noreferrer"
						className="no-icon"
					>
						<img src={Flickr} alt="Flickr logo" />
					</a>
				</Grid>
			</div>
		</div>
	)
}

export default MobileNavBarMenu
