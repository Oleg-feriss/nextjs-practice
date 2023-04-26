import { FC, Fragment } from 'react';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import Head from 'next/head';

import EventList from '@/components/events/event-list';
import EventsSearch from '@/components/events/events-search';
import { getAllEvents } from '@/helpers/api-util';
import { EventData } from '@/types/event.interface';

type AllEventsPageProps = {
  events: EventData[];
};

const AllEventsPage: FC<AllEventsPageProps> = ({ events }) => {
  const router = useRouter();

  const findEventsHandler = (
    year: string | undefined,
    month: string | undefined
  ): void => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta
          name='description'
          content='Find a lot of great events that allow you to evolve...'
        />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const events = await getAllEvents();

  return {
    props: {
      events,
    },
    revalidate: 60,
  };
};

export default AllEventsPage;
