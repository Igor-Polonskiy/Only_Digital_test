import React from 'react';
import * as styles from './EventsNavigation.module.scss';
import { EventsNavigationProps } from './types';

const EventsNavigation: React.FC<EventsNavigationProps> = ({
  totalText,
  onPrev,
  onNext,
  isPrevDisabled,
  isNextDisabled,
  segmentsCount,
  currentSegmentIndex,
  onSelectSegment,
}) => {
  return (
    <div className={styles.container}>
      <p className={styles.total}>{totalText}</p>
      <div className={styles.buttons}>
        <button
          className={`${styles.buttonDefault} ${styles.buttonPrev}`}
          onClick={onPrev}
          disabled={isPrevDisabled}
        />
       
        <button
          className={`${styles.buttonDefault} ${styles.buttonNext}`}
          onClick={onNext}
          disabled={isNextDisabled}
        />
         <div className={styles.dots}>
          {Array.from({ length: segmentsCount }).map((_, index) => {
            const isActive = currentSegmentIndex === index;
            return (
              <button
                key={index}
                className={`${styles.dot} ${isActive ? styles.dotActive : ''}`}
                onClick={() => onSelectSegment(index)}
                aria-label={`Перейти к отрезку ${index + 1}`}
                disabled={isActive}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EventsNavigation;



