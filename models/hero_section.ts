import { IContentItem, Elements } from '@kentico/kontent-delivery';

/**
 * Generated by '@kentico/kontent-model-generator@4.1.0'
 */
export type HeroSection = IContentItem<{
  actions: Elements.LinkedItemsElement<IContentItem>;
  title: Elements.TextElement;
  content: Elements.TextElement;
  image: Elements.AssetsElement;
}>;
