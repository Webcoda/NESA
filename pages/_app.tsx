import KontentSmartLink from '@kentico/kontent-smart-link';
import CssBaseline from "@material-ui/core/CssBaseline";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import get from "lodash.get";
import Head from "next/head";
import 'nsw-design-system/dist/css/main.css';
import React from "react";
// import '../legacy/sass/app.scss';
import "../styles/main.css";


function MyApp({ Component, pageProps }) {
	const configObject = get(pageProps, "data.config", null);

	// const font = get(
	// 	configObject,
	// 	"item.elements.font.value[0].codename",
	// 	null
	// );
	/* const fontName =
		font === "nunito_sans"
			? "Nunito Sans"
			: font === "fira_sans"
			? "Fira Sans"
			: "Arial"; */

	const fontName = "Public Sans";

	let title = get(configObject, "item.elements.title.value", "");
	if (title) {
		title += " | ";
	}
	title += get(pageProps, "seo.title", null);

	const palette = get(
		configObject,
		"item.elements.palette.value[0].codename",
		null
	);
	const colors = {
		primary: "#F05A22",
		secondary: "#B72929",
	};

	switch (palette) {
		case "blue":
			colors.primary = "#3553B8";
			colors.secondary = "#81D4FA";
			break;
		case "cyan":
			colors.primary = "#007C91";
			colors.secondary = "#5DDEF4";
			break;
		case "green":
			colors.primary = "#2C9E7E";
			colors.secondary = "#4b830d";
			break;
		case "purple":
			colors.primary = "#7D3F9C";
			colors.secondary = "#7986cb";
			break;
		case "default":
		default:
			break;
	}

	const theme = createTheme({
		palette: {
			primary: {
				main: colors.primary,
			},
			secondary: {
				main: colors.secondary,
			},
			background: {
				default: "#FFF",
			},
		},
		typography: {
			fontFamily: [fontName, "sans-serif"].join(', '),
		},
	});

	// https://material-ui.com/guides/server-rendering/#the-client-side
	// https://github.com/mui-org/material-ui/tree/master/examples/nextjs
	React.useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);

	React.useEffect(() => {
		// This is just an example of SDK initialization inside ES6 module.
		// HTML markup should still contain all necessary data-attributes (e.g. PageSection component).
		const kontentSmartLink = KontentSmartLink.initialize({
			defaultDataAttributes: {
				projectId: process.env.KONTENT_PROJECT_ID,
				languageCodename: "default",
			},
			queryParam: "preview-mode"
		});

		return () => {
			kontentSmartLink.destroy();
		};
	});



	return (
		<>
			<Head>
				<title>{title}</title>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<meta name="google" content="notranslate" />
				{get(configObject, "item.elements.favicon.value[0]", null) && (
					<link
						rel="icon"
						href={get(
							configObject,
							"item.elements.favicon.value[0].url",
							null
						)}
					/>
				)}
				<meta
					name="description"
					content={get(pageProps, "seo.description", null)}
				/>
				{get(pageProps, "seo.keywords", null) && (
					<meta
						name="keywords"
						content={get(pageProps, "seo.keywords", null)}
					/>
				)}
				{get(pageProps, "seo.canonicalUrl", null) ?? (
					<link
						rel="canonical"
						href={get(pageProps, "seo.canonicalUrl", null)}
					/>
				)}
				{get(pageProps, "seo.noIndex", null) && (
					<meta name="robots" content="noindex,follow" />
				)}
				{/* {font !== "system-sans" && (
					<link
						rel="preconnect"
						href="https://fonts.gstatic.com"
						crossOrigin="true"
					/>
				)}
				{font === "nunito_sans"
					? [
							<link
								key="0"
								href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
								as="style"
								rel="preload"
							/>,
							<link
								key="1"
								href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
								rel="stylesheet"
								media="print"
								onLoad="this.media='all'"
							/>,
							<noscript key="2">
								<link
									rel="stylesheet"
									href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
								/>
							</noscript>,
					  ]
					: font === "fira_sans" && [
							<link
								key="0"
								href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,400;0,600;1,400;1,600&display=swap"
								as="style"
								rel="preload"
							/>,
							<link
								key="1"
								href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,400;0,600;1,400;1,600&display=swap"
								rel="stylesheet"
								media="print"
								onLoad="this.media='all'"
							/>,
							<noscript key="2">
								<link
									rel="stylesheet"
									href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
								/>
							</noscript>,
					  ]} */}
				<link href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
				<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
			</Head>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	);
}

export default MyApp;
