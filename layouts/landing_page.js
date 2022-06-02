import { Box } from '@material-ui/core'
import camelCase from 'lodash.camelcase'
import get from 'lodash.get'
import upperFirst from 'lodash.upperfirst'
import { Layout, UnknownComponent } from '../components'
import sections from '../components/sections'

function LandingPage(props) {
	const page = get(props, 'data.page.item', null)

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
				{get(page, 'elements.sections.linkedItems', []).map(
					(section, index) => {
						const contentType = upperFirst(
							camelCase(get(section, 'system.type', null)),
						)
						const Component = sections[contentType]

						if (
							process.env.NODE_ENV === 'development' &&
							!Component
						) {
							console.error(
								`Unknown section component for section content type: ${contentType}`,
							)
							return (
								<UnknownComponent key={index} {...props}>
									<pre>
										{JSON.stringify(section, undefined, 2)}
									</pre>
								</UnknownComponent>
							)
						}

						return (
							<Component
								key={index}
								{...props}
								section={section}
								site={props}
							/>
						)
					},
				)}
			</Box>
		</Layout>
	)
}

export default LandingPage
