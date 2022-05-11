import React from 'react';
import { ISyllabusGrade } from '../../utilities/backendTypes';
import SanitisedHTMLContainer from '../base/SanitisedHTMLContainer';

export interface AssessmentTemplateProps {
  grades: ISyllabusGrade[];
}

const AssessmentTemplate = (props: AssessmentTemplateProps): JSX.Element => {
  const { grades } = props;

  return (
    <table>
      <thead>
        <tr>
          <th>Grade</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {grades.map((g) => (
          <tr key={g.grade}>
            <th>
              <SanitisedHTMLContainer>{g.grade}</SanitisedHTMLContainer>
            </th>
            <td>
              <SanitisedHTMLContainer>{g.description}</SanitisedHTMLContainer>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AssessmentTemplate;
