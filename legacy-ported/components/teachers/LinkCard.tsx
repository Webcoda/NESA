import React from 'react'
import Card from '@/lib/nsw-ds-react/src/component/card/card'
import { Icon } from '@iconify/react'

export interface LinkCardProps {
	headline: string
	link: string
	linkTarget?: string
	className?: string
}

const LinkCard = (props: LinkCardProps): JSX.Element => {
	const { headline, link, linkTarget, className = '' } = props

	const isExternal = linkTarget === '_blank'

	return (
		<Card
			headline={
				<>
					<span
						style={{
							verticalAlign: 'middle',
							marginRight: isExternal ? 8 : 0,
						}}
						data-kontent-element-codename="title"
					>
						{headline}
					</span>
					{isExternal ? (
						<Icon
							style={{ verticalAlign: 'middle' }}
							icon="fa-solid:external-link-alt"
						/>
					) : null}
				</>
			}
			highlight
			link={link}
			linkTarget={linkTarget}
			className={className}
		/>
	)
}

export default LinkCard
