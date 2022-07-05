import { Layout } from '@/components'
import { PageKeyLearningArea as PageKeyLearningAreaModel } from '@/models/page_key_learning_area'
import { renderSections } from '@/utils'
import get from 'lodash.get'

export default function PageKeyLearningArea(props) {
	const page: PageKeyLearningAreaModel = get(props, 'data.page.item', null)

	return (
		<Layout
			className={`syllabus-overview syllabus-overview--{subject}`}
			{...props}
		>
			{page.elements.title.value && (
				<h1 className="syllabus-overview__title">
					{page.elements.title.value}
				</h1>
			)}
			{renderSections(page, props)}
		</Layout>
	)
}
