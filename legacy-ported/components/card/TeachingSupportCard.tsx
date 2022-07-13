import { RichTextProps } from '@/components/RichText'
import { getDataAttributesFromProps } from '@/utils'
import { Elements } from '@kentico/kontent-delivery'
import { Paper } from '@material-ui/core'
import SyllabusContentSection from '../syllabus/SyllabusContentSection'

export interface TeachingSupportCardProps
	extends Omit<RichTextProps, 'className' | 'richTextElement'> {
	/**
	 * Card title
	 */
	title?: string

	/**
	 * Syllabus Content
	 */
	content: Elements.RichTextElement
}

export default function TeachingSupportCard(props: TeachingSupportCardProps) {
	const { title, content, linkedItems, mappings, ...rest } = props
	const dataAttributes = getDataAttributesFromProps(rest)

	return (
		<Paper
			className="teaching-support-card nsw-p-sm nsw-p-bottom-lg outcome-detail-card--default-background"
			{...dataAttributes}
		>
			{title && (
				<div
					className="content-organizer__outcome-title"
					data-kontent-element-codename="title"
				>
					<h1>{title}</h1>
					<hr />
				</div>
			)}
			<div className="teaching-support-card__detail">
				<h2>Teaching advice</h2>
				<hr />
				<SyllabusContentSection
					data-kontent-element-codename="content"
					richTextElement={content}
					linkedItems={linkedItems}
					mappings={mappings}
				/>
			</div>
		</Paper>
	)
}
