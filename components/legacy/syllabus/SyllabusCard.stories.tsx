import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import SyllabusCard from './SyllabusCard';

const meta: ComponentMeta<typeof SyllabusCard> = {
  title: 'Components/Syllabus/SyllabusCard',
  component: SyllabusCard,
  decorators: [
    StoryRouter({}, { initialEntries: ['/home'] }),
    (Story) => (
      <div style={{ width: 195 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    headline: 'Early Stage 1 (Kindergarten)',
    body: 'All Learning areas',
    url: {
      title: 'Early Stage 1 (Kindergarten)',
      url: '/Early Stage 1 (Kindergarten)',
    },
  },
  argTypes: {
    colour: {
      options: ['primary', 'secondary', null],
      control: { type: 'radio' },
    },
  },
};
export default meta;

const Template: ComponentStory<typeof SyllabusCard> = (props) => <SyllabusCard {...props} />;

export const Default = Template.bind({});
Default.args = {};

export const Primary = Template.bind({});
Primary.args = {
  colour: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  colour: 'secondary',
};
