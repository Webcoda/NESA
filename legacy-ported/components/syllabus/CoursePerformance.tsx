import React from 'react'
import { Grid } from '@material-ui/core'
import { Assessment } from '@/models/assessment'
import CustomAccordion from '../custom/CustomAccordion'
import SyllabusContentSection from './SyllabusContentSection'
import { RichTextProps } from '@/components/RichText'

export interface CoursePerformanceProps
	extends Omit<RichTextProps, 'richTextElement'> {
	/**
	 * CMS sections
	 */
	sections: Assessment[]
}

const CoursePerformance = (props: CoursePerformanceProps): JSX.Element => {
	const { sections, linkedItems, mappings } = props

	return (
		<Grid className="syllabus-content-section">
			{sections?.map((sec: Assessment) => (
				<Grid
					key={sec.system.id}
					className="assessment__container"
					data-kontent-item-id={sec.system.id}
					data-kontent-element-codename="assesment"
				>
					{/* <CustomAccordion title="Introduction"> */}
					<SyllabusContentSection
						richTextElement={sec.elements.introduction}
						linkedItems={linkedItems}
						mappings={mappings}
					/>
					{/* </CustomAccordion> */}
				</Grid>
			))}
		</Grid>
	)
}

export default CoursePerformance
