import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getSyllabuses } from '../../store/syllabusSlice';

export default () => {
  const dispatch = useAppDispatch();
  const syllabuses = useAppSelector((state) => state.syllabus.syllabuses);

  useEffect(() => {
    if (!syllabuses.length) {
      dispatch(getSyllabuses());
    }
  }, []);

  return syllabuses;
};
