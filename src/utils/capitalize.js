/**
 *
 * @param {string} text
 * @returns
 */
module.exports = (text) => {
	if (text.charCodeAt(0) > 64 && text.charCodeAt(0) < 97) return text
	return text.charAt(0).toLocaleUpperCase() + text.slice(1)
}
