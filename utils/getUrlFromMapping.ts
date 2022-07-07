import { Mapping } from '@/types'

export default function getUrlFromMapping(
	mappings: Mapping[],
	codename: string,
) {
	const mapping = mappings.find((_mapping) => {
		return _mapping.params.navigationItem.system.codename === codename
	})

	if (!mapping) {
		return undefined
	}

	const path = mapping.params.slug.join('/')
	return '/' + path
}
