import React from 'react';
import * as styles from './Spinner.module.scss';
import { SpinnerProps } from './types';

const Spinner: React.FC<SpinnerProps> = ({
  items,
  numberOfEvents,
  angle,
  timeOfRotation,
  currentEvent,
  onSelect,
  startDate,
  endDate,
  startDateRef,
  endDateRef,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.range}>
        <p className={styles.rangeStart} ref={startDateRef}>{startDate}</p>
        <p className={styles.rangeEnd} ref={endDateRef}>{endDate}</p>
      </div>
      <div
        className={styles.mainCircle}
        style={
          {
            '--count': numberOfEvents,
            '--angle': angle + 'deg',
            '--time': timeOfRotation + 'ms',
            '--delay': timeOfRotation + 300 + 'ms',
          } as React.CSSProperties
        }
      >
        {items.map((item, index) => {
          const { title } = item;
          const idx = index + 1;
          return (
            <div
              key={index}
              className={`${styles.shoulder} ${
                currentEvent === index ? styles.shoulderActive : ''
              }`}
              style={{ '--i': idx } as React.CSSProperties}
              onClick={() => onSelect(index)}
            >
              <div className={styles.circleArea}>
                <p className={styles.circle}>
                  {idx}
                  <span className={styles.title}>{title}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Spinner;


