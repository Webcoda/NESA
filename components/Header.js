// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Header as NswHeader } from "../lib/nsw-ds-react/src/component/header/header";
import { Masthead } from "../lib/nsw-ds-react/src/component/header/masthead";
import { SkipTo } from "../lib/nsw-ds-react/src/component/header/skipTo";


const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	logo: {
		width: "200px",
	},
	mainMenu: {
		flexGrow: 1,
		display: "flex",
		justifyContent: "flex-end",
		"& a": {
			margin: theme.spacing(1),
		},
	},
}));

const Header = () => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<SkipTo />
			<Masthead />
			<NswHeader
				headerUrl="#"
				onSubmit={function noRefCheck() {}}
				siteDescriptor="NSW Education Standard Authority"
				siteTitle="NSW Curriculum"
			/>
		</div>
	);
};

export default Header;
