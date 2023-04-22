import { FC } from 'react';

import styles from './logistics-item.module.css';

type LogisticsItemProps = {
  icon: FC;
  children?: React.ReactNode;
};

const LogisticsItem: FC<LogisticsItemProps> = ({ icon: Icon, children }) => {
  return (
    <li className={styles.item}>
      <span className={styles.icon}>
        <Icon />
      </span>
      <span className={styles.content}>{children}</span>
    </li>
  );
};

export default LogisticsItem;
