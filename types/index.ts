import { ReactNode } from 'react'
import { Glossary } from '@/models/glossary'
import { Syllabus } from '@/models/syllabus'
import {
	Elements,
	IContentItemSystemAttributes,
	Responses,
} from '@kentico/kontent-delivery'
import { WpHomepage } from '@/models/wp_homepage'

export interface MappingParams {
	slug: string[]
	navigationItem?: IContentItemSystemAttributes
	contentItem?: IContentItemSystemAttributes
	webPageItem?: any
}

export interface Mapping {
	params: MappingParams
}

export interface Seo {
	title?: string
	description?: string
	keywords?: string
	canonicalUrl?: string
	noIndex?: string
}

export interface HomepageConfig
	extends Omit<
		WpHomepage,
		| 'seo__description'
		| 'seo__options'
		| 'seo__canonical_url'
		| 'seo__keywords'
		| 'seo__title'
	> {}

export interface KontentCurriculumResultData {
	config: Responses.IViewContentItemResponse<WpHomepage>
	page: Responses.IViewContentItemResponse<WpHomepage>
	syllabuses?: Responses.IListContentItemsResponse<Syllabus>
	// TODO: fix
	// keyLearningAreas?: Responses.IListContentItemsResponse<KeyLearningArea>
	keyLearningAreas?: any
	glossaries?: Responses.IListContentItemsResponse<Glossary>

	// TODO: fix
	stages?: any
	// stages?: Responses.IListContentItemsResponse<StageWithAvailability>

	// TODO: fix
	stageGroups?: any
	// stageGroups?: Responses.IListContentItemsResponse<StageGroup>
}

export interface KontentCurriculumResult {
	seo: Seo
	mappings: Mapping[]
	data: KontentCurriculumResultData
}

/**
 * Stage with availability
 *
 * `available` here means it has assigned to at least one syllabus
 */
// export interface StageWithAvailability extends Stage {
// 	available: boolean
// }

export interface CommonPageProps extends KontentCurriculumResult {
	className?: string
	errorCode?: number
	params: any
	preview: boolean
	children?: ReactNode
}
