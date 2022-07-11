import { Card, Grid, IconButton } from '@material-ui/core'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
// import JsFileDownloader from 'js-file-downloader'
// import DOMPurify from 'dompurify'
import { detect } from 'detect-browser'
import { isMobile } from 'react-device-detect'
import DESIGN from '../../constants/designConstants'
// import { downloadFileUsingDOM } from '../document/documentFunctions'
import { AssetWithRawElements } from '@/types'
import { getFileTypeClassification } from '@/utils'
import filesize from 'filesize'

const fileSize = filesize.partial({ round: 2, standard: 'jedec' })

export interface DownloadListProps {
	/**
	 * List of files
	 */
	files: AssetWithRawElements[]
	/**
	 * Marks the card with a coloured top border
	 */
	colour?: 'primary' | 'secondary'
}

/**
 * A list of files to download
 * @param props
 * @constructor
 */
const DownloadList = (props: DownloadListProps): JSX.Element => {
	const { files, colour } = props
	const browser = detect()
	const mobileUserUsingChromeAndiOS =
		browser && browser.os === 'iOS' && browser.name === 'crios' && isMobile

	const handleDownload = (resource: AssetWithRawElements) => {
		// for Chrome using iOS device we had to do this workaround
		if (mobileUserUsingChromeAndiOS) {
			// TODO: Fix
			// resource.attachment.forEach((attachment) =>
			// 	downloadFileUsingDOM(attachment.filename, attachment.src),
			// )
		} else {
			// TODO: fix
			// const downloads = resource.attachment.map(
			// 	(attachment) =>
			// 		new JsFileDownloader({
			// 			url: attachment.src,
			// 			autoStart: true,
			// 			nativeFallbackOnError: true,
			// 			forceDesktopMode: true,
			// 			filename: attachment.filename,
			// 		}),
			// )
			// Promise.all(downloads)
			// 	.then(() => console.log('Download Success'))
			// 	.catch((err) => console.error('Download failed:', err))
		}
	}

	return (
		<Card
			className={`download-list ${
				colour ? `download-list--${colour}` : ''
			}`}
		>
			{files
				// .sort((a, b) => stringCompare(a.summary, b.summary))
				.map((file, index) => (
					<Grid
						key={`download-link-${file.id}`}
						container
						alignItems="center"
						className="download-list__item"
					>
						<Grid
							container
							item
							xs={8}
							className="download-list__column"
							alignItems="center"
						>
							<Grid className="download-list__type">
								<p className="small-text">
									{getFileTypeClassification(file.type)}
								</p>
							</Grid>
							<Grid className="download-list__name">
								<button
									type="button"
									onClick={() => handleDownload(file)}
									className="download-list__link"
								>
									<div className="download-list__link">
										<p>
											{(
												file.title || file.fileName
											).trim()}
										</p>
									</div>
								</button>
							</Grid>
						</Grid>
						<Grid
							container
							item
							xs={4}
							className="download-list__column"
							justifyContent="flex-end"
							alignItems="center"
						>
							<Grid>
								{file.size && (
									<p
										dangerouslySetInnerHTML={{
											__html: fileSize(file.size),
										}}
									/>
								)}
							</Grid>
							<Grid>
								<IconButton
									href={file.url}
									className="no-icon"
									download
									size="small"
									onClick={() => handleDownload(file)}
									aria-label="download"
								>
									<CloudDownloadIcon
										style={{
											color: DESIGN.COLOR_BLUE_PRIMARY,
										}}
									/>
								</IconButton>
							</Grid>
						</Grid>
					</Grid>
				))}
		</Card>
	)
}

export default DownloadList
