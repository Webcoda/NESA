import React from 'react'
import PropTypes from 'prop-types'

/**
 * The card  component
 * @typedef CardProps
 * @property {string}   link               - The link that clicking the card goes to
 * @property {string}   linkTarget         - The link target
 * @property {string}   tag                - The tag (optional)
 * @property {string}   style              - Card style
 * @property {string}   date               - The date (optional)
 * @property {string}   dateMomentFormat   - The date display format (optional, def to '4th June 2021')
 * @property {string}   image              - The image URL/path (optional)
 * @property {string}   imageAlt           - The alt text for image (mandatory if image supplied)
 * @property {any}   	headline           - Title for card
 * @property {bool}     highlight          - Adds highlight bar if true
 * @property {string}   className          - An additional class, optional
 * @property {object}   attributeOptions   - Default HTML attributes
 */

/**
 * @param {React.FC<CardProps>}
 * @returns
 */
const Card = ({
	link,
	linkTarget,
	style,
	headline,
	highlight,
	tag,
	date,
	image,
	imageAlt,
	className,
	children,
	...attributesOptions
}) => {
	let CardContainer = 'div'

	if (link !== undefined) {
		CardContainer = 'div'
		attributesOptions.href = link
	}

	return (
		<CardContainer
			className={
				`nsw-card nsw-card--${style} ${className}` +
				`${headline ? 'nsw-card--headline' : ''} ` +
				`${highlight ? 'nsw-card--highlight' : ''} `
			}
			{...attributesOptions}
		>
			{image ? <CardImage src={image} alt={imageAlt} /> : ''}
			<CardContent link={link}>
				{tag ? <CardTag>{tag}</CardTag> : ''}
				{date ? <CardDate date={date} /> : ''}
				{headline ? (
					<CardHeader link={link} linkTarget={linkTarget}>
						{headline}
					</CardHeader>
				) : (
					''
				)}
				{children}
			</CardContent>
		</CardContainer>
	)
}

Card.propTypes = {
	link: PropTypes.string,
	linkTarget: PropTypes.string,
	style: PropTypes.oneOf(['dark', 'light', 'white']),
	tag: PropTypes.string,
	date: PropTypes.string,
	image: PropTypes.string,
	imageAlt: PropTypes.string,
	headline: PropTypes.oneOfType([
		PropTypes.string.isRequired,
		PropTypes.node,
	]),
	highlight: PropTypes.bool,
	className: PropTypes.string,
	children: PropTypes.node,
}

Card.defaultProps = {
	className: null,
	style: 'white',
}

/**
 * An inner container for the card, with padding of 1 rem
 * @param {string}   className          - An additional class, optional
 * @param {object}   attributeOptions   - Default HTML attributes
 */
export const CardContent = ({
	className,
	children,
	link,
	...attributesOptions
}) => (
	<div className={`nsw-card__content ${className}`} {...attributesOptions}>
		{children}
		{link ? (
			<span
				className="material-icons nsw-material-icons nsw-card__icon"
				focusable="false"
				aria-hidden="true"
			>
				east
			</span>
		) : (
			''
		)}
	</div>
)

CardContent.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
}

CardContent.defaultProps = {
	className: null,
	children: null,
}

/**
 * An inner container for the card, with padding of 1 rem
 * @param {string}   className          - An additional class, optional
 * @param {string}   link          - url
 * @param {string}   linkTarget          - target attribute of the link
 * @param {object}   attributeOptions   - Default HTML attributes
 */
export const CardHeader = ({ className, link, linkTarget, children }) => {
	const HeadingTag = 'div'
	if (link !== undefined) {
		return (
			<HeadingTag className={`nsw-card__title ${className}`}>
				<a
					href={link}
					className="nsw-card__link no-icon"
					target={linkTarget}
				>
					{children}
				</a>
			</HeadingTag>
		)
	}
	return <HeadingTag className="nsw-card__title">{children}</HeadingTag>
}

CardHeader.propTypes = {
	className: PropTypes.string,
	link: PropTypes.string,
	children: PropTypes.node,
}

CardHeader.defaultProps = {
	className: '',
}

/**
 * An image inside the card
 * @param {string}   src                - Image source
 * @param {string}   className          - An additional class, optional
 * @param {object}   attributeOptions   - Default HTML attributes
 */
export const CardImage = ({ src, className, alt, ...attributesOptions }) => (
	<div className="nsw-card__image">
		<img className={className} src={src} alt={alt} {...attributesOptions} />
	</div>
)

CardImage.propTypes = {
	src: PropTypes.string.isRequired,
	className: PropTypes.string,
	alt: PropTypes.string,
}

CardImage.defaultProps = {
	className: '',
}

/**
 * An paragraph inside the card
 * @typedef {object} CardCopyProps
 * @property {string}   className          - An additional class, optional
 * @property {object}   attributeOptions   - Default HTML attributes
 */

/**
 *
 * @param {React.FC<CardCopyProps>}
 * @returns
 */
export const CardCopy = ({
	src,
	children,
	className,
	...attributesOptions
}) => (
	<p className={`nsw-card__copy ${className}`} {...attributesOptions}>
		{children}
	</p>
)

CardCopy.propTypes = {
	className: PropTypes.string,
	src: PropTypes.string,
	children: PropTypes.node,
}

CardCopy.defaultProps = {
	className: '',
}

/**
 * An tag inside the card
 * @param {string}   className          - An additional class, optional
 * @param {object}   attributeOptions   - Default HTML attributes
 */
export const CardTag = ({ children, className, ...attributesOptions }) => (
	<p className={`nsw-card__tag ${className}`} {...attributesOptions}>
		{children}
	</p>
)

CardTag.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
}

CardTag.defaultProps = {
	className: '',
}

/**
 * An date inside the card
 * @param {string}   className          - An additional class, optional
 * @param {object}   attributeOptions   - Default HTML attributes
 */
export const CardDate = ({ className, date, ...attributesOptions }) => (
	<p className={`nsw-card__date ${className}`} {...attributesOptions}>
		<time dateTime={date}>{date}</time>
	</p>
)

CardDate.propTypes = {
	className: PropTypes.string,
	date: PropTypes.string.isRequired,
}

CardDate.defaultProps = {
	className: null,
}

/**
 * A horizontal rule used to divide content inside the card
 * @param {string}   className          - An additional class, optional
 * @param {object}   attributeOptions   - Default HTML attributes
 */
export const CardDivider = ({ className, ...attributesOptions }) => (
	<hr className={`nsw-card__divider ${className}`} {...attributesOptions} />
)

CardDivider.propTypes = {
	className: PropTypes.string,
}

CardDivider.defaultProps = {
	className: '',
}

/**
 * Use when making the entire click area of card clickable.
 * @param {string}   link               - The location of the link
 * @param {string}   className          - An additional class, optional
 * @param {object}   attributeOptions   - Default HTML attributes
 */
export const CardLink = ({ link, text, className, ...attributesOptions }) => (
	<a
		href={link}
		className={`nsw-card--clickable__link ${className}`}
		{...attributesOptions}
	>
		{text}
	</a>
)

CardLink.propTypes = {
	link: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	className: PropTypes.string,
}

CardLink.defaultProps = {
	className: '',
}

/**
 * The footer section of the card
 * @param {string}   className          - An additional class, optional
 * @param {object}   attributeOptions   - Default HTML attributes
 */
export const CardFooter = ({
	dark,
	alt,
	children,
	className,
	...attributesOptions
}) => (
	<div className={`nsw-card__footer ${className}`} {...attributesOptions}>
		{children}
	</div>
)

CardFooter.propTypes = {
	className: PropTypes.string,
	dark: PropTypes.bool,
	alt: PropTypes.bool,
	children: PropTypes.node,
}

CardFooter.defaultProps = {
	className: '',
	dark: false,
	alt: false,
}

/**
 * The footer section of the card
 * @param {string}   className          - An additional class, optional
 * @param {object}   attributeOptions   - Default HTML attributes
 */
export const CardTitle = ({ children, className, ...attributeOptions }) => {
	const HeadingTag = `div`

	return (
		<HeadingTag
			className={`nsw-card__title ${className}`}
			{...attributeOptions}
		>
			{children}
		</HeadingTag>
	)
}

CardTitle.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
}

CardTitle.defaultProps = {
	className: null,
}

export default Card
