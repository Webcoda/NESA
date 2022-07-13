import RichText from '@/components/RichText'
import SanitisedHTMLContainer from '@/components/SanitisedHTMLContainer'
import { EMPTY_KONTENT_RICHTEXT } from '@/constants'
import { Accesscontentgroup } from '@/models/accesscontentgroup'
import { Accesscontentitem } from '@/models/accesscontentitem'
import { Contentgroup } from '@/models/contentgroup'
import { Contentitem } from '@/models/contentitem'
import { getDataAttributesFromProps, isRichtextEmpty } from '@/utils'
import { Paper } from '@material-ui/core'
import React from 'react'
// import { findTag } from '../../store/mock/tags';

export interface OutcomeDetailCardProps {
	/**
	 * Card title
	 */
	title?: string

	/**
	 * Syllabus Content
	 */
	groups: Contentgroup[]

	/**
	 * Syllabus Access Point
	 */
	accessPoints?: Accesscontentgroup[]

	/**
	 * Whether show the access point content
	 */
	showAccessPoints?: boolean
	/**
	 * What tags to show.
	 */
	showTags?: string[]
	/**
	 * Whether show the examples
	 */
	showExamples?: boolean
	/**
	 * Whether set default background color
	 */
	defaultBackgroundColor?: boolean
}

export default function OutcomeDetailCard(props: OutcomeDetailCardProps) {
	const {
		title,
		groups,
		accessPoints,
		showAccessPoints,
		showTags,
		showExamples,
		defaultBackgroundColor,
		...rest
	} = props

	const dataAttributes = getDataAttributesFromProps(rest)
	return (
		<Paper
			{...dataAttributes}
			className={`outcome-detail-card nsw-p-sm nsw-p-bottom-lg ${
				defaultBackgroundColor
					? 'outcome-detail-card--default-background'
					: ''
			}`.trim()}
		>
			{title && (
				<div
					className="content-organizer__outcome-title"
					data-kontent-element-codename="title"
				>
					<h1>{title}</h1>
					<hr />
				</div>
			)}
			<div className="outcome-detail-card__detail">
				{accessPoints?.length > 0 && showAccessPoints && (
					<div className="filtered">
						<h2>Access content points</h2>
						<hr />
						{accessPoints?.map((a: Accesscontentgroup) => (
							<div key={a.system.id}>
								<span className="outcome-detail-card__subtitle">
									<SanitisedHTMLContainer
										data-kontent-element-codename="title"
										data-kontent-item-id={a.system.id}
									>
										{a.elements.title.value}
									</SanitisedHTMLContainer>
								</span>
								<div>
									{a.elements.access_content_items.linkedItems.map(
										(row: Accesscontentitem) => (
											<div
												key={row.system.id}
												data-kontent-element-id={
													row.system.id
												}
											>
												{row.elements.title.value !=
													EMPTY_KONTENT_RICHTEXT && (
													<ul>
														<li data-kontent-element-codename="title">
															<RichText
																linkedItems={
																	null
																}
																mappings={[]}
																richTextElement={
																	row.elements
																		.title
																}
															/>
														</li>
													</ul>
												)}
												{row.elements.examples.value !=
													EMPTY_KONTENT_RICHTEXT &&
													showExamples && (
														<span
															className="outcome-detail-card__example"
															data-kontent-element-codename="example"
														>
															<RichText
																linkedItems={
																	null
																}
																mappings={[]}
																richTextElement={
																	row.elements
																		.examples
																}
															/>
														</span>
													)}
											</div>
										),
									)}
								</div>
							</div>
						))}
					</div>
				)}
				{groups?.map((group) => (
					<div key={group.system.id}>
						<h2
							data-kontent-item-id={group.system.id}
							data-kontent-element-codename="title"
						>
							{group.elements.title.value}
						</h2>
						{!!group.elements.content_items.linkedItems?.length && (
							<ul>
								{group.elements.content_items.linkedItems.map(
									(row: Contentitem) => (
										<li
											key={row.system.id}
											data-kontent-item-id={row.system.id}
										>
											<SanitisedHTMLContainer data-kontent-element-codename="title">
												{row.elements.title.value}
											</SanitisedHTMLContainer>
											{row.elements.examples.value &&
												!isRichtextEmpty(
													row.elements.examples.value,
												) &&
												showExamples && (
													<SanitisedHTMLContainer
														className="example"
														data-kontent-element-codename="example"
													>
														{
															row.elements
																.examples.value
														}
													</SanitisedHTMLContainer>
												)}
											{showTags &&
												row.elements
													.learningprogression_tags__literacy
													.value.length > 0 && (
													<div
														className="tags"
														data-kontent-element-codename="learningprogression_tags__literacy"
													>
														{row.elements.learningprogression_tags__literacy.value
															.filter((t) =>
																showTags.includes(
																	t.codename,
																),
															)
															.map((tag) => {
																// todo: fix tag
																return (
																	<p
																		key={
																			tag.codename
																		}
																		className="tag"
																	>
																		{
																			tag.name
																		}
																	</p>
																)
															})}
													</div>
												)}
										</li>
									),
								)}
							</ul>
						)}
					</div>
				))}
			</div>
		</Paper>
	)
}
