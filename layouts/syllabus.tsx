import Layout from '@/components/Layout'
import RichText from '@/components/RichText'
import UnknownComponent from '@/components/UnknownComponent'
import { useGlossary } from '@/legacy-ported/components/base/Glossary'
import GlossaryBody from '@/legacy-ported/components/base/GlossaryBody'
import GlossaryHeader from '@/legacy-ported/components/base/GlossaryHeader'
import Content from '@/legacy-ported/components/syllabus/Content'
import CoursePerformance from '@/legacy-ported/components/syllabus/CoursePerformance'
import DownloadList from '@/legacy-ported/components/syllabus/DownloadList'
import LearningAreaHeader from '@/legacy-ported/components/syllabus/LearningAreaHeader'
import Outcomes from '@/legacy-ported/components/syllabus/Outcomes'
import TabBar from '@/legacy-ported/components/tabs/TabBar'
import { SyllabusTabPanel } from '@/legacy-ported/components/tabs/TabPanel'
import { syllabusTabs } from '@/legacy-ported/constants/index'
import { Sections } from '@/legacy-ported/constants/pathConstants'
import { customSyllabusQueryString } from '@/legacy-ported/utilities/functions'
import setTabNavigation from '@/legacy-ported/utilities/hooks/useTabNavigation'
import { Assessment } from '@/models/assessment'
import { Focusarea } from '@/models/focusarea'
import { Syllabus as SyllabusModel } from '@/models/syllabus'
import { CommonPageProps } from '@/types'
import {
	convertGlossaryToIGlossary,
	getTagFromYears,
	getUrlFromMapping,
	isIntersect,
} from '@/utils'
import { ITaxonomyTerms } from '@kentico/kontent-delivery'
import { makeStyles } from '@material-ui/core'
import { useRouter } from 'next/router'
import { ParsedQs } from 'qs'
import { useState } from 'react'

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: '100%',
		backgroundColor: theme.palette.background.paper,
	},
}))

function Syllabus(props: CommonPageProps<SyllabusModel>) {
	const router = useRouter()
	const classes = useStyles()

	const { mappings, data } = props
	const {
		pageResponse,
		stageGroups: allStageGroups,
		stages: allStages,
		keyLearningAreas: allKeyLearningAreas,
		syllabuses: syllabusesForThePage,
		glossaries: allGlossaries,
		assets,
	} = data
	const page = pageResponse.item

	const outcomes = page.elements.focus_areas.linkedItems.reduce(
		(outcomes, focusArea: Focusarea) => {
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
	const [selectedStage, setStage] = useState<ITaxonomyTerms>(
		initialStageCodename
			? allStages.find((_s) => _s.codename === initialStageCodename)
			: allStages[0],
	)
	const terms = convertGlossaryToIGlossary(allGlossaries.items)
	const [glossaryHeaderProps, glossaryFilter] = useGlossary({
		sections: terms,
	})

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
		const syllabuses = syllabusesForThePage.items.filter(
			(syl: SyllabusModel) => {
				console.log(
					syl.elements.key_learning_area__items.value[0].codename,
					isIntersect(
						klaCodenames,
						syl.elements.key_learning_area__items.value,
					),
					syl.elements.stages__stage_years.value.some(
						(s: ITaxonomyTerms) =>
							s.codename === selectedStage.codename,
					),
				)
				return (
					isIntersect(
						klaCodenames,
						syl.elements.key_learning_area__items.value,
					) &&
					syl.elements.stages__stage_years.value.some(
						(s: ITaxonomyTerms) =>
							s.codename === selectedStage.codename,
					)
				)
			},
		)

		/*
		update the subject title when confirming,
		we just want to update in case there's only one syllabus selected
		*/
		// If more than 1 Learning Area is selected redirect to Custom Syllabus page
		if (klaCodenames.length > 1) {
			router.push({
				pathname: Sections.CUSTOM_SYLLABUS.url,
				search: customSyllabusQueryString({
					stageIds: [selectedStage.codename as string],
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
					syllabusIds: [page.system.codename],
				}),
			})
		} else {
			setStage(allStages.find((s) => s.codename === stageCodenames[0]))
		}
	}

	if (!page) {
		return (
			<UnknownComponent>
				Page {page.system.codename} does not have any content!
			</UnknownComponent>
		)
	}

	return (
		<Layout
			{...props}
			className={`syllabus-overview syllabus-overview--{subject}`}
		>
			<div className="syllabus-overview-page">
				<div className="syllabus-overview-page__container">
					<LearningAreaHeader
						subjectTag={getTagFromYears(
							page.elements.stages__stage_years.value,
						)}
						subjectTitle={page.elements.title.value}
						stageName={selectedStage.name || 'Unknown'}
						onVersionHistoryClick={() => {
							// setDisplayVersionHistoryLogModal(true)
						}}
						onEditViewClick={() => {
							// setDisplayEditViewModal(true)
						}}
						selectedAreas={[
							page.elements.key_learning_area__items.value[0]
								.codename,
						]}
						selectedStages={[selectedStage.codename]}
						stages={allStages}
						stageGroups={allStageGroups}
						area={
							page.elements.key_learning_area__items.value[0].name
						}
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
									data-kontent-item-id={page.system.id}
									data-kontent-element-codename="web_content_rtb__content"
									linkedItems={pageResponse.linkedItems}
									className="syllabus-content-section cms-content-formatting"
									richTextElement={
										page.elements.web_content_rtb__content
									}
								/>
							</SyllabusTabPanel>

							{/* rationale */}
							<SyllabusTabPanel
								id={syllabusTabs[1].id}
								tabValue={tabValue}
							>
								<RichText
									{...props}
									data-kontent-item-id={page.system.id}
									data-kontent-element-codename="rationale"
									linkedItems={pageResponse.linkedItems}
									className="syllabus-content-section cms-content-formatting"
									richTextElement={page.elements.rationale}
								/>
							</SyllabusTabPanel>

							{/* aim */}
							<SyllabusTabPanel
								id={syllabusTabs[2].id}
								tabValue={tabValue}
							>
								<RichText
									{...props}
									data-kontent-item-id={page.system.id}
									data-kontent-element-codename="aim"
									linkedItems={pageResponse.linkedItems}
									className="syllabus-content-section cms-content-formatting"
									richTextElement={page.elements.aim}
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
									mappings={mappings}
									linkedItems={pageResponse.linkedItems}
									// TODO: add defaultOffsetTop
									// defaultOffsetTop={SYLLABUS.CONTENT_DEFAULT_OFFSET_TOP.STAGES}
									defaultOffsetTop={0}
									stageId={selectedStage.codename}
									supportElementId={page.system.id}
									content={
										page.elements.focus_areas
											.linkedItems as Focusarea[]
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
									mappings={mappings}
									linkedItems={pageResponse.linkedItems}
									sections={
										page.elements.assessments
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
							{/* teaching-and-learning */}
							<SyllabusTabPanel
								id={syllabusTabs[7].id}
								tabValue={tabValue}
							>
								<DownloadList
									files={assets ?? []}
									colour="secondary"
								/>
							</SyllabusTabPanel>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default Syllabus
