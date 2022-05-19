import React from 'react'
import { Grid } from '@material-ui/core'
import { TreeElement } from './treeUtils'
import TreePicker from './TreePicker'
import { FixedTreePickerProps } from './TagPicker'
import { StageCategory } from '@/models/stage_category'
import { STAGE_CATEGORY_PRIMARY, STAGE_CATEGORY_SECONDARY } from '@/constants'
import { Stage } from '@/models/stage'
import intersection from 'lodash.intersection'

export type StagePickerProps = FixedTreePickerProps & {
	stageCategories: StageCategory[]
}

const StagePicker = (props: StagePickerProps): JSX.Element => {
	const { selected, stageCategories, ...others } = props
    console.log("🚀 ~ file: StagePicker.tsx ~ line 17 ~ stageCategories", stageCategories)

	return (
		<>
			{stageCategories.map((stageCategory: StageCategory) => {
				return (
					<Grid key={stageCategory.system.id} item xs={12} md={4}>
						<h6>{stageCategory.elements.title.value}</h6>
						<TreePicker
							rootElements={stageCategory.elements.stages.linkedItems.map<TreeElement>((s: Stage) => {
								return {
									id: s.system.id,
									label: s.elements.title.value,
									disabled: !s.elements.available.value.length,
								}
							})}
							selected={
								intersection(selected, stageCategory.elements.stages.linkedItems.map(item => item.system.id))?.join(',')
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
