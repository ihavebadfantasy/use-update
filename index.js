import { useEffect, useRef } from 'react';

export function useUpdate(effect, dependencies) {
  if (Array.isArray(dependencies) && dependencies.length === 0) {
    dependencies = null;
  }

  const isFirstRender = useRef(true);
  const prevDependencies = useRef(JSON.stringify(dependencies));

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      if (!dependencies || prevDependencies.current !== JSON.stringify(dependencies)) {
        prevDependencies.current = JSON.stringify(dependencies);
        const clear = effect();

        return clear;
      }
    }
  }, dependencies);
}
