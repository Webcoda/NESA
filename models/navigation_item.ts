import { IContentItem, Elements } from '@kentico/kontent-delivery';

/**
 * Generated by '@kentico/kontent-model-generator@4.1.0'
 */
export type NavigationItem = IContentItem<{
  content: Elements.LinkedItemsElement<IContentItem>;
  seo__description: Elements.TextElement;
  seo__options: Elements.MultipleChoiceElement;
  seo__canonical_url: Elements.TextElement;
  label: Elements.TextElement;
  seo__keywords: Elements.TextElement;
  seo__title: Elements.TextElement;
  slug: Elements.UrlSlugElement;
  subpages: Elements.LinkedItemsElement<IContentItem>;
}>;