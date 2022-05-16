import { useEffect, useRef } from 'react';

/**
 * Setting focus to current HTMLElement or HTMLButtonElement when popover is closed
 * Not setting focus on first render
 */
export default function (
  popoverStatus: boolean,
  buttonElement: HTMLElement | HTMLButtonElement | null,
) {
  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    } else if (!popoverStatus && buttonElement) {
      buttonElement.focus();
    }
  }, [popoverStatus]);
}
