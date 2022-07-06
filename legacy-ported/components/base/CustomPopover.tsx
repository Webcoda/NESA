import React, { MouseEvent, ReactNode } from 'react'
import { Grid, makeStyles, Popover } from '@material-ui/core'
import Slide from '@material-ui/core/Slide'
import { isMobile } from 'react-device-detect'

const Transition = React.forwardRef(
	(
		props: { children?: React.ReactElement<any, any> },
		ref: React.Ref<unknown>,
	) => <Slide direction="right" ref={ref} {...props} />,
)

export interface CustomPopoverProps {
	/**
	 * Popover title
	 */
	title: string
	/**
	 * Show/Hide popover
	 */
	popoverStatus: boolean
	/*
	 * Any react component as popover anchor
	 */
	popoverAnchor?: Element
	/**
	 * Any react component to be displayed in the modal body
	 */
	children: ReactNode
	/**
	 * Function to be used on the Cancel button
	 */
	onCancel?: (event: MouseEvent<HTMLButtonElement>) => void
	/**
	 * Function to be used on the Confirm button
	 */
	onConfirm: (event: MouseEvent<HTMLButtonElement>) => void
}

const useStyles = makeStyles({
	dialog: {
		position: 'absolute',
		left: isMobile ? '60%' : '40%',
		top: '50%',
		transform: 'translate(-75%,-50%)',
	},
})

export default function CustomPopover(props: CustomPopoverProps) {
	const {
		title,
		popoverStatus,
		popoverAnchor,
		children,
		onConfirm,
		onCancel,
	} = props

	return (
		<Popover
			open={popoverStatus}
			anchorEl={popoverAnchor}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'center',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
			onClose={onCancel}
			disableRestoreFocus
		>
			<div className="custom-popover">
				<h4>{title}</h4>
				<div className="custom-popover__content">{children}</div>
				<Grid className="custom-popover__actions">
					<button
						type="button"
						className="nsw-button nsw-button--white"
						onClick={onCancel}
					>
						Cancel
					</button>
					<button
						type="button"
						className="nsw-button nsw-button--primary"
						onClick={onConfirm}
					>
						Done
					</button>
				</Grid>
			</div>
		</Popover>
	)
}
