import { IContentItem, Elements } from '@kentico/kontent-delivery'

/**
 * Generated by '@kentico/kontent-model-generator@4.1.0'
 */
export type Grid = IContentItem<{
	gap_vertical: Elements.NumberElement
	tiles: Elements.LinkedItemsElement<IContentItem>
	gap_horizontal: Elements.NumberElement
}>