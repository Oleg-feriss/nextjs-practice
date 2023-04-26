import { FC, Fragment } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Head from 'next/head';

import EventSummary from '@/components/event-detail/event-summary';
import EventLogistics from '@/components/event-detail/event-logistics';
import EventContent from '@/components/event-detail/event-content';
import ErrorAlert from '@/components/ui/error-alert';
import { getFeaturedEvents, getEventById } from '@/helpers/api-util';
import { EventData } from '@/types/event.interface';

type EventDetailPageProps = {
  event: EventData;
};

interface EventDetailPageParams extends ParsedUrlQuery {
  eventId: string;
}

const EventDetailPage: FC<EventDetailPageProps> = ({ event }) => {
  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name='description' content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps<
  EventDetailPageProps,
  EventDetailPageParams
> = async (context) => {
  const eventId = context.params!.eventId;

  const event = (await getEventById(eventId)) as EventData;

  return {
    props: {
      event,
    },
    revalidate: 30,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths: paths,
    fallback: 'blocking',
  };
};

export default EventDetailPage;
