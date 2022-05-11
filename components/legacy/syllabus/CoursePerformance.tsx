import React from 'react';
import { Grid } from '@material-ui/core';

export interface CoursePerformanceSection {
  grade: string;
  description: string;
}

export interface CoursePerformanceProps {
  /**
   * CMS sections
   */
  sections: CoursePerformanceSection[];
}

const CoursePerformance = (props: CoursePerformanceProps): JSX.Element => {
  const { sections } = props;

  return (
    <Grid className="syllabus-content-section cms-content-formatting">
      <p>
        The primary role of assessment is to establish where students are in their learning so that
        teaching can be differentiated and further learning progress can be monitored over time. It
        provides information that assists teachers to target their teaching at the point of student
        need. Assessment is most effective when it is an integral part of teaching and learning
        programs.
      </p>
      <p>Assessment involves:</p>
      <ul>
        <li>establishing where students are in their learning</li>
        <li>ongoing monitoring</li>
        <li>formative and summative tasks</li>
        <li>providing feedback about student progress.</li>
      </ul>
      {/* {sections.map((sec) => ( */}
      {/*  <Grid className="assessment__container"> */}
      {/*    <CustomAccordion title={sec.grade} key={sec.grade}> */}
      {/*      <SyllabusContentSection innerHtml={sec.description} /> */}
      {/*    </CustomAccordion> */}
      {/*  </Grid> */}
      {/* ))} */}
    </Grid>
  );
};

export default CoursePerformance;
