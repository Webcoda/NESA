import React, { useRef, useState } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import StageSelectOverlay from './StageSelectOverlay'
import { ITaxonomyTerms } from '@kentico/kontent-delivery'
// import useFocusTabIndex from '../../utilities/hooks/useFocusTabIndex'

export interface SyllabusStagesHeaderProps {
	/**
	 * Title
	 */
	title: string

	/**
	 * List of selected stages, both primary and secondary
	 */
	selectedStages: string[]
	/**
	 * Learning area
	 */
	area: string
	/**
	 * Whether it is main header
	 */
	isMainHeader?: boolean

	/**
	 * All Stage Categories
	 */
	stageGroups: ITaxonomyTerms[]

	/**
	 * All Stages Categories
	 */
	stages: ITaxonomyTerms[]

	/**
	 * Fire when stages header popover confirm button clicked
	 */
	onStagesHeaderConfirm: (ids: string[]) => void
}

const SyllabusStagesHeader = (
	props: SyllabusStagesHeaderProps,
): JSX.Element => {
	const {
		title,
		selectedStages,
		area,
		isMainHeader,
		stageGroups,
		stages,
		onStagesHeaderConfirm,
	} = props

	const stageHeaderButtonRef = useRef<HTMLButtonElement>(null)

	// stages
	const [displayStageModal, setDisplayStageModal] = useState(false)
	const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement>()

	// stages
	const handleDisplayStageModal = (
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
		setDisplayStageModal(!displayStageModal)
		setPopoverAnchor(event.currentTarget)
	}

	const handleStageModalConfirm = (selected: string[]) => {
		setDisplayStageModal(false)
		onStagesHeaderConfirm(selected)
	}

	/**
	 * Setting focus to button when popover closed
	 * Not setting focus on first render
	 */
	if (stageHeaderButtonRef) {
		// useFocusTabIndex(displayStageModal, stageHeaderButtonRef.current)
	}

	return (
		<>
			<div className="syllabus-header__title">
				<button
					type="button"
					className="button button--no-padding button--transparent button--no-min-width nsw-button"
					onClick={handleDisplayStageModal}
					ref={stageHeaderButtonRef}
				>
					{isMainHeader ? (
						<h3 className="syllabus-header__main-title">{title}</h3>
					) : (
						<h3>{title}</h3>
					)}
					<ExpandMoreIcon />
				</button>
				{/* TODO: Enable after MVP */}
				{/* <p className="syllabus-header__subtitle">Current Syllabus</p> */}
				<StageSelectOverlay
					title={title}
					stages={stages}
					stageGroups={stageGroups}
					popoverStatus={displayStageModal}
					popoverAnchor={popoverAnchor}
					onConfirm={handleStageModalConfirm}
					onCancel={() => setDisplayStageModal(false)}
					selected={selectedStages}
				/>
			</div>
		</>
	)
}

export default SyllabusStagesHeader
