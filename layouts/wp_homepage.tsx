import { Box } from '@material-ui/core'
import get from 'lodash.get'
import { Layout, UnknownComponent } from '../components'
import RichText from '@/components/RichText'
function WpHomepage(props) {
	const page = get(props, 'data.page', null)

	if (!page) {
		return (
			<UnknownComponent>
				Page {page.system.codename} does not have any content!
			</UnknownComponent>
		)
	}

	return (
		<Layout {...props}>
			<Box>
				<RichText
					{...props}
					richTextElement={get(
						page,
						'elements.web_content_rtb__content',
						null,
					)}
				/>
			</Box>
		</Layout>
	)
}

export default WpHomepage
