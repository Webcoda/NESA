import { EMPTY_KONTENT_RICHTEXT } from '@/constants'
import {
	getAllAssets,
	getAllItemsByType,
	getAllTaxonomies,
	getItemByCodename,
} from '@/lib/api'
import { Glossary } from '@/models/glossary'
import { Syllabus } from '@/models/syllabus'
import { projectModel } from '@/models/_project'
import { AssetWithRawElements, KontentCurriculumResult } from '@/types'
import {
	convertProjectModelTaxonomiesToITaxonomyTerms,
	setTaxonomiesForAssets,
} from '@/utils'
import { cleanJson } from '@/utils/cleanJson'
import { Elements, IContentItem } from '@kentico/kontent-delivery'
import { DataBuilderBuildDataParams, GetPageResponseParams } from '.'
import { isIntersect } from './../utils/index'

function getPageResponse({ codename, preview }: GetPageResponseParams) {
	return getItemByCodename<Syllabus>({
		depth: 3,
		codename,
		preview,
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
	})
}

async function buildData({
	result,
	pageResponse,
	preview = false,
}: DataBuilderBuildDataParams) {
	const pageResponseItem = pageResponse.item as Syllabus
	const linkedItems = cleanJson(pageResponse.linkedItems, 6)
	pageResponse.linkedItems = Object.keys(linkedItems).reduce((acc, key) => {
		const item = linkedItems[key]
		const itemSyllabus = item?.elements
			?.syllabus as Elements.TaxonomyElement
		if (itemSyllabus) {
			if (
				isIntersect(
					itemSyllabus.value,
					pageResponseItem.elements.syllabus,
				)
			) {
				return {
					...acc,
					[key]: linkedItems[key],
				}
			}
			return acc
		}
		return {
			...acc,
			[key]: item,
		}
	}, {})

	const _result: KontentCurriculumResult<IContentItem> = {
		...result,
		data: {
			...result.data,
			pageResponse,
			syllabuses: null,
			keyLearningAreas: null,
			glossaries: null,
			stages: null,
			stageGroups: null,
			assets: null,
		},
	}
	const pageKlaKlas =
		pageResponseItem.elements.key_learning_area__items.value.map(
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
			value: pageKlaKlas,
		},
		allFilter: {
			element: 'elements.doredirect',
			value: ['yes'],
		},
		notEqualsFilter: {
			element: 'elements.introduction',
			value: EMPTY_KONTENT_RICHTEXT,
		},
		preview,
	})
	// all syllabus tags for selected stage (coming from each syllabus in syllabuses)
	const syllabusTags = pageResponseItem.elements.syllabus.value.map(
		(item) => item.codename,
	)
	syllabuses.linkedItems = cleanJson(syllabuses.linkedItems, 6)
	const [glossaries, assets, taxonomies] = await Promise.all([
		getAllItemsByType<Glossary>({
			type: 'glossary',
			anyFilter: {
				element: 'elements.syllabus',
				value: syllabusTags,
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
				asset.syllabuses.length &&
				isIntersect(
					asset.syllabuses.map((assetStage) => assetStage.codename),
					pageResponseItem.elements.syllabus.value.map(
						(s) => s.codename,
					),
				)
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
	getPageResponse,
	buildData,
}

export default _
