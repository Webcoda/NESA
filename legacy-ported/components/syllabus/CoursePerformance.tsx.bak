import React from 'react'
import { Grid } from '@material-ui/core'
import { Assessment } from '@/models/assessment'
import CustomAccordion from '../custom/CustomAccordion'
import SyllabusContentSection from './SyllabusContentSection'

export interface CoursePerformanceProps {
	/**
	 * CMS sections
	 */
	sections: Assessment[]
}

const CoursePerformance = (props: CoursePerformanceProps): JSX.Element => {
	const { sections } = props

	return (
		<Grid className="syllabus-content-section">
			{sections?.map((sec: Assessment) => (
				<Grid key={sec.system.id} className="assessment__container">
					<CustomAccordion title={'TODO fix legacy-portedcomponentssyllabusCoursePerformance.tsx'}>
						{/* TODO: Syllabus Content */}
						<SyllabusContentSection
							innerHtml={'TODO fix legacy-portedcomponentssyllabusCoursePerformance.tsx'}
						/>
					</CustomAccordion>
				</Grid>
			))}
		</Grid>
	)
}

export default CoursePerformance
