import Image from '@/components/Image'
import Link from '@/components/Link'
import rteSections from '@/components/sections'
import { Mapping } from '@/types'
import { Elements, IContentItemsContainer } from '@kentico/kontent-delivery'
import { makeStyles, useTheme } from '@material-ui/core'
import classNames from 'classnames'
import get from 'lodash.get'
import { getUrlFromMapping } from '../utils'
import RichTextComponent from './RichTextComponent'

const useStyles = makeStyles((theme) => ({
	richText: {
		// '& table': {
		// 	borderCollapse: 'collapse',
		// 	'& td,th': {
		// 		border: '1px solid',
		// 		borderColor: theme.palette.grey[500],
		// 		textAlign: 'center',
		// 		padding: theme.spacing(1),
		// 	},
		// 	'& tr:nth-child(even)': {
		// 		backgroundColor: theme.palette.grey[100],
		// 	},
		// },
	},
	quote: {
		// display: 'inline-block',
	},
	code: {
		// padding: theme.spacing(2),
		// backgroundColor: theme.palette.grey[100],
		// minWidth: '50vw',
		// display: 'inline-block',
	},
	inlineImage: {
		// width: 'theme.breakpoints.values.sm',
	},
}))

export interface RichTextProps {
	className?: string
	richTextElement: Elements.RichTextElement
	linkedItems: IContentItemsContainer
	mappings: Mapping[]
}

function RichText(props: RichTextProps) {
	const { richTextElement, mappings } = props
	const linkedItems =
		props.linkedItems || get(props, 'data.page.linkedItems', [])

	const classes = useStyles()
	const theme = useTheme()

	return (
		<RichTextComponent
			className={classNames(classes.richText, props.className)}
			richTextElement={richTextElement}
			linkedItems={linkedItems}
			mappings={mappings}
			resolveLinkedItem={(linkedItem, domNode, domToReact) => {
				console.log(linkedItem?.system?.type)
				if (!linkedItem) return domToReact([domNode])
				const RichtextSectionComponent =
					rteSections[linkedItem.system.type]

				if (RichtextSectionComponent) {
					return (
						<RichtextSectionComponent
							linkedItem={linkedItem}
							mappings={mappings}
							linkedItems={linkedItems}
						/>
					)
				}
				return domToReact([domNode])
			}}
			resolveImage={(image, _domNode, _domToReact) => {
				return (
					<div className={classes.inlineImage}>
						<Image
							sizes={`${theme.breakpoints.values.sm}px`}
							asset={image}
							width={theme.breakpoints.values.sm}
							alt={image.description || image.name}
						/>
					</div>
				)
			}}
			resolveLink={(link, mappings, domNode, domToReact) => {
				const url = getUrlFromMapping(mappings, link.codename)
				if (url) {
					return (
						<Link href={url}>{domToReact(domNode.children)}</Link>
					)
				} else {
					return <del>{domToReact([domNode])}</del>
				}
			}}
			resolveDomNode={(domNode, _domToReact) => {
				return domNode
			}}
		/>
	)
}

export default RichText
