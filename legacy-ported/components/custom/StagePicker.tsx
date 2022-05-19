import { Stage } from '@/models/stage'
import { StageCategory } from '@/models/stage_category'
import { Grid } from '@material-ui/core'
import intersection from 'lodash.intersection'
import React from 'react'
import { FixedTreePickerProps } from './TagPicker'
import TreePicker from './TreePicker'
import { TreeElement } from './treeUtils'

export type StagePickerProps = FixedTreePickerProps & {
	stageCategories: StageCategory[]
}

const StagePicker = (props: StagePickerProps): JSX.Element => {
	const { selected, stageCategories, ...others } = props

	return (
		<>
			{stageCategories.map((stageCategory: StageCategory) => {
				return (
					<Grid key={stageCategory.system.id} item xs={12} md={4}>
						<h6>{stageCategory.elements.title.value}</h6>
						<TreePicker
							rootElements={stageCategory.elements.stages.linkedItems.map<TreeElement>((s: Stage) => {
								return {
									id: s.system.codename,
									label: s.elements.title.value,
									disabled: !s.elements.available.value.length,
								}
							})}
							selected={
								intersection(selected, stageCategory.elements.stages.linkedItems.map(item => item.system.codename))
							}
							{...others}
						/>
					</Grid>
				)
			})}
		</>
	)
}

export default StagePicker
