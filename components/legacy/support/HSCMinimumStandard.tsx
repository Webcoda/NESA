import React from 'react';
import { Grid } from '@material-ui/core';
import FileDownloadCard, { ILink } from '../card/FileDownloadCard';

const links: ILink[] = [
  {
    label:
      'ACE 2000 Record of School Achievement requirements for students undertaking Years 7–10 courses based on Life Skills outcomes and content',
    link: '#',
    code: 2000,
    searchTags: ['2000'],
  },
  {
    label: 'ACE 3000 Requirements for the award of the Record of School Achievement',
    link: '#',
    code: 3000,
    searchTags: ['3000'],
  },
  {
    label:
      'ACE 4000 Eligibility for the Record of School Achievement for students in Years 7–10 transferring between schools',
    link: '#',
    code: 4000,
    searchTags: ['4000'],
  },
];

export interface HSCMinimumStandardProps {
  /**
   * Search text
   */
  searchText: string;
}

const HSCMinimumStandard = (props: HSCMinimumStandardProps) => {
  const { searchText } = props;

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

  const finalFilteredLinks = matchesSearch(searchText);

  return (
    <Grid container direction="column">
      <FileDownloadCard title="Board Developed Courses" files={finalFilteredLinks} />
    </Grid>
  );
};

export default HSCMinimumStandard;
