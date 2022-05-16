import { useEffect, useMemo } from 'react';
import { TResourceTypes } from '../../store/mock/resources';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getResources } from '../../store/syllabusSlice';

export default (...types: TResourceTypes[]) => {
  const dispatch = useAppDispatch();
  const resources = useAppSelector((state) => state.syllabus.resources);

  useEffect(() => {
    if (resources.length === 0) {
      dispatch(getResources());
    }
  }, []);

  return useMemo(
    () =>
      (types.length > 0
        ? resources.filter((r) => types.some((t) => t === r.resource_type))
        : resources),
    [resources, ...types],
  );
};
