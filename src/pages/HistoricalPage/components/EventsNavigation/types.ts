export type EventsNavigationProps = {
  totalText: string;
  onPrev: () => void;
  onNext: () => void;
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
  segmentsCount: number;
  currentSegmentIndex: number;
  onSelectSegment: (index: number) => void;
};


