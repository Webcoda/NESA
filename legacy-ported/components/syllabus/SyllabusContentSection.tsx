import RichText, { RichTextProps } from '@/components/RichText'
import { getDataAttributesFromProps } from '@/utils'

const SyllabusContentSection = (props: RichTextProps): JSX.Element => {
	const { richTextElement, linkedItems, mappings, ...rest } = props
	const dataAttributes = getDataAttributesFromProps(rest)
	return (
		<RichText
			{...dataAttributes}
			className="syllabus-content-section cms-content-formatting"
			linkedItems={linkedItems}
			mappings={mappings}
			richTextElement={richTextElement}
		/>
	)
}

export default SyllabusContentSection
