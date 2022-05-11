import React from 'react';
import { GlossaryProps } from './Glossary';
import CustomAccordion from '../custom/CustomAccordion';
import Chip from './Chip';
import { IGlossaryRecord } from '../../utilities/backendTypes';
import SanitisedHTMLContainer from './SanitisedHTMLContainer';

interface GlossaryDefinition {
  term: IGlossaryRecord['term'];
  key: IGlossaryRecord['alias'];
  definitions: Pick<IGlossaryRecord, 'klaId' | 'description'>[];
}

export type GlossaryBodyProps = Pick<GlossaryProps, 'sections'>;

const GlossaryBody = ({ sections }: GlossaryBodyProps): JSX.Element => {
  const terms = sections
    .flatMap((s) => s.records)
    .reduce<GlossaryDefinition[]>((acc, val) => {
      const found = acc.find((r) => r.key === val.alias);
      const klaExists = found?.definitions.some((d) => d.klaId === val.klaId);

      if (klaExists) {
        console.error(
          `Definition collision on Glossary Term ${val.alias} for learning area ${val.klaId}`,
        );
        return acc;
      }

      if (found) {
        found.definitions.push({
          klaId: val.klaId,
          description: val.description,
        });
      } else {
        acc.push({
          term: val.term,
          key: val.alias,
          definitions: [
            {
              klaId: val.klaId,
              description: val.description,
            },
          ],
        });
      }

      return acc;
    }, []);

  return (
    <div className="glossary-body">
      {terms.map((t) => (
        <CustomAccordion title={t.term} key={t.key} id={t.key}>
          {t.definitions.map((d) => (
            <div key={d.klaId} className="glossary-body__definition">
              {t.definitions.length >= 1 && d.klaId && (
              <Chip text={d.klaId} className="glossary-body__chip" />
              )}
              <SanitisedHTMLContainer>{d.description}</SanitisedHTMLContainer>
            </div>
          ))}
        </CustomAccordion>
      ))}
    </div>
  );
};

export default GlossaryBody;
