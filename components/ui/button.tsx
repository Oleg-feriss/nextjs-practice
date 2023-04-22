import { FC } from 'react';
import Link from 'next/link';

import styles from './button.module.css';

type ButtonProps = {
  link?: string;
  children?: React.ReactNode;
};

const Button: FC<ButtonProps> = ({ link, children }) => {
  if (link) {
    return (
      <Link href={link} legacyBehavior>
        <a className={styles.btn}>{children}</a>
      </Link>
    );
  }

  return <button className={styles.btn}>{children}</button>;
};

export default Button;
