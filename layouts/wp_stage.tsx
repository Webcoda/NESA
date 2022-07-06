import Layout from '@/components/Layout'
import RichText from '@/components/RichText'
import UnknownComponent from '@/components/UnknownComponent'
import CoursePerformance from '@/legacy-ported/components/syllabus/CoursePerformance'
import StagesHeader from '@/legacy-ported/components/syllabus/StagesHeader'
import { StageTabPanel } from '@/legacy-ported/components/syllabus/StageTabPanel'
import TabBar from '@/legacy-ported/components/tabs/TabBar'
import { syllabusTabs } from '@/legacy-ported/constants/index'
import { Assessment } from '@/models/assessment'
import { Syllabus } from '@/models/syllabus'
import { WpStage as WpStageModel } from '@/models/wp_stage'
import { CommonPageProps } from '@/types'
import { getTagFromYears } from '@/utils'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

function WpStage(props: CommonPageProps<WpStageModel>) {
	const router = useRouter()

	const {
		page,
		pageResponse,
		stageGroups: allStageGroups,
		stages: allStages,
		keyLearningAreas: allKeyLearningAreas,
		syllabuses: allSyllabuses,
	} = props.data

	const selectedStages = page.elements.stages__stages.value
	const initialTab = null
	const [tabValue, setTabValue] = useState(initialTab ?? syllabusTabs[0].id)
	const [currentTabs, setCurrentTabs] = useState(syllabusTabs)

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
						selectedStages={selectedStages.map(
							(stage) => stage.codename,
						)}
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
								syllabuses={allSyllabuses.items}
								body={(syl: Syllabus) => (
									<RichText
										{...props}
										linkedItems={pageResponse.linkedItems}
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
								syllabuses={allSyllabuses.items}
								body={(syl: Syllabus) => (
									<RichText
										{...props}
										linkedItems={pageResponse.linkedItems}
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
								syllabuses={allSyllabuses.items}
								body={(syl: Syllabus) => (
									<RichText
										{...props}
										linkedItems={pageResponse.linkedItems}
										className="syllabus-content-section cms-content-formatting"
										richTextElement={syl.elements.aim}
									/>
								)}
							/>
							{/* Assessment */}
							<StageTabPanel
								id={syllabusTabs[5].id}
								tabValue={tabValue}
								learningAreas={allKeyLearningAreas}
								syllabuses={allSyllabuses.items}
								body={(syl: Syllabus) => (
									<CoursePerformance
										sections={
											syl.elements.assessments
												.linkedItems as Assessment[]
										}
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
