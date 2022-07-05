import React, { useState } from 'react'
import { filterTree, TreeElement } from './treeUtils'
// import SearchBar from '../base/SearchBar'
import TreePicker, { TreePickerProps } from './TreePicker'
import { AllTags, NullTag } from '@/legacy-ported/store/mock/tags'

export interface Tag extends TreeElement {
	shortName?: string
}

const BuildTreeNodes = (
	existingNodes: TreeElement[],
	leafId: string,
	partialId: string,
	layers: string[],
): TreeElement[] => {
	const layerLabel = layers[0]
	if (layers.length === 1) {
		existingNodes.push({
			id: leafId,
			label: layerLabel,
		})
	} else {
		const layerId = [partialId, layerLabel].join('|')

		let layerNode = existingNodes.find((n) => n.id === layerId)
		if (!layerNode) {
			layerNode = {
				id: layerId,
				label: layerLabel,
				children: [],
			}
			existingNodes.push(layerNode)
		}

		layerNode.children = BuildTreeNodes(layerNode.children!, leafId, layerId, layers.slice(1))
	}

	return existingNodes
}

export const TagTree: TreeElement[] = AllTags.reduce<TreeElement[]>(
	(acc, tag) =>
		BuildTreeNodes(
			acc,
			tag.code,
			'',
			[tag.category, tag.sub_category, tag.sub_sub_category, tag.tag].filter((s) => s !== NullTag),
		),
	[],
)

export type FixedTreePickerProps = Omit<TreePickerProps, 'rootElements'>

const TagPicker = (props: FixedTreePickerProps): JSX.Element => {
	const [tagFilter, setTagFilter] = useState('')

	const handleSearch = (text: string) => {
		setTagFilter(text)
	}

	let filteredTags: TreeElement[] = TagTree
	if (tagFilter) {
		filteredTags = filteredTags.flatMap(
			(root) => filterTree(root, (e) => e.label.toLowerCase().includes(tagFilter.toLowerCase())) ?? [],
		)
	}

	return (
		<>
			{/*  TODO: fix search bar */}
			{/* <SearchBar onSearch={handleSearch} className="syllabus-picker__search-bar" /> */}
			<TreePicker rootElements={filteredTags} {...props} />
		</>
	)
}

export default TagPicker
