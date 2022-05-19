import { Layout, UnknownComponent } from '@/components'
import { useGlossary } from '@/legacy-ported/components/base/Glossary'
import GlossaryBody from '@/legacy-ported/components/base/GlossaryBody'
import GlossaryHeader from '@/legacy-ported/components/base/GlossaryHeader'
import Content from '@/legacy-ported/components/syllabus/Content'
import CoursePerformance from '@/legacy-ported/components/syllabus/CoursePerformance'
import Outcomes from '@/legacy-ported/components/syllabus/Outcomes'
import StagesHeader from '@/legacy-ported/components/syllabus/StagesHeader'
import { StageTabPanel } from '@/legacy-ported/components/syllabus/StageTabPanel'
import SyllabusContentSection from '@/legacy-ported/components/syllabus/SyllabusContentSection'
import TabBar from '@/legacy-ported/components/tabs/TabBar'
import { SyllabusTabPanel } from '@/legacy-ported/components/tabs/TabPanel'
import { syllabusTabs } from '@/legacy-ported/constants/index'
import { Sections } from '@/legacy-ported/constants/pathConstants'
import { SecondaryStages } from '@/legacy-ported/constants/stages'
import { PrimaryStages, SeniorStages } from '@/legacy-ported/store/mock/stages'
import { customSyllabusQueryString } from '@/legacy-ported/utilities/functions'
import { Assessment } from '@/models/assessment'
import { FocusArea } from '@/models/focus_area'
import { Glossary } from '@/models/glossary'
import { KeyLearningArea } from '@/models/key_learning_area'
import { PageStage as PageStageType } from '@/models/page_stage'
import { Stage } from '@/models/stage'
import { StageCategory } from '@/models/stage_category'
import { Syllabus } from '@/models/syllabus'
import { convertGlossaryToIGlossary } from '@/utils'
import { makeStyles, useTheme } from '@material-ui/core'
import get from 'lodash.get'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const ReactJson = dynamic(() => import('react-json-view'), { ssr: false }) as any

const useStyles = makeStyles((theme) => ({
	root: {
		paddingTop: theme.spacing(4),
	},
}))

function PageStage(props) {
	const classes = useStyles()
	const page: PageStageType = get(props, 'data.page.item', null)
	const syllabuses: Syllabus[] = get(props, 'data.syllabuses.items', null)
	const stages: Stage[] = get(props, 'data.stages.items', null)
	const allKeyLearningAreas: KeyLearningArea[] = get(props, 'data.keyLearningAreas.items', null)
	const allGlossaries: Glossary[] = get(props, 'data.glossaries.items', null)
	const allStageCategories: StageCategory[] = get(props, 'data.stageCategories.items', null)

	// terms is basically Glossary set in Kentico Kontent converted to legacy IGlossary
	const terms = convertGlossaryToIGlossary(allGlossaries)

	const stageId = page.elements.stage.linkedItems?.[0]?.system.id

	const theme = useTheme()
	const imageSizes = `${theme.breakpoints.values.md}px`
	const [selectedStages, setSelectedStages] = useState<Stage[]>(
		page.elements.stage.linkedItems.map((item: Stage) => item),
	)
	const initialTab = null
	const [tabValue, setTabValue] = useState(initialTab ?? syllabusTabs[0].id)
	const [currentTabs, setCurrentTabs] = useState(syllabusTabs)

	const [glossaryHeaderProps, glossaryFilter] = useGlossary({
		sections: terms,
	})

	const history = useRouter()

	if (!page) {
		return (
			<UnknownComponent>
				Page {get(page, 'elements.system.codename', null)} does not have any content!
			</UnknownComponent>
		)
	}

	// Methods
	const onStagesHeaderConfirm = (ids: string[]) => {
		const tabsForCustomPage = currentTabs.map((t) => t.id)
		const syllabusesForCustomPage = syllabuses.map((s) => s.system.id)

		// If more than 1 stages are selected redirect to Custom Syllabus page
		if (ids.length > 1) {
			history.push({
				pathname: Sections.CUSTOM_SYLLABUS.url,
				search: customSyllabusQueryString({
					stageIds: ids as string[],
					tabIds: tabsForCustomPage,
					syllabusIds: syllabusesForCustomPage,
				}),
			})
		} else {
			const newStageId = ids[0]
			if (PrimaryStages.some((s) => s.id === newStageId)) {
				history.replace({
					pathname: `${Sections.STAGES.pages.PRIMARY.url}/${newStageId}`,
				})
			} else if (SecondaryStages.some((s) => s.id === newStageId)) {
				history.replace({
					pathname: `${Sections.STAGES.pages.SECONDARY.url}/${newStageId}`,
				})
			} else if (SeniorStages.some((s) => s.id === newStageId)) {
				history.replace({
					pathname: `${Sections.STAGES.pages.SENIOR.url}/${newStageId}`,
				})
			}
		}
	}

	const handleTabChange = (newTabValue: string) => {
		setTabValue(newTabValue)
	}

	useEffect(() => {
		;(async () => {
			const { Accordion: NswAccordion, Tabs: NswTabs } = await import('nsw-design-system/dist/js/main')
			var accordions = document.querySelectorAll('.js-accordion')
			var tabs = document.querySelectorAll('.js-tabs')
			accordions.forEach((accordion) => new NswAccordion(accordion).init())
			if (tabs) {
				tabs.forEach(function (element) {
					new NswTabs(element).init()
				})
			}
		})()
	}, [])

	const title = get(page, 'elements.stage.linkedItems.0.elements.title.value', null)

	const getKeyLearningAreasBasedContentNameAndSyllabusKla = (type: string, kla: KeyLearningArea) => (syllabus) => {
		return (
			syllabus.elements[type].value &&
			syllabus.elements.key_learning_area.value.some((_kla) => _kla == kla.system.codename)
		)
	}

	const mapFnIncludeSyllabusesOnKla = (kla: KeyLearningArea) => ({
		...kla,
		syllabuses: syllabuses.filter((syllabus) =>
			syllabus.elements.key_learning_area.linkedItems.some(
				(_kla: KeyLearningArea) => _kla.system.id === kla.system.id,
			),
		),
	})

	const allKeyLearningAreasWithSyllabuses = allKeyLearningAreas.map(mapFnIncludeSyllabusesOnKla)

	return (
		<Layout className={`syllabus-overview syllabus-overview--{subject}`} {...props}>
			<div className="syllabus-overview-page">
				<ReactJson src={props} collapsed />
				<div className="syllabus-overview-page__container">
					{/* TODO: fix onStagesHeaderConfirm */}
					<StagesHeader
						tag={selectedStages.length === 1 ? selectedStages[0]?.elements.tag.value : 'Custom View'}
						title={title}
						area={'area'}
						selectedStages={selectedStages.map((stage) => stage.system.codename)}
						stageCategories={allStageCategories}
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
								learningAreas={allKeyLearningAreasWithSyllabuses}
								body={(syl: Syllabus) => {
									return <SyllabusContentSection innerHtml={syl.elements.overview.value} />
								}}
							/>
							{/* rationale */}
							<StageTabPanel
								id={syllabusTabs[1].id}
								tabValue={tabValue}
								learningAreas={allKeyLearningAreasWithSyllabuses}
								body={(syl) => <SyllabusContentSection innerHtml={syl.elements.rationale.value} />}
							/>
							{/* aim */}
							<StageTabPanel
								id={syllabusTabs[2].id}
								tabValue={tabValue}
								learningAreas={allKeyLearningAreasWithSyllabuses}
								body={(syl) => <SyllabusContentSection innerHtml={syl.elements.aim.value} />}
							/>
							{/* outcomes */}
							<StageTabPanel
								id={syllabusTabs[3].id}
								tabValue={tabValue}
								learningAreas={allKeyLearningAreasWithSyllabuses}
								body={(syl: Syllabus) => {
									// console.log(syl.elements.title.value, syl.elements.focus_areas)
									const outcomes = syl.elements.focus_areas.linkedItems.reduce(
										(outcomes, focusArea: FocusArea) => {
											return [...outcomes, ...focusArea.elements.outcomes.linkedItems]
										},
										[],
									)
									return (
										<Outcomes
											stages={stages}
											stageCategories={allStageCategories}
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
								learningAreas={allKeyLearningAreasWithSyllabuses}
								body={(syl: Syllabus) => (
									<Content
										stages={stages}
										// TODO: add defaultOffsetTop
										// defaultOffsetTop={SYLLABUS.CONTENT_DEFAULT_OFFSET_TOP.STAGES}
										defaultOffsetTop={0}
										stageId={stageId}
										supportElementId={syl.system.id}
										content={syl.elements.focus_areas.linkedItems as FocusArea[]}
										// files={syl.files?.filter((c) => c.stageIds.includes(stageId)) ?? []}
									/>
								)}
							/>
							{/* Assessment */}
							<StageTabPanel
								id={syllabusTabs[5].id}
								tabValue={tabValue}
								learningAreas={allKeyLearningAreasWithSyllabuses}
								body={(syl: Syllabus) => (
									<CoursePerformance
										sections={syl.elements.assessments.linkedItems as Assessment[]}
									/>
								)}
							/>
							{/* glossary */}
							<SyllabusTabPanel id={syllabusTabs[6].id} tabValue={tabValue}>
								<GlossaryHeader {...glossaryHeaderProps} />
								<GlossaryBody sections={glossaryFilter(terms)} />
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
