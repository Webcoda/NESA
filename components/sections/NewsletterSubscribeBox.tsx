import LegacyNewsletterSubscribeBox from '@/legacy-ported/components/teachers/NewsletterSubscribeBox'
import { UiCardNewsletterSubscription } from '@/models/ui_card_newsletter_subscription'

export interface NewsletterSubscribeBoxProps {
	section: UiCardNewsletterSubscription
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
