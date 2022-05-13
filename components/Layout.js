import { makeStyles } from '@material-ui/core'
import { Footer, Header, PreviewBar } from '.'

const useStyles = makeStyles((_theme) => ({
	root: {
		minHeight: '100vh',
	},
	flex: {
		flexGrow: 1,
	},
}))

function Layout(props) {
	const classes = useStyles()

	return (
		<div
			className={classes.root}
		>
			{props.preview && <PreviewBar {...props} />}
			<Header {...props} />
			<main>
				{props.children}
			</main>
			<Footer {...props} />
		</div>
	)
}

export default Layout
