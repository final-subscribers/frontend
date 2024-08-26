import { type ListItem } from '@/constants/keywordIconMap';
import KeywordToggleItem from './KeywordToggleItem';
import { useCallback, useRef } from 'react';
import { useDraggable } from 'react-use-draggable-scroll';

export interface KeywordToggleListProps {
  list: ListItem[];
  activeItems: string[];
  onToggle: (title: string) => void;
}

const KeywordToggleList = ({ list, onToggle, activeItems }: KeywordToggleListProps) => {
  const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref); //
  const handleToggle = useCallback(
    (title: string) => {
      onToggle(title);
    },
    [onToggle],
  );
  return (
    <div
      className="relative w-full bg-assistive-base px-7 py-6 flex gap-9 mobile:gap-5 overflow-x-scroll"
      {...events}
      ref={ref}>
      <div className="absolute w-full top-0 left-0 h-[1px] shadow-shadow"></div>
      {list.map((listItem) => (
        <KeywordToggleItem
          key={listItem.title}
          title={listItem.title}
          onIcon={listItem.onIcon}
          offIcon={listItem.offIcon}
          isActive={activeItems.includes(listItem.title)}
          onClick={() => handleToggle(listItem.title)}
        />
      ))}
    </div>
  );
};

export default KeywordToggleList;
