import React from 'react';
import StoryRouter from 'storybook-react-router';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { PureNavFooter } from './NavFooter';
import { destinations } from './NavBar.stories';
import { Sections } from '../../constants/pathConstants';
import { NavGroupSection } from '../../utilities/hooks/useNavGroups';
import { UrlLink } from '../../utilities/frontendTypes';

const condensedStages: NavGroupSection = {
  label: Sections.STAGES.title,
  links: [
    {
      url: Sections.STAGES.pages.PRIMARY.url,
      title: Sections.STAGES.pages.PRIMARY.title,
      isDisabled: true, // TODO: Remove after MVP
    },
    {
      url: Sections.STAGES.pages.SECONDARY.url,
      title: Sections.STAGES.pages.SECONDARY.title,
      isDisabled: true, // TODO: Remove after MVP
    },
    {
      url: Sections.STAGES.pages.SENIOR.url,
      title: Sections.STAGES.pages.SENIOR.title,
      isDisabled: true, // TODO: Remove after MVP
    },
  ] as UrlLink[],
} as const;

const groups = [...destinations];
groups[2] = {
  id: 'stages',
  label: Sections.STAGES.title,
  url: Sections.STAGES.url,
  sections: [condensedStages],
};

const meta: ComponentMeta<typeof PureNavFooter> = {
  title: 'Components/Navigation/NavFooter',
  component: PureNavFooter,
  args: {
    groups,
  },
  decorators: [StoryRouter({}, { initialEntries: ['/home'] })],
};
export default meta;

const Template: ComponentStory<typeof PureNavFooter> = (props) => <PureNavFooter {...props} />;

export const Home = Template.bind({});
