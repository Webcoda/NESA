import { makeStyles, Typography, useTheme } from '@material-ui/core'
import classNames from 'classnames'
import get from 'lodash.get'
import { Image, Link } from '.'
import { getUrlFromMapping } from '../utils'
import RichTextComponent from './RichTextComponent'
import MathJax from 'react-mathjax'

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

function RichText(props) {
	const richTextElement = get(props, 'richTextElement', '')
	const linkedItems =
		props.linkedItems || get(props, 'data.page.linkedItems', [])
	const mappings = get(props, 'mappings')

	const classes = useStyles()
	const theme = useTheme()

	return (
		<RichTextComponent
			className={classNames(classes.richText, props.className)}
			richTextElement={richTextElement}
			linkedItems={linkedItems}
			mappings={mappings}
			resolveLinkedItem={(linkedItem, domNode, domToReact) => {
				if (!linkedItem) return domToReact([domNode])
				switch (linkedItem.system.type) {
					case 'quote':
						return (
							<blockquote className={classes.quote}>
								&ldquo;{linkedItem.elements.quote_text.value}
								&rdquo;
							</blockquote>
						)
					case 'code_block':
						return (
							<Typography
								component="div"
								className={classes.code}
							>
								<RichText
									{...props}
									richTextElement={get(
										linkedItem,
										'elements.code',
										null,
									)}
								/>
							</Typography>
						)
					case 'external_image':
						return (
							<img
								src={get(linkedItem, 'elements.url.value', '')}
								alt={get(
									linkedItem,
									'elements.alt.value',
									null,
								)}
							/>
						)
					case 'math_formula':
						return (
							<MathJax.Provider script="https://cdn.jsdelivr.net/npm/mathjax@2.7.9/MathJax.js?config=TeX-MML-AM_SVG">
								<span className="math-formula">
									<MathJax.Node
										inline
										formula={get(
											linkedItem,
											'elements.formula.value',
											null,
										)}
									/>
								</span>
							</MathJax.Provider>
						)
					default:
						return domToReact([domNode])
				}
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
