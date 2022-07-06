import { Syllabus } from '@/models/syllabus'
import { UiMenu } from '@/models/ui_menu'
import { Weblinkext } from '@/models/weblinkext'
import { Weblinkint } from '@/models/weblinkint'
import { WpHomepage } from '@/models/wp_homepage'
import {
	IContentItem,
	IContentItemElements,
	IContentItemSystemAttributes,
	Responses,
} from '@kentico/kontent-delivery'
import { ReactNode } from 'react'

export type LinkType = UiMenu | Weblinkint | Weblinkext

export interface MappingParams {
	slug: string[]
	navigationItem?: IContentItemSystemAttributes
	contentItem?: IContentItemSystemAttributes
	webPageItem?: IContentItem
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

export interface KontentCurriculumResultData<
	TKontentModel extends IContentItem<IContentItemElements>,
> {
	config: Responses.IViewContentItemResponse<WpHomepage>
	page: TKontentModel
	pageResponse: Responses.IViewContentItemResponse<TKontentModel>
	syllabuses?: Responses.IListContentItemsResponse<Syllabus>
	// TODO: fix
	// keyLearningAreas?: Responses.IListContentItemsResponse<KeyLearningArea>
	keyLearningAreas?: any

	// TODO: fix
	// glossaries?: Responses.IListContentItemsResponse<Glossary>
	glossaries?: any

	// TODO: fix
	stages?: any
	// stages?: Responses.IListContentItemsResponse<StageWithAvailability>

	// TODO: fix
	stageGroups?: any
	// stageGroups?: Responses.IListContentItemsResponse<StageGroup>
}

export interface KontentCurriculumResult<
	TKontentModel extends IContentItem<IContentItemElements>,
> {
	seo: Seo
	mappings: Mapping[]
	data: KontentCurriculumResultData<TKontentModel>
}

/**
 * Stage with availability
 *
 * `available` here means it has assigned to at least one syllabus
 */
// export interface StageWithAvailability extends Stage {
// 	available: boolean
// }

export interface CommonPageProps<
	TKontentModel extends IContentItem<IContentItemElements>,
> extends KontentCurriculumResult<TKontentModel> {
	className?: string
	errorCode?: number
	params: any
	preview: boolean
	children?: ReactNode
}
