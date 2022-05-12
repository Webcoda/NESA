import get from 'lodash.get'
import { Image, Layout, RichText, UnknownComponent } from '../components'
import { Container, makeStyles, Typography, useTheme } from '@material-ui/core'
import dynamic from 'next/dynamic'
import { Tabs, TabItemWrapper, TabItem, TabSection } from '../lib/nsw-ds-react/src/component/tabs/tabs'

const ReactJson = dynamic(() => import('react-json-view'), { ssr: false })

const useStyles = makeStyles((theme) => ({
	root: {
		paddingTop: theme.spacing(4),
	},
}))

function SimplePage(props) {
	const classes = useStyles()
	const page = get(props, 'data.page.item', null)
	const syllabuses = get(props, 'data.syllabuses.items', null)

	const theme = useTheme()
	const imageSizes = `${theme.breakpoints.values.md}px`

	if (!page) {
		return (
			<UnknownComponent>
				Page {get(page, 'elements.system.codename', null)} does not have any content!
			</UnknownComponent>
		)
	}

	const title = get(page, 'elements.stage.linkedItems.0.elements.title.value', null)

	return (
		<Layout {...props}>
			<Container className={classes.root} maxWidth="md">
				{title && <Typography variant="h1">{title}</Typography>}

				<Tabs>
					<TabItemWrapper>
						<TabItem title="Syllabus" urlHash="syllabus" />
						<TabItem title="JSON of props" urlHash="json" />
					</TabItemWrapper>
					<TabSection urlHash="syllabus">
						<ul>
							{syllabuses.map((syllabus) => (
								<li key={get(syllabus, 'system.id', null)}>
									<details>
										<summary>{syllabus.elements.title.value}</summary>
										<div
											dangerouslySetInnerHTML={{ __html: syllabus.elements.overview.value }}
										></div>
									</details>
								</li>
							))}
						</ul>
					</TabSection>
					<TabSection urlHash="json">
						<ReactJson src={props} collapsed />
					</TabSection>
				</Tabs>
			</Container>
		</Layout>
	)
}

export default SimplePage
