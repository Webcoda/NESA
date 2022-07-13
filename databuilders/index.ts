import { getItemByCodename } from '@/lib/api'
import { KontentCurriculumResult } from '@/types'
import {
	IContentItem,
	IContentItemElements,
	Responses,
} from '@kentico/kontent-delivery'
import syllabus from './syllabus'
import wp_stage from './wp_stage'

export interface DataBuilderBuildDataParams {
	result: KontentCurriculumResult<IContentItem<IContentItemElements>>
	pageResponse: Responses.IViewContentItemResponse<IContentItem>
	preview: boolean
}

export interface DefaultPageResponseParams {
	codename: string
	type: string
	preview: boolean
}

export type GetPageResponseParams = Omit<DefaultPageResponseParams, 'type'>

export interface DataBuilder {
	getPageResponse?: (
		params: GetPageResponseParams,
	) => Promise<Responses.IViewContentItemResponse<IContentItem>>
	buildData?: (
		params: DataBuilderBuildDataParams,
	) => Promise<KontentCurriculumResult<IContentItem<IContentItemElements>>>
}

export const PAGE_RESPONSE_DEPTH = {
	wp_homepage: 3,
	wp_stagegroup: 2,
	wp_learningarea: 2,
	wp_stage: 0,
	syllabus: 3,
}

export const dataBuilders = {
	wp_stage,
	syllabus,
}

export async function getDefaultPageResponse({
	codename,
	type,
	preview,
}: DefaultPageResponseParams): Promise<
	Responses.IViewContentItemResponse<IContentItem<IContentItemElements>>
> {
	let depth = PAGE_RESPONSE_DEPTH[type]
	depth = depth == undefined ? 1 : depth
	return await getItemByCodename({
		codename,
		depth,
		preview,
	})
}

// } else if (isSyllabusPage) {
// 	const pageResponseItem = pageResponse.item as Syllabus

// 	const _result: KontentCurriculumResult<IContentItem> = {
// 		...result,
// 		data: {
// 			...result.data,
// 			syllabuses: null,
// 			keyLearningAreas: null,
// 			glossaries: null,
// 			stages: null,
// 			stageGroups: null,
// 			assets: null,
// 		},
// 	}

// 	const pageKlaKlas =
// 		pageResponseItem.elements.key_learning_area__items.value.map(
// 			(item) => item.codename,
// 		)

// 	const syllabuses = await getAllItemsByType<Syllabus>({
// 		type: 'syllabus',
// 		depth: 3,
// 		elementParameter: [
// 			// 'organisationofcontent',
// 			'syllabus',
// 			// 'coursenumbers',
// 			'doredirect',
// 			'web_content_rtb__content',
// 			// 'syllabus_type__items',
// 			'stages__stage_years',
// 			// 'enrolment_type__items',
// 			// 'learning_k10',
// 			'introduction',
// 			// 'from_date',
// 			'aim',
// 			// 'rosa_hsc',
// 			// 'prerequisits',
// 			'rationale',
// 			'assessments',
// 			// 'learning_y11',
// 			// 'related_life_skills_syllabus',
// 			// 'learning_y12',
// 			// 'selftuition',
// 			// 'overview_200hourrules',
// 			'outcomes',
// 			'code',
// 			'stages__stages',
// 			'stages__stage_groups',
// 			// 'exclusions',
// 			// 'rosa_stage4_5',
// 			// 'to_date',
// 			'title',
// 			// 'redirecturl',
// 			// 'focus_area_continum_groups',
// 			'key_learning_area__items',
// 			// 'eligibility',
// 			// 'corequisites',
// 			// 'overview100hourrules',
// 			// 'requirements',
// 			// 'otherinfo',
// 			'focus_areas',

// 			/** Focus area elements */
// 			// 'syllabus_type__items',
// 			'stages__stage_years',
// 			'outcomes',
// 			// 'continuumgroups',
// 			// 'resources',
// 			// 'addressedinparallel',
// 			'accesspointgroups',
// 			'teachingadvice',
// 			'content',
// 			'contentgroups',

// 			/** Outcome elements */
// 			'code',
// 			'description',

// 			/** Content group */
// 			'content_items',

// 			/** Access content group */
// 			'access_content_items',

// 			/** contentitem */
// 			'examples',
// 			'learningprogression_tags__literacy',
// 			'learningprogression_tags__numeracy',
// 		],
// 		containsFilter: {
// 			element: 'elements.stages__stages',
// 			value: pageKlaKlas,
// 		},
// 		allFilter: {
// 			element: 'elements.doredirect',
// 			value: ['yes'],
// 		},
// 		notEqualsFilter: {
// 			element: 'elements.introduction',
// 			value: EMPTY_KONTENT_RICHTEXT,
// 		},
// 		preview,
// 	})

// 	// all syllabus tags for selected stage (coming from each syllabus in syllabuses)
// 	const stageSyllabusTags = syllabuses.items.flatMap((item) =>
// 		item.elements.syllabus.value.map((v) => v.codename),
// 	)

// 	syllabuses.linkedItems = cleanJson(syllabuses.linkedItems, 6)

// 	const [glossaries, assets, taxonomies] = await Promise.all([
// 		getAllItemsByType<Glossary>({
// 			type: 'glossary',
// 			anyFilter: {
// 				element: 'elements.syllabus',
// 				value: stageSyllabusTags,
// 			},
// 			preview,
// 			depth: 0,
// 		}),
// 		getAllAssets(),
// 		getAllTaxonomies(),
// 	])

// 	const assetsWithTaxonomies = setTaxonomiesForAssets(
// 		assets.items,
// 		taxonomies.items,
// 	)
// 	assets.items = assetsWithTaxonomies
// 		.filter((asset) => {
// 			return (
// 				asset.stages.length &&
// 				intersection(
// 					asset.stages.map((assetStage) => assetStage.codename),
// 					pageKlaKlas,
// 				).length
// 			)
// 		})
// 		.map((item) => {
// 			const {
// 				fileReference,
// 				imageHeight,
// 				imageWidth,
// 				lastModified,
// 				folder,
// 				_raw,
// 				...rest
// 			} = item
// 			return rest as AssetWithRawElements
// 		})

// 	_result.data.syllabuses = syllabuses
// 	_result.data.glossaries = glossaries
// 	_result.data.stages = convertProjectModelTaxonomiesToITaxonomyTerms(
// 		projectModel.taxonomies.stage,
// 	)
// 	_result.data.stageGroups = convertProjectModelTaxonomiesToITaxonomyTerms(
// 		projectModel.taxonomies.stage_group,
// 	)
// 	_result.data.keyLearningAreas =
// 		convertProjectModelTaxonomiesToITaxonomyTerms(
// 			projectModel.taxonomies.key_learning_area,
// 		)
// 	_result.data.assets = assets.items as AssetWithRawElements[]

// 	return _result
// }
// else if (isStagePage || isSyllabusPage || isGlossaryPage) {
// 	const _result: KontentCurriculumResult<IContentItem> = {
// 		...result,
// 		data: {
// 			config: result.data.config,
// 			page: result.data.page,
// 			syllabuses: null,
// 			keyLearningAreas: null,
// 			glossaries: null,
// 			stages: null,
// 			stageGroups: null,
// 		},
// 	}

// 	const [syllabuses, keyLearningAreas, glossaries, stages, stageGroups] =
// 		await Promise.all([
// 			getAllItemsByType<Syllabus>({
// 				type: 'syllabus',
// 				depth: 6,
// 				preview,
// 			}),
// 			getAllItemsByType<Glossary>({
// 				type: 'glossary',
// 				preview,
// 				order: {
// 					element: 'elements.title',
// 					sortOrder: 'asc',
// 				},
// 			}),
// 			getAllItemsByType<Stage>({
// 				type: 'stage',
// 				preview,
// 				order: {
// 					element: 'elements.order',
// 					sortOrder: 'asc',
// 				},
// 			}),
// 			getAllItemsByType<StageGroup>({
// 				type: 'stage_group',
// 				preview,
// 				order: {
// 					element: 'elements.order',
// 					sortOrder: 'asc',
// 				},
// 			}),
// 		])

// 	_result.data.syllabuses = syllabuses
// 	_result.data.keyLearningAreas = keyLearningAreas
// 	_result.data.glossaries = glossaries
// 	_result.data.stages = stages
// 	_result.data.stageGroups = stageGroups

// 	const allYearsAssignedToSyllabus =
// 		_result.data.syllabuses.items.flatMap((syllabus) =>
// 			syllabus.elements.stagesyears__years.value.flatMap(
// 				(item) => item.name,
// 			),
// 		)

// 	_result.data.stageGroups.items = _result.data.stageGroups.items.filter(
// 		(stageGroup) => {
// 			return (
// 				intersection(
// 					stageGroup.elements.years.value.flatMap(
// 						(item) => item.name,
// 					),
// 					allYearsAssignedToSyllabus,
// 				).length > 0
// 			)
// 		},
// 	)

// 	return _result
// }
// else if (isTeachingAdvicePage) {
// 	const _result: KontentCurriculumResult<IContentItem> = {
// 		...result,
// 		data: {
// 			config: result.data.config,
// 			page: result.data.page,
// 			syllabuses: null,
// 			keyLearningAreas: null,
// 			stages: null,
// 		},
// 	}

// 	const [syllabuses, keyLearningAreas, stages] = await Promise.all([
// 		getAllItemsByType<Syllabus>({
// 			type: 'syllabus',
// 			depth: 6,
// 			preview,
// 		}),
// 		getAllItemsByType<IContentItem>({
// 			type: 'key_learning_area',
// 			preview,
// 			order: {
// 				element: 'elements.order',
// 				sortOrder: 'asc',
// 			},
// 		}),
// 		getAllItemsByType<IContentItem>({
// 			type: 'stage',
// 			preview,
// 			order: {
// 				element: 'elements.order',
// 				sortOrder: 'asc',
// 			},
// 		}),
// 	])

// 	_result.data.syllabuses = syllabuses
// 	_result.data.keyLearningAreas = keyLearningAreas
// 	_result.data.stages = stages

// 	return _result
// }
