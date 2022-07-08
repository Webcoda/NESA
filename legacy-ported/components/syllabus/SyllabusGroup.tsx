import { getDataAttributesFromProps } from '@/utils'
import React, { ReactNode } from 'react'
import SyllabusCard, { SyllabusCardProps } from './SyllabusCard'

export type SyllabusGroupItem = Pick<
	SyllabusCardProps,
	'headline' | 'body' | 'url'
>

export interface SyllabusGroupProps {
	heading?: ReactNode
	items: SyllabusGroupItem[]
}

const SyllabusGroup = (props: SyllabusGroupProps): JSX.Element => {
	const { heading, items } = props

	const dataAttributes = getDataAttributesFromProps(props)
	return (
		<div {...dataAttributes} className="syllabus-group">
			{typeof heading === 'string' && heading && (
				<h2
					className="syllabus-group__heading"
					data-kontent-element-codename="title"
				>
					{heading}
				</h2>
			)}
			{typeof heading !== 'string' && heading}
			<div className="syllabus-group__card-grid">
				{items.map((s, index) => (
					<SyllabusCard
						// eslint-disable-next-line react/no-array-index-key
						key={`syllabusCard-${index}`}
						className="syllabus-group__card"
						{...s}
					/>
				))}
			</div>
		</div>
	)
}

export default SyllabusGroup
