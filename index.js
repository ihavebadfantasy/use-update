import { useState, useEffect, useRef } from 'react';

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

export function useUpdate(effect, dependencies = null) {
  const [renderState, setRenderState] = useState('first render');
  const [isPrevStateWasSet, setIsPrevStateWasSet] = useState(false);

  const prevRenderState = usePrevious(renderState);

  useEffect(() => {
    setRenderState('not first render');
  }, []);

  const dependenciesList = dependencies ? [...dependencies, renderState] : [renderState];

  useEffect(() => {
    if (!prevRenderState) {
      return;
    }

    if (prevRenderState && prevRenderState !== renderState) {
      setIsPrevStateWasSet(true);

      return;
    }

    effect();
  }, dependenciesList);

  useEffect(() => {
  }, [prevRenderState]);
}
