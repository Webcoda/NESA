export const EMPTY_KONTENT_RICHTEXT = '<p><br></p>'

/**
 * The order of these are exactly the same as the order
 * of the taxonomies fields in the CMS
 */
export const ASSET_TAXONOMIES = [
	'resource_type',
	'stage_groups',
	'stages',
	'stage_years',
	'key_learning_area',
	'syllabuses',
	'assetpublishedyear',
	'assetpublishedmonth',
]

/**
 * Just need to specify the file types that can't be retrieved
 * programatically
 */
export const FILE_TYPES = {
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
		'Word',
	'application/pdf': 'PDF',
}

export const STAGEGROUPS_STAGES = {
	primary: ['early_stage_1', 'stage_1', 'stage_2', 'stage_3'],
	secondary: ['stage_4', 'stage_5'],
	senior: ['stage_6'],
}
