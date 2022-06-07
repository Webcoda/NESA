import { Layout } from '@/components'
import { ISelectOption } from '@/legacy-ported/components/base/CustomSelect'
import SearchBar from '@/legacy-ported/components/base/SearchBar'
import ResourcesCard from '@/legacy-ported/components/card/ResourcesCard'
import ResourceFilter, {
	ISelectOptionList,
} from '@/legacy-ported/components/support/ResourceFilter'
import { FocusArea } from '@/models/focus_area'
import { KeyLearningArea } from '@/models/key_learning_area'
import { PageTeachingAdvice as PageTeachingAdviceModel } from '@/models/page_teaching_advice'
import { Stage } from '@/models/stage'
import { Syllabus } from '@/models/syllabus'
import { TeachingAdvice } from '@/models/teaching_advice'
import { CommonPageProps } from '@/types'
import { getUrlFromMapping } from '@/utils'
import { Grid } from '@material-ui/core'
import { useRouter } from 'next/router'
import { stringify } from 'qs'
import { useMemo, useState } from 'react'

export interface ISelectFilter {
	name: string
	value: string
	available?: boolean
}

export interface ExtendedTeachingAdvice extends TeachingAdvice {
	focusArea?: FocusArea
	syllabus?: Syllabus
}

const matchesSearch = (text: string) => (advice: ExtendedTeachingAdvice) =>
	[
		advice.system.codename,
		...advice.focusArea.elements.stages.linkedItems.flatMap(
			(stage: Stage) => [
				stage.system.codename,
				stage.elements.title.value,
			],
		),
		advice.syllabus.elements.key_learning_area.linkedItems.map(
			(item) => item as KeyLearningArea,
		)?.[0]?.elements.title.value,
		advice.syllabus.system.codename,
		advice.focusArea.elements.title.value,
	]
		.join()
		.toLowerCase()
		.includes(text.toLowerCase())

const matchesFilters =
	(currentFilters: ISelectFilter[]) => (advice: ExtendedTeachingAdvice) =>
		currentFilters.every(({ name, value }) => {
			switch (name) {
				case 'stages':
					return advice.focusArea.elements.stages.linkedItems.some(
						(stage: Stage) => stage.system.codename === value,
					)
				case 'learning-areas':
					return advice.syllabus.elements.key_learning_area.linkedItems.some(
						(kla: KeyLearningArea) => kla.system.codename === value,
					)
				case 'syllabus':
					return advice.syllabus.system.codename === value
				default:
					return true
			}
		})

export default function PageTeachingAdvice(props: CommonPageProps) {
	const history = useRouter()

	const page = props.data.page.item as PageTeachingAdviceModel
	const teachingAdvices: ExtendedTeachingAdvice[] =
		props.data.syllabuses.items.flatMap((syllabus) => {
			return syllabus.elements.focus_areas.linkedItems.flatMap(
				(focusArea: FocusArea) => {
					return focusArea.elements.teaching_advice.linkedItems.flatMap(
						(item: TeachingAdvice) => {
							return {
								...item,
								syllabus,
								focusArea,
							}
						},
					)
				},
			)
		})

	const [searchText, setSearchText] = useState('')
	const [currentFilters, setCurrentFilters] = useState<ISelectFilter[]>([])

	const dropdowns: ISelectOptionList[] = [
		{
			id: 'stages',
			name: 'Stages',
			options: props.data.stages.items.map<ISelectOption>(
				(stage: Stage) => ({
					text: stage.elements.title.value,
					value: stage.system.codename,
				}),
			),
			gridSize: 3,
		},
		{
			id: 'learning-areas',
			name: 'Learning areas',
			options: props.data.keyLearningAreas.items.map<ISelectOption>(
				(kla: KeyLearningArea) => ({
					text: kla.elements.title.value,
					value: kla.system.codename,
				}),
			),
			gridSize: 3,
		},
		{
			id: 'syllabus',
			name: 'Syllabus',
			options: props.data.syllabuses.items
				// .filter((s : Syllabus) => s.)
				.map<ISelectOption>((syllabus: Syllabus) => ({
					text: syllabus.elements.title.value,
					value: syllabus.system.codename,
				})),
			gridSize: 3,
		},
	]

	const filteredAdvice = useMemo(
		() =>
			teachingAdvices
				.filter(matchesSearch(searchText))
				.filter(matchesFilters(currentFilters)),
		[teachingAdvices, searchText, currentFilters],
	)

	// Methods
	const handleSearch = (text: string) => {
		setSearchText(text)
	}

	const handleApplyFilters = (filters: ISelectFilter[]) => {
		setCurrentFilters(filters)
	}

	const handleLinkClick = (advice: ExtendedTeachingAdvice) => () => {
		// get codename of syllabus
		const syllabusCodename = advice.syllabus.system.codename
		// the mapping of the path is
		const mappingCodename = `navigation_item__${syllabusCodename}`
		const pathname = getUrlFromMapping(props.mappings, mappingCodename)

		history.push({
			pathname,
			search: stringify({
				stage: advice.focusArea.elements.stages.value[0],
				tab: 'content',
				options: {
					contentOrganiser: advice.focusArea.elements.title.value,
					teachingSupport: true,
				},
			}),
		})
	}

	return (
		<Layout className="syllabus-overview" {...props}>
			<Grid container direction="column">
				{page.elements.title.value && (
					<h1 className="syllabus-overview__title">
						{page.elements.title.value}
					</h1>
				)}
				{/* search input */}
				<Grid
					item
					xs={12}
					sm={6}
					md={4}
					className="resource-filter__search"
				>
					<SearchBar
						onSearch={handleSearch}
						className="resource-filter__search-bar"
					/>
				</Grid>
				<ResourceFilter
					dropdowns={dropdowns}
					onApplyFilters={handleApplyFilters}
					filterButtonGridSize={3}
				/>
			</Grid>
			<Grid container className="resource-page__body">
				<Grid container item spacing={3}>
					{filteredAdvice.map((advice) => (
						<Grid
							item
							xs={12}
							sm={6}
							md={4}
							lg={3}
							key={advice.system.id}
						>
							<ResourcesCard colour="primary">
								<Grid
									container
									item
									justifyContent="space-between"
									wrap="nowrap"
								>
									<p className="resources-card__header">
										{advice.syllabus.elements.title.value}
									</p>
								</Grid>
								<Grid
									container
									item
									justifyContent="flex-start"
									direction="column"
								>
									{
										advice.focusArea.elements.stages.linkedItems.map(
											(item) => item as Stage,
										)?.[0]?.elements.title.value
									}
									<h2 className="resources-card__headline">
										{advice.focusArea.elements.title.value}
									</h2>
									<div className="resources-card__button-container">
										<button
											type="button"
											className="button button--with-icon nsw-button nsw-button--secondary"
											onClick={handleLinkClick(advice)}
										>
											View advice
										</button>
									</div>
								</Grid>
							</ResourcesCard>
						</Grid>
					))}

					{filteredAdvice.length === 0 && (
						<Grid container justifyContent="center">
							Not found
						</Grid>
					)}
				</Grid>
			</Grid>
		</Layout>
	)
}
