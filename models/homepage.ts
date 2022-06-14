import { IContentItem, Elements } from '@kentico/kontent-delivery'

/**
 * Generated by '@kentico/kontent-model-generator@4.1.0'
 */
export type Homepage = IContentItem<{
	header_logo: Elements.AssetsElement
	subpages: Elements.LinkedItemsElement<IContentItem>
	seo__description: Elements.TextElement
	seo__options: Elements.MultipleChoiceElement
	acknowledgement: Elements.RichTextElement
	palette: Elements.MultipleChoiceElement
	label: Elements.TextElement
	seo__canonical_url: Elements.TextElement
	footer_top_top_sections: Elements.LinkedItemsElement<IContentItem>
	site_prefix: Elements.TextElement
	content: Elements.LinkedItemsElement<IContentItem>
	main_menu: Elements.LinkedItemsElement<IContentItem>
	footer_bottom_menu: Elements.LinkedItemsElement<IContentItem>
	seo__keywords: Elements.TextElement
	title: Elements.TextElement
	seo__title: Elements.TextElement
	footer_top_menu_sections: Elements.LinkedItemsElement<IContentItem>
	favicon: Elements.AssetsElement
	descriptor: Elements.TextElement
}>
