import React from 'react'
import { Grid, GridSize } from '@material-ui/core'
import { HomepageTileCalloutTile } from '@/models/homepage_tile_callout_tile'
// import { SectionPage } from '../../pages/Home'
import ArrowButton from '../base/ArrowButton'
import { getLinkFromNavigationItem } from '@/utils'
import { Mapping } from '@/types'

export interface SectionCardProps {
	/**
	 * Card's title
	 */

	title: string
	/**
	 * Card's subtitle
	 */
	subtitle?: string

	/**
	 * Card's background colour
	 */
	backgroundColor: string

	/**
	 * Divider bar colour, it shows between the titles and pages links
	 */
	dividerColor: string

	/**
	 * Card's font colour
	 */
	fontColor: string

	/**
	 * Arrow's font colour
	 */
	arrowColor?: string

	/**
	 * Based on the design, this field allows you to define the number of Columns
	 * to display the items in large screens only
	 */
	numberOfColumns: number

	/**
	 * Array of section pages
	 */
	tiles: HomepageTileCalloutTile[]

	mappings: Mapping[]
}

export default function SectionCard(props: SectionCardProps) {
	const {
		title,
		subtitle,
		backgroundColor,
		dividerColor,
		fontColor,
		arrowColor,
		tiles,
		numberOfColumns,
		mappings,
	} = props

	return (
		<div
			className="section-card"
			style={{ backgroundColor, color: fontColor }}
		>
			<Grid container className="section-card__wrapper">
				<Grid
					container
					item
					xs={12}
					sm={12}
					md={3}
					alignItems="center"
					className="section-card__item"
				>
					<div className="section-card__titles">
						<h2>{title}</h2>
						{subtitle && <p>{subtitle}</p>}
					</div>
				</Grid>
				<Grid
					item
					xs={12}
					sm={12}
					md={1}
					className="section-card__divider-container"
				>
					<div
						className="section-card__divider"
						style={{ backgroundColor: dividerColor }}
					/>
				</Grid>
				<Grid
					container
					item
					xs={12}
					sm={12}
					md={8}
					alignItems="center"
					justifyContent="flex-start"
					className="section-card__buttons"
				>
					{tiles.map((tile) => {
						const navigationItem = tile.elements.path.linkedItems[0]
						const path = navigationItem
							? getLinkFromNavigationItem(
									navigationItem,
									mappings,
							  )
							: '#'

						return (
							<Grid
								item
								xs={12}
								sm={6}
								md={6}
								lg={
									tile.elements.column_widths__lg
										.value as GridSize
								}
								key={tile.system.id}
							>
								<ArrowButton
									title={tile.elements.title.value}
									prefix={tile.elements.prefix.value}
									path={path}
									fontColor={fontColor}
									arrowColor={arrowColor}
								/>
							</Grid>
						)
					})}
				</Grid>
			</Grid>
		</div>
	)
}
