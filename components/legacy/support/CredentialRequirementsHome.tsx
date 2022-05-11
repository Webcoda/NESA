import React, { useState } from 'react';
import { Paper, Grid } from '@material-ui/core';
import DOMPurify from 'dompurify';
import DateBox from '../teachers/DateBox';
import ResourceFilter, { codeOptions, ISelectFilter, ISelectOptionList } from './ResourceFilter';

export interface ACEUpdate {
  aceCode: string;
  headline: string;
  date: Date;
  searchTags: string[];
}

export interface ACEUpdateList {
  year: string;
  updates: ACEUpdate[];
}

export interface IHTMLData {
  code: number;
  html: string;
}

const dropdowns: ISelectOptionList[] = [
  {
    id: 'code',
    name: 'Code',
    options: codeOptions,
    gridSize: 9,
  },
];

const filteredHTML2000 =
  '<h3>Disability provisions policy</h3>' +
  '<h4>ACE 2000</h4> ' +
  '<p>The Disability Discrimination Act 1992 (Cth) and the Disability Standards for Education (2005) require NESA to ensure that students with a disability are able to access and respond to an examination. </p>' +
  '<p>NESA may approve disability provisions for the Higher School Certificate examinations if a student has a permanent or temporary disability that would, in a normal examination situation, prevent him or her from: </p>' +
  '<ul>' +
  '<li>reading the examination questions; and/or</li>' +
  '<li>communicating his or her responses.</li> ' +
  '</ul>' +
  '<p>Principals have the authority to decide on, and to implement, disability provisions for school-based assessment tasks including examinations.</p>' +
  '<h5>Last Updated: 1 April 2019</h5>';

const filteredHTML2001 =
  '<h3>Disability provisions policy</h3>' +
  '<h4>ACE 2001</h4> ' +
  '<p>The Disability Discrimination Act 1992 (Cth) and the Disability Standards for Education (2005) require NESA to ensure that students with a disability are able to access and respond to an examination. </p>' +
  '<p>NESA may approve disability provisions for the Higher School Certificate examinations if a student has a permanent or temporary disability that would, in a normal examination situation, prevent him or her from: </p>' +
  '<ul>' +
  '<li>reading the examination questions; and/or</li>' +
  '<li>communicating his or her responses.</li> ' +
  '</ul>' +
  '<p>Principals have the authority to decide on, and to implement, disability provisions for school-based assessment tasks including examinations.</p>' +
  '<h5>Last Updated: 1 April 2019</h5>';

const filteredHTML3000 =
  '<h3>Disability provisions policy</h3>' +
  '<h4>ACE 3000</h4> ' +
  '<p>The Disability Discrimination Act 1992 (Cth) and the Disability Standards for Education (2005) require NESA to ensure that students with a disability are able to access and respond to an examination. </p>' +
  '<p>NESA may approve disability provisions for the Higher School Certificate examinations if a student has a permanent or temporary disability that would, in a normal examination situation, prevent him or her from: </p>' +
  '<ul>' +
  '<li>reading the examination questions; and/or</li>' +
  '<li>communicating his or her responses.</li> ' +
  '</ul>' +
  '<p>Principals have the authority to decide on, and to implement, disability provisions for school-based assessment tasks including examinations.</p>' +
  '<h5>Last Updated: 1 April 2019</h5>';

const filteredHTMLData: IHTMLData[] = [
  {
    code: 2000,
    html: filteredHTML2000,
  },
  {
    code: 2001,
    html: filteredHTML2001,
  },
  {
    code: 3000,
    html: filteredHTML3000,
  },
];

export const dummyUpdates: ACEUpdateList[] = [
  {
    year: '2021',
    updates: [
      {
        aceCode: 'ACE 2000',
        headline: 'Minimum standard online tests',
        date: new Date('3 june 2021'),
        searchTags: ['2021', 'ACE 2000', 'minimum'],
      },
      {
        aceCode: 'ACE 3000',
        headline: 'Minimum standard online tests: Candidates sitting the tests after school',
        date: new Date('1 june 2021'),
        searchTags: ['2021', 'ACE 3000', 'minimum'],
      },
    ],

  },
  {
    year: '2020',
    updates: [
      {
        aceCode: 'ACE 2000',
        headline:
            'Entry requirements for Stage 6 Languages courses where eligibility criteria apply',
        date: new Date('29 october 2020'),
        searchTags: ['2021', 'ACE 2000', 'minimum'],
      },
      {
        aceCode: 'ACE 3000',
        headline:
            'Entry requirements for the Stage 6 English as an additional language or dialect (EAL/D) course',
        date: new Date('14 october 2020'),
        searchTags: ['2021', 'ACE 3000', 'minimum'],
      },
      {
        aceCode: 'ACE 4000',
        headline:
            'Entry requirements for Stage 6 Languages courses where eligibility criteria apply',
        date: new Date('29 september 2020'),
        searchTags: ['2021', 'ACE 4000', 'minimum'],
      },
      {
        aceCode: 'ACE 5000',
        headline:
            'Entry requirements for the Stage 6 English as an additional language or dialect (EAL/D) course',
        date: new Date('14 september 2020'),
        searchTags: ['2021', 'ACE 5000', 'minimum'],
      },
    ],
  },
];

export interface CredentialRequirementsHomeProps {
  /**
   * Search Text
   */
  searchText: string;
}

const CredentialRequirementsHome = (props: CredentialRequirementsHomeProps): JSX.Element => {
  const { searchText } = props;
  const [currentFilters, setCurrentFilters] = useState<ISelectFilter[]>([]);
  const [currentFilteredHTMLData, setCurrentFilteredHTMLData] = useState<IHTMLData[]>([]);

  const handleApplyFilters = (filters: ISelectFilter[]) => {
    setCurrentFilters(filters);

    if (filters.length > 0 && filters[0].value) {
      const newFilteredHTMLData = filteredHTMLData.filter((html) => {
        const codeToCompare = parseInt(filters[0].value);
        return html.code >= codeToCompare && html.code < (codeToCompare + 1000);
      });
      if (newFilteredHTMLData.length > 0) {
        setCurrentFilteredHTMLData(newFilteredHTMLData);
      } else {
        setCurrentFilteredHTMLData([]);
      }
    }
  };

  /**
   * Search resources
   */
  const matchesSearch = (text: string) => {
    const searchResults = text
      ? dummyUpdates.map((paper) => {
        /**
         * Search updates by ACE code and Search tags
         */
        const filteredUpdates = paper.updates.filter((update) => {
          const searchObjects = { text: update.aceCode, searchTags: update.searchTags };
          return Object.values(searchObjects).join().toLowerCase().includes(text.toLowerCase());
        });

        return { ...paper, updates: filteredUpdates };
      })
      :
      dummyUpdates;
    return searchResults;
  };

  const finalFilteredUpdates = matchesSearch(searchText);

  return (
    <div className="credentials-home">
      <ResourceFilter
        dropdowns={dropdowns}
        filterButtonGridSize={3}
        onApplyFilters={handleApplyFilters}
      />
      <p className="credentials-home__description">
        Welcome to the Assessment Certification Examination (ACE) website, which provides current,
        easily accessible information to principals, teachers, parents and students about the rules
        and procedures set by the NSW Education Standards Authority (NESA) for secondary education
        in New South Wales.
      </p>
      <p className="credentials-home__description">
        ACE provides enhanced support to schools in their implementation of requirements under the
        Education Standards Authority Act 2013, and the Education Act 1990 (NSW) and NESA policies
        in relation to Years 7–12 assessment, certification and examination programs.
      </p>
      <p className="credentials-home__description">
        ACE provides up-to-date information on NESA’s policies in relation to the Higher School
        Certificate and the Record of School Achievement.
      </p>
      {currentFilters.length === 0 && (
        <Paper className="credentials-home__updates-card">
          <h3>Recent Updates</h3>
          {finalFilteredUpdates.map((yearUpdate) => (
            <div key={yearUpdate.year} className="credentials-home__year-update">
              <div className="credentials-home__year">
                <h4>{yearUpdate.year}</h4>
              </div>
              {yearUpdate.updates.length === 0 &&
                <Grid>
                  Not found
                </Grid>
              }
              {yearUpdate.updates.map((u) => (
                <div
                  key={`${yearUpdate.year}-${u.aceCode}-${u.headline}`}
                  className="credentials-home__update-line"
                >
                  <span>
                    {u.aceCode} {u.headline}
                  </span>
                  <DateBox date={u.date} />
                </div>
              ))}
            </div>
          ))}
        </Paper>
      )}
      {currentFilteredHTMLData.map((currentFilteredHTML) => (
        <Paper key={currentFilteredHTML.code} className="credentials-home__updates-card">
          <div
            className="html-content"
          // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(currentFilteredHTML.html) }}
          />
        </Paper>
      ))
      }
      {currentFilters.length > 0 && currentFilteredHTMLData.length === 0 && (
        <Grid container justifyContent="center">
          Not found
        </Grid>
      )}
    </div>
  );
};

export default CredentialRequirementsHome;
