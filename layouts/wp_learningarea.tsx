import Layout from '@/components/Layout'
import RichText from '@/components/RichText'
import UnknownComponent from '@/components/UnknownComponent'
import { WpLearningarea as WpLearningareaModel } from '@/models/wp_learningarea'
import { CommonPageProps } from '@/types'
import { Box } from '@material-ui/core'
import get from 'lodash.get'

function WpLearningArea(props: CommonPageProps<WpLearningareaModel>) {
	const { page, pageResponse } = props.data

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
					linkedItems={pageResponse.linkedItems}
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

export default WpLearningArea
