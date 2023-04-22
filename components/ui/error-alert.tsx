import { FC } from 'react';

import styles from './error-alert.module.css';

type ErrorAlertProps = {
  children?: React.ReactNode;
};

const ErrorAlert: FC<ErrorAlertProps> = ({ children }) => {
  return <div className={styles.alert}>{children}</div>;
};

export default ErrorAlert;
