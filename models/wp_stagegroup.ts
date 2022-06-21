import { IContentItem, Elements } from '@kentico/kontent-delivery'

/**
 * Generated by '@kentico/kontent-model-generator@4.1.0'
 */
export type WpStagegroup = IContentItem<{
	web_content_rtb__content: Elements.RichTextElement
	seo__description: Elements.TextElement
	seo__robots: Elements.MultipleChoiceElement
	seo__canonical_url: Elements.TextElement
	slug: Elements.UrlSlugElement
	title: Elements.TextElement
	seo__keywords: Elements.TextElement
	seo__title: Elements.TextElement
	subpages: Elements.LinkedItemsElement<IContentItem>
}>
