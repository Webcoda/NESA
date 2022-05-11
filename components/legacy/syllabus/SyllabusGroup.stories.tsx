import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import SyllabusGroup from './SyllabusGroup';

const meta: ComponentMeta<typeof SyllabusGroup> = {
  title: 'Components/Syllabus/SyllabusGroup',
  component: SyllabusGroup,
  decorators: [StoryRouter({}, { initialEntries: ['/home'] })],
  args: {
    heading: 'Learning areas',
    items: [
      {
        headline: 'Aboriginal Languages',
        body: 'All Learning areas',
        url: {
          title: 'Aboriginal Languages',
          url: '/Aboriginal Languages',
        },
      },
      {
        headline: 'Creative Arts',
        body: 'All Learning areas',
        url: {
          title: 'Creative Arts',
          url: '/Creative Arts',
        },
      },
      {
        headline: 'English',
        body: 'All Learning areas',
        url: {
          title: 'English',
          url: '/English',
        },
      },
      {
        headline: 'Geography',
        body: 'All Learning areas',
        url: {
          title: 'Geography',
          url: '/Geography',
        },
      },
      {
        headline: 'History',
        body: 'All Learning areas',
        url: {
          title: 'History',
          url: '/History',
        },
      },
      {
        headline: 'Languages',
        body: 'All Learning areas',
        url: {
          title: 'Languages',
          url: '/Languages',
        },
      },
    ],
    colour: 'primary',
  },
  argTypes: {
    colour: {
      options: ['primary', 'secondary', null],
      control: { type: 'radio' },
    },
  },
};
export default meta;

const Template: ComponentStory<typeof SyllabusGroup> = (props) => <SyllabusGroup {...props} />;

export const Primary = Template.bind({});
Primary.args = {};

export const Secondary = Template.bind({});
Secondary.args = {
  colour: 'secondary',
};

export const OneItem = Template.bind({});
OneItem.args = {
  items: [
    {
      headline: 'Aboriginal Languages',
      body: 'All Learning areas',
      url: {
        title: 'Aboriginal Languages',
        url: '/Aboriginal Languages',
      },
    },
  ],
};

export const ComplexHeader = Template.bind({});
ComplexHeader.args = {
  heading: (
    <div className="syllabus-group__heading syllabus-overview__group-heading--multiple">
      <h5>
        Primary <span className="syllabus-overview__group-heading-class">(K–6)</span>
      </h5>
      <h5>
        Secondary <span className="syllabus-overview__group-heading-class">(7–10)</span>
      </h5>
    </div>
  ),
};

export const NoHeader = Template.bind({});
NoHeader.args = {
  heading: null,
};
