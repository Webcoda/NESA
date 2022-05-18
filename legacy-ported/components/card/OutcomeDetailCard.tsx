import SanitisedHTMLContainer from '@/components/SanitisedHTMLContainer'
import { FocusAreaItem } from '@/models/focus_area_item'
import { FocusAreaGroup } from '@/models/focus_area_group'
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
	groups: FocusAreaGroup[]

	/**
	 * Syllabus Access Point
	 */
	accessPoints?: FocusAreaGroup[]

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
	const { title, groups, accessPoints, showAccessPoints, showTags, showExamples, defaultBackgroundColor } = props
    console.log("🚀 ~ file: OutcomeDetailCard.tsx ~ line 45 ~ OutcomeDetailCard ~ groups", groups)

	return (
		<Paper
			className={`outcome-detail-card nsw-p-sm nsw-p-bottom-lg ${
				defaultBackgroundColor ? 'outcome-detail-card--default-background' : ''
			}`}
		>
			{title && (
				<div className="content-organizer__outcome-title">
					<h1>{title}</h1>
					<hr />
				</div>
			)}
			<div className="outcome-detail-card__detail">
				{accessPoints?.length > 0 && showAccessPoints && (
					<div className="filtered">
						<h2>Access content points</h2>
						<hr />
						{accessPoints?.map((a: FocusAreaGroup) => (
							<div key={a.system.id}>
								<span className="outcome-detail-card__subtitle">
									<SanitisedHTMLContainer>{a.elements.title.value}</SanitisedHTMLContainer>
								</span>
								<div>
									{a.elements.focus_area_items.linkedItems.map((row: FocusAreaItem) => (
										<div key={row.system.id}>
											<ul>
												<li>
													<SanitisedHTMLContainer>{row.elements.title.value}</SanitisedHTMLContainer>
												</li>
											</ul>
											{!!row.elements.examples.value?.length && showExamples && (
												<span className="outcome-detail-card__example">
													<SanitisedHTMLContainer>{row.elements.examples.value}</SanitisedHTMLContainer>
												</span>
											)}
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				)}
				{groups?.map((group) => (
					<div key={group.system.id}>
						<h2>{group.elements.title.value}</h2>
						{
							!!group.elements.focus_area_items.linkedItems?.length && (
								<ul>
									{group.elements.focus_area_items.linkedItems.map((row: FocusAreaItem) => (
										<li key={row.system.id}>
											<SanitisedHTMLContainer>{row.elements.title.value}</SanitisedHTMLContainer>
											{row.elements.examples.value && showExamples && (
												<SanitisedHTMLContainer className="example">
													{row.elements.examples.value}
												</SanitisedHTMLContainer>
											)}
											{showTags && row.elements.nesa_tags__literacy_listening.value.length > 0 && (
												<div className="tags">
													{row.elements.nesa_tags__literacy_listening.value
														// .filter((t) => showTags.includes(t))
														.map((tag) => {
															return null
															// todo: fix tag
															// <p className="tag">{findTag(tag).tag}</p>
														})}
												</div>
											)}
										</li>
									))}
								</ul>
							)
						}
					</div>
				))}
			</div>
		</Paper>
	)
}
