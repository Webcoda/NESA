import { Layout } from '@/components'
import { PageStageGroup as PageStageGroupModel } from '@/models/page_stage_group'
import { renderSections } from '@/utils'
import get from 'lodash.get'

export default function PageStageGroup(props) {
	const page: PageStageGroupModel = get(props, 'data.page.item', null)

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
