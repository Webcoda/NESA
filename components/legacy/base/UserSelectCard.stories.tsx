import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import UserSelectCard from './UserSelectCard';
import UserSelectImageTeachers from '../../assets/images/teachers.png';

const meta: ComponentMeta<typeof UserSelectCard> = {
  title: 'Components/UserSelectCard',
  component: UserSelectCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};
export default meta;

const Template: ComponentStory<typeof UserSelectCard> = (args) => <UserSelectCard {...args} />;

const UserSelectData = {
  id: 1,
  title: 'Teachers',
  imgUrl: UserSelectImageTeachers,
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
};

export const Primary = Template.bind({});
Primary.args = {
  data: UserSelectData,
};
