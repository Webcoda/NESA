import fastSafeStringify from 'fast-safe-stringify'

const replacer = (_, value) => {
	// Remove the circular structure
	if (value === '[Circular]') {
		return
	}
	return value
}

/**
 * Return
 * @param object object
 * @param depthLimit depth of json
 * @returns object
 */
export const cleanJson = (
	object,
	depthLimit = Number.MAX_SAFE_INTEGER,
	space = 0,
) => {
	return JSON.parse(
		fastSafeStringify(object, replacer, space, {
			depthLimit,
			edgesLimit: Number.MAX_SAFE_INTEGER,
		}),
	)
}
