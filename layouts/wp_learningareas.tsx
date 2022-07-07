import Layout from '@/components/Layout'
import RichText from '@/components/RichText'
import UnknownComponent from '@/components/UnknownComponent'
import { WpLearningareas as WpLearningareasModel } from '@/models/wp_learningareas'
import { CommonPageProps } from '@/types'

function WpLearningAreas(props: CommonPageProps<WpLearningareasModel>) {
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
				className="cms-content-formatting"
				mappings={props.mappings}
				linkedItems={pageResponse.linkedItems}
				richTextElement={page.elements.web_content_rtb__content}
			/>
		</Layout>
	)
}

export default WpLearningAreas
