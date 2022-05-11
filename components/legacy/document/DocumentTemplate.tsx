import React, { forwardRef } from 'react';
import moment from 'moment';
import { IGlossary, IGlossaryRecord, ISyllabusFull } from '../../utilities/backendTypes';
import SyllabusTemplate, { SyllabusOptions } from './SyllabusTemplate';
import useGlossaryStore from '../../utilities/hooks/useGlossaryTerms';
import GlossaryTemplate from './GlossaryTemplate';
import TableOfContentsTemplate from './TableOfContentsTemplate';
import copy from '../../assets/images/copy.png';

const CopyrightNotice = (): JSX.Element => {
  const today = moment(new Date());

  return (
    <>
      <p className="new-page">
        <strong>Downloaded {today.format('MMMM YYYY')}</strong>
      </p>
      <p>
        <strong>
          <span>
            <img src={copy} id="copy" alt="copy" /> {today.format('YYYY')}{' '}
          </span>
          NSW Education Standards Authority
        </strong>
      </p>
      <p>
        The documents on the NSW Education Standards Authority (NESA) website and the NSW Curriculum
        website contain material prepared by NESA for and on behalf of the Crown in right of the
        State of New South Wales. The material is protected by Crown copyright.
      </p>
      <p>
        These websites hold the only official and up-to-date versions of the documents available on
        the internet. Any other copies of these documents, or parts of these documents, that may be
        found elsewhere on the internet might not be current and are not authorised. You cannot rely
        on copies from any other source.
      </p>
      <p>All rights are reserved. No part of the material may be:</p>
      <ul>
        <li>
          reproduced in Australia or in any other country by any process, electronic or otherwise,
          in any material form
        </li>
        <li>
          transmitted to any other person or stored electronically in any form without the written
          permission of NESA except as permitted by the Copyright Act 1968 (Cth).
        </li>
      </ul>
      <p>When you access the material, you agree:</p>
      <ul>
        <li>
          to use the material for research or study, criticism or review, reporting news and parody
          or satire
        </li>
        <li>to use the material for information purposes only</li>
        <li>
          not to modify the material or any part of the material without the written permission of
          NESA
        </li>
        <li>
          to reproduce a single copy for personal bona fide study use only and not to reproduce any
          major extract or the entire material without the permission of NESA
        </li>
        <li>to include this copyright notice in any copy made</li>
        <li>to acknowledge that NESA is the source of the material.</li>
      </ul>
      <p>
        The documents may include third-party copyright material such as photos, diagrams,
        quotations, cartoons and artworks. This material is protected by Australian and
        international copyright laws and may not be reproduced or transmitted in any format without
        the copyright owner’s permission. Unauthorised reproduction, transmission or commercial use
        of such copyright material may result in prosecution.
      </p>
      <p>
        NESA has made all reasonable attempts to locate the owners of third-party copyright
        material. NESA invites anyone from whom permission has not been sought to contact the
        Copyright Officer.
      </p>
      <div className="new-page arrangements">
        <p>
          <strong>Special arrangements applying to the NSW Curriculum Reform</strong>
        </p>
        <p>
          As part of the NSW Curriculum Reform process, NESA grants a limited non-exclusive licence
          to:
        </p>
        <ul>
          <li>teachers employed in NSW government schools and registered non-government schools</li>
          <li>parents of children registered for home schooling</li>
        </ul>
        <p>
          to use, modify and adapt the NSW syllabuses for{' '}
          <strong>non-commercial educational use only</strong>. The adaptation must not have the
          effect of bringing NESA into disrepute.
        </p>
        <p>
          <strong>Note: </strong>
          The above arrangements do not apply to private/home tutoring companies, professional
          learning service providers, publishers, and other organisations.
        </p>
        <p>
          For more information on the above or for{' '}
          <strong>commercial use or any other purpose</strong>, please contact the Copyright Officer
          for permission.
        </p>
        <p>
          <strong>Email:</strong>
          <a href="mailto:copyright@nesa.nsw.edu.au">copyright@nesa.nsw.edu.au</a>
        </p>
      </div>
    </>
  );
};

export interface DocumentTemplateProps {
  syllabuses: ISyllabusFull[];
  options: SyllabusOptions;
  stageIds: string[];
  tagIds: string[];
  show?: boolean;
}

const DocumentTemplate = forwardRef<HTMLDivElement, DocumentTemplateProps>(
  (props: DocumentTemplateProps, ref): JSX.Element => {
    const { syllabuses, options, stageIds, tagIds, show = false } = props;

    const allGlossaryItems = useGlossaryStore();

    let glossaries: IGlossary[] | null = null;

    if (options.glossary) {
      const klaIds = syllabuses.reduce<string[]>(
        (acc, syl) => (acc.includes(syl.kla_id) ? acc : [...acc, syl.kla_id]),
        [],
      );

      glossaries = allGlossaryItems;

      // Filter by learning areas
      if (klaIds.length > 0) {
        glossaries = glossaries.reduce<IGlossary[]>((sectionList, section) => {
          // Filter records within a section
          const filteredRecords = section.records.reduce<IGlossaryRecord[]>(
            (recordList, record) => {
              if (klaIds.includes(record.klaId ?? '') || record.klaId === null) {
                recordList.push(record);
              }
              return recordList;
            },
            [],
          );

          // Remove any empty sections
          if (filteredRecords.length > 0) {
            sectionList.push({
              section: section.section,
              records: filteredRecords,
            });
          }
          return sectionList;
        }, []);
      }
    }

    return (
      <div className={show ? '' : 'doc-template--hidden'}>
        <div className="doc-template" ref={ref}>
          <div className="title-container">
            <h1 className="title">NSW Education Standards Authority </h1>
            <img className="logo" src="./nsw-government-logo.png" alt="NSW Government Logo" />
          </div>

          <CopyrightNotice />
          <TableOfContentsTemplate stageIds={stageIds} options={options} syllabuses={syllabuses} />
          {syllabuses.map((s) => (
            <SyllabusTemplate
              key={s.id}
              syllabus={s}
              options={options}
              stageIds={stageIds}
              tagIds={tagIds}
            />
          ))}
          {glossaries && glossaries?.length > 0 && (
            <>
              <h1 className="new-page">Glossary</h1>
              {glossaries
                .flatMap((g) => g.records)
                .map((r) => (
                  <GlossaryTemplate
                    key={`${r.term}-${r.klaId}`}
                    term={r.term}
                    learningArea={r.klaId}
                    definition={r.description}
                  />
                ))}
            </>
          )}
        </div>
      </div>
    );
  },
);

export default DocumentTemplate;
