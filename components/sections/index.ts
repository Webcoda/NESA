import { Mapping } from '@/types'
import { IContentItemsContainer } from '@kentico/kontent-delivery'
import math_formula from './math_formula'
import ui_cards from './ui_cards'
import ui_collection from './ui_collection'
import ui_herobanner from './ui_herobanner'
import ui_homepage_tile_callout from './ui_homepage_tile_callout'
import ui_media from './ui_media'
import ui_menu from './ui_menu'
import contentrichtext from './contentrichtext'

export interface RichtextSectionProps<TKontentModel> {
	linkedItem: TKontentModel
	mappings: Mapping[]
	linkedItems?: IContentItemsContainer
}

// all the names variable are matched to the linkedItem.system.type name
export const _ = {
	math_formula,
	ui_menu,
	ui_herobanner,
	ui_homepage_tile_callout,
	ui_cards,
	ui_collection,
	ui_media,
	contentrichtext,
}

export default _
