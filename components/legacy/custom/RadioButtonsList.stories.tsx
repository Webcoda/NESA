import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import RadioButtonsList from './RadioButtonsList';

const meta: ComponentMeta<typeof RadioButtonsList> = {
  title: 'Components/Custom/RadioButtonsList',
  component: RadioButtonsList,
  args: {
    label: 'Test',
    options: [
      {
        id: '1',
        label: 'Option 1',
      },
      {
        id: '2',
        label: 'Option 2',
      },
      {
        id: '3',
        label: 'Option 3',
        moreInfo: 'This is not selected',
      },
    ],
  },
};
export default meta;

const Template: ComponentStory<typeof RadioButtonsList> = (args) => <RadioButtonsList {...args} />;

export const Main = Template.bind({});
Main.args = {
  selected: '2',
};

export const NoneSelected = Template.bind({});
