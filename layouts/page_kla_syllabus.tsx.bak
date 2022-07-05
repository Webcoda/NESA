import { Layout, RichText } from '@/components'
import { useGlossary } from '@/legacy-ported/components/base/Glossary'
import GlossaryBody from '@/legacy-ported/components/base/GlossaryBody'
import GlossaryHeader from '@/legacy-ported/components/base/GlossaryHeader'
import Content from '@/legacy-ported/components/syllabus/Content'
import CoursePerformance from '@/legacy-ported/components/syllabus/CoursePerformance'
import LearningAreaHeader from '@/legacy-ported/components/syllabus/LearningAreaHeader'
import Outcomes from '@/legacy-ported/components/syllabus/Outcomes'
import TabBar from '@/legacy-ported/components/tabs/TabBar'
import { SyllabusTabPanel } from '@/legacy-ported/components/tabs/TabPanel'
import { syllabusTabs } from '@/legacy-ported/constants/index'
import { Sections } from '@/legacy-ported/constants/pathConstants'
import { customSyllabusQueryString } from '@/legacy-ported/utilities/functions'
import setTabNavigation from '@/legacy-ported/utilities/hooks/useTabNavigation'
import { Assessment } from '@/models/assessment'
import { FocusArea } from '@/models/focus_area'
import { Glossary } from '@/models/glossary'
import { PageKlaSyllabus as PageKlaSyllabusModel } from '@/models/page_kla_syllabus'
import { Stage } from '@/models/stage'
import { StageGroup } from '@/models/stage_group'
import { Syllabus } from '@/models/syllabus'
import { CommonPageProps } from '@/types'
import {
	convertGlossaryToIGlossary,
	getLinkElementUsedByRichtext,
	getTagFromYears,
	getUrlFromMapping,
	isIntersect,
} from '@/utils'
import { makeStyles } from '@material-ui/core'
import get from 'lodash.get'
import { useRouter } from 'next/router'
import { parse, ParsedQs } from 'qs'
import { useEffect, useState } from 'react'

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: '100%',
		backgroundColor: theme.palette.background.paper,
	},
}))

export default function PageKlaSyllabus(props: CommonPageProps) {
	const router = useRouter()
	const classes = useStyles()
	const { mappings } = props
	const page: PageKlaSyllabusModel = get(props, 'data.page.item', null)
	const allStages: Stage[] = get(props, 'data.stages.items', null)
	const allSyllabuses: Syllabus[] = get(props, 'data.syllabuses.items', null)
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
	const [selectedStage, setStage] = useState<Stage>(
		initialStageCodename
			? allStages.find(
					(_s) => _s.system.codename === initialStageCodename,
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

	const handleLearningAreaHeaderConfirm = (klaCodenames: string[]) => {
		const syllabuses = allSyllabuses.filter((syl) => {
			console.log(
				syl.elements.key_learning_area.value[0],
				isIntersect(klaCodenames, syl.elements.key_learning_area.value),
				syl.elements.stagesyears__stages.linkedItems.some(
					(s: Stage) =>
						s.system.codename === selectedStage.system.codename,
				),
			)
			return (
				isIntersect(
					klaCodenames,
					syl.elements.key_learning_area.value,
				) &&
				syl.elements.stagesyears__stages.linkedItems.some(
					(s: Stage) =>
						s.system.codename === selectedStage.system.codename,
				)
			)
		})

		/*
		update the subject title when confirming,
		we just want to update in case there's only one syllabus selected
		*/
		// If more than 1 Learning Area is selected redirect to Custom Syllabus page
		if (klaCodenames.length > 1) {
			router.push({
				pathname: Sections.CUSTOM_SYLLABUS.url,
				search: customSyllabusQueryString({
					stageIds: [selectedStage.system.codename as string],
					tabIds: currentTabs.map((t) => t.id),
					syllabusIds: syllabuses.map((s) => s.system.codename),
				}),
			})
		} else if (syllabuses && syllabuses.length === 1) {
			// exactly 1 syllabus, redirect to it's page
			router.push({
				pathname: getUrlFromMapping(
					mappings,
					`navigation_item__${syllabuses[0].system.codename}`,
				),
			})
		} else {
			// Not sure what we do here
			// setLearningArea(ids[0] as string);
		}
	}

	const onStagesHeaderConfirm = (stageCodenames: string[]) => {
		// If more than 1 Stage is selected redirect to Custom Syllabus page
		if (stageCodenames.length > 1) {
			router.push({
				pathname: Sections.CUSTOM_SYLLABUS.url,
				search: customSyllabusQueryString({
					stageIds: stageCodenames as string[],
					tabIds: currentTabs.map((t) => t.id),
					syllabusIds: [syllabus.system.codename],
				}),
			})
		} else {
			setStage(
				allStages.find((s) => s.system.codename === stageCodenames[0]),
			)
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
						stageName={
							selectedStage.elements.title.value || 'Unknown'
						}
						onVersionHistoryClick={() => {
							// setDisplayVersionHistoryLogModal(true)
						}}
						onEditViewClick={() => {
							// setDisplayEditViewModal(true)
						}}
						selectedAreas={[
							syllabus.elements.key_learning_area.value[0],
						]}
						selectedStages={[selectedStage.system.codename]}
						stageGroups={allStageGroups}
						area={syllabus.elements.key_learning_area.value[0]}
						onLearningAreaHeaderConfirm={
							handleLearningAreaHeaderConfirm
						}
						onStagesHeaderConfirm={onStagesHeaderConfirm}
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
									stageId={selectedStage.system.id}
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
