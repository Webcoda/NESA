import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import DOMPurify from 'dompurify';
import FileDownloadCard, { ILink } from '../card/FileDownloadCard';
import ResourceFilter, { codeOptions, ISelectFilter, ISelectOptionList } from './ResourceFilter';

const dropdowns: ISelectOptionList[] = [
  {
    id: 'code',
    name: 'Code',
    options: codeOptions,
    gridSize: 8,
  },
];

export const links: ILink[] = [
  {
    label:
      'ACE 2000 Record of School Achievement requirements for students undertaking Years 7–10 courses based on Life Skills outcomes and content',
    link: '#',
    code: 2000,
    searchTags: ['2000'],
  },
  {
    label: 'ACE 2500 Requirements for the award of the Record of School Achievement',
    link: '#',
    code: 2500,
    searchTags: ['2500'],
  },
  {
    label:
      'ACE 4000 Eligibility for the Record of School Achievement for students in Years 7–10 transferring between schools',
    link: '#',
    code: 4000,
    searchTags: ['4000'],
  },
  {
    label: 'ACE 5000 Eligibility for the Record of School Achievement – exchange students',
    link: '#',
    code: 5000,
    searchTags: ['5000'],
  },
  {
    label: 'ACE 6000 ‘N’ determinations – eligibility for Record of School Achievement',
    link: '#',
    code: 6000,
    searchTags: ['6000'],
  },
  {
    label: 'ACE 7000 Requirements for the award of the Record of School Achievement',
    link: '#',
    code: 7000,
    searchTags: ['7000'],
  },
  {
    label:
      'ACE 8000 Eligibility for the Record of School Achievement for students in Years 7–10 transferring between schools',
    link: '#',
    code: 8000,
    searchTags: ['8000'],
  },
  {
    label: 'ACE 9000 Eligibility for the Record of School Achievement – exchange students',
    link: '#',
    code: 9000,
    searchTags: ['9000'],
  },
];

const higherSchoolCertificateHtml =
  '<h4>The Higher School Certificate</h4> ' +
  '<p>The Higher School Certificate (HSC) is the highest educational award in New South Wales schools. It is awarded to NSW ' +
  'students who have satisfactorily completed Years 11 and 12 at secondary school. To be eligible, students must meet HSC course ' +
  'requirements and sit for the statewide HSC examinations. The HSC is an internationally recognised credential that provides a strong ' +
  'foundation for students wishing to pursue tertiary qualifications, vocational training or employment. </p>' +
  '<p>Use the structure below to navigate information about Higher School Certificate rules, requirements and procedures.</p>';

export interface HigherSchoolCertificateProps {
  /**
   * Search text
   */
  searchText: string;
}

const HigherSchoolCertificate = (props: HigherSchoolCertificateProps) => {
  const { searchText } = props;

  const [currentFilters, setCurrentFilters] = useState<ISelectFilter[]>([]);

  const handleApplyFilters = (filters: ISelectFilter[]) => {
    setCurrentFilters(filters);
  };

  /**
   * Search resources
   */
  const matchesSearch = (text: string) => {
    const searchResults = text
      ? links.filter((link) =>
        Object.values(link.searchTags).join().toLowerCase().includes(text.toLowerCase()),
      ) : links;

    return searchResults;
  };

  /**
   * Filter resources
   */
  const finalFilteredLinks = matchesSearch(searchText)
    .filter((c) => currentFilters.every(({ name, value }) => {
      switch (name) {
        case 'code': {
          const codeToCompare = parseInt(value?.toLowerCase());
          return c.code >= codeToCompare && c.code < (codeToCompare + 1000);
        }
        default:
          return true;
      }
    }));

  return (
    <Grid container direction="column">
      <ResourceFilter dropdowns={dropdowns} onApplyFilters={handleApplyFilters} />
      <div
        className="html-content"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(higherSchoolCertificateHtml) }}
      />
      <FileDownloadCard title="Board Developed Courses" files={finalFilteredLinks} />
      <FileDownloadCard title="Curriculum – mandatory and additional" files={finalFilteredLinks} />
    </Grid>
  );
};

export default HigherSchoolCertificate;
