import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import IntroductionVideoCard from './IntroductionVideoCard';
import logo from '../../assets/images/nsw-gov-logo.svg';

const meta: ComponentMeta<typeof IntroductionVideoCard> = {
  title: 'Components/Card/IntroductionVideoCard',
  component: IntroductionVideoCard,
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    label: 'Label',
    date: new Date('2021 06 20'),
    title: 'Ut placet inquam tum dicere exorsus est laborum et inter ',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
  },
};
export default meta;

const Template: ComponentStory<typeof IntroductionVideoCard> = (props) => (
  <IntroductionVideoCard {...props} />
);

export const Default = Template.bind({});
Default.args = {};

export const DifferentImage = Template.bind({});
DifferentImage.args = {
  video: logo,
};

export const NoDescription = Template.bind({});
NoDescription.args = {
  description: undefined,
};
