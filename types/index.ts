import { IContentItemSystemAttributes } from '@kentico/kontent-delivery';
export interface MappingParams {
	slug: string[]
	navigationItem?: IContentItemSystemAttributes
	contentItem?: IContentItemSystemAttributes
}

export interface Mapping {
	params: MappingParams
}
