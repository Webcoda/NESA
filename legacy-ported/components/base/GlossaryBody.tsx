import SanitisedHTMLContainer from '@/components/SanitisedHTMLContainer'
import { Glossary } from '@/models/glossary'
import { KeyLearningArea } from '@/models/key_learning_area'
import React from 'react'
import { IGlossaryRecord } from '../../utilities/backendTypes'
import CustomAccordion from '../custom/CustomAccordion'
import Chip from './Chip'
import { GlossaryProps } from './Glossary'

interface GlossaryDefinition {
	term: IGlossaryRecord['term']
	key: IGlossaryRecord['alias']
	definitions: Pick<IGlossaryRecord, 'klaId' | 'description'>[]
}

export type GlossaryBodyProps = Pick<GlossaryProps, 'sections'>

const GlossaryBody = ({ sections }: GlossaryBodyProps): JSX.Element => {
	const terms = sections
		.flatMap((s) => s.records)
		.reduce<GlossaryDefinition[]>((acc, val: Glossary) => {
			const found = acc.find((r) => r.key === val.elements.title.value)
			const keyLearning = val.elements.key_learning_area.linkedItems.map<KeyLearningArea>(item => item as KeyLearningArea);
			const firstKeyLearning = keyLearning[0]

			const klaId = firstKeyLearning?.elements.title.value;
			const description = val.elements.description.value;


			const klaExists = found?.definitions.some((d) => {
				return d.klaId === klaId
			})

			if (klaExists) {
				console.error(`Definition collision on Glossary Term ${val.elements.title.value} for learning area ${klaId}`)
				return acc
			}

			if (found) {
				found.definitions.push({
					klaId,
					description,
				})
			} else {
				acc.push({
					term: val.elements.title.value,
					key: val.elements.title.value,
					definitions: [
						{
							klaId,
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
						<div key={d.klaId} className="glossary-body__definition">
							{t.definitions.length >= 1 && d.klaId && (
								<Chip text={d.klaId} className="glossary-body__chip" />
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
