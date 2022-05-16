import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getGlossaries } from '../../store/syllabusSlice';

export default () => {
  const dispatch = useAppDispatch();
  const glossaries = useAppSelector((state) => state.syllabus.glossaries);

  useEffect(() => {
    if (glossaries.length === 0) {
      dispatch(getGlossaries());
    }
  }, []);

  return glossaries;
};
