import { ITaxonomyTerms } from '@kentico/kontent-delivery'
import { Grid } from '@material-ui/core'
import intersection from 'lodash.intersection'
import { FixedTreePickerProps } from './TagPicker'
import TreePicker from './TreePicker'

export type StagePickerProps = FixedTreePickerProps & {
	stageGroups: ITaxonomyTerms[]
	disabledStages?: ITaxonomyTerms[]
}

const StagePicker = (props: StagePickerProps): JSX.Element => {
	const { selected, stageGroups, disabledStages = [], ...others } = props

	return (
		<>
			{stageGroups.map((stageGroup: ITaxonomyTerms) => {
				return (
					<Grid key={stageGroup.codename} item xs={12} md={4}>
						<h6>{stageGroup.name}</h6>
						<TreePicker
							rootElements={stageGroup.terms.map(
								(s: ITaxonomyTerms) => {
									return {
										id: s.codename,
										label: s.name,
										disabled: disabledStages.some(
											(ds) => ds.codename === s.codename,
										),
									}
								},
							)}
							selected={intersection(
								selected,
								stageGroup.terms.map((item) => item.codename),
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
