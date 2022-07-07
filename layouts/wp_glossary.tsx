import Layout from '@/components/Layout'
import RichText from '@/components/RichText'
import UnknownComponent from '@/components/UnknownComponent'
import { WpGlossary as WpGlossaryModel } from '@/models/wp_glossary'
import { CommonPageProps } from '@/types'

function WpGlossary(props: CommonPageProps<WpGlossaryModel>) {
	const { pageResponse } = props.data
	const page = pageResponse.item

	if (!page) {
		return (
			<UnknownComponent>
				Page {page.system.codename} does not have any content!
			</UnknownComponent>
		)
	}

	return (
		<Layout {...props}>
			<RichText
				data-kontent-element-codename="web_content_rtb__content"
				className="cms-content-formatting"
				mappings={props.mappings}
				linkedItems={pageResponse.linkedItems}
				richTextElement={page.elements.web_content_rtb__content}
			/>
		</Layout>
	)
}

export default WpGlossary
