import Layout from '@/components/Layout'
import RichText from '@/components/RichText'
import UnknownComponent from '@/components/UnknownComponent'
import { useGlossary } from '@/legacy-ported/components/base/Glossary'
import GlossaryBody from '@/legacy-ported/components/base/GlossaryBody'
import GlossaryHeader from '@/legacy-ported/components/base/GlossaryHeader'
import Content from '@/legacy-ported/components/syllabus/Content'
import CoursePerformance from '@/legacy-ported/components/syllabus/CoursePerformance'
import DownloadList from '@/legacy-ported/components/syllabus/DownloadList'
import Outcomes from '@/legacy-ported/components/syllabus/Outcomes'
import StagesHeader from '@/legacy-ported/components/syllabus/StagesHeader'
import { StageTabPanel } from '@/legacy-ported/components/syllabus/StageTabPanel'
import TabBar from '@/legacy-ported/components/tabs/TabBar'
import { SyllabusTabPanel } from '@/legacy-ported/components/tabs/TabPanel'
import { syllabusTabs } from '@/legacy-ported/constants/index'
import { Assessment } from '@/models/assessment'
import { Focusarea } from '@/models/focusarea'
import { Syllabus } from '@/models/syllabus'
import { WpStage as WpStageModel } from '@/models/wp_stage'
import { CommonPageProps } from '@/types'
import { convertGlossaryToIGlossary, getTagFromYears } from '@/utils'
import { useTheme } from '@material-ui/core'
import intersection from 'lodash.intersection'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

function WpStage(props: CommonPageProps<WpStageModel>) {
	const router = useRouter()
	const { mappings } = props
	const {
		pageResponse,
		stageGroups: allStageGroups,
		stages: allStages,
		keyLearningAreas: allKeyLearningAreas,
		syllabuses: syllabusesForThePage,
		glossaries: allGlossaries,
		assets,
	} = props.data
	const page: WpStageModel = pageResponse.item

	const title = page.elements.title.value

	// terms is basically Glossary set in Kentico Kontent converted to legacy IGlossary
	const terms = convertGlossaryToIGlossary(allGlossaries.items)

	const stageId = page.elements.stages__stages.value[0].codename

	const theme = useTheme()
	// const imageSizes = `${theme.breakpoints.values.md}px`
	const selectedStages = [stageId]

	const initialTab = null
	const [tabValue, setTabValue] = useState(initialTab ?? syllabusTabs[0].id)
	const [currentTabs, setCurrentTabs] = useState(syllabusTabs)

	const [glossaryHeaderProps, glossaryFilter] = useGlossary({
		sections: terms,
	})

	// Methods
	const onStagesHeaderConfirm = (stageCodenames: string[]) => {
		// const tabsForCustomPage = currentTabs.map((t) => t.id)
		// const syllabusesForCustomPage = allSyllabuses.map(
		// 	(s) => s.system.codename,
		// )
		// // If more than 1 stages are selected redirect to Custom Syllabus page
		// if (stageCodenames.length > 1) {
		// 	router.push({
		// 		pathname: Sections.CUSTOM_SYLLABUS.url,
		// 		search: customSyllabusQueryString({
		// 			stageIds: stageCodenames as string[],
		// 			tabIds: tabsForCustomPage,
		// 			syllabusIds: syllabusesForCustomPage,
		// 		}),
		// 	})
		// } else {
		// 	const stageCodename = stageCodenames[0]
		// 	const pathname = getUrlFromMapping(
		// 		mappings,
		// 		`navigation_item__${stageCodename}`,
		// 	)
		// 	if (pathname) {
		// 		router.replace({
		// 			pathname,
		// 		})
		// 	} else {
		// 		console.error('mappingItem not found')
		// 	}
		// }
	}

	const handleTabChange = (newTabValue: string) => {
		setTabValue(newTabValue)
	}

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
				Page {page.system.codename} does not have any content!
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
										page.elements.stages__stage_years.value,
								  )
								: 'Custom View'
						}
						title={page.elements.title.value}
						area=""
						selectedStages={selectedStages}
						stages={allStages}
						stageGroups={allStageGroups}
						learningAreas={allKeyLearningAreas}
						onStagesHeaderConfirm={() => {}}
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
								learningAreas={allKeyLearningAreas}
								syllabuses={syllabusesForThePage.items}
								body={(syl: Syllabus) => (
									<RichText
										{...props}
										data-kontent-item-id={syl.system.id}
										data-kontent-element-codename="web_content_rtb__content"
										linkedItems={
											syllabusesForThePage.linkedItems
										}
										className="syllabus-content-section cms-content-formatting"
										richTextElement={
											syl.elements
												.web_content_rtb__content
										}
									/>
								)}
							/>
							{/* rationale */}
							<StageTabPanel
								id={syllabusTabs[1].id}
								tabValue={tabValue}
								learningAreas={allKeyLearningAreas}
								syllabuses={syllabusesForThePage.items}
								body={(syl: Syllabus) => (
									<RichText
										{...props}
										data-kontent-item-id={syl.system.id}
										data-kontent-element-codename="rationale"
										linkedItems={
											syllabusesForThePage.linkedItems
										}
										className="syllabus-content-section cms-content-formatting"
										richTextElement={syl.elements.rationale}
									/>
								)}
							/>
							{/* aim */}
							<StageTabPanel
								id={syllabusTabs[2].id}
								tabValue={tabValue}
								learningAreas={allKeyLearningAreas}
								syllabuses={syllabusesForThePage.items}
								body={(syl: Syllabus) => (
									<RichText
										{...props}
										data-kontent-item-id={syl.system.id}
										data-kontent-element-codename="aim"
										linkedItems={
											syllabusesForThePage.linkedItems
										}
										className="syllabus-content-section cms-content-formatting"
										richTextElement={syl.elements.aim}
									/>
								)}
							/>
							{/* outcomes */}
							<StageTabPanel
								id={syllabusTabs[3].id}
								tabValue={tabValue}
								learningAreas={allKeyLearningAreas}
								syllabuses={syllabusesForThePage.items}
								body={(syl: Syllabus) => {
									// console.log(syl.elements.title.value, syl.elements.focus_areas)
									const outcomes =
										syl.elements.focus_areas.linkedItems.reduce(
											(
												outcomes,
												focusArea: Focusarea,
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
								learningAreas={allKeyLearningAreas}
								syllabuses={syllabusesForThePage.items}
								body={(syl: Syllabus) => (
									<Content
										stages={allStages}
										// TODO: add defaultOffsetTop
										// defaultOffsetTop={SYLLABUS.CONTENT_DEFAULT_OFFSET_TOP.STAGES}
										defaultOffsetTop={0}
										stageId={stageId}
										supportElementId={syl.system.id}
										mappings={mappings}
										linkedItems={
											syllabusesForThePage.linkedItems
										}
										content={
											syl.elements.focus_areas
												.linkedItems as Focusarea[]
										}
										files={
											assets.filter(
												(asset) =>
													asset.resource_type.some(
														(rt) =>
															rt.codename ===
															'advice',
													) &&
													intersection(
														asset.syllabuses.map(
															(s) => s.codename,
														),
														syl.elements.syllabus.value.map(
															(s) => s.codename,
														),
													).length,
											) ?? []
										}
									/>
								)}
							/>
							{/* Assessment */}
							<StageTabPanel
								id={syllabusTabs[5].id}
								tabValue={tabValue}
								learningAreas={allKeyLearningAreas}
								syllabuses={syllabusesForThePage.items}
								body={(syl: Syllabus) => (
									<CoursePerformance
										mappings={mappings}
										linkedItems={
											syllabusesForThePage.linkedItems
										}
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
							<StageTabPanel
								id={syllabusTabs[7].id}
								tabValue={tabValue}
								learningAreas={allKeyLearningAreas}
								syllabuses={syllabusesForThePage.items}
								body={(syl: Syllabus) => (
									<DownloadList
										files={
											assets.filter(
												(asset) =>
													intersection(
														asset.syllabuses.map(
															(s) => s.codename,
														),
														syl.elements.syllabus.value.map(
															(s) => s.codename,
														),
													).length,
											) ?? []
										}
										colour="secondary"
									/>
								)}
							/>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default WpStage
