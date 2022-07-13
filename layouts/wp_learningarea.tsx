import Layout from '@/components/Layout'
import RichText from '@/components/RichText'
import UnknownComponent from '@/components/UnknownComponent'
import { WpLearningarea as WpLearningareaModel } from '@/models/wp_learningarea'
import { CommonPageProps } from '@/types'

function WpLearningArea(props: CommonPageProps<WpLearningareaModel>) {
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
		<Layout {...props} className={`syllabus-overview`}>
			{page.elements.title.value && (
				<h1
					className="syllabus-overview__title"
					data-kontent-item-id={page.system.id}
					data-kontent-element-codename="title"
				>
					{page.elements.title.value}
				</h1>
			)}
			<RichText
				mappings={props.mappings}
				linkedItems={pageResponse.linkedItems}
				data-kontent-item-id={page.system.id}
				data-kontent-element-codename="web_content_rtb__content"
				richTextElement={page.elements.web_content_rtb__content}
			/>
		</Layout>
	)
}

export default WpLearningArea
