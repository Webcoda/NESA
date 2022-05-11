import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import NoticeList from './NoticeList';

const meta: ComponentMeta<typeof NoticeList> = {
  title: 'Components/Teachers/NoticeList',
  component: NoticeList,
  decorators: [StoryRouter({}, { initialEntries: ['/home'] })],
};
export default meta;

const Template: ComponentStory<typeof NoticeList> = (props) => <NoticeList {...props} />;

export const Notices = Template.bind({});
Notices.args = {
  notices: [
    {
      postedDate: new Date('17 May 2021'),
      content: 'New campaign and course makes mathematics count',
      flag: true,
      url: '',
    },
    {
      postedDate: new Date('13 May 2021'),
      content:
        'Official Notice: Reminder to non-government schools regarding due date for annual reports. Flag true',
      flag: true,
      url: '',
    },
    {
      postedDate: new Date('13 May 2021'),
      content:
        'Official Notice: Reminder to non-government schools regarding due date for annual reports. Flag false',
      flag: false,
      url: '',
    },
    {
      postedDate: new Date('13 May 2021'),
      content:
        'Official Notice: Reminder to non-government schools regarding due date for annual reports. Flag null.',
      url: '',
    },
  ],
};

export const TooMany = Template.bind({});
TooMany.args = {
  notices: [
    {
      postedDate: new Date('17 May 2021'),
      content: 'New campaign and course makes mathematics count',
      flag: true,
      url: '',
    },
    {
      postedDate: new Date('13 May 2021'),
      content:
        'Official Notice: Reminder to non-government schools regarding due date for annual reports. Flag true',
      flag: true,
      url: '',
    },
    {
      postedDate: new Date('13 May 2021'),
      content:
        'Official Notice: Reminder to non-government schools regarding due date for annual reports. Flag false',
      flag: false,
      url: '',
    },
    {
      postedDate: new Date('13 May 2021'),
      content:
        'Official Notice: Reminder to non-government schools regarding due date for annual reports. Flag null.',
      url: '',
    },
    {
      postedDate: new Date('13 May 2021'),
      content:
        'Official Notice: Reminder to non-government schools regarding due date for annual reports. Flag null.',
      url: '',
    },
    {
      postedDate: new Date('13 May 2021'),
      content:
        'Official Notice: Reminder to non-government schools regarding due date for annual reports. Flag null.',
      url: '',
    },
    {
      postedDate: new Date('13 May 2021'),
      content:
        'Official Notice: Reminder to non-government schools regarding due date for annual reports. Flag null.',
      url: '',
    },
    {
      postedDate: new Date('13 May 2021'),
      content:
        'Official Notice: Reminder to non-government schools regarding due date for annual reports. Flag null.',
      url: '',
    },
    {
      postedDate: new Date('13 May 2021'),
      content:
        'Official Notice: Reminder to non-government schools regarding due date for annual reports. Flag null.',
      url: '',
    },
    {
      postedDate: new Date('13 May 2021'),
      content:
        'Official Notice: Reminder to non-government schools regarding due date for annual reports. Flag null.',
      url: '',
    },
    {
      postedDate: new Date('13 May 2021'),
      content:
        'Official Notice: Reminder to non-government schools regarding due date for annual reports. Flag null.',
      url: '',
    },
    {
      postedDate: new Date('13 May 2021'),
      content:
        'Official Notice: Reminder to non-government schools regarding due date for annual reports. Flag null.',
      url: '',
    },
  ],
};

export const SmallLimit = Template.bind({});
SmallLimit.args = {
  notices: [
    {
      postedDate: new Date('17 May 2021'),
      content: 'New campaign and course makes mathematics count',
      flag: true,
      url: '',
    },
    {
      postedDate: new Date('13 May 2021'),
      content:
        'Official Notice: Reminder to non-government schools regarding due date for annual reports. Flag true',
      flag: true,
      url: '',
    },
    {
      postedDate: new Date('13 May 2021'),
      content:
        'Official Notice: Reminder to non-government schools regarding due date for annual reports. Flag false',
      flag: false,
      url: '',
    },
    {
      postedDate: new Date('13 May 2021'),
      content:
        'Official Notice: Reminder to non-government schools regarding due date for annual reports. Flag null.',
      url: '',
    },
  ],
  limit: 2,
};

export const NoNotices = Template.bind({});
NoNotices.args = {
  notices: [],
};
