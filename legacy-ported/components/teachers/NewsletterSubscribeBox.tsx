import React from 'react'
import { Grid, Paper } from '@material-ui/core'

export interface NewsletterSubscribeBoxProps {
	className?: string
	title: string
	buttonLabel: string
	inputLabel: string
	formAction: string
	createSendId: string
}

const NewsletterSubscribeBox = (
	props: NewsletterSubscribeBoxProps,
): JSX.Element => {
	const {
		className,
		title,
		inputLabel,
		buttonLabel,
		formAction,
		createSendId,
	} = props
	return (
		<Paper className={`notice-list ${className}`} elevation={3}>
			<div className="notice-list__footer">
				<Grid container item direction="column">
					<h3>{title}</h3>
					<p>{inputLabel}</p>
					<form
						className="js-cm-form"
						id="subForm"
						dir="ltr"
						action={formAction}
						method="post"
						data-id={createSendId}
					>
						<div className="emailbox">
							<input
								name="cm-yuiuurk-yuiuurk"
								className="js-cm-email-input emailbox__input"
								id="fieldEmail"
								type="email"
								aria-label="Subscribe"
							/>
							<button
								type="submit"
								className="emailbox__submit button nsw-button nsw-button--primary"
							>
								{buttonLabel}
							</button>
						</div>
					</form>
				</Grid>
			</div>
		</Paper>
	)
}

export default NewsletterSubscribeBox
