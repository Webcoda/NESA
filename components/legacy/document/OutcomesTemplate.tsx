import React, { Fragment } from 'react';
import { IOutcome, KeyValueStrings } from '../../utilities/backendTypes';
import { AllStages } from '../../store/mock/stages';

interface RowData {
  contentOrganiser: string;
  stageOutcomes: KeyValueStrings[][];
}

export interface OutcomesTemplateProps {
  outcomes: IOutcome[];
  stageIds: string[];
}

const OutcomesTemplate = (props: OutcomesTemplateProps): JSX.Element => {
  const { outcomes, stageIds } = props;

  const stages = AllStages.filter((s) => stageIds.includes(s.id));

  const rows: RowData[] = [];

  outcomes.forEach((group) => {
    let row = rows.find((r) => r.contentOrganiser === group.content_organiser);

    if (!group.stageIds.some((stage) => stageIds.includes(stage))) {
      // Outcomes don't affect selected stages, so don't include in output.
      return;
    }

    if (!row) {
      row = {
        contentOrganiser: group.content_organiser,
        stageOutcomes: [],
      };
      rows.push(row);
    }

    stages.forEach((s, index) => {
      if (group.stageIds.includes(s.id)) {
        row!.stageOutcomes[index] = group.outcomes;
      }
    });
  });

  return (
    <table>
      <thead>
        <tr>
          <th className="outcomes-table__headingcol">
            <p>Content</p>
          </th>
          {stages.map((s) => (
            <th key={s.id} className={`outcomes-table__bodycol_${stages.length}`}>
              <p>
                <strong>{s.label} outcomes</strong>
              </p>
              <p>A student:</p>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.contentOrganiser}>
            <td>
              <p>{r.contentOrganiser}</p>
            </td>
            {stages.map((stage, index) => {
              const stageOutcomes = r.stageOutcomes[index];

              return (
                <td key={stage.id}>
                  {stageOutcomes?.length > 0 ? (
                    stageOutcomes.map((o) => (
                      <Fragment key={o.key}>
                        <p>{o.value}</p>
                        <p>
                          <strong>{o.key}</strong>
                        </p>
                      </Fragment>
                    ))
                  ) : (
                    <p>No outcomes in {stage.label}</p>
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OutcomesTemplate;
