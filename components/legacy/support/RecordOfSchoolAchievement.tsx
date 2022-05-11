import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
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
    label: 'ACE 2001 Requirements for the award of the Record of School Achievement',
    link: '#',
    code: 2001,
    searchTags: ['2001'],

  },
  {
    label:
      'ACE 2500 Eligibility for the Record of School Achievement for students in Years 7–10 transferring between schools',
    link: '#',
    code: 2500,
    searchTags: ['2500'],

  },
  {
    label: 'ACE 4004 Eligibility for the Record of School Achievement – exchange students',
    link: '#',
    code: 4004,
    searchTags: ['4004'],
  },
  {
    label: 'ACE 5000 ‘N’ determinations – eligibility for Record of School Achievement',
    link: '#',
    code: 5000,
    searchTags: ['5000'],
  },
  {
    label: 'ACE 6000 Requirements for the award of the Record of School Achievement',
    link: '#',
    code: 6000,
    searchTags: ['6000'],
  },
  {
    label:
      'ACE 7000 Eligibility for the Record of School Achievement for students in Years 7–10 transferring between schools',
    link: '#',
    code: 7000,
    searchTags: ['7000'],
  },
  {
    label: 'ACE 40046 Eligibility for the Record of School Achievement – exchange students',
    link: '#',
    code: 8000,
    searchTags: ['8000'],
  },
];

export interface RecordOfSchoolAchievementProps {
  /**
   * Search text
   */
  searchText: string;
}

const RecordOfSchoolAchievement = (props: RecordOfSchoolAchievementProps) => {
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
      <FileDownloadCard title="Eligibility" files={finalFilteredLinks} />
      <FileDownloadCard title="Curriculum – mandatory and additional" files={finalFilteredLinks} />
    </Grid>
  );
};

export default RecordOfSchoolAchievement;
