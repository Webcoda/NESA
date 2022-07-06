import React, { HTMLProps, useState } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import sanitizeHtml from 'sanitize-html'

const useStyles = makeStyles(() =>
	createStyles({
		root: {
			width: '100%',
		},
	}),
)

export interface CustomAccordionProps extends HTMLProps<HTMLDivElement> {
	title: string
	startOpen?: boolean
	isComingSoon?: boolean // TODO: Remove after MVP
}

const CustomAccordion = (props: CustomAccordionProps): JSX.Element => {
	const {
		title,
		startOpen = false,
		isComingSoon,
		children,
		...others
	} = props
	const classes = useStyles()
	const [expandStatus, setExpandStatus] = useState(startOpen)

	const onChange = (event: object, expanded: boolean) => {
		// TODO: Remove condition after MVP
		if (!isComingSoon) {
			setExpandStatus(expanded)
		}
	}

	return (
		<div className={classes.root} {...others}>
			<Accordion
				className="nesa-accordion"
				expanded={expandStatus}
				onChange={onChange}
			>
				<AccordionSummary
					expandIcon={
						<ExpandMoreIcon className="nesa-accordion__icon" />
					}
					className={`nesa-accordion__header ${
						expandStatus ? 'nesa-accordion__active' : ''
					}`}
					disabled={isComingSoon} // TODO: Remove condition after MVP
				>
					{/* TODO: Remove condition after MVP */}
					{isComingSoon ? (
						<p>{`${title} (Coming Soon)`}</p>
					) : (
						// eslint-disable-next-line react/no-danger
						<p
							dangerouslySetInnerHTML={{
								__html: sanitizeHtml(title),
							}}
						/>
					)}
				</AccordionSummary>
				<AccordionDetails className="nesa-accordion__content">
					{children}
				</AccordionDetails>
			</Accordion>
		</div>
	)
}

export default CustomAccordion
