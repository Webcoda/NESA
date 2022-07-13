import Image from '@/components/Image'
import Media from '@/lib/nsw-ds-react/src/component/media/media'
import { UiMedia } from '@/models/ui_media'
import { RichtextSectionProps } from '.'

export default function ui_media({
	linkedItem,
}: RichtextSectionProps<UiMedia>) {
	const { align, image, theme, video, type, width } = linkedItem.elements

	const isImage = type.value[0].codename !== 'video'
	const widthNumber = width.value[0].codename.replace(/[n|_]/g, '')
	const videoUrl = isImage ? '' : video.value
	const alignStr = align.value[0].codename || 'centre'
	const style = theme.value[0]?.codename || 'default'

	return (
		<Media
			caption={image.value[0].description}
			title={image.value[0].description}
			video={videoUrl}
			left={alignStr === 'left' ? widthNumber : 'none'}
			center={alignStr === 'centre' ? widthNumber : 'none'}
			right={alignStr === 'right' ? widthNumber : 'none'}
			style={style}
		>
			{/* eslint-disable jsx-a11y/alt-text */}
			{isImage && image ? (
				<Image
					asset={image.value[0]}
					width={image.value[0].width}
					height={image.value[0].height}
				/>
			) : null}
		</Media>
	)
}
