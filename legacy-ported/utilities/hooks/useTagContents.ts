import { useEffect } from 'react';
import { hasAppPendingRequest, useAppDispatch, useAppSelector } from '../../store/store';
import { getContents } from '../../store/syllabusSlice';
import { getAllTagContents } from '../../store/mock/tags';
import { ITagList } from '../../pages/custom/CustomSyllabusPage';

export default (): ITagList[] => {
  const dispatch = useAppDispatch();
  const allContents = useAppSelector((state) => state.syllabus.courseContent);
  const [contentLoading] = hasAppPendingRequest(getContents);

  useEffect(() => {
    if (allContents.length === 0 && !contentLoading) {
      dispatch(getContents());
    }
  }, [allContents]);

  let allTagContents: ITagList[] = [];

  if (allContents.length > 0) {
    allTagContents = getAllTagContents(allContents);
  }

  return allTagContents;
};
