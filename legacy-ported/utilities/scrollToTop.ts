import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
	/*
    This component watches for routePath,
    when it changes it always make sure the page scroll is at 0
  */

	const routePath = useLocation()
	const onTop = () => {
		window.scrollTo(0, 0)
	}
	useEffect(() => {
		onTop()
	}, [routePath])

	return null
}

export default ScrollToTop
