import { IContentItem, Elements } from '@kentico/kontent-delivery';

/**
 * Generated by '@kentico/kontent-model-generator@4.1.0'
 */
export type Action = IContentItem<{
  options: Elements.MultipleChoiceElement;
  label: Elements.TextElement;
  icon: Elements.LinkedItemsElement<IContentItem>;
  actions: Elements.LinkedItemsElement<IContentItem>;
  role: Elements.MultipleChoiceElement;
  navigation_item: Elements.LinkedItemsElement<IContentItem>;
}>;
