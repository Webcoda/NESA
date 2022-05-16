import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getWebpages } from '../../store/syllabusSlice';
import { IWebpage } from '../backendTypes';

export default (): [IWebpage[], boolean] => {
  const dispatch = useAppDispatch();
  const webpages = useAppSelector((s) => s.syllabus.webpages);

  useEffect(() => {
    if (!webpages) {
      dispatch(getWebpages());
    }
  }, [webpages]);

  return [webpages ?? [], !webpages];
};
