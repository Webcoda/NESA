import { Homepage } from '@/models/homepage';
import { IContentItemSystemAttributes } from '@kentico/kontent-delivery';
export interface MappingParams {
	slug: string[]
	navigationItem?: IContentItemSystemAttributes
	contentItem?: IContentItemSystemAttributes
}

export interface Mapping {
	params: MappingParams
}

export interface KontentData {
	config: {
		item: Homepage
	}
}
