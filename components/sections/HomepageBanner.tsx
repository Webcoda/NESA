import Banner from '@/legacy-ported/components/base/Banner'
import VideoModal from '@/legacy-ported/components/base/VideoModal'
import { HomepageBanner as HomepageBannerModal } from '@/models/homepage_banner'
import { useState } from 'react'

export interface HomepageBannerProps {
	section: HomepageBannerModal
}

export const HomepageBanner = (props: HomepageBannerProps) => {
	const { section } = props

	const [openVideoModal, setOpenVideoModal] = useState(false)

	const handleOnClick = () => {
		setOpenVideoModal(true)
	}

	const handleVideoModalCancel = () => {
		setOpenVideoModal(false)
	}

	return (
		<>
			<Banner
				name="teachers"
				title={section.elements.title.value}
				buttonLabel={section.elements.button_label.value}
				onClick={handleOnClick}
			/>
			{openVideoModal && (
				<VideoModal
					ariaLabel="How to use this site"
					modalStatus={openVideoModal}
					onCancel={handleVideoModalCancel}
					video="https://players.brightcove.net/2750693524001/default_default/index.html?videoId=6276640696001 "
				/>
			)}
		</>
	)
}

export default HomepageBanner
