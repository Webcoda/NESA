import type { Action as ModelAction } from '@/models/action'
import { Mapping } from '@/types'
import get from 'lodash.get'
import { Icon, Link } from '.'
import { getUrlFromMapping } from '../utils'

interface ActionProps {
	action: ModelAction
	mappings: Mapping[]
	className?: string
}

function Action(props: ActionProps) {
	const { action, mappings, className } = props
	const navigationItem = get(
		action,
		'elements.navigation_item.linkedItems[0]',
		null,
	)
	const href =
		navigationItem.system.type === 'external_url'
			? get(navigationItem, 'elements.url.value')
			: getUrlFromMapping(mappings, navigationItem.system.codename)
	const action_options = get(action, 'elements.options.value', [])
	const config = {}

	const isShowIconOnly = !!action?.elements?.icon_only?.value.length

	const new_window = action_options.some(
		(item) => item.codename === 'new_window',
	)
	const no_follow = action_options.some(
		(item) => item.codename === 'no_follow',
	)
	const icon = get(action, 'elements.icon.linkedItems[0]', null)

	const iconPosition = get(
		icon,
		'elements.icon_position.value[0].codename',
		null,
	)
	const options = {
		target: new_window ? '_blank' : undefined,
		rel:
			new_window || no_follow
				? `${new_window ? 'noopener noreferrer' : ''} ${
						no_follow ? 'nofollow' : ''
				  }`.trim()
				: undefined,
	}

	return !isShowIconOnly ? (
		<Link className={className} href={href} {...config} {...options}>
			{iconPosition && iconPosition === 'left' && <Icon icon={icon} />}
			<span>{action.elements.label.value}</span>
			{iconPosition && iconPosition === 'right' && <Icon icon={icon} />}
		</Link>
	) : (
		<Link
			className={className}
			aria-label={action.elements.label.value}
			href={href}
			{...config}
			{...options}
		>
			<Icon icon={icon} />
		</Link>
	)
}

export default Action
