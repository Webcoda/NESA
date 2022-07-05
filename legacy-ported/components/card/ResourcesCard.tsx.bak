import React, { ReactNode } from 'react'
import Card from '@material-ui/core/Card'
import { CardContent } from '@material-ui/core'

export interface ResourcesCardProps {
	/**
	 * Any react component to be displayed in the modal body
	 */
	children: ReactNode

	/**
	 * An optional image or video to embed above the card content
	 */
	media?: ReactNode

	/**
	 * Marks the card with a coloured top border
	 */
	colour?: 'primary' | 'secondary'

	className?: string
}

/**
 * A clickable Card that displays a single syllabus item
 * @param props
 * @constructor
 */
const ResourcesCard = (props: ResourcesCardProps): JSX.Element => {
	const { children, media, colour, className } = props

	return (
		<Card className="resources-card">
			{media}
			<div
				className={`resources-card ${
					colour ? `resources-card--${colour}` : ''
				} ${className || ''}`}
			>
				<CardContent className="resources-card__content">
					{children}
				</CardContent>
			</div>
		</Card>
	)
}

export default ResourcesCard
