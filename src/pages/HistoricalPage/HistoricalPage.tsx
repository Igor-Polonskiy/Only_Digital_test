import { useRef, useState, useCallback } from 'react';
import { historicDates } from '../../constants/historic-dates';
import * as styles from './HistoricalPage.module.scss';
import gsap from "gsap";
import { Spinner, EventsSlider, EventsNavigation } from './components';

function HistoricalPage() {
  const numberOfEvents = historicDates.length;
  const angleBetweenDots = 360 / numberOfEvents;
  const defaultTimeOfRotation = 300;

  const startDateRef = useRef<HTMLParagraphElement>(null);
  const endDateRef = useRef<HTMLParagraphElement>(null);

  const [currentEvent, setCurrentEvent] = useState(0);
  const [angle, setAngle] = useState(angleBetweenDots);
  const [timeOfRotation, setTimeOfRotation] = useState(defaultTimeOfRotation);
  const [startDate, setStartDate] = useState(Number(historicDates[0].events[0].date));
  const [endDate, setEndDate] = useState(Number(historicDates[0].events[historicDates[0].events.length - 1].date));

  const getTotal = useCallback((length: number, index: number) => {
    return `${String(index + 1).padStart(2,'0')}/${String(length).padStart(2,'0')}`;
  }, []);

  const animateDatesRange = useCallback((index: number) => {
    const newStart = Number(historicDates[index].events[0].date);
    const newEnd = Number(historicDates[index].events[historicDates[index].events.length - 1].date);

    const duration = (timeOfRotation + 300) / 1000;

    gsap.to(startDateRef.current, { 
      duration, 
      textContent: `+=${newStart - startDate}`, 
      roundProps: "textContent",
      ease: "none",
      onUpdate: () => setStartDate(newStart)
    });

    gsap.to(endDateRef.current, { 
      duration, 
      textContent: `+=${newEnd - endDate}`, 
      roundProps: "textContent",
      ease: "none",
      onUpdate: () => setEndDate(newEnd)
    });
  }, [startDate, endDate, timeOfRotation]);

  const loadThis = useCallback((index: number) => {
    animateDatesRange(index);

    const rotation = angleBetweenDots - index * angleBetweenDots;
    setTimeOfRotation(Math.abs(currentEvent - index) * defaultTimeOfRotation);

    setTimeout(() => setAngle(rotation), 300);

    setTimeout(() => setCurrentEvent(index), 300); // простой fade delay
  }, [animateDatesRange, angleBetweenDots, currentEvent]);

  const loadPrev = useCallback(() => loadThis(currentEvent - 1), [currentEvent, loadThis]);
  const loadNext = useCallback(() => loadThis(currentEvent + 1), [currentEvent, loadThis]);

  return (
    <main className={styles.main}>
      <section className={styles.historicDates}>
        <h1 className={styles.historicDatesHeading}>Исторические даты</h1>

        <Spinner
          items={historicDates.map(h => ({ title: h.title }))}
          numberOfEvents={numberOfEvents}
          angle={angle}
          timeOfRotation={timeOfRotation}
          currentEvent={currentEvent}
          onSelect={loadThis}
          startDate={startDate}
          endDate={endDate}
          startDateRef={startDateRef}
          endDateRef={endDateRef}
        />

        <EventsNavigation
          totalText={getTotal(numberOfEvents, currentEvent)}
          onPrev={loadPrev}
          onNext={loadNext}
          isPrevDisabled={currentEvent === 0}
          isNextDisabled={currentEvent === numberOfEvents - 1}
          segmentsCount={numberOfEvents}
          currentSegmentIndex={currentEvent}
          onSelectSegment={loadThis}
        />

        <EventsSlider
          title={historicDates[currentEvent].title}
          events={historicDates[currentEvent].events}
          totalEvents={numberOfEvents}
          currentEventIndex={currentEvent}
          onSelectEvent={loadThis}
        />
      </section>
    </main>
  );
}

export default HistoricalPage;



