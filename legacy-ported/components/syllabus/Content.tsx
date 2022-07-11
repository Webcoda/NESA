import { Contentgroup } from '@/models/contentgroup'
import { Focusarea } from '@/models/focusarea'
import { Outcome } from '@/models/outcome'
import { Teachingadvice } from '@/models/teachingadvice'
import { Grid, Popover } from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'
// import { HashLink } from 'react-router-hash-link'
import {
	isChrome,
	isIOS,
	isMobile,
	isSafari,
	isTablet,
} from 'react-device-detect'
import SYLLABUS from '../../constants/syllabusConstants'
// import TagPicker from '../custom/TagPicker'
// import DownloadList from './DownloadList'
// import CustomModal from '../base/CustomModal'
// import CustomPopover from '../base/CustomPopover'
import { arrayToggleMultiple } from '../../utilities/functions'
// import { Stages } from '../../store/mock/stages'
import { Accesscontentgroup } from '@/models/accesscontentgroup'
import { AssetWithRawElements, Mapping } from '@/types'
import {
	IContentItemsContainer,
	ITaxonomyTerms,
} from '@kentico/kontent-delivery'
import useFocusTabIndex from '../../utilities/hooks/useFocusTabIndex'
import CustomPopover from '../base/CustomPopover'
import OutcomeCard from '../card/OutcomeCard'
import OutcomeDetailCard from '../card/OutcomeDetailCard'
import TeachingSupportCard from '../card/TeachingSupportCard'
import TagPicker from '../custom/TagPicker'
import DownloadList from './DownloadList'

export const tagList = [
	{
		id: 'learning-across-the-curriculum',
		name: 'Digital Literacy',
		description:
			'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
	},
	{
		id: 'national-literacy-learning-progression',
		name: 'Personal and social capability',
		description:
			'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
	},
	{
		id: 'national-numeracy-learning-progression',
		name: 'Civics and citizenship',
		description:
			'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
	},
]

export const termList = [
	{
		name: '2-part spoken instructions',
		description: 'Description of term 2',
	},
	{
		name: '3-part spoken instructions',
		description: 'Description of term 3',
	},
	{
		name: '4-part spoken instructions',
		description: 'Description of term 4',
	},
]

export interface ContentOrganizerProps {
	/**
	 * Default offsetTop to move card detail along with card outcome
	 */
	defaultOffsetTop: number

	/**
	 * All stages
	 */
	stages: ITaxonomyTerms[]

	/**
	 * Stage id
	 */
	stageId?: string

	/**
	 * Support element ID
	 */
	supportElementId: string

	/**
	 * Syllabus content
	 */
	content?: Focusarea[]

	/**
	 * Files content
	 */
	files?: AssetWithRawElements[]

	/**
	 * Initial state config
	 */
	initialState?: {
		accessPoints?: boolean
		teachingSupport?: boolean
		examples?: boolean
		tags?: string[]
		contentOrganiser?: string
	}

	mappings: Mapping[]
	linkedItems: IContentItemsContainer
}

const Content = (props: ContentOrganizerProps): JSX.Element => {
	const {
		defaultOffsetTop,
		stageId,
		supportElementId,
		content,
		initialState,
		files,
		stages,
		mappings,
		linkedItems,
	} = props

	const mainBodyRef = useRef<HTMLDivElement>(null)

	const [currentContentOrganiser, setCurrentContentOrganiser] =
		useState<Focusarea>()
	const [initialContentSelect, setInitialContentSelect] = useState(false)
	const activeContentBody = useRef<HTMLDivElement>(null)

	const [showAccessPoints, setShowAccessPoints] = useState(
		initialState?.accessPoints ?? false,
	)
	const [showTeachingSupport, setShowTeachingSupport] = useState(
		initialState?.teachingSupport ?? false,
	)
	const [initialTeachingScroll, setInitialTeachingScroll] = useState(false)
	const [showExamples, setShowExamples] = useState(
		initialState?.examples ?? false,
	)
	const [fixBanner, setFixBanner] = useState(false)
	const [lastScroll, setLastScroll] = useState(0)
	const [isMenuHidden, setIsMenuHidden] = useState(false)

	// for outcome card
	const [isOutcomeCardClicked, setIsOutcomeCardClick] = useState(false)

	// for tags
	const [displayModal, setDisplayModal] = useState(false)
	const [tagTitle, setTagTitle] = useState<string>('')
	const [tagDescription, setTagDescription] = useState('')
	const [hoverPopover, setHoverPopover] = useState(false)
	const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement>()
	const [tagIds, setTagIds] = useState(initialState?.tags)
	const tagsButtonRef = useRef<HTMLButtonElement>(null)

	// for terms
	const [showTerm, setShowTerm] = useState(false)
	const [termDescription, setTermDescription] = useState('')
	const [termPopoverAnchor, setTermPopoverAnchor] = useState<Element>()

	// card detail
	const [offsetTop, setOffsetTop] = useState(0)

	const isEarlyStage1 = stageId === 'early_stage_1'

	const bodyRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		// Ensure current selection is kept in sync with changing content list.

		let organiser = currentContentOrganiser
		if (organiser && !content?.includes(organiser)) {
			// Clear selected content
			organiser = undefined
			setCurrentContentOrganiser(organiser)
			setOffsetTop(0)
		}

		if (content?.length && !organiser) {
			if (!initialContentSelect && initialState?.contentOrganiser) {
				// If this is the initial load, check initialState for content organiser
				organiser = content.find((c) => {
					return (
						c.elements.title.value === initialState.contentOrganiser
					)
				})
			} else {
				// Set selected to first available content
				;[organiser] = content
			}
			setCurrentContentOrganiser(organiser)
			setInitialContentSelect(true)
			setOffsetTop(0)
		}
	}, [content, currentContentOrganiser, initialContentSelect])

	/**
	 * Fixing scroll to for chrome and safari on mobile
	 */
	const fixScroll = (htmlElement: HTMLElement) => {
		if (isIOS && isSafari) {
			window.scrollBy(0, -50)
		} else if (isIOS && isChrome) {
			window.scrollBy(0, -50)
		} else {
			setTimeout(() => {
				const position = htmlElement.getBoundingClientRect().top
				window.scrollBy(0, position - 50)
			}, 500)
		}
	}

	const handleFilterButton = (
		event: React.MouseEvent<HTMLButtonElement>,
		filter: string,
	) => {
		if (filter === SYLLABUS.FILTER.ACCESS_POINTS) {
			setShowAccessPoints(!showAccessPoints)
		} else if (filter === SYLLABUS.FILTER.TEACHING_SUPPORT) {
			setShowTeachingSupport(!showTeachingSupport)
		} else if (filter === SYLLABUS.FILTER.TAGS) {
			if (!tagIds) {
				setPopoverAnchor(event.currentTarget)
				setHoverPopover(true)
			} else {
				setTagIds(undefined)
			}
		} else if (filter === SYLLABUS.FILTER.EXAMPLES) {
			setShowExamples(!showExamples)
		}
	}

	const scrollToSupportElement = () => {
		let supportId = `${stageId}-${supportElementId}-support-${
			currentContentOrganiser!.system.id
		}`

		// DC-353 Prefix the id for mobile so the id's are unique
		if (window.innerWidth < 959) {
			// 959px is Mui sm upper bound, and the point at which we switch to mobile layout
			supportId = `m_${supportId}`
		}
		const supportElement = document.getElementById(supportId)

		if (supportElement) {
			supportElement.scrollIntoView()
			fixScroll(supportElement)
		}
	}

	/**
	 * Scrolling to supporting element after supporting element is rendered
	 */
	useEffect(() => {
		if (showTeachingSupport && currentContentOrganiser) {
			scrollToSupportElement()
		}
	}, [showTeachingSupport])

	useEffect(() => {
		// Scroll to support element on initial load
		if (
			initialState?.teachingSupport &&
			currentContentOrganiser &&
			!initialTeachingScroll
		) {
			setInitialTeachingScroll(true)
			scrollToSupportElement()
		}
	}, [
		initialState?.teachingSupport,
		currentContentOrganiser,
		initialTeachingScroll,
	])

	const handleOnClick = (
		event:
			| React.MouseEvent<HTMLDivElement, MouseEvent>
			| React.KeyboardEvent<HTMLDivElement>,
		organiser: Focusarea,
	) => {
		const cardOffsetTop = event.currentTarget.offsetTop - defaultOffsetTop
		setOffsetTop(cardOffsetTop)

		// console.log({
		//   offset: event.currentTarget.offsetTop,
		// });

		// Adjust the scroll position to keep the newly selected item at the same point in mobile view
		if (
			activeContentBody.current &&
			currentContentOrganiser &&
			content!.indexOf(organiser) >
				content!.indexOf(currentContentOrganiser)
		) {
			// The height of the previous content
			const height = activeContentBody.current?.clientHeight

			window.scrollBy({ top: -height, behavior: 'auto' })
		}

		setCurrentContentOrganiser(organiser)
		setIsOutcomeCardClick(true)
	}

	/**
	 * For mobile: To scroll to card detail section when outcome card is selected/clicked
	 */
	useEffect(() => {
		if (isMobile && isOutcomeCardClicked) {
			const currentOutcomeCardElement = document.getElementById(
				`${stageId}-card-detail-${currentContentOrganiser}`,
			)

			if (currentOutcomeCardElement) {
				currentOutcomeCardElement.scrollIntoView()
				fixScroll(currentOutcomeCardElement)
			}
		}
	}, [currentContentOrganiser, isOutcomeCardClicked])

	const handleTag = (innerHTMLTag: string) => {
		setTagTitle(innerHTMLTag)

		// TODO: Enable after MVP
		// const currentTagDescriptions = tagList.filter((tag) => tag.name === innerHTMLTag);

		// if (currentTagDescriptions.length > 0) {
		//   const currentTag = currentTagDescriptions[0];
		//   setTagDescription(currentTag.description);
		//   setDisplayModal(true);
		// }
	}

	const handleTerm = (termElement: Element) => {
		const innerHTMLTerm = termElement.innerHTML

		const currentTermDescriptions = termList.filter(
			(term) => term.name === innerHTMLTerm,
		)

		if (currentTermDescriptions.length > 0) {
			const currentTerm = currentTermDescriptions[0]
			setTermDescription(currentTerm.description)
			setTermPopoverAnchor(termElement)
			setShowTerm(true)
		}
	}

	const handleTermMouseLeave = () => {
		setShowTerm(false)
	}

	const scrollWithOffset = (el: HTMLElement) => {
		const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset
		const yOffset = -170 // menu height
		window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' })
	}

	useEffect(() => {
		const handleScroll = () => {
			const scroll = window.pageYOffset
			if (scroll > lastScroll) {
				setIsMenuHidden(true)
			} else {
				setIsMenuHidden(false)
			}
			setLastScroll(scroll)

			// we only want to display the fixed banner while scrolling through the content section.
			const contentBox = mainBodyRef.current?.getBoundingClientRect()
			setFixBanner(
				!!contentBox && contentBox.top <= 0 && contentBox.bottom >= 0,
			)
		}

		// Detect scroll up/down
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	})

	useEffect(() => {
		if (!bodyRef.current) {
			console.error('Tried to add tag click handler with no ref to body.')
			return () => {}
		}
		/*
		 * Getting all the tags elements and adding click event
		 */
		const tags = bodyRef.current.getElementsByClassName('tag')
		const pairs: [Element, () => void][] = []

		for (let i = 0; i < tags.length; i += 1) {
			const currentElement = tags[i]
			const handler = () => handleTag(currentElement.innerHTML)

			currentElement.addEventListener('click', handler)
			pairs.push([currentElement, handler])
		}

		/*
		 * Getting all the term elements and adding mouseover and mouseleave events
		 */
		const terms = bodyRef.current.getElementsByClassName('term')
		const termsMouseOverPairs: [Element, () => void][] = []
		const termsMouseLeavePairs: [Element, () => void][] = []

		for (let i = 0; i < terms.length; i += 1) {
			const termElement = terms[i]
			const termMouseOverHandler = () => handleTerm(termElement)

			termElement.addEventListener('mouseover', termMouseOverHandler)
			termsMouseOverPairs.push([termElement, termMouseOverHandler])

			const termMouseLeaveHandler = () => handleTermMouseLeave()

			termElement.addEventListener('mouseleave', termMouseLeaveHandler)
			termsMouseLeavePairs.push([termElement, termMouseLeaveHandler])
		}

		/*
		 * Cleaning up click, mouseover and mouseleave events
		 */
		return () => {
			pairs.map(([e, h]) => e.removeEventListener('click', h))
			termsMouseOverPairs.map(([e, h]) =>
				e.removeEventListener('mouseover', h),
			)
			termsMouseLeavePairs.map(([e, h]) =>
				e.removeEventListener('mouseleave', h),
			)
		}
	}, [showAccessPoints, showTeachingSupport, tagIds, showExamples])

	const handleTagsChange = (ids: string[]) => {
		setTagIds(arrayToggleMultiple(tagIds ?? [], ids))
	}

	const handleTagPopoverConfirm = () => {
		setHoverPopover(false)
	}

	/**
	 * Set focus to 'Tags' button when tags popover closed
	 * Not setting focus on first render
	 */
	useFocusTabIndex(hoverPopover, tagsButtonRef.current)

	return (
		<div className="content-organizer-container" ref={mainBodyRef}>
			{fixBanner && currentContentOrganiser && (
				<div
					className="fix-banner"
					style={{ top: isMenuHidden ? 0 : '136px' }}
				>
					{/* TODO: hash link */}
					{/* <HashLink
						smooth
						to={`#outcome-card-${currentContentOrganiser.code}`}
						scroll={(el: HTMLElement) => scrollWithOffset(el)}
					>
						{currentContentOrganiser.content_organiser}
					</HashLink> */}
				</div>
			)}
			<Grid className="content-organizer">
				<Grid container spacing={2} className="content-organizer__body">
					<Grid item xs={12} md={6} lg={4}>
						{content?.map((organiser, index) => (
							<div
								key={`outcome-card-${organiser.system.id}-${index}`}
								className="content-organizer__outcome-card-wrapper"
							>
								<span
									id={`outcome-card-${organiser.system.id}`}
								/>
								{/* TODO: Content.tsx - fix OutcomeCard */}
								<OutcomeCard
									title={organiser.elements.title.value}
									code={organiser.elements.outcomes.linkedItems.map(
										(o: Outcome) => o.elements.code.value,
									)}
									outcomes={organiser.elements.outcomes.linkedItems.map(
										(o: Outcome) =>
											o.elements.description.value,
									)}
									selected={
										currentContentOrganiser === organiser
									}
									displayOutcome={false}
									isSelectable
									onClick={(e) => handleOnClick(e, organiser)}
								/>
								{
									// if its mobile we need to display the content after each card
									currentContentOrganiser === organiser && (
										<div
											className="content-organizer__mobile-content"
											id={`${stageId}-card-detail-${organiser.system.id}`}
											ref={activeContentBody}
										>
											{/* TODO: OutcomeDetailCard - access points fix */}
											<OutcomeDetailCard
												title={
													organiser.elements.title
														.value
												}
												groups={
													organiser.elements
														.contentgroups
														.linkedItems as Contentgroup[]
												}
												accessPoints={
													organiser.elements
														.accesspointgroups
														.linkedItems as Accesscontentgroup[]
												}
												showAccessPoints={
													showAccessPoints
												}
												showTags={tagIds}
												showExamples={showExamples}
											/>
											{showTeachingSupport && (
												<Grid
													id={`m_${stageId}-${supportElementId}-support-${organiser.system.id}`}
												>
													{!!organiser.elements
														.teachingadvice.value
														?.length &&
														organiser.elements.teachingadvice.linkedItems.map(
															(
																teachingAdvice: Teachingadvice,
															) => (
																<TeachingSupportCard
																	key={
																		teachingAdvice
																			.system
																			.id
																	}
																	linkedItems={
																		linkedItems
																	}
																	mappings={
																		mappings
																	}
																	content={
																		teachingAdvice
																			.elements
																			.content
																	}
																/>
															),
														)}
													{!!files?.length && (
														<DownloadList
															files={files}
															colour="secondary"
														/>
													)}
												</Grid>
											)}
										</div>
									)
								}
							</div>
						))}
					</Grid>
					<Grid
						item
						xs={12}
						md={6}
						lg={8}
						ref={bodyRef}
						style={{ marginTop: offsetTop }}
						className="content-organizer__desktop-content"
					>
						{/* filter buttons for desktop */}
						<Grid
							container
							className={
								isTablet && fixBanner
									? 'content-organizer__filter-buttons fixed-footer'
									: 'content-organizer__filter-buttons'
							}
							justifyContent="flex-end"
						>
							{isEarlyStage1 && (
								<button
									type="button"
									className={`button button--white-text nsw-button content-organizer__filter-button ${
										showAccessPoints
											? 'button--selected'
											: 'nsw-button--secondary'
									} `}
									onClick={(e) =>
										handleFilterButton(
											e,
											SYLLABUS.FILTER.ACCESS_POINTS,
										)
									}
									tabIndex={0}
								>
									{SYLLABUS.FILTER.ACCESS_POINTS}
								</button>
							)}
							<button
								type="button"
								className={`button button--white-text nsw-button content-organizer__filter-button ${
									showTeachingSupport
										? 'button--selected'
										: 'nsw-button--secondary'
								} `}
								onClick={(e) =>
									handleFilterButton(
										e,
										SYLLABUS.FILTER.TEACHING_SUPPORT,
									)
								}
								tabIndex={0}
							>
								{SYLLABUS.FILTER.TEACHING_SUPPORT}
							</button>
							<button
								type="button"
								ref={tagsButtonRef}
								className={`button button--white-text nsw-button content-organizer__filter-button ${
									tagIds
										? 'button--selected'
										: 'nsw-button--secondary'
								} `}
								onClick={(e) =>
									handleFilterButton(e, SYLLABUS.FILTER.TAGS)
								}
								tabIndex={0}
							>
								{SYLLABUS.FILTER.TAGS}
							</button>
							<button
								type="button"
								className={`button button--white-text nsw-button content-organizer__filter-button ${
									showExamples
										? 'button--selected'
										: 'nsw-button--secondary'
								} `}
								onClick={(e) =>
									handleFilterButton(
										e,
										SYLLABUS.FILTER.EXAMPLES,
									)
								}
								tabIndex={0}
							>
								{SYLLABUS.FILTER.EXAMPLES}
							</button>
						</Grid>
						{
							// on desktop we display the content on the right
							currentContentOrganiser && (
								/* TODO: OutcomeDetailCard fix */
								<OutcomeDetailCard
									title={
										currentContentOrganiser.elements.title
											.value
									}
									groups={
										currentContentOrganiser.elements
											.contentgroups
											.linkedItems as Contentgroup[]
									}
									accessPoints={
										currentContentOrganiser.elements
											.accesspointgroups
											.linkedItems as Accesscontentgroup[]
									}
									showAccessPoints={showAccessPoints}
									showTags={tagIds}
									showExamples={showExamples}
								/>
							)
							// null
						}
						{showTeachingSupport && currentContentOrganiser && (
							<Grid
								id={`${stageId}-${supportElementId}-support-${currentContentOrganiser.system.id}`}
							>
								{
									// TODO: add TeachingSupportCard
									!!currentContentOrganiser.elements
										.teachingadvice.value?.length &&
										// TODO: addTeachingSupportCard
										currentContentOrganiser.elements.teachingadvice.linkedItems.map(
											(
												teachingAdvice: Teachingadvice,
											) => (
												<TeachingSupportCard
													key={
														teachingAdvice.system.id
													}
													mappings={mappings}
													linkedItems={linkedItems}
													content={
														teachingAdvice.elements
															.content
													}
												/>
											),
										)
								}
								{!!files?.length && (
									<DownloadList
										files={files}
										colour="secondary"
									/>
								)}
							</Grid>
						)}
					</Grid>
				</Grid>
				{/* filter buttons for mobile */}
				<Grid className="content-organizer__filter-buttons-mobile fixed-footer">
					<Grid container>
						{isEarlyStage1 && (
							<Grid
								item
								xs={6}
								sm={6}
								className="content-organizer__btn-container"
							>
								<button
									type="button"
									className={`button button--white-text nsw-button button--full-width button__filter-mobile
                  ${
						showAccessPoints
							? 'button--selected'
							: 'nsw-button--secondary'
					}`}
									onClick={(e) =>
										handleFilterButton(
											e,
											SYLLABUS.FILTER.ACCESS_POINTS,
										)
									}
									tabIndex={0}
								>
									{SYLLABUS.FILTER.ACCESS_POINTS}
								</button>
							</Grid>
						)}
						<Grid
							item
							xs={6}
							sm={6}
							className="content-organizer__btn-container"
						>
							<button
								type="button"
								className={`button button--white-text nsw-button button--full-width button__filter-mobile
                ${showExamples ? 'button--selected' : 'nsw-button--secondary'}`}
								onClick={(e) =>
									handleFilterButton(
										e,
										SYLLABUS.FILTER.EXAMPLES,
									)
								}
								tabIndex={0}
							>
								{SYLLABUS.FILTER.EXAMPLES}
							</button>
						</Grid>

						<Grid
							item
							xs={6}
							sm={6}
							md={3}
							className="content-organizer__btn-container"
						>
							<button
								type="button"
								className={`button button--white-text nsw-button button--full-width button__filter-mobile
                ${
					showTeachingSupport
						? 'button--selected'
						: 'nsw-button--secondary'
				}`}
								onClick={(e) =>
									handleFilterButton(
										e,
										SYLLABUS.FILTER.TEACHING_SUPPORT,
									)
								}
								tabIndex={0}
							>
								{SYLLABUS.FILTER.TEACHING_SUPPORT}
							</button>
						</Grid>
						<Grid
							container
							item
							xs={isEarlyStage1 ? 6 : 12}
							sm={6}
							className="content-organizer__btn-container"
						>
							<button
								type="button"
								ref={tagsButtonRef}
								className={`button button--white-text nsw-button button--full-width button__filter-mobile
              ${tagIds ? 'button--selected' : 'nsw-button--secondary'}`}
								onClick={(e) =>
									handleFilterButton(e, SYLLABUS.FILTER.TAGS)
								}
								tabIndex={0}
							>
								{SYLLABUS.FILTER.TAGS}
							</button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			{displayModal &&
				// TODO: add CustomModal
				// <CustomModal
				// 	title={tagTitle}
				// 	modalStatus={displayModal}
				// 	handleConfirm={() => setDisplayModal(false)}
				// 	hideCancelButton
				// >
				// 	<div>{tagDescription}</div>
				// </CustomModal>
				null}
			{/* TODO: add custom popover */}
			<CustomPopover
				title="Select tags to view"
				popoverStatus={hoverPopover}
				popoverAnchor={popoverAnchor}
				onConfirm={handleTagPopoverConfirm}
				onCancel={() => setHoverPopover(false)}
			>
				<div className="content-organizer__tags-overlay">
					<TagPicker
						selected={tagIds ?? []}
						onChange={handleTagsChange}
					/>
				</div>
			</CustomPopover>
			<Popover
				className="navbar__menu-container"
				open={showTerm}
				anchorEl={termPopoverAnchor}
				anchorOrigin={{
					vertical: 'center',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'center',
					horizontal: 'left',
				}}
				onClose={() => setShowTerm(false)}
				disableRestoreFocus
				PaperProps={{
					onMouseEnter: () => setShowTerm(false),
					onMouseLeave: () => setShowTerm(false),
				}}
			>
				<Grid className="term-info">
					<p className="term-info__detail">
						<span className="term-title">Term:</span>{' '}
						{termDescription}
					</p>
				</Grid>
			</Popover>
		</div>
	)
}

export default Content
