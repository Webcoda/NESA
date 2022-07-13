import { Glossary } from '@/models/glossary'
import { Syllabus } from '@/models/syllabus'
import { UiMenu } from '@/models/ui_menu'
import { Weblinkext } from '@/models/weblinkext'
import { Weblinkint } from '@/models/weblinkint'
import { WpHomepage } from '@/models/wp_homepage'
import {
	IContentItem,
	IContentItemElements,
	IContentItemSystemAttributes,
	ITaxonomyTerms,
	Responses,
} from '@kentico/kontent-delivery'
import { AssetContracts, AssetModels } from '@kentico/kontent-management'
import { ReactNode } from 'react'

export type LinkType = UiMenu | Weblinkint | Weblinkext

export interface AssetRawElementInner {
	id: string
}

export interface AssetRawElement {
	element: AssetRawElementInner
	value: AssetRawElementInner[]
}

export interface AssetRaw extends AssetContracts.IAssetModelContract {
	elements: AssetRawElement[]
}

export interface AssetWithRawElements extends AssetModels.Asset {
	_raw: AssetRaw
	resource_type: ITaxonomyTerms[]
	stage_groups: ITaxonomyTerms[]
	stages: ITaxonomyTerms[]
	stage_years: ITaxonomyTerms[]
	key_learning_area: ITaxonomyTerms[]
	syllabuses: ITaxonomyTerms[]
	assetpublishedyear: ITaxonomyTerms[]
	assetpublishedmonth: ITaxonomyTerms[]
}

export interface MappingParams {
	pageTitle: string
	slug: string[]
	navigationItem?: IContentItemSystemAttributes
	contentItem?: IContentItemSystemAttributes
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
	pageResponse: Responses.IViewContentItemResponse<TKontentModel>
	syllabuses?: Responses.IListContentItemsResponse<Syllabus>
	keyLearningAreas?: ITaxonomyTerms[]
	glossaries?: Responses.IListContentItemsResponse<Glossary>
	stages?: ITaxonomyTerms[]
	stageGroups?: ITaxonomyTerms[]
	assets?: AssetWithRawElements[]
}

export interface KontentCurriculumResult<
	TKontentModel extends IContentItem<IContentItemElements>,
> {
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
