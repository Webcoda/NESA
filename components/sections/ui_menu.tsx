import { UiMenu } from '@/models/ui_menu'
import { RichtextSectionProps } from '.'

export default function ui_menu(props: RichtextSectionProps<UiMenu>) {
	const { linkedItem, mappings } = props

	return (
		<div className="ui_menu">
			{linkedItem.elements.title.value}
			{linkedItem.elements.subtitle.value}
		</div>
	)
}
