import SanitisedHTMLContainer from '@/components/SanitisedHTMLContainer'
import InPageNavLinks from '@/lib/nsw-ds-react/src/component/in-page-navigation/inPageNavLinks'
import { isRichtextEmpty } from '@/utils'
import { Grid } from '@material-ui/core'
import React from 'react'
import { uriConvert } from '../../utilities/functions'
import { PageSection } from '../base/CustomInPageNavLinks'

export interface ComponentWithInPageNavLinksProps {
	/**
	 * Title of component
	 */
	title: string

	/**
	 * List of contents
	 */
	contents: PageSection[]

	/**
	 * Summary
	 */
	summary?: string
}

const ComponentWithInPageNavLinks = (
	props: ComponentWithInPageNavLinksProps,
): JSX.Element => {
	const { contents, summary } = props

	return (
		<Grid
			container
			className="component-with-page-nav-links"
			direction="column"
		>
			<Grid
				container
				item
				className="component-with-page-nav-links__buttons"
			>
				<InPageNavLinks
					className="nsw-page-nav"
					title="On this page"
					links={contents.map((content) => {
						return {
							title: content.title,
							url: `#${uriConvert(content.title)}`,
						}
					})}
				/>
			</Grid>
			{!isRichtextEmpty(summary) && (
				<div className="component-with-page-nav-links__content-body">
					<SanitisedHTMLContainer className="cms-content-formatting">
						{summary}
					</SanitisedHTMLContainer>
				</div>
			)}
			<Grid
				container
				item
				className="component-with-page-nav-links__content-wrapper"
			>
				{contents.map((item, index) => (
					<div
						key={item.title}
						className="component-with-page-nav-links__content"
					>
						<Grid id={uriConvert(item.title)} container>
							<Grid
								container
								className="component-with-page-nav-links__content-title"
							>
								<h2>{item.title}</h2>
							</Grid>
							<Grid
								container
								className="component-with-page-nav-links__content-body"
							>
								<SanitisedHTMLContainer className="cms-content-formatting">
									{item.content}
								</SanitisedHTMLContainer>
							</Grid>
						</Grid>
						{index < contents.length - 1 && (
							<Grid container item xs={12}>
								<hr />
							</Grid>
						)}
					</div>
				))}
			</Grid>
		</Grid>
	)
}

export default ComponentWithInPageNavLinks
