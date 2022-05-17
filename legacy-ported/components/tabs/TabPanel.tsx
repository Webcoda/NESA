import React, { HTMLProps, ReactNode } from 'react'

export interface TabPanelProps extends HTMLProps<HTMLDivElement> {
	panelId: string
	tabId: string
	hidden?: boolean
	children: ReactNode
}

const TabPanel = (props: TabPanelProps) => {
	const { children, panelId, tabId, hidden, ...other } = props

	return (
		<div role="tabpanel" hidden={hidden} id={panelId} aria-label={tabId} {...other}>
			{!hidden && children}
		</div>
	)
}

export default TabPanel

export interface SyllabusTabPanelProps {
	/**
	 * Id of tab panel
	 */
	id: string

	/**
	 * Tab value
	 */
	tabValue: string

	/**
	 * Children components
	 */
	children: ReactNode

	/**
	 * ClassName prop for TabPanel element
	 */
	className?: string
}

export const SyllabusTabPanel = ({ id, tabValue, children, className }: SyllabusTabPanelProps) => (
	<TabPanel panelId={`tab-panel-${id}`} tabId={id} hidden={tabValue !== id} className={className}>
		{children}
	</TabPanel>
)
