import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CardMedia } from '@material-ui/core';
import ResourcesCard from './ResourcesCard';
import placeholder from '../../assets/images/video-thumbnail-eng.png';

const meta: ComponentMeta<typeof ResourcesCard> = {
  title: 'Components/Card/ResourcesCard',
  component: ResourcesCard,
  args: {},
  decorators: [
    (Story) => (
      <div style={{ width: 300 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    colour: {
      options: ['primary', 'secondary', null],
      control: { type: 'radio' },
    },
  },
};
export default meta;

const Template: ComponentStory<typeof ResourcesCard> = (props) => (
  <ResourcesCard {...props}>
    <div>Content Goes Here</div>
  </ResourcesCard>
);

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

export const Image = Template.bind({});
Image.args = {
  colour: 'primary',
  media: <CardMedia component="img" src={placeholder} />,
};
