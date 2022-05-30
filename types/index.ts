import { Glossary } from '@/models/glossary'
import { Homepage } from '@/models/homepage'
import { KeyLearningArea } from '@/models/key_learning_area'
import { Stage } from '@/models/stage'
import { StageGroup } from '@/models/stage_group'
import { Syllabus } from '@/models/syllabus'
import {
	Elements,
	IContentItemSystemAttributes,
	Responses,
} from '@kentico/kontent-delivery'

export interface MappingParams {
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
		Homepage,
		| 'seo__description'
		| 'seo__options'
		| 'seo__canonical_url'
		| 'seo__keywords'
		| 'seo__title'
	> {}

export interface KontentCurriculumResultData {
	config: {
		item: HomepageConfig
	}
}

export interface KontentCurriculumResult {
	seo: Seo
	mappings: Mapping[]
	data: {
		config: HomepageConfig
		page: any
		syllabuses?: Responses.IListContentItemsResponse<Syllabus>
		keyLearningAreas?: Responses.IListContentItemsResponse<KeyLearningArea>
		glossaries?: Responses.IListContentItemsResponse<Glossary>
		stages?: Responses.IListContentItemsResponse<StageWithAvailability>
		stageGroups?: Responses.IListContentItemsResponse<StageGroup>
	}
}

/**
 * Stage with availability
 *
 * `available` here means it has assigned to at least one syllabus
 */
export interface StageWithAvailability extends Stage {
	available: boolean
}

interface StageGroupElement {
	title: Elements.TextElement
	order: Elements.NumberElement
	years: Elements.MultipleChoiceElement
}