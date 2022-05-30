/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { Grid as GridModel } from '@/models/grid'
import { GridColumn } from '@/models/grid_column'
import type { Mapping } from '@/types'
import { Grid as MuiGrid, GridSize } from '@material-ui/core'
import camelCase from 'lodash.camelcase'
import get from 'lodash.get'
import upperFirst from 'lodash.upperfirst'
import { UnknownComponent } from '..'
import sections from './index'

export interface GridProps {
	section: GridModel
	mappings: Mapping[]
}

export const Grid = (props: GridProps) => {
	const { section, mappings } = props

	const gapVertical = section.elements.gap_vertical.value
	const gapHorizontal = section.elements.gap_horizontal.value

	return (
		<section
			css={css`
				margin-top: ${gapVertical}px;
				margin-bottom: ${gapVertical}px;
			`}
		>
			<MuiGrid
				container
				component="div"
				css={css`
					&& {
						width: calc(100% + ${gapHorizontal}px);
						margin-left: -${gapHorizontal / 2}px;
						margin-right: -${gapHorizontal / 2}px;
					}

					&& > .MuiGrid-item {
						padding: ${gapVertical / 2}px ${gapHorizontal / 2}px;
					}
				`}
			>
				{section.elements.tiles.linkedItems
					.map((tile) => tile as GridColumn)
					.map((tile) => {
						return (
							<MuiGrid
								key={tile.system.id}
								item
								xs={
									tile.elements.column_widths__xs
										.value as GridSize
								}
								sm={
									tile.elements.column_widths__sm
										.value as GridSize
								}
								md={
									tile.elements.column_widths__md
										.value as GridSize
								}
								lg={
									tile.elements.column_widths__lg
										.value as GridSize
								}
							>
								{get(
									tile,
									'elements.tile_content.linkedItems',
									[],
								).map((section, index) => {
									const contentType = upperFirst(
										camelCase(
											get(section, 'system.type', null),
										),
									)
									const Component = sections[contentType]

									if (
										process.env.NODE_ENV ===
											'development' &&
										!Component
									) {
										console.error(
											`Unknown section component for section content type: ${contentType}`,
										)
										return (
											<UnknownComponent
												key={index}
												{...props}
											>
												<pre>
													{JSON.stringify(
														section,
														undefined,
														2,
													)}
												</pre>
											</UnknownComponent>
										)
									}

									return (
										<Component
											key={index}
											{...props}
											section={section}
											site={props}
										/>
									)
								})}
							</MuiGrid>
						)
					})}
			</MuiGrid>
		</section>
	)
}

export default Grid
