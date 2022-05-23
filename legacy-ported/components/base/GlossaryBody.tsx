import SanitisedHTMLContainer from '@/components/SanitisedHTMLContainer'
import { Glossary } from '@/models/glossary'
import { Syllabus } from '@/models/syllabus'
import React from 'react'
import { IGlossaryRecord } from '../../utilities/backendTypes'
import CustomAccordion from '../custom/CustomAccordion'
import Chip from './Chip'
import { GlossaryProps } from './Glossary'

interface GlossaryDefinition extends Pick<IGlossaryRecord, 'description' | 'syllabuses'>{
	id: string
}

interface GlossaryTerm {
	term: IGlossaryRecord['term']
	key: IGlossaryRecord['alias']
	definitions: GlossaryDefinition[]
}

export type GlossaryBodyProps = Pick<GlossaryProps, 'sections'>

const GlossaryBody = ({ sections }: GlossaryBodyProps): JSX.Element => {
	const terms = sections
		.flatMap((s) => s.records)
		.reduce<GlossaryTerm[]>((acc, currentGlosssary: Glossary) => {
			const found = acc.find((r) => r.key === currentGlosssary.elements.title.value)
			const syllabussesOfCurrentGlossary = currentGlosssary.elements.syllabus.linkedItems.map((item) => item as Syllabus);
			const description = currentGlosssary.elements.description.value;

			if (found) {
				found.definitions.push({
					id: currentGlosssary.system.id,
					description,
					syllabuses: syllabussesOfCurrentGlossary,
				})
			} else {
				acc.push({
					term: currentGlosssary.elements.title.value,
					key: currentGlosssary.elements.title.value,
					definitions: [
						{
							id: currentGlosssary.system.id,
							syllabuses: syllabussesOfCurrentGlossary,
							description,
						},
					],
				})
			}

			return acc
		}, [])

	return (
		<div className="glossary-body">
			{terms.map((t) => (
				<CustomAccordion title={t.term} key={t.key} id={t.key}>
					{t.definitions.map((d) => (
						<div key={d.id} className="glossary-body__definition">
							{t.definitions.length >= 1 && d.syllabuses.length > 0 && (
								<>
									{
										d.syllabuses.map(syllabus => (
											<Chip text={syllabus.elements.title.value} className="glossary-body__chip" />
										))
									}
								</>
							)}
							<SanitisedHTMLContainer>{d.description}</SanitisedHTMLContainer>
						</div>
					))}
				</CustomAccordion>
			))}
		</div>
	)
}

export default GlossaryBody
