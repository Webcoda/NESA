import { decycle } from 'cycle'
import Error from 'next/error'
import { useRouter } from 'next/router'
import UnknownComponent from '../components/UnknownComponent'
import pageLayouts from '../layouts'
import { getPageStaticPropsForPath, getSitemapMappings } from '../lib/api'

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
	const contentType = props.data.pageResponse.item.system.type

	const PageLayout = pageLayouts[contentType]

	if (process.env.NODE_ENV === 'development' && !PageLayout) {
		console.error(
			`Unknown Layout component for page content type: ${contentType}`,
		)
		return (
			<UnknownComponent {...props} useLayout={true}>
				<p>
					Unknown Layout component for page content type:{' '}
					{contentType}
				</p>
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
	const _props = await getPageStaticPropsForPath(params, preview)
	const { seo, mappings, data } = _props || {}
	const {
		config,
		pageResponse,
		syllabuses = null,
		stageGroups = null,
		stages = null,
		keyLearningAreas = null,
	} = data || {}

	const props = {
		seo,
		mappings,
		data: {
			config,
			pageResponse,
			stages,
			stageGroups,
			syllabuses: syllabuses ? decycle(syllabuses) : null,
			keyLearningAreas,
		},
		errorCode: !_props ? 404 : null,
		params,
		preview,
	}

	return {
		props,
		// Next.js will attempt to re-generate the page:
		// https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration
		// - When a request comes in
		// - At most once every 5 second
		revalidate: 5, // In seconds
	}
}

export default Page
