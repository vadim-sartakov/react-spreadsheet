import {
  useRef,
  useEffect,
  useCallback,
  MouseEventHandler,
  MouseEvent,
} from 'react';
import { HeadingType } from '../types';
import { ResizerProps } from './types';

interface Interaction {
  startCoordinate: number;
  startSize: number;
}

const propertiesMap = {
  [HeadingType.Row]: (e: MouseEvent) => e.clientY,
  [HeadingType.Column]: (e: MouseEvent) => e.clientX,
};

const defaultArray: number[] = [];

const useResizer = ({
  type,
  sizes = defaultArray,
  index,
  defaultSize,
  onSizesChange,
}: ResizerProps) => {
  const interactionRef = useRef<Interaction>();

  const handleMouseDown: MouseEventHandler = useCallback(event => {
    event.persist();
    event.stopPropagation();
    const startSize = sizes[index] || defaultSize;
    interactionRef.current = {
      startCoordinate: propertiesMap[type](event),
      startSize,
    };
  }, [type, index, defaultSize, sizes]);

  useEffect(() => {
    const handleMouseMove: MouseEventHandler = event => {
      const interaction = interactionRef.current;
      if (!interaction) return;
      const diff = propertiesMap[type](event) - interaction.startCoordinate;
      const nextSize = interaction.startSize + diff;
      onSizesChange(sizes => {
        const nextSizes = [...sizes];
        nextSizes[index] = nextSize;
        return nextSizes;
      });
    };

    const handleMouseUp: EventListener = () => {
      interactionRef.current = undefined;
    };

    document.addEventListener('mousemove', handleMouseMove as unknown as EventListener);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove as unknown as EventListener);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [type, index, onSizesChange]);

  return { handleMouseDown };
};

export default useResizer;
