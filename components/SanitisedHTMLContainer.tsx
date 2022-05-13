import React from 'react'
import sanitizeHtml from 'sanitize-html'

// export interface SanitisedHTMLContainerProps extends HTMLProps<HTMLDivElement> {
// 	children: string
// }

const SanitisedHTMLContainer = ({ children, ...others }) => {
	const sanitisedChildren = sanitizeHtml(children)
	return (
		// eslint-disable-next-line react/no-danger
		<div {...others} dangerouslySetInnerHTML={{ __html: sanitisedChildren }} />
	)
}

export default SanitisedHTMLContainer
