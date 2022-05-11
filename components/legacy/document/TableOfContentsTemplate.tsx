import React from 'react';
import { DocumentTemplateProps } from './DocumentTemplate';
import { SyllabusToCTemplate } from './SyllabusTemplate';

export type TableOfContentsTemplateProps = Pick<
  DocumentTemplateProps,
  'syllabuses' | 'stageIds' | 'options'
>;

const TableOfContentsTemplate = (props: TableOfContentsTemplateProps): JSX.Element => {
  const { syllabuses, stageIds, options } = props;
  return (
    <>
      <h1 className="new-page">Table of contents</h1>
      <div className="table-contents">
        {syllabuses.map((syl) => (
          <SyllabusToCTemplate key={syl.id} syllabus={syl} options={options} stageIds={stageIds} />
        ))}
        {options.glossary && <p className="h1">Glossary</p>}
      </div>
    </>
  );
};

export default TableOfContentsTemplate;
