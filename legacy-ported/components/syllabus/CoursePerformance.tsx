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
		<Grid className="syllabus-content-section cms-content-formatting">
			{sections?.map((sec: Assessment) => (
				<Grid
					key={sec.system.id}
					className="assessment__container"
				>
					<CustomAccordion
						title={sec.elements.years.value.map((year) => year.name).join(', ')}
					>
						<SyllabusContentSection innerHtml={sec.elements.content.value} />
					</CustomAccordion>
				</Grid>
			))}
		</Grid>
	)
}

export default CoursePerformance
