// https://github.com/mui-org/material-ui/blob/master/examples/nextjs/src/Link.js

import React from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'

export interface LinkProps extends React.HTMLProps<HTMLAnchorElement> {
	activeClassName?: string
	innerRef?: object //todo: not sure what it's supposed to
	children?: any
}

const NextComposed = React.forwardRef<HTMLAnchorElement, NextLinkProps>(
	function NextComposed(props, ref) {
		const { as, href, ...other } = props

		return (
			<NextLink href={href} as={as}>
				<a ref={ref} {...other} />
			</NextLink>
		)
	},
)

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
function Link(props) {
	const {
		href,
		activeClassName = 'active',
		className: classNameProps,
		innerRef,
		...other
	} = props

	const router = useRouter()
	const pathname = typeof href === 'string' ? href : href.pathname
	const className = clsx(classNameProps, {
		[activeClassName]: router.pathname === pathname && activeClassName,
	})

	return (
		<NextComposed
			className={className}
			ref={innerRef}
			href={href}
			{...other}
		/>
	)
}

export default React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
	<Link {...props} innerRef={ref} />
))
