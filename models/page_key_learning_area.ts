import { IContentItem, Elements } from '@kentico/kontent-delivery'

/**
 * Generated by '@kentico/kontent-model-generator@4.1.0'
 */
export type PageKeyLearningArea = IContentItem<{
	title: Elements.TextElement
	key_learning_area: Elements.LinkedItemsElement<IContentItem>
	sections: Elements.LinkedItemsElement<IContentItem>
}>
