import { Stage } from '@/models/stage'
import { StageGroup } from '@/models/stage_group'
import { Grid } from '@material-ui/core'
import intersection from 'lodash.intersection'
import React from 'react'
import { FixedTreePickerProps } from './TagPicker'
import TreePicker from './TreePicker'
import { TreeElement } from './treeUtils'

export type StagePickerProps = FixedTreePickerProps & {
	stageGroups: StageGroup[]
}

const StagePicker = (props: StagePickerProps): JSX.Element => {
	const { selected, stageGroups, ...others } = props

	return (
		<>
			{stageGroups.map((stageGroup: StageGroup) => {
				return (
					<Grid key={stageGroup.system.id} item xs={12} md={4}>
						<h6>{stageGroup.elements.title.value}</h6>
						<TreePicker
							rootElements={stageGroup.elements.stages.linkedItems.map<TreeElement>((s: Stage) => {
								return {
									id: s.system.codename,
									label: s.elements.title.value,
								}
							})}
							selected={intersection(
								selected,
								stageGroup.elements.stages.linkedItems.map((item) => item.system.codename),
							)}
							{...others}
						/>
					</Grid>
				)
			})}
		</>
	)
}

export default StagePicker
