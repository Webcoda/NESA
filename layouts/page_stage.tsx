import { makeStyles, Typography, useTheme } from '@material-ui/core'
import get from 'lodash.get'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { Layout, UnknownComponent } from '../components'
import SanitisedHTMLContainer from '../components/SanitisedHTMLContainer'
import { Accordion, AccordionGroup } from '../lib/nsw-ds-react/src/component/accordion/accordion'
import Card, { CardCopy } from "../lib/nsw-ds-react/src/component/card/card"
// import StagesHeader from '../components/StagesHeader'
// import NavPage from "../containers/NavPage"
import { TabItem, TabItemWrapper, Tabs, TabSection } from '../lib/nsw-ds-react/src/component/tabs/tabs'
import { Glossary } from '../models/glossary'
import { KeyLearningArea } from '../models/key_learning_area'
import { Syllabus } from '../models/syllabus'

const ReactJson = dynamic(() => import('react-json-view'), { ssr: false }) as any

const useStyles = makeStyles((theme) => ({
	root: {
		paddingTop: theme.spacing(4),
	},
}))

function PageStage(props) {
	const classes = useStyles()
	const page = get(props, 'data.page.item', null)
	const syllabuses: Syllabus[] = get(props, 'data.syllabuses.items', null)
	const allKeyLearningAreas: KeyLearningArea[] = get(props, 'data.keyLearningAreas.items', null)
	const allGlossaries: Glossary[] = get(props, 'data.glossaries.items', null)

	const theme = useTheme()
	const imageSizes = `${theme.breakpoints.values.md}px`
	const [selectedStages, setSelectedStages] = useState(page.elements.stage.value)

	if (!page) {
		return (
			<UnknownComponent>
				Page {get(page, 'elements.system.codename', null)} does not have any content!
			</UnknownComponent>
		)
	}

	useEffect(() => {
		(async () => {
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

	return (
		<Layout {...props}>
			<div className="nsw-container">
				{title && <Typography variant="h1">{title}</Typography>}

				{/* <StagesHeader
					tag="K"
					title={title}
					area={"area"}
					selectedStages={selectedStages}
					learningAreas={
						allKeyLearningAreas
							.sort((a, b) => a.elements.order.value - b.elements.order.value)
					}
					onStagesHeaderConfirm={() => {
						console.log("🚀 ~ file: page_stage.tsx ~ line 58 ~ PageStage ~ onStagesHeaderConfirm")
					}}
				/> */}

				<ReactJson src={allKeyLearningAreas} collapsed />
				<ul className="flex border-t border-b bg-slate-200">
					{allKeyLearningAreas
						.sort((a, b) => a.elements.order.value - b.elements.order.value)
						.map((item) => (
							<li className="py-3 px-4" key={item.system.id}>
								<a href="#">{item.elements.title.value}</a>
							</li>
						))}
				</ul>
				<Tabs>
					<TabItemWrapper>
						<TabItem title="Course overview" urlHash="overview" />
						<TabItem title="Rationale" urlHash="rationale" />
						<TabItem title="Aim" urlHash="aim" />
						<TabItem title="Outcomes" urlHash="outcomes" />
						<TabItem title="Content" urlHash="content" />
						<TabItem title="Assessment" urlHash="assessment" />
						<TabItem title="Glossary" urlHash="glossary" />
						<TabItem title="Teaching and learning support" urlHash="teaching-learning-support" />
						<TabItem title="JSON of props" urlHash="json" />
					</TabItemWrapper>

					<TabSection urlHash="overview">
						{
							<AccordionGroup className="">
								{syllabuses
									.filter((item) => item.elements.overview.value)
									.map((item) => (
										<Accordion
											key={item.system.id + 'overview'}
											header={item.elements.title.value}
											body={
												<div data-kontent-item-id={item.system.id}>
													<SanitisedHTMLContainer data-kontent-element-codename="overview">
														{item.elements.overview.value}
													</SanitisedHTMLContainer>
												</div>
											}
											isOpen
										></Accordion>
									))}
							</AccordionGroup>
						}
					</TabSection>
					<TabSection urlHash="rationale">
						{
							<AccordionGroup className="">
								{syllabuses
									.filter((item) => item.elements.rationale.value)
									.map((item) => (
										<Accordion
											key={item.system.id + 'rationale'}
											header={item.elements.title.value}
											data-kontent-item-id={item.system.id}
											body={
												<div data-kontent-item-id={item.system.id}>
													<SanitisedHTMLContainer data-kontent-element-codename="rationale">
														{item.elements.rationale.value}
													</SanitisedHTMLContainer>
												</div>
											}
											isOpen
										></Accordion>
									))}
							</AccordionGroup>
						}
					</TabSection>
					<TabSection urlHash="aim">
						{
							<AccordionGroup className="">
								{syllabuses
									.filter((item) => item.elements.aim.value)
									.map((item) => (
										<Accordion
											key={item.system.id + 'aim'}
											header={item.elements.title.value}
											data-kontent-item-id={item.system.id}
											body={
												<div data-kontent-item-id={item.system.id}>
													<SanitisedHTMLContainer data-kontent-element-codename="aim">
														{item.elements.aim.value}
													</SanitisedHTMLContainer>
												</div>
											}
											isOpen
										></Accordion>
									))}
							</AccordionGroup>
						}
					</TabSection>
					<TabSection urlHash="outcomes">
						<div className="nsw-grid nsw-grid--spaced">
							<div className="nsw-col nsw-col-md-6"></div>
						</div>
					</TabSection>
					<TabSection urlHash="content">{}</TabSection>
					<TabSection urlHash="assessment">{}</TabSection>
					<TabSection urlHash="glossary">{}</TabSection>
					<TabSection urlHash="teaching-learning-support">{}</TabSection>
					<TabSection urlHash="json">
						<ReactJson src={props} collapsed />
					</TabSection>
				</Tabs>
			</div>
		</Layout>
	)
}

export default PageStage
