import { FC } from 'react';

import styles from './event-content.module.css';

type EventContentProps = {
  children?: React.ReactNode;
};

const EventContent: FC<EventContentProps> = ({ children }) => {
  return <section className={styles.content}>{children}</section>;
};

export default EventContent;
