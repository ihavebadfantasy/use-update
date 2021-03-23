import { useEffect, useRef } from 'react';

export function useUpdate(effect, dependencies) {
  const isFirstRender = useRef(true);
  const prevDependencies = useRef(JSON.stringify(dependencies));

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      if (prevDependencies.current !== JSON.stringify(dependencies)) {
        prevDependencies.current = JSON.stringify(dependencies);
        effect();
      }
    }
  }, [dependencies]);
}
