import getUrlFromMapping from "./getUrlFromMapping";
import kontentImageLoader from "./kontentImageLoader";
import srcIsKontentAsset from "./srcIsKontentAsset";
import dynamic from 'next/dynamic'

export const getNswDsComponent = (name) => {
	return dynamic(() => {
		import('nsw-ds-react').then(module => module[name])
	}, { ssr: false })
}

export {
  getUrlFromMapping,
  kontentImageLoader,
  srcIsKontentAsset
};

export default {
  getUrlFromMapping,
  kontentImageLoader,
  srcIsKontentAsset
};
