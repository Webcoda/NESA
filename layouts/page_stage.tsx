import { Layout, UnknownComponent } from '@/components'
import RichText from '@/components/RichText'
import { useGlossary } from '@/legacy-ported/components/base/Glossary'
import GlossaryBody from '@/legacy-ported/components/base/GlossaryBody'
import GlossaryHeader from '@/legacy-ported/components/base/GlossaryHeader'
import Content from '@/legacy-ported/components/syllabus/Content'
import CoursePerformance from '@/legacy-ported/components/syllabus/CoursePerformance'
import Outcomes from '@/legacy-ported/components/syllabus/Outcomes'
import StagesHeader from '@/legacy-ported/components/syllabus/StagesHeader'
import { StageTabPanel } from '@/legacy-ported/components/syllabus/StageTabPanel'
import TabBar from '@/legacy-ported/components/tabs/TabBar'
import { SyllabusTabPanel } from '@/legacy-ported/components/tabs/TabPanel'
import { syllabusTabs } from '@/legacy-ported/constants/index'
import { Sections } from '@/legacy-ported/constants/pathConstants'
import { customSyllabusQueryString } from '@/legacy-ported/utilities/functions'
import { Assessment } from '@/models/assessment'
import { FocusArea } from '@/models/focus_area'
import { Glossary } from '@/models/glossary'
import { KeyLearningArea } from '@/models/key_learning_area'
import { PageStage as PageStageType } from '@/models/page_stage'
import { Stage } from '@/models/stage'
import { StageGroup } from '@/models/stage_group'
import { Syllabus } from '@/models/syllabus'
import { Mapping } from '@/types'
import {
	convertGlossaryToIGlossary,
	getLinkElementUsedByRichtext,
	getTagFromYears,
	getUrlFromMapping,
} from '@/utils'
import { makeStyles, useTheme } from '@material-ui/core'
import get from 'lodash.get'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const useStyles = makeStyles((theme) => ({
	root: {
		paddingTop: theme.spacing(4),
	},
}))

/**
 * Notes: Vic: For the stage picker to work, we need to match "part" of the navigation item codename with the stage codename
 * the codename convention I use for these two is [type]__[value]
 * e.g.navigation_item__early_stage_1 and stage__early_stage_1
 * so if we omit navigation_item__ and stage__, we'll get early_stage_1
 * */

function PageStage(props) {
	const router = useRouter()

	// query string
	const { query } = router

	// const classes = useStyles()
	const page: PageStageType = get(props, 'data.page.item', null)
	const allSyllabuses: Syllabus[] = get(props, 'data.syllabuses.items', null)
	const allSyllabusesLinkedItems = get(
		props,
		'data.syllabuses.linkedItems',
		[],
	)
	const allStages: Stage[] = get(props, 'data.stages.items', null)
	const allKeyLearningAreas: KeyLearningArea[] = get(
		props,
		'data.keyLearningAreas.items',
		null,
	)
	const allGlossaries: Glossary[] = get(props, 'data.glossaries.items', null)
	const allStageGroups: StageGroup[] = get(
		props,
		'data.stageGroups.items',
		null,
	)
	const mappings: Mapping[] = get(props, 'mappings', null)
	const title = get(
		page,
		'elements.stage.linkedItems.0.elements.title.value',
		null,
	)
	// terms is basically Glossary set in Kentico Kontent converted to legacy IGlossary
	const terms = convertGlossaryToIGlossary(allGlossaries)

	const stageId = page.elements.stage.linkedItems?.[0]?.system.id

	const theme = useTheme()
	// const imageSizes = `${theme.breakpoints.values.md}px`
	const selectedStages = page.elements.stage.linkedItems.map(
		(item: Stage) => item,
	)
	const initialTab = null
	const [tabValue, setTabValue] = useState(initialTab ?? syllabusTabs[0].id)
	const [currentTabs, setCurrentTabs] = useState(syllabusTabs)

	const [glossaryHeaderProps, glossaryFilter] = useGlossary({
		sections: terms,
	})

	// Methods
	const onStagesHeaderConfirm = (stageCodenames: string[]) => {
		const tabsForCustomPage = currentTabs.map((t) => t.id)
		const syllabusesForCustomPage = allSyllabuses.map(
			(s) => s.system.codename,
		)

		// If more than 1 stages are selected redirect to Custom Syllabus page
		if (stageCodenames.length > 1) {
			router.push({
				pathname: Sections.CUSTOM_SYLLABUS.url,
				search: customSyllabusQueryString({
					stageIds: stageCodenames as string[],
					tabIds: tabsForCustomPage,
					syllabusIds: syllabusesForCustomPage,
				}),
			})
		} else {
			const stageCodename = stageCodenames[0]
			const pathname = getUrlFromMapping(
				mappings,
				`navigation_item__${stageCodename}`,
			)

			if (pathname) {
				router.replace({
					pathname,
				})
			} else {
				console.error('mappingItem not found')
			}
		}
	}

	const handleTabChange = (newTabValue: string) => {
		setTabValue(newTabValue)
	}

	const mapFnIncludeSyllabusesOnKla = (kla: KeyLearningArea) => ({
		...kla,
		syllabuses: allSyllabuses.filter((syllabus) =>
			syllabus.elements.key_learning_area.linkedItems.some(
				(_kla: KeyLearningArea) => _kla.system.id === kla.system.id,
			),
		),
	})

	// Computed
	const allKeyLearningAreasWithSyllabuses = allKeyLearningAreas.map(
		mapFnIncludeSyllabusesOnKla,
	)

	// Effects
	useEffect(() => {
		;(async () => {
			const { Accordion: NswAccordion, Tabs: NswTabs } = await import(
				'nsw-design-system/dist/js/main'
			)
			var accordions = document.querySelectorAll('.js-accordion')
			var tabs = document.querySelectorAll('.js-tabs')
			accordions.forEach((accordion) =>
				new NswAccordion(accordion).init(),
			)
			if (tabs) {
				tabs.forEach(function (element) {
					new NswTabs(element).init()
				})
			}
		})()
	}, [])

	if (!page) {
		return (
			<UnknownComponent>
				Page {get(page, 'elements.system.codename', null)} does not have
				any content!
			</UnknownComponent>
		)
	}

	return (
		<Layout
			className={`syllabus-overview syllabus-overview--{subject}`}
			{...props}
		>
			<div className="syllabus-overview-page">
				<div className="syllabus-overview-page__container">
					{/* TODO: fix area */}
					<StagesHeader
						tag={
							selectedStages.length === 1
								? getTagFromYears(
										selectedStages[0]?.elements.years.value,
								  )
								: 'Custom View'
						}
						title={title}
						area=""
						selectedStages={selectedStages.map(
							(stage) => stage.system.codename,
						)}
						stageGroups={allStageGroups}
						learningAreas={allKeyLearningAreas}
						onStagesHeaderConfirm={onStagesHeaderConfirm}
					/>

					{/* stages tabs */}
					<div className="syllabus-header__tabs">
						<div>
							<TabBar
								value={tabValue}
								onChange={handleTabChange}
								tabs={currentTabs.map((tab) => ({
									tabId: tab.id,
									label: tab.name,
									panelId: `tab-panel-${tab.id}`,
								}))}
								className="syllabus-header__custom-tabs"
								tabClassName="syllabus-header__tab"
								onPreviousClick={() => null}
								onNextClick={() => null}
							/>
							{/* course-overview */}
							<StageTabPanel
								id={syllabusTabs[0].id}
								tabValue={tabValue}
								learningAreas={
									allKeyLearningAreasWithSyllabuses
								}
								body={(syl: Syllabus) => (
									<RichText
										{...props}
										linkedItems={getLinkElementUsedByRichtext(
											syl.elements.overview,
											allSyllabusesLinkedItems,
										)}
										className="syllabus-content-section cms-content-formatting"
										richTextElement={syl.elements.overview}
									/>
								)}
							/>
							{/* rationale */}
							<StageTabPanel
								id={syllabusTabs[1].id}
								tabValue={tabValue}
								learningAreas={
									allKeyLearningAreasWithSyllabuses
								}
								body={(syl) => (
									<RichText
										{...props}
										linkedItems={getLinkElementUsedByRichtext(
											syl.elements.rationale,
											allSyllabusesLinkedItems,
										)}
										className="syllabus-content-section cms-content-formatting"
										richTextElement={syl.elements.rationale}
									/>
								)}
							/>
							{/* aim */}
							<StageTabPanel
								id={syllabusTabs[2].id}
								tabValue={tabValue}
								learningAreas={
									allKeyLearningAreasWithSyllabuses
								}
								body={(syl) => (
									<RichText
										{...props}
										linkedItems={getLinkElementUsedByRichtext(
											syl.elements.aim,
											allSyllabusesLinkedItems,
										)}
										className="syllabus-content-section cms-content-formatting"
										richTextElement={syl.elements.aim}
									/>
								)}
							/>
							{/* outcomes */}
							<StageTabPanel
								id={syllabusTabs[3].id}
								tabValue={tabValue}
								learningAreas={
									allKeyLearningAreasWithSyllabuses
								}
								body={(syl: Syllabus) => {
									// console.log(syl.elements.title.value, syl.elements.focus_areas)
									const outcomes =
										syl.elements.focus_areas.linkedItems.reduce(
											(
												outcomes,
												focusArea: FocusArea,
											) => {
												return [
													...outcomes,
													...focusArea.elements
														.outcomes.linkedItems,
												]
											},
											[],
										)
									return (
										<Outcomes
											stages={allStages}
											stageGroups={allStageGroups}
											outcomes={outcomes}
											// scrollOffset={SYLLABUS.COMPARE_OUTCOME_SCROLL_OFFSET.STAGES}
										/>
									)
								}}
							/>
							{/* content-organisers */}
							<StageTabPanel
								id={syllabusTabs[4].id}
								tabValue={tabValue}
								learningAreas={
									allKeyLearningAreasWithSyllabuses
								}
								body={(syl: Syllabus) => (
									<Content
										stages={allStages}
										// TODO: add defaultOffsetTop
										// defaultOffsetTop={SYLLABUS.CONTENT_DEFAULT_OFFSET_TOP.STAGES}
										defaultOffsetTop={0}
										stageId={stageId}
										supportElementId={syl.system.id}
										content={
											syl.elements.focus_areas
												.linkedItems as FocusArea[]
										}
										// files={syl.files?.filter((c) => c.stageIds.includes(stageId)) ?? []}
									/>
								)}
							/>
							{/* Assessment */}
							<StageTabPanel
								id={syllabusTabs[5].id}
								tabValue={tabValue}
								learningAreas={
									allKeyLearningAreasWithSyllabuses
								}
								body={(syl: Syllabus) => (
									<CoursePerformance
										sections={
											syl.elements.assessments
												.linkedItems as Assessment[]
										}
									/>
								)}
							/>
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
							{/* teaching-and-learning */}
							{/* <StageTabPanel
								id={syllabusTabs[7].id}
								tabValue={tabValue}
								learningAreas={learningAreas}
								body={(syl) => <DownloadList files={syl.files ?? []} colour="secondary" />}
							/> */}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default PageStage
