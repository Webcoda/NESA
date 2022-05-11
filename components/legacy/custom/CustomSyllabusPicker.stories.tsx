import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import TreePicker, { PureTreePicker } from './TreePicker';
import CustomSyllabusPicker from './CustomSyllabusPicker';

const meta: ComponentMeta<typeof CustomSyllabusPicker> = {
  title: 'Components/Custom/CustomSyllabusPicker',
  args: {},
  argTypes: {
    onChange: {
      action: 'Changed',
    },
  },
};
export default meta;

const Template: ComponentStory<typeof CustomSyllabusPicker> = (args) => (
  <div style={{ maxHeight: 660, display: 'flex' }}>
    <CustomSyllabusPicker {...args} />
  </div>
);

export const customSyllabusPicker = Template.bind({});
