import { useEffect, useState } from 'react';

export default function useInfinityScroll(onIntersect) {
  const [targetRef, setTargetRef] = useState(null);
  function handleIntersect([entry], obs) {
    if (entry.isIntersecting) {
      obs.unobserve(entry.target);
      onIntersect();
    }
  }
  useEffect(() => {
    let observer;
    if (targetRef) {
      observer = new IntersectionObserver(handleIntersect, { threshold: 0.6 });
      observer.observe(targetRef);
      return () => {
        observer.disconnect();
      };
    }
  }, [handleIntersect, targetRef]);

  return { setTargetRef };
}
