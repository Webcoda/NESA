import Layout from '@/components/Layout'
import RichText from '@/components/RichText'
import UnknownComponent from '@/components/UnknownComponent'
import { WpStagegroup as WpStageGroupModel } from '@/models/wp_stagegroup'
import { CommonPageProps } from '@/types'

function WpStageGroup(props: CommonPageProps<WpStageGroupModel>) {
	const { page, pageResponse } = props.data
	page.elements.web_content_rtb__content

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
				<h1 className="syllabus-overview__title">
					{page.elements.title.value}
				</h1>
			)}
			<RichText
				mappings={props.mappings}
				linkedItems={pageResponse.linkedItems}
				richTextElement={page.elements.web_content_rtb__content}
			/>
		</Layout>
	)
}

export default WpStageGroup
