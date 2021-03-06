import { IContentItem, Elements } from '@kentico/kontent-delivery';

/**
 * Generated by '@kentico/kontent-model-generator@4.1.0'
 */
export type FocusAreaTagCategory = IContentItem<{
  title: Elements.TextElement;
  sub_category: Elements.LinkedItemsElement<IContentItem>;
  tags: Elements.LinkedItemsElement<IContentItem>;
}>;
