import { KontentCurriculumResult, Mapping } from '@/types'
import { Button } from '@material-ui/core'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
// import { useHistory } from 'react-router-dom'
import { detect } from 'detect-browser'
// import { frontendPages } from '../utilities/hooks/useNavGroups'
// import CustomModal from '../components/base/CustomModal'
import { CollectionWeblink } from '@/models/collection_weblink'
import { UiMenu } from '@/models/ui_menu'
import { Weblinkext } from '@/models/weblinkext'
import { Weblinkint } from '@/models/weblinkint'
import { IContentItem } from '@kentico/kontent-delivery'
import dynamic from 'next/dynamic'
import { ReactNode, useEffect, useState } from 'react'
import Header, { HeaderProps } from '../components/navigation/Header'
import MobileHeader from '../components/navigation/MobileHeader'
import NavFooter from '../components/navigation/NavFooter'
import SiteFooter from '../components/navigation/SiteFooter'
import { Masthead } from '@/lib/nsw-ds-react/src/component/header/masthead'

export interface NavPageProps
	extends KontentCurriculumResult<IContentItem>,
		Omit<HeaderProps, 'onSearch'> {
	children?: ReactNode
	mappings: Mapping[]
}

const ReactJson = dynamic(() => import('react-json-view'), {
	ssr: false,
}) as any

/**
 * Basic page container with navigation functionality. Includes a header with primary links,
 * a footer with secondary links and a breadcrumb showing current page hierarchy
 * @param props
 * @constructor
 */
const NavPage = (props: NavPageProps) => {
	const { children, className, ...headerProps } = props
	const [hidden, setHidden] = useState(true)
	const [isIE, setIsIE] = useState(false)
	const browser = detect()

	useEffect(() => {
		// handle the case where we don't detect the browser
		if (browser && browser.name === 'ie') {
			const browserPopupConfirmed = localStorage.getItem(
				'browserPopupConfirmed',
			)
			if (!browserPopupConfirmed) {
				setIsIE(true)
			}
		}
	}, [])

	// const destinations = frontendPages()
	// const currentPath = useHistory().location.pathname

	// get page title and desc based on the current path
	// destinations.forEach((e) => {
	// 	if (e.url === currentPath) {
	// 		if (e.pageTitle) page.pageTitle = e.pageTitle
	// 		if (e.pageDesc) page.pageDesc = e.pageDesc
	// 	} else if (e.sections) {
	// 		e.sections.forEach(
	// 			(sec) =>
	// 				sec.links &&
	// 				sec.links.forEach((link) => {
	// 					if (link.url === currentPath) {
	// 						if (link.pageTitle) page.pageTitle = link.pageTitle
	// 						if (link.pageDesc) page.pageDesc = link.pageDesc
	// 					}
	// 				}),
	// 		)
	// 	}
	// })

	const handleSearchSubmit = (text: string) => {
		// eslint-disable-next-line no-alert
		alert(text)
	}

	const handleScroll = () => {
		// Show scroll to top button only when not at the top
		const scroll = window.pageYOffset

		if (scroll) {
			setHidden(false)
		} else {
			setHidden(true)
		}
	}

	const handleScrollToTop = () => {
		window.scrollTo(0, 0)
	}

	useEffect(() => {
		// Detect scroll up/down
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	})

	const closeIEModal = () => {
		localStorage.setItem('browserPopupConfirmed', JSON.stringify(true))
		setIsIE(false)
	}

	return (
		<div className="nav-page">
			{props.preview && (
				<div className="sticky top-0 text-right bg-black">
					<div className="flex items-center justify-between nsw-container">
						<div className="site-footer__link font-bold">
							Preview mode
						</div>
						<a
							href="/api/exit-preview"
							className="site-footer__link font-bold"
						>
							Exit preview
						</a>
					</div>
				</div>
			)}
			{!hidden && (
				<Button
					onClick={handleScrollToTop}
					className="nav-page__scrollToTop"
					variant="contained"
					aria-label="Scroll to top"
				>
					<ArrowDropUpIcon />
				</Button>
			)}
			<MobileHeader
				className="nav-page__mobile-header"
				onSearch={handleSearchSubmit}
				{...headerProps}
			/>
			<Header
				className="nav-page__main-header"
				onSearch={handleSearchSubmit}
				{...headerProps}
			/>
			<main
				className={`nav-page__content ${className || ''} nsw-container`}
			>
				<ReactJson collapsed src={props} />
				{children}
			</main>
			<NavFooter {...props} />
			<SiteFooter
				data-kontent-item-id={props.data.config.item.system.id}
				mappings={props.mappings}
				acknowledge={
					props.data.config.item.elements.acknowledgement.value
				}
				copyrightLink={
					props.data.config.item.elements.copyright_link
						.linkedItems[0] as Weblinkext | Weblinkint | UiMenu
				}
				menu={
					props.data.config.item.elements.secondary_links
						.linkedItems as CollectionWeblink[]
				}
				kontentItemIdMenu={
					props.data.config.item.elements.secondary_links
						.linkedItems[0]?.system.id
				}
			/>

			{/* {isIE && (
				<CustomModal
					title="Internet Explorer 11"
					modalStatus={isIE}
					hideCancelButton
					handleConfirm={() => closeIEModal()}
				>
					<Grid container justifyContent="center" direction="column" className="custom-view__buttons">
						<p>
							The NSW Government considers Internet Explorer 11 a legacy browser. The best effort has been
							made to ensure people using <span className="bold"> Internet Explorer 11 </span>
							benefit from as much functionality as possible.
							<br />
							If you experience issues, please consider &nbsp;
							<span>
								<a
									href="https://www.digital.nsw.gov.au/digital-service-toolkit/design-system/getting-started/browser-and-device-compatibility"
									aria-label="using a more recent browser"
									target="_blank"
									rel="noreferrer"
								>
									using a more recent browser.
								</a>
							</span>
						</p>
					</Grid>
				</CustomModal>
			)} */}
		</div>
	)
}

export default NavPage
