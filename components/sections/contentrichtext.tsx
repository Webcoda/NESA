import { Contentrichtext } from '@/models/contentrichtext'
import { RichtextSectionProps } from '.'
import RichText from '../RichText'

export default function contentrichtext({
	linkedItem,
	mappings,
	linkedItems,
}: RichtextSectionProps<Contentrichtext>) {
	return (
		<RichText
			richTextElement={linkedItem.elements.content}
			mappings={mappings}
			linkedItems={linkedItems}
		/>
	)
}
