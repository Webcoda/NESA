import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import CustomPopover, { CustomPopoverProps } from '../base/CustomPopover'
import StagePicker from '../custom/StagePicker'
import { IStage } from '../../utilities/backendTypes'
import { arrayToggleMultiple } from '../../utilities/functions'
import { StageGroup } from '@/models/stage_group'
import { Stage } from '@/models/stage'

export interface StageSelectOverlayProps
	extends Pick<
		CustomPopoverProps,
		'title' | 'popoverStatus' | 'popoverAnchor' | 'onCancel'
	> {
	selected: IStage['id'][]
	stageGroups: StageGroup[]
	disabledStages?: Stage[]
	onConfirm: (selected: IStage['id'][]) => void
}

const StageSelectOverlay = (props: StageSelectOverlayProps): JSX.Element => {
	const {
		selected,
		onConfirm,
		stageGroups,
		disabledStages = [],
		...popoverProps
	} = props

	const [stageIds, setStageIds] = useState(selected)
	const [stageError, setStageError] = useState(false)

	const handleStageModalConfirm = () => {
		if (stageIds.length >= 1) {
			onConfirm(stageIds)
			setStageError(false)
		} else {
			setStageError(true)
		}
	}

	const handleStageSelect = (ids: string[]) => {
		setStageIds(arrayToggleMultiple(stageIds, ids))
	}

	return (
		<CustomPopover onConfirm={handleStageModalConfirm} {...popoverProps}>
			<Grid className="syllabus-header-dialog">
				<Grid container>
					<StagePicker
						stageGroups={stageGroups}
						disabledStages={disabledStages}
						selected={stageIds}
						onChange={handleStageSelect}
					/>
					{stageError && (
						<Grid item xs={12}>
							<span className="syllabus-header-dialog__error">
								Please select at least 1 stage
							</span>
						</Grid>
					)}
				</Grid>
			</Grid>
		</CustomPopover>
	)
}
export default StageSelectOverlay
