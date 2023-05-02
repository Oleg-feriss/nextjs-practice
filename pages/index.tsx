import { FC } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';

import EventList from '@/components/events/event-list';
import { getFeaturedEvents } from '@/helpers/api-util';
import { EventData } from '@/types/event.interface';
import NewsletterRegistration from '@/components/input/newsletter-registration';

type HomePageProps = {
  events: EventData[];
};

const HomePage: FC<HomePageProps> = ({ events }) => {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name='description'
          content='Find a lot of great events that allow you to evolve...'
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={events} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
};

export default HomePage;
