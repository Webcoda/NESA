import { Layout, RichText } from '@/components'
import { useGlossary } from '@/legacy-ported/components/base/Glossary'
import GlossaryBody from '@/legacy-ported/components/base/GlossaryBody'
import GlossaryHeader from '@/legacy-ported/components/base/GlossaryHeader'
import ResourceFilter, {
	ISelectFilter,
	ISelectOptionList,
} from '@/legacy-ported/components/support/ResourceFilter'
import { Glossary } from '@/models/glossary'
import { PageGlossary as PageGlossaryModel } from '@/models/page_glossary'
import { Syllabus } from '@/models/syllabus'
import { convertGlossaryToIGlossary } from '@/utils'
import { Grid } from '@material-ui/core'
import get from 'lodash.get'
import { useState } from 'react'

export default function PageGlossary(props) {
	const page: PageGlossaryModel = get(props, 'data.page.item', null)
	const allGlossaries: Glossary[] = get(props, 'data.glossaries.items', null)
	const allSyllabuses: Syllabus[] = get(props, 'data.syllabuses.items', null)
	const terms = convertGlossaryToIGlossary(allGlossaries)

	// states
	const [currentFilter, setCurrentFilter] = useState<string>()
	const [glossaryHeaderProps, filter] = useGlossary({
		sections: terms,
		syllabusFilter: currentFilter,
	})

	const dropdowns: ISelectOptionList[] = [
		{
			id: 'syllabus',
			name: 'Syllabus',
			options: allSyllabuses.map((syllabus: Syllabus) => ({
				text: syllabus.elements.title.value,
				value: syllabus.system.codename,
			})),
			gridSize: 8,
		},
	]

	// Methods
	const handleApplyFilters = (filters: ISelectFilter[]) => {
		if (filters.length > 0 && filters[0].value) {
			setCurrentFilter(filters[0].value)
		} else {
			setCurrentFilter(undefined)
		}
	}

	return (
		<Layout
			className={`syllabus-overview syllabus-overview--{subject}`}
			{...props}
		>
			<Grid container direction="column">
				{page.elements.title.value && (
					<h1 className="glossary-page__title">
						{page.elements.title.value}
					</h1>
				)}
				<GlossaryHeader {...glossaryHeaderProps} hideExplanationText />
				<ResourceFilter
					dropdowns={dropdowns}
					onApplyFilters={handleApplyFilters}
					filterButtonGridSize={4}
				/>
				<div className="glossary-page__body">
					<RichText
						{...props}
						className="cms-content-formatting"
						richTextElement={page.elements.intro}
					/>
					<GlossaryBody sections={filter(terms)} />
				</div>
			</Grid>
		</Layout>
	)
}
