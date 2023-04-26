import { FC, useRef } from 'react';

import Button from '../ui/button';

import styles from './events-search.module.css';
import { FormEvent } from 'react';

type EventsSearchProps = {
  onSearch: (year: string | undefined, month: string | undefined) => void;
};

const EventsSearch: FC<EventsSearchProps> = ({ onSearch }) => {
  const yearInputRef = useRef<HTMLSelectElement | null>(null);
  const monthInputRef = useRef<HTMLSelectElement | null>(null);

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const selectedYear = yearInputRef.current?.value;
    const selectedMonth = monthInputRef.current?.value;

    onSearch(selectedYear, selectedMonth);
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <label htmlFor='year'>Year</label>
          <select id='year' ref={yearInputRef}>
            <option value='2023'>2023</option>
            <option value='2024'>2024</option>
          </select>
        </div>
        <div className={styles.control}>
          <label htmlFor='month'>
            <select id='month' ref={monthInputRef}>
              <option value='1'>January</option>
              <option value='2'>February</option>
              <option value='3'>March</option>
              <option value='4'>April</option>
              <option value='5'>May</option>
              <option value='6'>June</option>
              <option value='7'>July</option>
              <option value='8'>August</option>
              <option value='9'>September</option>
              <option value='10'>October</option>
              <option value='11'>November</option>
              <option value='12'>December</option>
            </select>
          </label>
        </div>
      </div>
      <Button>Find Events</Button>
    </form>
  );
};

export default EventsSearch;
