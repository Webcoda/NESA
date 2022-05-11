import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import DateBox from './DateBox';

const meta: ComponentMeta<typeof DateBox> = {
  title: 'Components/Teachers/DateBox',
  component: DateBox,
};
export default meta;

const Template: ComponentStory<typeof DateBox> = (props) => <DateBox {...props} />;

export const Default = Template.bind({});
Default.args = {
  date: new Date('17 May 2021'),
};

export const SingleDigitDay = Template.bind({});
SingleDigitDay.args = {
  date: new Date('7 May 2021'),
};
