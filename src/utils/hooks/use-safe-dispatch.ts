import { useCallback, useLayoutEffect, useRef } from "react";

/**
 * Tracks if the `component` using the `dispatch` is mounted and only then it dispatch any actions.
 */
export const useSafeDispatch = <TAction>(
  dispatch: React.Dispatch<TAction>
): ((action: TAction) => void) => {
  const mounted = useRef(false);

  useLayoutEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);

  const safeDispatch = useCallback(
    (...args: Parameters<typeof dispatch>) => {
      if (mounted.current) {
        dispatch(...args);
      }
    },
    [dispatch]
  );

  return safeDispatch;
};
