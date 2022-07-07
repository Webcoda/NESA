import InPageNav from '@/components/InPageNav'
import Layout from '@/components/Layout'
import RichText from '@/components/RichText'
import UnknownComponent from '@/components/UnknownComponent'
import { WebPage as WebPageModel } from '@/models/web_page'
import { CommonPageProps } from '@/types'

function WebPage(props: CommonPageProps<WebPageModel>) {
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
		<Layout
			{...props}
			className="nav-page__content syllabus-overview generic-content-page nsw-container"
		>
			{page.elements.title.value && (
				<h1 className="syllabus-overview__title diversity-of-learners">
					{page.elements.title.value}
				</h1>
			)}
			{page.elements.show_in_page_navigation.value[0]?.name.toLowerCase() ===
				'yes' && (
				<InPageNav
					richTextElement={page.elements.web_content_rtb__content}
				/>
			)}
			<RichText
				className="cms-content-formatting"
				mappings={props.mappings}
				linkedItems={pageResponse.linkedItems}
				richTextElement={page.elements.web_content_rtb__content}
			/>
		</Layout>
	)
}

export default WebPage
