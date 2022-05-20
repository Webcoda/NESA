import React, { useEffect, useMemo, useState } from 'react'
import GlossaryHeader, { GlossaryHeaderProps } from './GlossaryHeader'
import { alphabet, AlphabetChar } from '../../utilities/frontendTypes'
import GlossaryBody from './GlossaryBody'
import { IGlossary, IGlossaryRecord } from '../../utilities/backendTypes'
import { Glossary as GlossaryType } from '@/models/glossary'
import { KeyLearningArea } from '@/models/key_learning_area'
import { Syllabus } from '@/models/syllabus'

const matchesSearch = (text: string, record: GlossaryType) => {
	const keyLearningTitles: string[] = record.elements.syllabus.linkedItems.flatMap((syllabus: Syllabus) => {
		return syllabus.elements.key_learning_area.linkedItems.map(item => item as KeyLearningArea).map(item => item.elements.title.value)
	})
	return [record.elements.title.value, record.elements.description.value, keyLearningTitles]
		.join()
		.toLowerCase()
		.includes(text.toLowerCase())
}

export interface GlossaryProps {
	/**
	 * The initial search term, mostly used for testing
	 */
	startSearchTerm?: string

	/**
	 * Filter terms to only include a specific KLA
	 */
	klaFilter?: string

	/**
	 * Terms defined in the glossary
	 */
	sections: IGlossary[]
}

const applySearchAndFilter = (
	filterSections: IGlossary[],
	selectedFilter?: string,
	searchTerm?: string,
	klaFilter?: string,
): IGlossary[] => {
	if(!filterSections) return []
	return filterSections?.filter(({ section }) => !selectedFilter || section === selectedFilter)
		?.map(({ section, records }) => {
			return ({
				section,
				records: records
					.filter((r) => {
						const keyLearningValues : string[] = r.elements.syllabus.linkedItems.flatMap((syllabus: Syllabus) => {
							return syllabus.elements.key_learning_area.value
						})
						return !klaFilter || keyLearningValues.includes(klaFilter) || !keyLearningValues.length
					})
					.filter((r) => !searchTerm || matchesSearch(searchTerm, r)),
			})
		})
		?.filter(({ records }) => records.length)
}

/**
 * Hook to make glossary functionality usable in split-body scenarios. Allows a single glossary
 * header to control multiple bodies without adding complexity to containing component.
 * @param props see GlossaryProps. Should contain all terms used in any glossary body.
 * @return [
 *  A complete set of GlossaryHeaderProps that can be passed to the header component,
 *  A filter that can be applied to individual body terms.
 * ]
 */
export const useGlossary = (props: GlossaryProps): [GlossaryHeaderProps, (terms: IGlossary[]) => IGlossary[]] => {
	const { startSearchTerm, klaFilter, sections } = props

	const [searchTerm, setSearchTerm] = useState(startSearchTerm)
	const [selectedFilter, setSelectedFilter] = useState<AlphabetChar>()

	const availableSections = useMemo(
		// Don't apply selectedFilter here, otherwise picking a letter disables all others
		() => applySearchAndFilter(sections, undefined, searchTerm, klaFilter),
		[sections, searchTerm, klaFilter],
	)

	const disabledButtons = useMemo(
		() => alphabet.filter((char) => !availableSections.some((section) => section.section === char)),
		[availableSections],
	)

	useEffect(() => {
		// If our search term has no results under current filter char
		if (selectedFilter && disabledButtons.includes(selectedFilter)) {
			// remove filter
			setSelectedFilter(undefined)
		}
	}, [disabledButtons])

	const handleSearch = (term: string | null) => {
		setSearchTerm(term ?? undefined)
	}

	const handleSelect = (char: AlphabetChar) => {
		if (selectedFilter === char) {
			setSelectedFilter(undefined)
		} else {
			setSelectedFilter(char)
		}
	}

	return [
		{
			selected: selectedFilter,
			onSelect: handleSelect,
			disabled: disabledButtons,
			startSearchTerm: searchTerm,
			onSearch: handleSearch,
		},
		(filterSections) => applySearchAndFilter(filterSections, selectedFilter, searchTerm, klaFilter),
	]
}

/**
 * A glossary of terms, providing descriptive text.
 * @param props
 * @constructor
 */
const Glossary = (props: GlossaryProps): JSX.Element => {
	const { sections } = props

	const [headerProps, filter] = useGlossary(props)

	return (
		<div>
			<GlossaryHeader {...headerProps} />
			<GlossaryBody sections={filter(sections)} />
		</div>
	)
}

export default Glossary
