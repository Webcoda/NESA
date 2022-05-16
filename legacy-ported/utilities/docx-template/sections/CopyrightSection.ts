import {
  ExternalHyperlink,
  ISectionOptions,
  Paragraph,
  SectionType,
  TabStopType,
  TextRun,
} from 'docx';
import moment from 'moment';

const CopyrightSection = (): ISectionOptions => {
  const today = moment(new Date());

  // console.log('Copyright Section');

  return {
    properties: {
      type: SectionType.NEXT_PAGE,
    },
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text: `Downloaded ${today.format('MMMM YYYY')}`,
            bold: true,
          }),
        ],
      }),
      new Paragraph({
        text: `© ${today.format('YYYY')} NSW Education Standards Authority`,
        style: 'CopyrightHeading',
      }),
      new Paragraph(
        'The documents on the NSW Education Standards Authority (NESA) website and the NSW Curriculum ' +
          'website contain material prepared by NESA for and on behalf of the Crown in right of the State of ' +
          'New South Wales. The material is protected by Crown copyright.',
      ),
      new Paragraph(
        'These websites hold the only official and up-to-date versions of the documents available on ' +
          'the internet. Any other copies of these documents, or parts of these documents, that may be found ' +
          'elsewhere on the internet might not be current and are not authorised. You cannot rely on copies ' +
          'from any other source.',
      ),
      new Paragraph('All rights are reserved. No part of the material may be:'),
      new Paragraph({
        text:
          'reproduced in Australia or in any other country by any process, electronic or otherwise, in ' +
          'any material form',
        bullet: {
          level: 0,
        },
      }),
      new Paragraph({
        text:
          'transmitted to any other person or stored electronically in any form without the written ' +
          'permission of NESA except as permitted by the Copyright Act 1968 (Cth).',
        bullet: {
          level: 0,
        },
      }),
      new Paragraph('When you access the material, you agree:'),
      new Paragraph({
        text: 'to use the material for research or study, criticism or review, reporting news and parody or satire',
        bullet: {
          level: 0,
        },
      }),
      new Paragraph({
        text: 'to use the material for information purposes only',
        bullet: {
          level: 0,
        },
      }),
      new Paragraph({
        text: 'not to modify the material or any part of the material without the written permission of NESA',
        bullet: {
          level: 0,
        },
      }),
      new Paragraph({
        text:
          'to reproduce a single copy for personal bona fide study use only and not to reproduce any major ' +
          'extract or the entire material without the permission of NESA',
        bullet: {
          level: 0,
        },
      }),
      new Paragraph({
        text: 'to include this copyright notice in any copy made',
        bullet: {
          level: 0,
        },
      }),
      new Paragraph({
        text: 'to acknowledge that NESA is the source of the material.',
        bullet: {
          level: 0,
        },
      }),
      new Paragraph(
        'The documents may include third-party copyright material such as photos, diagrams, quotations, ' +
          'cartoons and artworks. This material is protected by Australian and international copyright laws and ' +
          'may not be reproduced or transmitted in any format without the copyright owner’s permission. Unauthorised ' +
          'reproduction, transmission or commercial use of such copyright material may result in prosecution.',
      ),
      new Paragraph(
        'NESA has made all reasonable attempts to locate the owners of third-party copyright material. NESA ' +
          'invites anyone from whom permission has not been sought to contact the Copyright Officer.',
      ),
      new Paragraph({
        children: [
          new TextRun({
            text: 'Special arrangements applying to the NSW Curriculum Reform',
            bold: true,
          }),
        ],
        style: 'CopyrightBoxout',
      }),
      new Paragraph({
        text: 'As part of the NSW Curriculum Reform process, NESA grants a limited non-exclusive licence to:',
        style: 'CopyrightBoxout',
      }),
      new Paragraph({
        text: '\u25CF\tteachers employed in NSW government schools and registered non-government schools',
        style: 'CopyrightBoxout',
        // Imitating a list paragraph without actually using one, for mac styling
        indent: {
          firstLine: 360,
        },
        tabStops: [
          {
            type: TabStopType.LEFT,
            position: 720,
          },
        ],
      }),
      new Paragraph({
        text: '\u25CF\tparents of children registered for home schooling',
        style: 'CopyrightBoxout',
        // Imitating a list paragraph without actually using one, for mac styling
        indent: {
          firstLine: 360,
        },
        tabStops: [
          {
            type: TabStopType.LEFT,
            position: 720,
          },
        ],
      }),
      new Paragraph({
        children: [
          new TextRun('to use, modify and adapt the NSW syllabuses for '),
          new TextRun({
            text: 'non-commercial educational use only',
            bold: true,
          }),
          new TextRun('. The adaptation must not have the effect of bringing NESA into disrepute.'),
        ],
        style: 'CopyrightBoxout',
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: 'Note: ',
            bold: true,
          }),
          new TextRun(
            'The above arrangements do not apply to private/home tutoring companies, professional learning ' +
              'service providers, publishers, and other organisations.',
          ),
        ],
        style: 'CopyrightBoxout',
      }),
      new Paragraph({
        children: [
          new TextRun('For more information on the above or for '),
          new TextRun({
            text: 'commercial use or any other purpose',
            bold: true,
          }),
          new TextRun(', please contact the Copyright Officer for permission.'),
        ],
        style: 'CopyrightBoxout',
      }),
      new Paragraph({
        children: [
          new TextRun('Email: '),
          new ExternalHyperlink({
            children: [
              new TextRun({
                text: 'copyright@nesa.nsw.edu.au',
                style: 'Hyperlink',
              }),
            ],
            link: 'mailto:copyright@nesa.nsw.edu.au',
          }),
        ],
        style: 'CopyrightBoxout',
      }),
    ],
  };
};

export default CopyrightSection;
