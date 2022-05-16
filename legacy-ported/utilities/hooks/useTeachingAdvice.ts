import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getTeachingAdvices } from '../../store/syllabusSlice';
import { ITeachingAdvice } from '../backendTypes';

export default (): [ITeachingAdvice[], boolean] => {
  const dispatch = useAppDispatch();
  const advice = useAppSelector((s) => s.syllabus.teachingAdvice);

  useEffect(() => {
    if (!advice.length) {
      dispatch(getTeachingAdvices());
    }
  }, [advice]);

  return [advice, !advice.length];
};
