import React from 'react';
import SanitisedHTMLContainer from '../base/SanitisedHTMLContainer';
import { findKeyLearningArea } from '../../store/mock/keyLearningAreas';

export interface GlossaryTemplateProps {
  term: string;
  learningArea: string | null;
  definition: string;
}

const GlossaryTemplate = (props: GlossaryTemplateProps): JSX.Element => {
  const { term, learningArea, definition } = props;

  return (
    <>
      <p>
        <strong>
          <SanitisedHTMLContainer>{term}</SanitisedHTMLContainer>
        </strong>
      </p>
      {learningArea && (
        <p>
          <em>{findKeyLearningArea(learningArea).title}</em>
        </p>
      )}
      <SanitisedHTMLContainer>{definition}</SanitisedHTMLContainer>
    </>
  );
};

export default GlossaryTemplate;
