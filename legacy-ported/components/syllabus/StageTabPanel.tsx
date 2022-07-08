import { Syllabus } from '@/models/syllabus'
import { ITaxonomyTerms } from '@kentico/kontent-delivery'
import { ReactNode } from 'react'
import CustomAccordion from '../custom/CustomAccordion'
import { SyllabusTabPanel, SyllabusTabPanelProps } from '../tabs/TabPanel'
export interface StageTabPanelProps {
	id: SyllabusTabPanelProps['id']
	tabValue: SyllabusTabPanelProps['tabValue']
	learningAreas: ITaxonomyTerms[]
	syllabuses: Syllabus[]
	body: (kla: any) => ReactNode
}

export const StageTabPanel = (props: StageTabPanelProps) => {
	const { id, tabValue, syllabuses, learningAreas, body } = props

	// group syllabus by `learningAreas`
	const klaWithSyllabuses = learningAreas.map((kla) => {
		return {
			kla: kla.codename,
			syllabuses:
				syllabuses?.filter((syllabus) =>
					syllabus?.elements?.key_learning_area__items.value.some(
						(v) => v.codename === kla.codename,
					),
				) || [],
		}
	})

	return (
		<SyllabusTabPanel id={id} tabValue={tabValue}>
			{/* Show available syllabuses first */}

			{klaWithSyllabuses.map(({ kla, syllabuses }) => {
				return (
					<div key={kla} id={kla}>
						{syllabuses.map((syl) => {
							return (
								<CustomAccordion
									id={syl.system.id}
									key={syl.system.id}
									title={syl.elements.title.value}
									// TODO: Remove isComingSoon condition after MVP
									startOpen
									// TODO: fix
									isComingSoon={false}
								>
									{body(syl)}
								</CustomAccordion>
							)
						})}
					</div>
				)
			})}
		</SyllabusTabPanel>
	)
}
