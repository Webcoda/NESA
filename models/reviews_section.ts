import { IContentItem, Elements } from '@kentico/kontent-delivery';

/**
 * Generated by '@kentico/kontent-model-generator@4.1.0'
 */
export type ReviewsSection = IContentItem<{
  options: Elements.MultipleChoiceElement;
  reviews: Elements.LinkedItemsElement<IContentItem>;
  subtitle: Elements.RichTextElement;
  title: Elements.TextElement;
}>;