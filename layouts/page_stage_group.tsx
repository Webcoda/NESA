import { Layout } from '@/components'
import { SyllabusGroupItem } from '@/legacy-ported/components/syllabus/SyllabusGroup'
import { PageStageGroup as PageStageGroupModel } from '@/models/page_stage_group'
import { Stage } from '@/models/stage'
import { StageGroup } from '@/models/stage_group'
import { Syllabus } from '@/models/syllabus'
import { getUrlFromStage, renderSections } from '@/utils'
import get from 'lodash.get'
import dynamic from 'next/dynamic'

const ReactJson = dynamic(() => import('react-json-view'), {
	ssr: false,
}) as any

export default function PageStageGroup(props) {
	const page: PageStageGroupModel = get(props, 'data.page.item', null)
	const allSyllabuses: Syllabus[] = get(props, 'data.syllabuses.items', null)

	const stages: SyllabusGroupItem[] = page.elements.stage_group.linkedItems
		.map((item) => item as StageGroup)[0]
		?.elements.stages.linkedItems.map((stage: Stage) => {
			const urlFromMapping = getUrlFromStage(
				stage.system.codename,
				props.mappings,
			)
			const syllabusGroupItem: SyllabusGroupItem = {
				headline: stage.elements.title.value,
				body: 'All Learning areas',
				url: {
					title: stage.elements.title.value,
					external: !urlFromMapping,
					url: urlFromMapping || '#',
				},
			}
			return syllabusGroupItem
		})

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
			<ReactJson src={props} collapsed />
			<ReactJson src={page} collapsed />
		</Layout>
	)
}
