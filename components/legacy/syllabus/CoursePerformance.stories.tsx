import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import CoursePerformance from './CoursePerformance';

const meta: ComponentMeta<typeof CoursePerformance> = {
  title: 'Components/Syllabus/CoursePerformance',
  component: CoursePerformance,
};
export default meta;

const Template: ComponentStory<typeof CoursePerformance> = (props) => (
  <CoursePerformance {...props} />
);

const body =
  '<p> A student at this grade typically:\n' +
  '          <ul>\n' +
  '            <li>\n' +
  '              through close and wide study, responds to demanding, imaginative, factual and critical\n' +
  '              texts\n' +
  '            </li>\n' +
  '            <li>\n' +
  '              investigates with some insight the context and perspective of texts and the\n' +
  '              relationships between and among them\n' +
  '            </li>\n' +
  '            <li>\n' +
  '              closely and critically analyses and evaluates texts of increasing complexity by\n' +
  '              selecting, describing and explaining appropriate language forms, and features and\n' +
  '              structures of those texts\n' +
  '            </li>\n' +
  '            <li>\n' +
  '              responds imaginatively and critically in an effective way to verbal and visual imagery\n' +
  '            </li>\n' +
  '            <li>\n' +
  '              displays a developing personal style, composes with confidence, spoken, written,\n' +
  '              visual, multimodal and digital texts for a variety of purposes, audiences and contexts\n' +
  '            </li>\n' +
  '            <li>\n' +
  '              is able to generalise from engaging with texts to present a range of views of the\n' +
  '              world\n' +
  '            </li>\n' +
  '            <li>\n' +
  '              clearly demonstrates an understanding of the processes of composition, as they are\n' +
  '              able to make some inferences and interpretations, extend their imaginations in\n' +
  '              composing texts and adapt ideas into new and different contexts\n' +
  '            </li>\n' +
  '            <li>\n' +
  '              with increasing confidence, is able to conform to, or challenge, an audience’s\n' +
  '              preconceptions and expectations\n' +
  '            </li>\n' +
  '            <li>\n' +
  '              independently reflects on and uses, assesses and adapts their individual and\n' +
  '              collaborative skills for learning.\n' +
  '            </li>\n' +
  '          </ul>\n' +
  '</p>';

export const Default = Template.bind({});
Default.args = {
  sections: [
    {
      grade: 'A',
      description: body,
    },
    {
      grade: 'B',
      description: body,
    },
    {
      grade: 'C',
      description: body,
    },
    {
      grade: 'D',
      description: body,
    },
    {
      grade: 'E',
      description: body,
    },
  ],
};
