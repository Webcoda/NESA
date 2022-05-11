import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import CustomAccordion from './CustomAccordion';

const meta: ComponentMeta<typeof CustomAccordion> = {
  title: 'Components/Custom/CustomAccordion',
  component: CustomAccordion,
  args: {
    title: 'Accordion title',
  },
};
export default meta;

const Template: ComponentStory<typeof CustomAccordion> = (props) => (
  <CustomAccordion {...props}>
    <div>Content Goes Here</div>
  </CustomAccordion>
);

export const Default = Template.bind({});
Default.args = {};

export const Open = Template.bind({});
Open.args = {
  startOpen: true,
};
