import { getDomNode } from '@/components/RichTextComponent'
import InPageNavLinks from '@/lib/nsw-ds-react/src/component/in-page-navigation/inPageNavLinks'
import { Elements } from '@kentico/kontent-delivery'
import { Grid } from '@material-ui/core'

export interface InPageNavProps {
	/**
	 * Title of component
	 */
	title?: string

	richTextElement: Elements.RichTextElement
}

const InPageNav = (props: InPageNavProps): JSX.Element => {
	const { title = 'On this page', richTextElement } = props

	const nodes = getDomNode({
		richTextElement,
	}) as JSX.Element[]

	return (
		<Grid
			container
			className="component-with-page-nav-links"
			direction="column"
		>
			<Grid
				container
				item
				className="component-with-page-nav-links__buttons"
			>
				<InPageNavLinks
					className="nsw-page-nav"
					title={title}
					links={nodes
						.filter((item) => item.type === 'h2')
						.map((item) => {
							return {
								title: item.props.children,
								url: `#${item.props.id}`,
							}
						})}
				/>
			</Grid>
		</Grid>
	)
}

export default InPageNav
