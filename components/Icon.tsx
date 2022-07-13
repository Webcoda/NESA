import { Icon as IconifyIcon } from '@iconify/react'
// import { makeStyles } from '@material-ui/core'

// const useStyles = makeStyles((theme) => ({
// 	icon: {
// 		width: theme.spacing(2),
// 	},
// }))

// export interface IconProps extends Omit<IconifyIconProps, 'icon'> {
// 	icon: IconModel
// }

// It is possible to use Icon component, but it would increase the bundle size https://material-ui.com/components/icons/#icon-font-icons
function Icon(props: any) {
	return (
		<IconifyIcon
			{...props}
			icon={props.icon.elements.icon.value}
			width={props.width || 24}
			height={props.height || 24}
		/>
	)
}
export default Icon
