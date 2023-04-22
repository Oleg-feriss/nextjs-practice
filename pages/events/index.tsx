import { FC, Fragment } from 'react';
import { useRouter } from 'next/router';

import EventList from '@/components/events/event-list';
import { getAllEvents } from '@/data/dummy-data';
import EventsSearch from '@/components/events/events-search';

const AllEventsPage: FC = () => {
  const router = useRouter();
  const events = getAllEvents();

  const findEventsHandler = (
    year: string | undefined,
    month: string | undefined
  ): void => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
};

export default AllEventsPage;
