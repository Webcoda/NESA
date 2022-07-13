import React from 'react'
import { Grid, Paper } from '@material-ui/core'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { isMobile } from 'react-device-detect'
import SanitisedHTMLContainer from '@/components/SanitisedHTMLContainer'
import { getDataAttributesFromProps } from '@/utils'
import { Outcome } from '@/models/outcome'

export interface OutcomeCardProps {
	/*
	 * Title of the outcome
	 * */
	title: string
	/*
	 * List of the outcomes
	 * */
	outcomes?: Outcome[]
	/**
	 * Whether the card is currently selected
	 */
	selected?: boolean
	/**
	 * Whether the card is selectable
	 */
	isSelectable?: boolean
	/**
	 * Whether the card is selectable
	 */
	displayOutcome?: boolean
	/**
	 * Callback fired when card is pressed
	 */
	onClick?: (
		event:
			| React.MouseEvent<HTMLDivElement, MouseEvent>
			| React.KeyboardEvent<HTMLDivElement>,
	) => void

	/**
	 * Content code
	 */
	code?: string[]
}

export default function OutcomeCard(props: OutcomeCardProps) {
	const {
		title,
		outcomes,
		selected,
		isSelectable,
		onClick,
		code,
		displayOutcome = true,
		...rest
	} = props

	const dataAttributes = getDataAttributesFromProps(rest)

	return (
		<Paper
			className={`outcome-card nsw-p-md
        ${isSelectable ? 'outcome-card--selectable ' : ''}
        ${!onClick ? 'nsw-p-bottom-lg' : ''}
        ${selected ? 'outcome-card--selected' : ''}

      `}
			onClick={onClick}
			tabIndex={0}
			role="button"
			onKeyPress={onClick}
		>
			<Grid
				container
				className="outcome-card__title"
				alignItems="center"
				item
				xs={12}
			>
				<h4>
					{title} {onClick && <ChevronRightIcon />}
				</h4>
			</Grid>
			{outcomes &&
				outcomes.map((outcome, index) => (
					// eslint-disable-next-line react/no-array-index-key
					<Grid
						key={`outcome-${index}`}
						container
						item
						xs={12}
						className="outcome-card__outcome"
						data-kontent-item-id={outcome.system.id}
					>
						<Grid
							container
							item
							xs={12}
							sm={12}
							className="outcome-card__outcome-text"
							data-element-codename="code"
						>
							{outcome.elements.code.value && !displayOutcome && (
								<p className="strong nsw-p-top-sm nsw-p-bottom-sm">
									{outcome.elements.code.value}
								</p>
							)}
							{displayOutcome && (
								<p className="strong nsw-p-top-sm nsw-p-bottom-sm">
									Outcome
								</p>
							)}
						</Grid>
						{!isMobile && <br />}
						<Grid container item xs={12} sm={12}>
							<SanitisedHTMLContainer data-kontent-element-codename="description">
								{outcome.elements.description.value}
							</SanitisedHTMLContainer>
						</Grid>
					</Grid>
				))}
		</Paper>
	)
}
