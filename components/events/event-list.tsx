import { FC } from 'react';

import { EventData } from '@/types/event.interface';
import EventItem from './event-item';

import styles from './event-list.module.css';

type EventListProps = {
  items: EventData[];
};

const EventList: FC<EventListProps> = ({ items }) => {
  return (
    <ul className={styles.list}>
      {items.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </ul>
  );
};

export default EventList;
