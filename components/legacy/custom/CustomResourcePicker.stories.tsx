import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import CustomResourcePicker from './CustomResourcePicker';

const meta: ComponentMeta<typeof CustomResourcePicker> = {
  title: 'Components/Custom/CustomResourcePicker',
  args: {},
  argTypes: {
    onChange: {
      action: 'Changed',
    },
  },
};
export default meta;

const Template: ComponentStory<typeof CustomResourcePicker> = (args) => (
  <div style={{ maxHeight: 660, display: 'flex' }}>
    <CustomResourcePicker {...args} />
  </div>
);

export const customResourcePicker = Template.bind({});
