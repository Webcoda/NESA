import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import SectionCard from './SectionCard';
import { Sections } from '../../constants/pathConstants';

const argsData = {
  title: Sections.STAGES.title,
  subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  pages: [
    {
      id: 1,
      title: Sections.STAGES.pages.PRIMARY.title,
      prefix: 'Years K – 6',
      path: Sections.STAGES.pages.PRIMARY.url,
    },
  ],
  numberOfColumns: 2,
};

const meta: ComponentMeta<typeof SectionCard> = {
  title: 'Components/Card/SectionCard',
  component: SectionCard,
  decorators: [StoryRouter({}, { initialEntries: ['/home'] })],
  args: argsData,
  argTypes: {
    backgroundColor: { control: 'color' },
    dividerColor: { control: 'color' },
    fontColor: { control: 'color' },
  },
};

export default meta;

const Template: ComponentStory<typeof SectionCard> = (args) => <SectionCard {...args} />;
export const Home = Template.bind({});
