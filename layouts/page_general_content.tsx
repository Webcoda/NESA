import { Layout } from '@/components'
import ComponentWithInPageNavLinks from '@/legacy-ported/components/custom/ComponentWithInPageNavLinks'
import { GeneralContentSection } from '@/models/general_content_section'
import { PageGeneralContent as PageGeneralContentModel } from '@/models/page_general_content'
import get from 'lodash.get'

export default function PageGeneralContent(props) {
	const page: PageGeneralContentModel = get(props, 'data.page.item', null)
	console.log(
		'🚀 ~ file: page_general_content.tsx ~ line 9 ~ PageGeneralContent ~ summary',
		page.elements.summary.value,
	)

	return (
		<Layout
			className="nav-page__content syllabus-overview generic-content-page nsw-container"
			{...props}
		>
			{page.elements.title.value && (
				<h1 className="syllabus-overview__title diversity-of-learners">
					{page.elements.title.value}
				</h1>
			)}
			<ComponentWithInPageNavLinks
				title="On this page"
				contents={page.elements.sections.linkedItems.map(
					(gcs: GeneralContentSection) => {
						return {
							title: gcs.elements.title.value,
							content: gcs.elements.content.value,
						}
					},
				)}
				summary={page.elements.summary.value || ''}
			/>
		</Layout>
	)
}
