import { EMPTY_KONTENT_RICHTEXT } from '@/constants'
import { getAllAssets, getAllItemsByType, getAllTaxonomies } from '@/lib/api'
import { Glossary } from '@/models/glossary'
import { Syllabus } from '@/models/syllabus'
import { projectModel } from '@/models/_project'
import { AssetWithRawElements, KontentCurriculumResult } from '@/types'
import {
	convertProjectModelTaxonomiesToITaxonomyTerms,
	setTaxonomiesForAssets,
} from '@/utils'
import { cleanJson } from '@/utils/cleanJson'
import { IContentItem } from '@kentico/kontent-delivery'
import intersection from 'lodash.intersection'
import { DataBuilderBuildDataParams } from '.'

async function buildData({
	result,
	pageResponse,
	preview = false,
}: DataBuilderBuildDataParams) {
	const pageResponseItem = pageResponse.item as Syllabus
	const _result: KontentCurriculumResult<IContentItem> = {
		...result,
		data: {
			...result.data,
			syllabuses: null,
			keyLearningAreas: null,
			glossaries: null,
			stages: null,
			stageGroups: null,
			assets: null,
		},
	}

	const pageStageStages = pageResponseItem.elements.stages__stages.value.map(
		(item) => item.codename,
	)

	const syllabuses = await getAllItemsByType<Syllabus>({
		type: 'syllabus',
		depth: 3,
		elementsParameter: [
			// 'organisationofcontent',
			'syllabus',
			// 'coursenumbers',
			'doredirect',
			'web_content_rtb__content',
			// 'syllabus_type__items',
			'stages__stage_years',
			// 'enrolment_type__items',
			// 'learning_k10',
			'introduction',
			// 'from_date',
			'aim',
			// 'rosa_hsc',
			// 'prerequisits',
			'rationale',
			'assessments',
			// 'learning_y11',
			// 'related_life_skills_syllabus',
			// 'learning_y12',
			// 'selftuition',
			// 'overview_200hourrules',
			'outcomes',
			'code',
			'stages__stages',
			'stages__stage_groups',
			// 'exclusions',
			// 'rosa_stage4_5',
			// 'to_date',
			'title',
			// 'redirecturl',
			// 'focus_area_continum_groups',
			'key_learning_area__items',
			// 'eligibility',
			// 'corequisites',
			// 'overview100hourrules',
			// 'requirements',
			// 'otherinfo',
			'focus_areas',

			/** Focus area elements */
			// 'syllabus_type__items',
			'stages__stage_years',
			'outcomes',
			// 'continuumgroups',
			// 'resources',
			// 'addressedinparallel',
			'accesspointgroups',
			'teachingadvice',
			'content',
			'contentgroups',

			/** Outcome elements */
			'code',
			'description',

			/** Content group */
			'content_items',

			/** Access content group */
			'access_content_items',

			/** contentitem */
			'examples',
			'learningprogression_tags__literacy',
			'learningprogression_tags__numeracy',
		],
		containsFilter: {
			element: 'elements.stages__stages',
			value: pageStageStages,
		},
		notEqualsFilter: {
			element: 'elements.introduction',
			value: EMPTY_KONTENT_RICHTEXT,
		},
		preview,
	})

	// all syllabus tags for selected stage (coming from each syllabus in syllabuses)
	const stageSyllabusTags = syllabuses.items.flatMap((item) =>
		item.elements.syllabus.value.map((v) => v.codename),
	)

	syllabuses.linkedItems = cleanJson(syllabuses.linkedItems, 6)

	const [glossaries, assets, taxonomies] = await Promise.all([
		getAllItemsByType<Glossary>({
			type: 'glossary',
			anyFilter: {
				element: 'elements.syllabus',
				value: stageSyllabusTags,
			},
			preview,
			depth: 0,
		}),
		getAllAssets(),
		getAllTaxonomies(),
	])

	const assetsWithTaxonomies = setTaxonomiesForAssets(
		assets.items,
		taxonomies.items,
	)
	assets.items = assetsWithTaxonomies
		.filter((asset) => {
			return (
				asset.stages.length &&
				intersection(
					asset.stages.map((assetStage) => assetStage.codename),
					pageResponseItem.elements.stages__stages.value.map(
						(stagePageStage) => stagePageStage.codename,
					),
				).length
			)
		})
		.map((item) => {
			const {
				fileReference,
				imageHeight,
				imageWidth,
				lastModified,
				folder,
				_raw,
				...rest
			} = item
			return rest as AssetWithRawElements
		})

	_result.data.syllabuses = syllabuses
	_result.data.glossaries = glossaries
	_result.data.stages = convertProjectModelTaxonomiesToITaxonomyTerms(
		projectModel.taxonomies.stage,
	)
	_result.data.stageGroups = convertProjectModelTaxonomiesToITaxonomyTerms(
		projectModel.taxonomies.stage_group,
	)
	_result.data.keyLearningAreas =
		convertProjectModelTaxonomiesToITaxonomyTerms(
			projectModel.taxonomies.key_learning_area,
		)
	_result.data.assets = assets.items as AssetWithRawElements[]

	return _result
}

const _ = {
	buildData,
}

export default _
