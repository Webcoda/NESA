import { getSitemapMappings } from '../../lib/api'
import { getUrlFromMapping } from '../../utils'
const setCookieSameSite = (res, value) => {
	const cookies = res.getHeader('Set-Cookie')
	const updatedCookies = cookies?.map((cookie) => cookie.replace('SameSite=Lax', `SameSite=${value}; Secure;`))
	res.setHeader('Set-Cookie', updatedCookies)
}

export default async function preview(req, res) {
	// Check the secret and next parameters
	// This secret should only be known to this API route and the CMS
	if (req.query.secret !== process.env.PREVIEW_SECRET) {
		return res.status(401).json({ message: 'Invalid token' })
	}

	console.log('Entering preview')
	// Enable Preview Mode by setting the cookies
	res.setPreviewData({})
	setCookieSameSite(res, 'None')

	const redirectItemCodename = req.query.redirectItemCodename
	if (redirectItemCodename) {
		const mappings = await getSitemapMappings()
		const redirectTo = getUrlFromMapping(mappings, redirectItemCodename)
		res.redirect(redirectTo)
		return
	}

	res.redirect('/')
}
