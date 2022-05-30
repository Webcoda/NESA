import LegacyNewsletterSubscribeBox from '@/legacy-ported/components/teachers/NewsletterSubscribeBox'
import { NewsletterSubscribeBox as NewsletterSubscribeBoxModel } from '@/models/newsletter_subscribe_box'

export interface NewsletterSubscribeBoxProps {
	section: NewsletterSubscribeBoxModel
}

export const NewsletterSubscribeBox = (props: NewsletterSubscribeBoxProps) => {
	const { section } = props

	return (
		<LegacyNewsletterSubscribeBox
			title={section.elements.title.value}
			inputLabel={section.elements.input_label.value}
			buttonLabel={section.elements.button_label.value}
			formAction={section.elements.createsend_action.value}
			createSendId={section.elements.createsend_id.value}
		/>
	)
}

export default NewsletterSubscribeBox
