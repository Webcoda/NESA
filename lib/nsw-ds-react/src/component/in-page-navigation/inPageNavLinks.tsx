import React from 'react'

/**
 * The section component for the InpageNavLinks component
 *
 * @param  {object} url             - The link of this section
 * @param  {object} title            - The title of the section
 * @param  {object} attributeOptions - Any other attribute options
 */
export const InpageNavLinksItem = ({ url, title, ...attributeOptions }) => (
	<li className="nsw-page-nav__list-item">
		<a
			href={`${url}`}
			className={`nsw-page-nav__link ${
				attributeOptions?.className || ''
			}`}
			{...attributeOptions}
		>
			{title}
		</a>
	</li>
)

/**
 * The inpage-nav component
 *
 * @param  {string}  title            - The title of the content link block, default: Contents
 * @param  {array}   sections         - An array of objects of all sections, sample:
 *                                      { link: '', title: '', onClick: () }
 * @param  {string}  className        - An additional class, optional
 * @param  {string}  ariaLabel        - The aria-label attribute, optional
 * @param  {object}  attributeOptions - Any other attribute options
 */
export const InPageNavLinks = ({
	title,
	links,
	ariaLabel = 'in page navigation',
	className = '',
	...attributeOptions
}) => (
	<nav
		className={`nsw-in-page-nav ${className}`}
		aria-labelled-by={ariaLabel}
		{...attributeOptions}
	>
		<div
			id={ariaLabel}
			className="nsw-page-nav__title nsw-in-page-nav__title"
		>
			{title}
		</div>

		<ul>
			{links
				? links.map((link) => (
						<InpageNavLinksItem {...link} key={link.title} />
				  ))
				: ''}
		</ul>
	</nav>
)

export default InPageNavLinks
