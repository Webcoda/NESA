import React, { useEffect, useState } from 'react'
import { Grid, GridSize } from '@material-ui/core'
import CustomSelect, { ISelectOption } from '../base/CustomSelect'
import { AllStages } from '../../store/mock/stages'
import { AllKeyLearningAreas } from '../../store/mock/keyLearningAreas'

export interface ISelectFilter {
	name: string
	value: string
	available?: boolean
}

export interface ISelectOptionList {
	id: string
	name: string
	options: ISelectOption[]
	gridSize?: GridSize
}

export const stageOptions: ISelectOption[] = AllStages.map((s) => ({
	value: s.id,
	text: s.label,
	available: s.available,
}))

export const LAOptions: ISelectOption[] = AllKeyLearningAreas.map((kla) => ({
	value: kla.id,
	text: kla.title,
	available: kla.available,
}))

const years = Array.from(
	{
		length: 2020 - 2003,
	},
	(val, index) => 2003 + index,
)

export const yearOptions: ISelectOption[] = years.map((year) => ({
	text: year.toString(),
	value: year.toString(),
}))

export const prescribedOptions: ISelectOption[] = [
	{
		text: 'Prescribed',
		value: 'prescribed',
	},
	{
		text: 'Suggested',
		value: 'suggested',
	},
]

export const subjectOptions: ISelectOption[] = [
	{
		text: 'English K–10',
		value: 'English K–10',
	},
	{
		text: 'Mathematics K–10',
		value: 'Mathematics K–10',
	},
]

export const codeOptions: ISelectOption[] = [
	{
		text: '2000',
		value: '2000',
	},
	{
		text: '3000',
		value: '3000',
	},
	{
		text: '4000',
		value: '4000',
	},
	{
		text: '5000',
		value: '5000',
	},
	{
		text: '6000',
		value: '6000',
	},
	{
		text: '7000',
		value: '7000',
	},
	{
		text: '8000',
		value: '8000',
	},
	{
		text: '9000',
		value: '9000',
	},
	{
		text: '10000',
		value: '10000',
	},
	{
		text: '11000',
		value: '11000',
	},
]

export interface ResourceFilterProps {
	/**
	 * List of dropdowns
	 */
	dropdowns: ISelectOptionList[]

	/**
	 * Fire when filter applies
	 */
	onApplyFilters: (selectFilters: ISelectFilter[]) => void

	/**
	 * Grid size of filter button. Default size is 4.
	 */
	filterButtonGridSize?: GridSize
}

/**
 * Resource Filter
 * @param props
 * @constructor
 */
const ResourceFilter = (props: ResourceFilterProps): JSX.Element => {
	const { dropdowns, onApplyFilters, filterButtonGridSize = 4 } = props
	const [filterDropdowns, setFilterDropdowns] = useState(dropdowns)

	const [filterValues, setFilterValues] = React.useState<ISelectFilter[]>([])

	const handleOptionSelectChange = (
		event: React.ChangeEvent<{ name: string; value: string }>,
	) => {
		const newFilter: ISelectFilter = {
			name: event.target.name,
			value: event.target.value,
		}

		if (newFilter.value) {
			let isNewFilter = true
			const findFilter = filterValues.map((element) => {
				if (element.name === newFilter.name) {
					element.value = newFilter.value
					isNewFilter = false
				}
				return element
			})

			if (isNewFilter) {
				setFilterValues([...filterValues, newFilter])
			} else {
				setFilterValues(findFilter)
			}
		} else {
			const newFilterValue = filterValues.filter(
				(filter) => filter.name !== newFilter.name,
			)
			setFilterValues(newFilterValue)
		}
	}

	const handleApplyFilters = () => {
		onApplyFilters(filterValues)
	}

	/**
	 * Triggers when filterValues changes
	 */
	useEffect(() => {
		const learningAreaDropdown = filterValues.find(
			(dropdown) => dropdown.name === 'learning-areas',
		)

		if (learningAreaDropdown) {
			const syllabusDropdown = dropdowns.find(
				(dropdown) => dropdown.id === 'syllabus',
			)

			if (syllabusDropdown) {
				/**
				 * Filtering syllabus options based on learning area selected dropdown option
				 */
				const newOptions = syllabusDropdown.options.filter((option) => {
					const optionText = option.text.toLowerCase()
					const learningAreaDropdownValue =
						learningAreaDropdown.value.toLowerCase()
					return optionText.startsWith(learningAreaDropdownValue)
				})
				const newSyllabusDropdown = {
					...syllabusDropdown,
					options: newOptions,
				}

				/**
				 * Replacing new syllabus dropdown in dropdown list
				 */
				const foundIndex = [...dropdowns].findIndex(
					(dropdown) => dropdown.id === newSyllabusDropdown.id,
				)
				const newFilterDropdowns = [...filterDropdowns]
				newFilterDropdowns[foundIndex] = newSyllabusDropdown

				setFilterDropdowns(newFilterDropdowns)
			}
		} else {
			/**
			 * If learning area dropdown not selected
			 */
			setFilterDropdowns(dropdowns)
		}
	}, [filterValues])

	return (
		<div className="resource-filter">
			<Grid
				container
				className="resource-filter__select-group"
				spacing={2}
			>
				{filterDropdowns.map((dropdown) => (
					<Grid
						key={dropdown.id}
						item
						xs={12}
						sm={dropdown.gridSize || 4}
					>
						<CustomSelect
							name={dropdown.id}
							label={dropdown.name}
							options={dropdown.options}
							onChange={handleOptionSelectChange}
						/>
					</Grid>
				))}
				<Grid
					container
					direction="column"
					justifyContent="flex-end"
					item
					xs={12}
					sm={filterButtonGridSize}
				>
					<button
						type="button"
						className="button button--full-width nsw-button nsw-button--primary"
						onClick={handleApplyFilters}
					>
						Apply filters
					</button>
				</Grid>
			</Grid>
		</div>
	)
}

export default ResourceFilter
