import { RichTextProps } from '@/components/RichText'
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
	const { title, content, linkedItems, mappings } = props

	return (
		<Paper className="teaching-support-card nsw-p-sm nsw-p-bottom-lg outcome-detail-card--default-background">
			{title && (
				<div className="content-organizer__outcome-title">
					<h1>{title}</h1>
					<hr />
				</div>
			)}
			<div className="teaching-support-card__detail">
				<h2>Teaching advice</h2>
				<hr />
				<SyllabusContentSection
					richTextElement={content}
					linkedItems={linkedItems}
					mappings={mappings}
				/>
			</div>
		</Paper>
	)
}
