import { FC } from 'react';

import styles from './event-summary.module.css';

type EventSummaryProps = {
  title: string;
};

const EventSummary: FC<EventSummaryProps> = ({ title }) => {
  return (
    <section className={styles.summary}>
      <h1>{title}</h1>
    </section>
  );
};

export default EventSummary;
