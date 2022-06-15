import { Grid } from '@material-ui/core'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { Sections } from '../../constants/pathConstants'

export default function BetaSiteBanner() {
	const location = useRouter()
	const currentLocation = location.pathname
	const homeURL = Sections.HOME.url

	const isHomePage = currentLocation === homeURL

	// keep the banner state in local storage to apply it to other pages
	const [isMinimised, setIsMinimised] = useState(true)

	const handleMinimiseMaximise = () => {
		setIsMinimised(!isMinimised)
		window.localStorage.setItem('bannerState', JSON.stringify(!isMinimised))
	}

	useEffect(() => {
		const bannerState = window.localStorage.getItem('bannerState')
		setIsMinimised(bannerState ? JSON.parse(bannerState) : !isHomePage)
	}, [])

	const renderMaximum = (
		<div className="nsw-container beta-site-banner__container">
			<p className="beta-site-banner__beta-website-text">
				This is the first release of the Digital Curriculum, features
				will be developed and added. NESA is encouraging feedback to
				improve functionality and further refine the Digital Curriculum
				platform.
			</p>
			<Grid container direction="row">
				<div className="beta-site-banner__button-container beta-site-banner__button-container--maximize">
					<a
						href="mailto:curriculum@nesa.nsw.edu.au?subject=Feedback on NSW Curriculum website"
						target="_blank"
						className="button nsw-button nsw-button--secondary beta-site-banner__button"
						rel="noreferrer"
					>
						Give us your feedback
					</a>
				</div>
				<div className="beta-site-banner__button-container beta-site-banner__button-container--maximize">
					<a
						href="https://www.educationstandards.nsw.edu.au/wps/portal/nesa/home"
						target="_blank"
						className="button nsw-button nsw-button--primary beta-site-banner__button no-icon"
						rel="noreferrer"
					>
						Go to the NESA website
					</a>
				</div>
				<Grid
					container
					direction="column"
					alignItems="flex-end"
					className="beta-site-banner__maximize-minimize"
				>
					<div
						onKeyPress={handleMinimiseMaximise}
						role="button"
						tabIndex={0}
						onClick={handleMinimiseMaximise}
						className="beta-site-banner__minimize-link button--font-weight-100 button--font-size-14"
					>
						<p>{isMinimised ? 'Maximise' : 'Minimise'}</p>
					</div>
				</Grid>
			</Grid>
		</div>
	)

	const renderMinimise = (
		<div className="nsw-container beta-site-banner__container beta-site-banner__container--minimize">
			<Grid
				container
				spacing={2}
				justifyContent="space-between"
				alignItems="center"
				direction="row"
				wrap="nowrap"
			>
				<Grid
					item
					container
					direction="row"
					className="beta-site-banner__text-container"
				>
					<p className="beta-site-banner__beta-website-text">
						Welcome to the first release of the Digital Curriculum
					</p>
				</Grid>
				<Grid
					item
					container
					direction="row"
					alignItems="center"
					wrap="nowrap"
					className="beta-site-banner__item-container"
				>
					{!isMobile && (
						<>
							<div className="beta-site-banner__button-container beta-site-banner__button-container--first">
								<a
									href="mailto:curriculum@nesa.nsw.edu.au?subject=Feedback on NSW Curriculum website"
									target="_blank"
									className="button nsw-button nsw-button--secondary beta-site-banner__button"
									rel="noreferrer"
								>
									Give us your feedback
								</a>
							</div>
							<div className="beta-site-banner__button-container">
								<a
									href="https://www.educationstandards.nsw.edu.au/wps/portal/nesa/home"
									target="_blank"
									className="button nsw-button nsw-button--primary beta-site-banner__button no-icon"
									rel="noreferrer"
								>
									Go to the NESA website
								</a>
							</div>
						</>
					)}
					<div
						onKeyPress={handleMinimiseMaximise}
						role="button"
						tabIndex={0}
						onClick={handleMinimiseMaximise}
						className="beta-site-banner__minimize-link button--font-weight-100 button--font-size-14"
					>
						<p>{isMinimised ? 'Maximise' : 'Minimise'}</p>
					</div>
				</Grid>
			</Grid>
		</div>
	)

	return (
		<Grid className="beta-site-banner">
			{isMinimised ? renderMinimise : renderMaximum}
		</Grid>
	)
}
