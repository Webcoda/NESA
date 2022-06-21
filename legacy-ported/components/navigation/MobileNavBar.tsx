import { Button, Grid } from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import Link from 'next/link'
import React, { useState } from 'react'

export interface MobileNavBarProps {
	/**
	 * Callback fired when the menu button is clicked
	 */
	onClickMenu?: () => void

	/**
	 * callback fired when the search button is clicked
	 */
	onClickSearch?: () => void
}

/**
 * Floating top menu for mobile
 * @param props
 * @constructor
 */
export const MobileNavBar = (props: MobileNavBarProps): JSX.Element => {
	const { onClickMenu, onClickSearch } = props

	const [isMenuClicked, setIsMenuClicked] = useState(false)

	const handleClickMenu = () => {
		setIsMenuClicked(!isMenuClicked)

		if (onClickMenu) {
			onClickMenu()
		}
	}

	const handleClickSearch = () => {
		setIsMenuClicked(!isMenuClicked)

		if (onClickSearch) {
			onClickSearch()
		}
	}

	return (
		<Grid container className="mobile-navbar">
			<Grid item xs={4}>
				<Button
					className="mobile-navbar__control"
					onClick={handleClickMenu}
				>
					<Menu />
					Menu
				</Button>
			</Grid>
			<Grid container item xs={4} justifyContent="center">
				<Link href="/">
					<a className="mobile-navbar__link">
						<img
							className="mobile-navbar__logo"
							src="/nsw-gov-logo-75-high.svg"
							alt="NSW Government Logo"
						/>
					</a>
				</Link>
			</Grid>
			<Grid container item xs={4} justifyContent="center">
				<Link href="/">
					<a className="mobile-navbar__link">
						<div className="column">
							<h1 className="navbar__title">NSW Curriculum</h1>
							<h2 className="navbar__sub-title">
								NSW Education Standards Authority
							</h2>
						</div>
					</a>
				</Link>
			</Grid>
			<Grid container item xs={4} justifyContent="flex-end">
				{/* TODO: Enable after MVP */}
				{/* { */}
				{/*  !isMenuClicked && */}
				{/*    <Button className="mobile-navbar__control" onClick={handleClickSearch}> */}
				{/*      <Search /> */}
				{/*      Search */}
				{/*    </Button> */}
				{/* } */}
			</Grid>
		</Grid>
	)
}

export default MobileNavBar