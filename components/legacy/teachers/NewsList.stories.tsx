import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import NewsList from './NewsList';

const meta: ComponentMeta<typeof NewsList> = {
  title: 'Components/Teachers/EventList',
  component: NewsList,
  decorators: [StoryRouter({}, { initialEntries: ['/home'] })],
};
export default meta;

const Template: ComponentStory<typeof NewsList> = (props) => <NewsList {...props} />;

export const Events = Template.bind({});
Events.args = {
  events: [
    {
      date: new Date('21 May 2021'),
      label: 'All NAPLAN Online tests end',
    },
    {
      date: new Date('22 May 2021'),
      label: 'Subscriptions close for ENCORE, Callback and OnSTAGE virtual packages',
    },
    {
      date: new Date('23 May 2021'),
      label: 'Nominations for HSC exam coordinators close',
    },
    {
      date: new Date('24 May 2021'),
      label: 'WriteOn closes',
    },
    {
      date: new Date('25 May 2021'),
      label: 'Number of HSC drama group performances due',
    },
  ],
};

export const NoEvents = Template.bind({});
NoEvents.args = {
  events: [],
};

export const TooManyEvents = Template.bind({});
TooManyEvents.args = {
  events: [
    {
      date: new Date('21 May 2021'),
      label: 'All NAPLAN Online tests end',
    },
    {
      date: new Date('22 May 2021'),
      label: 'Subscriptions close for ENCORE, Callback and OnSTAGE virtual packages',
    },
    {
      date: new Date('23 May 2021'),
      label: 'Nominations for HSC exam coordinators close',
    },
    {
      date: new Date('24 May 2021'),
      label: 'WriteOn closes',
    },
    {
      date: new Date('25 May 2021'),
      label: 'Number of HSC drama group performances due',
    },
    {
      date: new Date('21 May 2021'),
      label: 'All NAPLAN Online tests end',
    },
    {
      date: new Date('22 May 2021'),
      label: 'Subscriptions close for ENCORE, Callback and OnSTAGE virtual packages',
    },
    {
      date: new Date('23 May 2021'),
      label: 'Nominations for HSC exam coordinators close',
    },
    {
      date: new Date('24 May 2021'),
      label: 'WriteOn closes',
    },
    {
      date: new Date('25 May 2021'),
      label: 'Number of HSC drama group performances due',
    },
    {
      date: new Date('21 May 2021'),
      label: 'All NAPLAN Online tests end',
    },
    {
      date: new Date('22 May 2021'),
      label: 'Subscriptions close for ENCORE, Callback and OnSTAGE virtual packages',
    },
    {
      date: new Date('23 May 2021'),
      label: 'Nominations for HSC exam coordinators close',
    },
    {
      date: new Date('24 May 2021'),
      label: 'WriteOn closes',
    },
    {
      date: new Date('25 May 2021'),
      label: 'Number of HSC drama group performances due',
    },
  ],
};
