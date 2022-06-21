import React from 'react'
import get from 'lodash.get'

import pageLayouts from '../layouts'
import { getSitemapMappings, getPageStaticPropsForPath } from '../lib/api'
import UnknownComponent from '../components/UnknownComponent'
import { useRouter } from 'next/router'
import Error from 'next/error'

function Page(props) {
	const router = useRouter()

	if (props.errorCode) {
		return <Error statusCode={props.errorCode} />
	}

	// If the page is not yet generated, this will be displayed
	// initially until getStaticProps() finishes running
	if (router.isFallback) {
		return <div>Loading...</div>
	}

	// every page can have different layout, pick the layout based on content type
	const contentType = props.data.page.system.type

	const PageLayout = pageLayouts[contentType]

	if (process.env.NODE_ENV === 'development' && !PageLayout) {
		console.error(
			`Unknown Layout component for page content type: ${contentType}`,
		)
		return (
			<UnknownComponent {...props} useLayout={true}>
				<pre>{JSON.stringify(props, undefined, 2)}</pre>
			</UnknownComponent>
		)
	}

	return <PageLayout {...props} />
}

export async function getStaticPaths(ctx) {
	const paths = await getSitemapMappings()

	// https://nextjs.org/docs/messages/ssg-fallback-true-export
	const fallback = process.env.STATIC_EXPORT ? false : true

	return {
		paths,
		// Set to false when exporting to static site
		fallback,
	}
}

export async function getStaticProps({ params, preview = false }) {
	const props = await getPageStaticPropsForPath(params, preview)

	return {
		props: {
			...props,
			errorCode: !props ? 404 : null,
			params,
			preview,
		},
		// Next.js will attempt to re-generate the page:
		// https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration
		// - When a request comes in
		// - At most once every 5 second
		revalidate: 5, // In seconds
	}
}

export default Page
