import { RichtextSectionProps } from '.'
import MathJax from 'react-mathjax'
import { Mathformula } from '@/models/mathformula'

export default function math_formula({
	linkedItem,
}: RichtextSectionProps<Mathformula>) {
	return (
		<MathJax.Provider script="https://cdn.jsdelivr.net/npm/mathjax@2.7.9/MathJax.js?config=TeX-MML-AM_SVG">
			<span className="math-formula">
				<MathJax.Node
					inline
					formula={linkedItem.elements.formula.value}
				/>
			</span>
		</MathJax.Provider>
	)
}
