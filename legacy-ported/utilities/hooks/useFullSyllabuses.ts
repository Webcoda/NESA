import { useEffect, useMemo } from 'react';
import { hasAppPendingRequest, useAppDispatch, useAppSelector } from '../../store/store';
import { getContents, getGlossaries, getOutcomes, getResources, getSyllabuses } from '../../store/syllabusSlice';
import { IContents, IGlossary, ISyllabus, ISyllabusFull } from '../backendTypes';
import { notEmpty } from '../functions';
import { downloadFiles } from '../../store/mock/syllabuses';

export interface RequiredSyllabusComponents {
  id: ISyllabus['id'];
  requireGlossary?: boolean;
  requireOutcomes?: boolean;
  requireFiles?: boolean;
  requireContents?: boolean;
}

export default (items: RequiredSyllabusComponents[]): [ISyllabusFull[], boolean] => {
  const dispatch = useAppDispatch();
  const allSyllabuses = useAppSelector((state) => state.syllabus.syllabuses);
  const allContents = useAppSelector((state) => state.syllabus.courseContent);
  const allOutcomes = useAppSelector((state) => state.syllabus.outcomes);
  const allGlossaries = useAppSelector((state) => state.syllabus.glossaries);
  const allResources = useAppSelector((state) => state.syllabus.resources);
  const [syllabusLoading, contentLoading, outcomesLoading, glossariesLoading, resourcesLoading] =
    hasAppPendingRequest(getSyllabuses, getContents, getOutcomes, getGlossaries, getResources);

  let syllabusesRequested = contentLoading;
  let outcomesRequested = outcomesLoading;
  let glossariesRequested = glossariesLoading;
  let resourcesRequested = resourcesLoading;

  useEffect(() => {
    if (!allSyllabuses.length) {
      dispatch(getSyllabuses());
    }
  }, []);

  // TODO request missing components

  useEffect(() => {
    if (allSyllabuses.length) {
      items.forEach((item) => {
        const syllabus = allSyllabuses.find((syl) => syl.id === item.id);

        if (syllabus && syllabus.available) {
          if (item.requireContents && !syllabusesRequested) {
            // const content = allContents.filter((c) => c.syllabus_id === syllabus.id);

            if (allContents.length === 0) {
              dispatch(getContents());
              syllabusesRequested = true;
            }
          }

          if (item.requireOutcomes && !outcomesRequested) {
            // const content = allContents.filter((c) => c.syllabus_id === syllabus.id);

            if (allOutcomes.length === 0) {
              dispatch(getOutcomes());
              outcomesRequested = true;
            }
          }

          if (item.requireGlossary && !glossariesRequested) {
            // const content = allContents.filter((c) => c.syllabus_id === syllabus.id);

            if (allGlossaries.length === 0) {
              dispatch(getGlossaries());
              glossariesRequested = true;
            }
          }
          if (item.requireFiles && !resourcesRequested) {
            if (allResources.length === 0) {
              dispatch(getResources());
              resourcesRequested = true;
            }
          }
        }
      });
    }
  }, [allSyllabuses, allContents, allOutcomes, allGlossaries, allResources, items]);

  const syllabuses = useMemo(
    () =>
      items
        .map((i) => ({
          ...i,
          syllabus: allSyllabuses.find((syl) => syl.id === i.id),
        }))
        .filter((i) => notEmpty(i.syllabus))
        .map<ISyllabusFull>((i) => {
          const syllabus: ISyllabusFull = { ...i.syllabus! };
          if (i.requireGlossary) {
            syllabus.glossaryTerms = allGlossaries.flatMap<IGlossary>((g) => {
              const records = g.records.filter(
                (r) =>
                  r.klaId === null ||
                  syllabus.kla_id.toLowerCase().startsWith(r.klaId.toLowerCase()),
              );

              if (records.length) {
                return [
                  {
                    section: g.section,
                    records,
                  },
                ];
              }
              return [];
            });
          }

          if (i.requireFiles) {
            syllabus.files = allResources.filter((o) => o.syllabus_id === syllabus.id);
          }

          if (i.requireOutcomes) {
            syllabus.outcomes = allOutcomes.filter((o) => o.syllabus_id === syllabus.id);
          }

          if (i.requireContents) {
            syllabus.contents = allContents
              .filter((c) => c.syllabus_id === syllabus.id)
              .sort((a, b) => a.content_sequence - b.content_sequence);
          }

          return syllabus;
        }),
    [allSyllabuses, allContents, allOutcomes, allGlossaries, allResources, items],
  );

  return [syllabuses, syllabusLoading || !allSyllabuses.length];
};
