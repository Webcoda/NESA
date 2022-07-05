import React from 'react'
import { Grid } from '@material-ui/core'
import SyllabusLearningAreaHeader from './SyllabusLearningAreaHeader'
import SyllabusStagesHeader from './SyllabusStagesHeader'
import { Stage } from '@/models/stage'
import { StageGroup } from '@/models/stage_group'

export interface LearningAreaHeaderProps {
	/**
	 * Subject tag
	 */
	subjectTag: string
	/**
	 * Subject title
	 */
	subjectTitle: string
	/**
	 * Subject tag
	 */
	stageName: string
	/**
	 * Callback fired when version history is clicked
	 */
	onVersionHistoryClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
	/**
	 * Callback fired when edit view is clicked
	 */
	onEditViewClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
	/**
	 * Currently selected learning areas
	 */
	selectedAreas: string[]
	/**
	 * List of selected stages, both primary and secondary
	 */
	selectedStages: string[]

	stageGroups: StageGroup[]

	/**
	 * Learning area
	 */
	area: string
	/**
	 * Fire when Learning Area popover confirm button clicked
	 */
	onLearningAreaHeaderConfirm: (ids: string[]) => void
	/**
	 * Fire when Stages Header popover confirm button clicked
	 */
	onStagesHeaderConfirm: (ids: string[]) => void
}

/**
 * Subject Header
 * @param props
 * @constructor
 */
const LearningAreaHeader = (props: LearningAreaHeaderProps): JSX.Element => {
	const {
		subjectTag,
		subjectTitle,
		stageName,
		onVersionHistoryClick,
		onEditViewClick,
		selectedAreas,
		selectedStages,
		stageGroups,
		area,
		onLearningAreaHeaderConfirm,
		onStagesHeaderConfirm,
	} = props

	return (
		<div>
			<SyllabusLearningAreaHeader
				subjectTag={subjectTag}
				subjectTitle={subjectTitle}
				selectedAreas={selectedAreas}
				area={area}
				onLearningAreaHeaderConfirm={onLearningAreaHeaderConfirm}
			/>
			<div className="syllabus-header__select-wrapper">
				<div className="syllabus-header__select">
					<SyllabusStagesHeader
						title={stageName}
						selectedStages={selectedStages}
						stageGroups={stageGroups}
						area={area}
						onStagesHeaderConfirm={onStagesHeaderConfirm}
					/>
					<div className="syllabus-header__select-right">
						{/* TODO: Enable after MVP */}
						{/* <button
              type="button"
              onClick={onVersionHistoryClick}
              className="syllabus-header__version-history button--font-size-14 button nsw-button"
            >
              <ErrorIcon
                className="syllabus-header__version-history-icon"
              />
              Version History/Change Log
            </button> */}
						<button
							type="button"
							onClick={onEditViewClick}
							className="syllabus-header__edit-link button button--font-weight-100 button--font-size-14 nsw-button"
						>
							Edit view
						</button>
					</div>
				</div>
				{/* for mobile */}
				<div className="syllabus-header__select-mobile">
					<Grid
						container
						item
						xs={12}
						justifyContent="center"
						direction="column"
						alignItems="center"
					>
						<SyllabusStagesHeader
							title={stageName}
							selectedStages={selectedStages}
							stageGroups={stageGroups}
							area={area}
							onStagesHeaderConfirm={onStagesHeaderConfirm}
						/>
					</Grid>
					<Grid
						container
						item
						xs={12}
						className="syllabus-header__select-right"
					>
						{/* TODO: Enable after MVP */}
						{/* <Grid item xs={8}>
              <button
                type="button"
                onClick={onVersionHistoryClick}
                className="syllabus-header__version-history
                  button button--no-padding
                  button--font-size-14 nsw-button"
              >
                <ErrorIcon className="syllabus-header__version-history-icon" />
                Version History/Change Log
              </button>
            </Grid> */}
						{/* TODO: Enable after MVP */}
						{/* <Grid container item xs={4} justifyContent="flex-end"> */}
						<Grid container item xs={12} justifyContent="center">
							<button
								type="button"
								onClick={onEditViewClick}
								className="syllabus-header__edit-link button button--no-padding button--font-weight-100 button--font-size-14 nsw-button"
							>
								Edit View
							</button>
						</Grid>
					</Grid>
				</div>
			</div>
		</div>
	)
}

export default LearningAreaHeader
