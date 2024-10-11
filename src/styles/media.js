import { css } from 'styled-components'

const sizes = {
	xs: 420, // phone
	sm: 768, // tablet
	lg: 1200, // notebook
}

const media = Object.keys(sizes).reduce((acc, label) => {
	acc[label] = (...args) => css`
		@media (max-width: ${sizes[label] / 16}em) {
			${css(...args)};
		}
	`

	return acc
}, {})

export default media;
