export type EventItem = {
  date: string | number;
  description: string;
};

export type EventsSliderProps = {
  title: string;
  events: EventItem[];
  totalEvents: number;
  currentEventIndex: number;
  onSelectEvent: (index: number) => void;
};


