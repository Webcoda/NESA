import React from 'react';
import StoryRouter from 'storybook-react-router';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import MobileHeader, { PureMobileHeader } from './MobileHeader';
import { Sections } from '../../constants/pathConstants';
import { destinations } from './NavBar.stories';

const { HOME, LEARNING_AREAS, STAGES, TEACHING, RESOURCES, CUSTOM_VIEW } = Sections;
const links = { HOME, LEARNING_AREAS, STAGES, TEACHING, RESOURCES, CUSTOM_VIEW };

const meta: ComponentMeta<typeof PureMobileHeader> = {
  title: 'Components/Navigation/MobileHeader',
  component: PureMobileHeader,
  args: {
    open: true,
    sections: [
      {
        label: '',
        links: destinations.map((d) => ({
          title: d.label,
          url: d.url,
          icon: d.icon,
          hasChildren: !!d.sections,
        })),
      },
    ],
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
    viewport: {
      defaultViewport: 'mobile2',
    },
    layout: 'fullscreen',
  },
};
export default meta;

const Template: ComponentStory<typeof PureMobileHeader> = (args) => <PureMobileHeader {...args} />;
const Full: ComponentStory<typeof MobileHeader> = (args) => <MobileHeader {...args} />;

export const Closed = Template.bind({});
Closed.decorators = [StoryRouter({}, { initialEntries: ['/home'] })];
Closed.args = {
  open: false,
};

export const Main = Template.bind({});
Main.decorators = [StoryRouter({}, { initialEntries: ['/home'] })];

export const LearningAreas = Template.bind({});
LearningAreas.decorators = [StoryRouter({}, { initialEntries: ['/home'] })];
LearningAreas.args = {
  currentHeading: destinations[1].label,
  sections: destinations[1].sections,
};

export const Resources = Template.bind({});
Resources.decorators = [StoryRouter({}, { initialEntries: ['/home'] })];
Resources.args = {
  currentHeading: destinations[4].label,
  sections: destinations[4].sections,
};

export const FullImplementation = Full.bind({});
FullImplementation.decorators = [StoryRouter({}, { initialEntries: ['/home'] })];
