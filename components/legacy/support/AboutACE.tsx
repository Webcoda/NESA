import React from 'react';
import { InPageNavLinks } from 'nsw-ds-react';
import { Grid } from '@material-ui/core';
import SyllabusContentSection from '../syllabus/SyllabusContentSection';
import ComponentWithInPageNavLinks from '../custom/ComponentWithInPageNavLinks';

const content = [
  {
    id: 0,
    url: '#content-0',
    tag: 'content-0',
    arial_label: 'About ACE',
    title: 'About ACE',
    content:
      '<p>Students with disability have a range of abilities and needs. Schools need to provide adjustments to teaching</p>' +
      '<h5>Delegation by NESA</h5>' +
      '<p>The Education Standards Auhority Act 2013 (NSW) allows NESA to delegate to an authorised person or body the exercise of ' +
      'any of its functions under the education and teaching legislations (defined as the Education Standards Auhority Act 2013 ' +
      '(NSW), the Education Act 1990 and the Teacher Accreditation Act 2004).</p>' +
      '<p>NESA has delegated certain functions to its President, committees, members of staff and school principals.</p>',
  },
  {
    id: 1,
    url: '#content-1',
    tag: 'content-1',
    arial_label: 'Using ACE',
    title: 'Using ACE',
    content:
      '<h5>Navigating ACE</h5>' +
      '<p>Information on ACE is accessed using the navigation panel on the left-hand side of each page and a search feature at the top right.</p>',
  },
];

export default function AboutACE() {
  return (
    <div>
      <ComponentWithInPageNavLinks title="On this page" contents={content} />
    </div>
  );
}
