import { Mapping } from '@/types'
import { Elements } from '@kentico/kontent-delivery'
import parseHTML, {
	domToReact,
	Element,
	attributesToProps,
	Text,
} from 'html-react-parser'
import slugify from 'slugify'

const IMAGE_ID_ATTRIBUTE_IDENTIFIER = 'data-image-id'
const LINKED_ITEM_ID_ATTRIBUTE_IDENTIFIER = 'data-item-id'

function isLinkedItem(domNode) {
	return (
		domNode.name === 'object' &&
		domNode.attribs?.type === 'application/kenticocloud'
	)
}

function isImage(domNode) {
	return (
		domNode.name === 'figure' &&
		typeof domNode.attribs?.[IMAGE_ID_ATTRIBUTE_IDENTIFIER] !== 'undefined'
	)
}

function isLink(domNode) {
	return (
		domNode.name === 'a' &&
		typeof domNode.attribs?.[LINKED_ITEM_ID_ATTRIBUTE_IDENTIFIER] !==
			'undefined'
	)
}

export function replaceNode(
	domNode,
	richTextElement,
	linkedItems,
	mappings,
	resolveLinkedItem,
	resolveImage,
	resolveLink,
	resolveDomNode,
) {
	const { images, links } = richTextElement

	if (resolveLinkedItem && linkedItems) {
		if (isLinkedItem(domNode)) {
			const codeName = domNode.attribs?.['data-codename']
			const linkedItem = linkedItems[codeName]
			return resolveLinkedItem(linkedItem, domNode, domToReact)
		}
	}

	if (resolveImage && images) {
		if (isImage(domNode)) {
			const imageId = domNode.attribs?.[IMAGE_ID_ATTRIBUTE_IDENTIFIER]
			const image = images.find((image) => image.imageId === imageId)
			return resolveImage(image, domNode, domToReact)
		}
	}

	if (resolveLink && links) {
		if (isLink(domNode)) {
			const linkId =
				domNode.attribs?.[LINKED_ITEM_ID_ATTRIBUTE_IDENTIFIER]
			const link = links.find((link) => link.linkId === linkId)
			return resolveLink(link, mappings, domNode, domToReact)
		}
	}

	if (domNode instanceof Element && domNode.name === 'h2') {
		const props = attributesToProps(domNode.attribs)
		const text = domNode.children.map((item: Text) => item.data).join('')
		return (
			<h2 id={slugify(text).toLowerCase()} {...props}>
				{domToReact(domNode.children)}
			</h2>
		)
	}

	if (resolveDomNode) {
		return resolveDomNode(domNode, domToReact)
	}
}

export interface RichTextComponentProps {
	richTextElement: Elements.RichTextElement
	linkedItems?: any
	mappings?: Mapping[]
	resolveLinkedItem?: any
	resolveImage?: any
	resolveLink?: any
	resolveDomNode?: any
	className?: string
}

export function getDomNode({
	richTextElement,
	linkedItems,
	mappings,
	resolveLinkedItem,
	resolveImage,
	resolveLink,
	resolveDomNode,
}: RichTextComponentProps): string | JSX.Element | JSX.Element[] {
	const cleanedValue = richTextElement.value.replace(/(\n|\r)+/, '')
	return parseHTML(cleanedValue, {
		replace: (domNode) =>
			replaceNode(
				domNode,
				richTextElement,
				linkedItems,
				mappings,
				resolveLinkedItem,
				resolveImage,
				resolveLink,
				resolveDomNode,
			),
	})
}

function RichTextComponent(props: RichTextComponentProps) {
	const result = getDomNode(props)
	return <div className={props.className}>{result}</div>
}

export default RichTextComponent
