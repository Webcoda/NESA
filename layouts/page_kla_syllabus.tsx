import { Layout, RichText } from '@/components'
import {
	convertGlossaryToIGlossary,
	getLinkElementUsedByRichtext,
	getTagFromYears,
} from '@/utils'
import get from 'lodash.get'
import { syllabusTabs } from '@/legacy-ported/constants/index'
import TabBar from '@/legacy-ported/components/tabs/TabBar'
import { SyllabusTabPanel } from '@/legacy-ported/components/tabs/TabPanel'
import { PageKlaSyllabus as PageKlaSyllabusModel } from '@/models/page_kla_syllabus'
import { Syllabus } from '@/models/syllabus'
import { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core'
import setTabNavigation from '@/legacy-ported/utilities/hooks/useTabNavigation'
import LearningAreaHeader from '@/legacy-ported/components/syllabus/LearningAreaHeader'
import { Stage } from '@/models/stage'
import { StageGroup } from '@/models/stage_group'
import { FocusArea } from '@/models/focus_area'
import Outcomes from '@/legacy-ported/components/syllabus/Outcomes'
import Content from '@/legacy-ported/components/syllabus/Content'
import CoursePerformance from '@/legacy-ported/components/syllabus/CoursePerformance'
import { Assessment } from '@/models/assessment'
import GlossaryHeader from '@/legacy-ported/components/base/GlossaryHeader'
import GlossaryBody from '@/legacy-ported/components/base/GlossaryBody'
import { useGlossary } from '@/legacy-ported/components/base/Glossary'
import { Glossary } from '@/models/glossary'
import { useRouter } from 'next/router'
import { parse, ParsedQs } from 'qs'

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: '100%',
		backgroundColor: theme.palette.background.paper,
	},
}))

export default function PageKlaSyllabus(props) {
	const router = useRouter()
	const classes = useStyles()
	const page: PageKlaSyllabusModel = get(props, 'data.page.item', null)
	const allStages: Stage[] = get(props, 'data.stages.items', null)
	const allSyllabusesLinkedItems = get(
		props,
		'data.syllabuses.linkedItems',
		[],
	)
	const allStageGroups: StageGroup[] = get(
		props,
		'data.stageGroups.items',
		null,
	)
	const allGlossaries: Glossary[] = get(props, 'data.glossaries.items', null)

	const syllabus = page.elements.syllabus.linkedItems?.[0] as Syllabus
	const outcomes = syllabus.elements.focus_areas.linkedItems.reduce(
		(outcomes, focusArea: FocusArea) => {
			return [...outcomes, ...focusArea.elements.outcomes.linkedItems]
		},
		[],
	)

	const initialTab = router.query.tab as string | undefined
	const initialStageCodename = router.query.stage as string | undefined
	const [options, setOptions] = useState<ParsedQs>()

	// States
	const [tabValue, setTabValue] = useState(syllabusTabs[0].id)
	const [currentTabs, setCurrentTabs] = useState(syllabusTabs)
	const [stage, setStage] = useState<Stage>(
		initialStageCodename
			? allStages.find(
					(stage) => stage.system.codename === initialStageCodename,
			  )
			: allStages[0],
	)
	const terms = convertGlossaryToIGlossary(allGlossaries)
	const [glossaryHeaderProps, glossaryFilter] = useGlossary({
		sections: terms,
	})

	// Effect
	useEffect(() => {
		// useRouter is a react hook, it catches up to the current query on ReactDOM.hydrate.
		// so we need to use useEffect and "watch" initialTab change
		// https://github.com/vercel/next.js/discussions/11484#discussioncomment-2362
		if (initialTab) {
			setTabValue(initialTab)
		}
		const query = parse(window.location.search, {
			ignoreQueryPrefix: true,
		})
		setOptions(query.options as ParsedQs | undefined)
	}, [initialTab])

	// Methods
	const handleTabChange = (newTabValue: string) => {
		setTabValue(newTabValue)
	}

	const handleTabPrevious = () => {
		const newTab = setTabNavigation(currentTabs, tabValue, 'PREVIOUS')
		if (newTab) {
			setTabValue(newTab?.id)
		}
	}

	const handleTabNext = () => {
		const newTab = setTabNavigation(currentTabs, tabValue, 'NEXT')
		if (newTab) {
			setTabValue(newTab?.id)
		}
	}

	return (
		<Layout
			className={`syllabus-overview syllabus-overview--{subject}`}
			{...props}
		>
			<div className="syllabus-overview-page">
				<div className="syllabus-overview-page__container">
					<LearningAreaHeader
						subjectTag={getTagFromYears(
							syllabus.elements.stagesyears__years.value,
						)}
						subjectTitle={syllabus.elements.title.value}
						stageName={stage.elements.title.value || 'Unknown'}
						onVersionHistoryClick={() => {
							// setDisplayVersionHistoryLogModal(true)
						}}
						onEditViewClick={() => {
							// setDisplayEditViewModal(true)
						}}
						selectedAreas={[
							syllabus.elements.key_learning_area.value[0],
						]}
						selectedStages={[stage.system.codename]}
						stageGroups={allStageGroups}
						area={syllabus.elements.key_learning_area.value[0]}
						onLearningAreaHeaderConfirm={
							null
							// handleLearningAreaHeaderConfirm
						}
						onStagesHeaderConfirm={
							null
							// onStagesHeaderConfirm
						}
					/>
					{/* tabs */}
					<div className="syllabus-header__tabs">
						<div className={`${classes.root}`}>
							<TabBar
								value={tabValue}
								onChange={handleTabChange}
								tabs={currentTabs.map((tab) => ({
									tabId: tab.id,
									label: tab.name,
									panelId: `tab-panel-${tab.id}`,
									className: `${
										tab.id === tabValue
											? 'syllabus-header__tab--selected'
											: 'syllabus-header__tab'
									}`,
								}))}
								className="syllabus-header__custom-tabs"
								onPreviousClick={handleTabPrevious}
								onNextClick={handleTabNext}
							/>

							{/* course-overview */}
							<SyllabusTabPanel
								id={syllabusTabs[0].id}
								tabValue={tabValue}
							>
								<RichText
									{...props}
									linkedItems={getLinkElementUsedByRichtext(
										syllabus.elements.overview,
										allSyllabusesLinkedItems,
									)}
									className="syllabus-content-section cms-content-formatting"
									richTextElement={syllabus.elements.overview}
								/>
							</SyllabusTabPanel>

							{/* rationale */}
							<SyllabusTabPanel
								id={syllabusTabs[1].id}
								tabValue={tabValue}
							>
								<RichText
									{...props}
									linkedItems={getLinkElementUsedByRichtext(
										syllabus.elements.rationale,
										allSyllabusesLinkedItems,
									)}
									className="syllabus-content-section cms-content-formatting"
									richTextElement={
										syllabus.elements.rationale
									}
								/>
							</SyllabusTabPanel>

							{/* aim */}
							<SyllabusTabPanel
								id={syllabusTabs[2].id}
								tabValue={tabValue}
							>
								<RichText
									{...props}
									linkedItems={getLinkElementUsedByRichtext(
										syllabus.elements.aim,
										allSyllabusesLinkedItems,
									)}
									className="syllabus-content-section cms-content-formatting"
									richTextElement={syllabus.elements.aim}
								/>
							</SyllabusTabPanel>

							{/* outcomes */}
							<SyllabusTabPanel
								id={syllabusTabs[3].id}
								tabValue={tabValue}
							>
								<Outcomes
									stages={allStages}
									stageGroups={allStageGroups}
									outcomes={outcomes}
								/>
							</SyllabusTabPanel>

							{/* content-organisers */}
							<SyllabusTabPanel
								id={syllabusTabs[4].id}
								tabValue={tabValue}
							>
								<Content
									stages={allStages}
									// TODO: add defaultOffsetTop
									// defaultOffsetTop={SYLLABUS.CONTENT_DEFAULT_OFFSET_TOP.STAGES}
									defaultOffsetTop={0}
									stageId={stage.system.id}
									supportElementId={syllabus.system.id}
									content={
										syllabus.elements.focus_areas
											.linkedItems as FocusArea[]
									}
									// files={syl.files?.filter((c) => c.stageIds.includes(stageId)) ?? []}
									initialState={{
										teachingSupport:
											options?.teachingSupport === 'true',
										contentOrganiser:
											options?.contentOrganiser as
												| string
												| undefined,
									}}
								/>
							</SyllabusTabPanel>

							{/* assessment */}
							<SyllabusTabPanel
								id={syllabusTabs[5].id}
								tabValue={tabValue}
							>
								<CoursePerformance
									sections={
										syllabus.elements.assessments
											.linkedItems as Assessment[]
									}
								/>
							</SyllabusTabPanel>

							{/* glossary */}
							<SyllabusTabPanel
								id={syllabusTabs[6].id}
								tabValue={tabValue}
							>
								<GlossaryHeader {...glossaryHeaderProps} />
								<GlossaryBody
									sections={glossaryFilter(terms)}
								/>
							</SyllabusTabPanel>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}
