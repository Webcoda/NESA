import { IContentItem, Elements } from '@kentico/kontent-delivery';

/**
 * Generated by '@kentico/kontent-model-generator@4.1.0'
 */
export type Feature = IContentItem<{
  image: Elements.AssetsElement;
  actions: Elements.LinkedItemsElement<IContentItem>;
  content: Elements.RichTextElement;
  title: Elements.TextElement;
}>;
