import React, { useEffect, useRef, useState } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Grid } from '@material-ui/core'
import { TreeElement } from '../custom/treeUtils'
import TreePicker from '../custom/TreePicker'
import CustomPopover from '../base/CustomPopover'
import { arrayToggleMultiple } from '../../utilities/functions'
import setFocusTabIndex from '../../utilities/hooks/useFocusTabIndex'
import { AllKeyLearningAreas } from '../../store/mock/keyLearningAreas'

const learningAreaTree: TreeElement[] = AllKeyLearningAreas.map((kla) => ({
	id: kla.id,
	label: kla.title,
	disabled: !kla.available,
}))

export interface SyllabusLearningAreaHeaderProps {
	/**
	 * Subject tag
	 */
	subjectTag: string
	/**
	 * Subject title
	 */
	subjectTitle: string
	/**
	 * Currently selected learning areas
	 */
	selectedAreas: string[]
	/**
	 * Learning area
	 */
	area?: string
	/**
	 * Fire when Learning area header confirmed
	 */
	onLearningAreaHeaderConfirm: (ids: string[]) => void
}

const SyllabusLearningAreaHeader = (
	props: SyllabusLearningAreaHeaderProps,
): JSX.Element => {
	const {
		subjectTag,
		subjectTitle,
		selectedAreas,
		area,
		onLearningAreaHeaderConfirm,
	} = props

	const [displayLearningAreaModal, setDisplayLearningAreaModal] =
		useState(false)
	const [learningAreas, setLearningAreas] = useState<string[]>(selectedAreas)
	const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement>()
	const syllabusHeaderButtonRef = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		setLearningAreas(selectedAreas)
	}, [selectedAreas])

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setPopoverAnchor(event.currentTarget)

		setDisplayLearningAreaModal(!displayLearningAreaModal)
		setPopoverAnchor(event.currentTarget)
	}

	const handleLearningAreaModalConfirm = () => {
		setDisplayLearningAreaModal(false)
		onLearningAreaHeaderConfirm(learningAreas)
	}

	/**
	 * Setting focus to button when popover closed
	 * Not setting focus on first render
	 */
	if (syllabusHeaderButtonRef) {
		setFocusTabIndex(
			displayLearningAreaModal,
			syllabusHeaderButtonRef.current,
		)
	}

	const handleLearningAreaCheckboxSelect = (ids: string[]) => {
		setLearningAreas(arrayToggleMultiple(learningAreas, ids))
	}

	return (
		<div className="syllabus-header">
			<div className="syllabus-header__body">
				<Grid container item sm={12} alignItems="center">
					<div className="syllabus-header__tag">
						<h2>{subjectTag}</h2>
					</div>
					<div className="syllabus-header__titles">
						<button
							type="button"
							className="button button--no-padding button--black-text button--transparent nsw-button"
							onClick={handleClick}
							ref={syllabusHeaderButtonRef}
						>
							<h3 className="syllabus-header__main-title">
								{subjectTitle}
							</h3>
							<ExpandMoreIcon />
						</button>
					</div>
				</Grid>
			</div>
			<CustomPopover
				title={subjectTitle}
				popoverStatus={displayLearningAreaModal}
				popoverAnchor={popoverAnchor}
				onConfirm={handleLearningAreaModalConfirm}
				onCancel={() => setDisplayLearningAreaModal(false)}
			>
				<Grid className="syllabus-header-dialog">
					<div className="syllabus-header-dialog__tree-picker-wrapper">
						<TreePicker
							rootElements={learningAreaTree}
							selected={learningAreas}
							onChange={handleLearningAreaCheckboxSelect}
						/>
					</div>
				</Grid>
			</CustomPopover>
		</div>
	)
}

export default SyllabusLearningAreaHeader
