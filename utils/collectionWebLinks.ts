import { IContentItem, IContentItemElements } from '@kentico/kontent-delivery'
import { CollectionWeblink } from './../models/collection_weblink'
export function flattenCollectionWebLinks(links: CollectionWeblink[]) {
	return links.flatMap((link) => link.elements.items.linkedItems)
}
