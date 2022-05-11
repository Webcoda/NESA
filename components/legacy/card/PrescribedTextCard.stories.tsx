import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import PrescribedTextCard from './PrescribedTextCard';
import { dummyTextHorace, dummyTextTiger } from '../../pages/support/PrescribedTextListPage';

const meta: ComponentMeta<typeof PrescribedTextCard> = {
  title: 'Components/Card/PrescribedTextCard',
  args: dummyTextHorace,
  argTypes: {},
};

export default meta;

const Template: ComponentStory<typeof PrescribedTextCard> = (args) => (
  <div
    style={{
      width: 530,
    }}
  >
    <PrescribedTextCard {...args} />
  </div>
);
export const prescribedTextCard = Template.bind({});

export const alt = Template.bind({});
alt.args = dummyTextTiger;
