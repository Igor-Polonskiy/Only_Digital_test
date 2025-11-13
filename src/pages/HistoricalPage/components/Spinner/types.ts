export type SpinnerItem = {
  title: string;
};

export type SpinnerProps = {
  items: SpinnerItem[];
  numberOfEvents: number;
  angle: number;
  timeOfRotation: number;
  currentEvent: number;
  onSelect: (index: number) => void;
  startDate: number;
  endDate: number;
  // startDateRef?: React.RefObject<HTMLParagraphElement>;
  // endDateRef?: React.RefObject<HTMLParagraphElement>;
 startDateRef?: React.RefObject<HTMLParagraphElement | null>;
 endDateRef?: React.RefObject<HTMLParagraphElement | null>;
};


