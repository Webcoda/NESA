import Banner from '@/legacy-ported/components/base/Banner'
import VideoModal from '@/legacy-ported/components/base/VideoModal'
import { Contentblock } from '@/models/contentblock'
import { UiHerobanner } from '@/models/ui_herobanner'
import { Weblinkext } from '@/models/weblinkext'
import { getLinkFromLinkUI } from '@/utils'
import { Fragment, useState } from 'react'
import { RichtextSectionProps } from '.'

export const HomepageBanner = (props: RichtextSectionProps<UiHerobanner>) => {
	const [openVideoModal, setOpenVideoModal] = useState(false)
	const { linkedItem, mappings } = props

	const handleOnClick = () => {
		setOpenVideoModal(true)
	}

	const handleVideoModalCancel = () => {
		setOpenVideoModal(false)
	}

	return (
		<div
			data-kontent-item-id={linkedItem.system.id}
			data-kontent-element-codename="web_content_rtb__content"
		>
			{linkedItem.elements.items.linkedItems.map((item: Contentblock) => {
				const moreInfoLink = item.elements.more_info_link
					.linkedItems[0] as Weblinkext
				const { url } = getLinkFromLinkUI(moreInfoLink, mappings)
				return (
					<Fragment key={item.system.id}>
						<Banner
							id={item.system.id}
							name="teachers"
							title={item.elements.title.value}
							buttonLabel={moreInfoLink.elements.title.value}
							onClick={handleOnClick}
						/>
						{openVideoModal && (
							<VideoModal
								ariaLabel={moreInfoLink.elements.title.value}
								modalStatus={openVideoModal}
								onCancel={handleVideoModalCancel}
								video={url}
							/>
						)}
					</Fragment>
				)
			})}
		</div>
	)
}

export default HomepageBanner
