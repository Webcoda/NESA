import React from 'react'
import sanitizeHtml from 'sanitize-html'

export interface SyllabusContentSectionProps {
	innerHtml: string
}

const SyllabusContentSection = (
	props: SyllabusContentSectionProps,
): JSX.Element => {
	const { innerHtml } = props

	return (
		<div
			className="syllabus-content-section cms-content-formatting"
			// eslint-disable-next-line react/no-danger
			dangerouslySetInnerHTML={{ __html: sanitizeHtml(innerHtml) }}
		/>
	)
}

export default SyllabusContentSection
