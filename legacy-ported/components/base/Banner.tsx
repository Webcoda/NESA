import * as React from 'react'
import { Grid } from '@material-ui/core'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

export interface IBannerProps {
	id: string
	name: string
	title: string
	description?: string
	buttonLabel: string
	onClick?: () => void
}

export default function Banner(props: IBannerProps) {
	const { id, name, buttonLabel, title, description, onClick } = props

	return (
		<div className={`banner banner__${name}`} data-kontent-item-id={id}>
			<Grid className="banner__content" container item xs={12} md={6}>
				<h3
					className="banner__title"
					data-kontent-element-codename="title"
				>
					{title}
				</h3>
				{description && (
					<p className="banner__description">{description}</p>
				)}
				<button
					type="button"
					onClick={onClick}
					className="banner__button nsw-button nsw-button--primary"
					data-kontent-element-codename="more_info_link"
				>
					{buttonLabel}
					<ChevronRightIcon />
				</button>
			</Grid>
		</div>
	)
}
