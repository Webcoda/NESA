// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles'
import dynamic from 'next/dynamic'
import { Header as NswHeader } from '../lib/nsw-ds-react/src/component/header/header'
import { Masthead } from '../lib/nsw-ds-react/src/component/header/masthead'
import { SkipTo } from '../lib/nsw-ds-react/src/component/header/skipTo'
import { MainNav } from '../lib/nsw-ds-react/src/component/main-nav/mainNav'
import get from 'lodash.get'
const ReactJson = dynamic(() => import('react-json-view'), { ssr: false })

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	logo: {
		width: '200px',
	},
	mainMenu: {
		flexGrow: 1,
		display: 'flex',
		justifyContent: 'flex-end',
		'& a': {
			margin: theme.spacing(1),
		},
	},
}))

const createNavItem = (item, parentSlug) => {
	const slug = parentSlug + '/' + item.elements.navigation_item?.linkedItems?.[0].elements.slug.value || ''
	const subNav = item.elements?.actions?.linkedItems?.map((_item) => createNavItem(_item, slug))

	return {
		description: '',
		id: item.system.id,
		subNav,
		text: item.elements.label.value,
		url: `${slug}`,
	}
}

const Header = (props) => {
	const classes = useStyles()

	const navItems = get(
		props,
		'data.config.item.elements.main_menu.linkedItems[0].elements.actions.linkedItems',
		[],
	).map((item) => createNavItem(item, ''))

	return (
		<div className={classes.root}>
			<SkipTo content="#content" nav="#nav" />
			<Masthead />
			<NswHeader
				headerUrl="/"
				onSubmit={function noRefCheck() {}}
				siteDescriptor="NSW Education Standard Authority"
				siteTitle="NSW Curriculum"
				search={false}
			/>
			<MainNav navItems={navItems} megaMenu />

			<details>
				<summary>JSON of navItems</summary>
				<ReactJson collapsed src={navItems} />
			</details>
			<details>
				<summary>JSON of props</summary>
				<ReactJson collapsed src={props} />
			</details>
		</div>
	)
}

export default Header
