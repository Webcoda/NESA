import '@/legacy-ported/sass/app.scss'
import { CommonPageProps } from '@/types'
import { IContentItem } from '@kentico/kontent-delivery'
import KontentSmartLink from '@kentico/kontent-smart-link'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import get from 'lodash.get'
import Head from 'next/head'
import React from 'react'

// import "../styles/main.css";

interface MyAppProps {
	Component: any
	pageProps: CommonPageProps<IContentItem>
}

function MyApp({ Component, pageProps }: MyAppProps) {
	const configObject = pageProps?.data?.config

	const fontName = 'Montserrat'

	let title =
		pageProps?.seo?.title ||
		pageProps?.data?.pageResponse?.item?.elements?.title?.value ||
		''
	let siteDescriptor = configObject?.item?.elements?.descriptor?.value || ''
	if (title) {
		title += ' | '
	}
	title += configObject?.item?.elements?.site_prefix?.value || ''
	if (siteDescriptor) {
		title = title + ' | ' + siteDescriptor
	}

	const palette =
		configObject?.item?.elements?.palette?.value?.[0]?.codename || null
	const colors = {
		primary: '#F05A22',
		secondary: '#B72929',
	}

	switch (palette) {
		case 'blue':
			colors.primary = '#3553B8'
			colors.secondary = '#81D4FA'
			break
		case 'cyan':
			colors.primary = '#007C91'
			colors.secondary = '#5DDEF4'
			break
		case 'green':
			colors.primary = '#2C9E7E'
			colors.secondary = '#4b830d'
			break
		case 'purple':
			colors.primary = '#7D3F9C'
			colors.secondary = '#7986cb'
			break
		case 'default':
		default:
			break
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
				default: '#FFF',
			},
		},
		typography: {
			fontFamily: [fontName, 'sans-serif'].join(', '),
		},
	})

	// https://material-ui.com/guides/server-rendering/#the-client-side
	// https://github.com/mui-org/material-ui/tree/master/examples/nextjs
	React.useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side')
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles)
		}
	}, [])

	React.useEffect(() => {
		// This is just an example of SDK initialization inside ES6 module.
		// HTML markup should still contain all necessary data-attributes (e.g. PageSection component).
		const kontentSmartLink = KontentSmartLink.initialize({
			defaultDataAttributes: {
				projectId: process.env.NEXT_PUBLIC_KONTENT_PROJECT_ID,
				languageCodename: 'default',
			},
			queryParam: 'preview-mode',
		})

		return () => {
			kontentSmartLink.destroy()
		}
	})

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
				{get(configObject, 'item.elements.favicon.value[0]', null) && (
					<link
						rel="icon"
						href={get(
							configObject,
							'item.elements.favicon.value[0].url',
							null,
						)}
					/>
				)}
				<meta
					name="description"
					content={get(pageProps, 'seo.description', null)}
				/>
				{get(pageProps, 'seo.keywords', null) && (
					<meta
						name="keywords"
						content={get(pageProps, 'seo.keywords', null)}
					/>
				)}
				{get(pageProps, 'seo.canonicalUrl', null) ?? (
					<link
						rel="canonical"
						href={get(pageProps, 'seo.canonicalUrl', null)}
					/>
				)}
				{get(pageProps, 'seo.noIndex', null) && (
					<meta name="robots" content="noindex,follow" />
				)}
				<link
					href="https://fonts.googleapis.com/icon?family=Material+Icons"
					rel="stylesheet"
				/>
			</Head>
			<ThemeProvider theme={theme}>
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	)
}

export default MyApp
