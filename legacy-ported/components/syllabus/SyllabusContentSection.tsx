import RichText, { RichTextProps } from '@/components/RichText'

const SyllabusContentSection = (props: RichTextProps): JSX.Element => {
	const { richTextElement, linkedItems, mappings } = props

	return (
		<RichText
			className="syllabus-content-section cms-content-formatting"
			linkedItems={linkedItems}
			mappings={mappings}
			richTextElement={richTextElement}
		/>
	)
}

export default SyllabusContentSection
