import Link from '@/components/Link'
import { UiMenu } from '@/models/ui_menu'
import { Weblinkext } from '@/models/weblinkext'
import { Weblinkint } from '@/models/weblinkint'
import { LinkType, Mapping } from '@/types'
import getUrlFromMapping from '@/utils/getUrlFromMapping'
import { ReactNode } from 'react'

export interface AnchorProps {
	className?: string
	link: LinkType
	mappings: Mapping[]
	children?: ReactNode
}

export default function Anchor(props: AnchorProps) {
	const { className, link, mappings, children } = props

	const isExternal = link.system.type === 'weblinkext'

	if (isExternal) {
		let _link = link as Weblinkext

		return (
			<Link
				className={className}
				href={_link.elements.link_url.value}
				target="_blank"
				rel="noreferrer noopener"
			>
				{children || link.elements.title.value}
			</Link>
		)
	} else {
		let _link = link as Weblinkint | UiMenu
		const item = _link.elements.item.linkedItems[0]
		if (!item) return null
		const href = getUrlFromMapping(mappings, item?.system.codename)
		return href ? (
			<Link className={className} href={href}>
				{children || link.elements.title.value}
			</Link>
		) : null
	}
}
