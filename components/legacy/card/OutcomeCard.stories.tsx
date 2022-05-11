import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import OutcomeCard from './OutcomeCard';

const meta: ComponentMeta<typeof OutcomeCard> = {
  title: 'Components/Card/OutcomeCard',
  component: OutcomeCard,
  args: {
    title: 'Outcome title',
    outcomes: ['Content', 'Content', 'Content', 'Content'],
  },
};

export default meta;

const Template: ComponentStory<typeof OutcomeCard> = (args) => <OutcomeCard {...args} />;
export const Outcome = Template.bind({});

export const Selected = Template.bind({});
Selected.args = {
  selected: true,
};
