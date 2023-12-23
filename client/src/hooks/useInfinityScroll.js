import { useEffect, useState } from 'react';

export default function useInfinityScroll(onIntersect) {
  const [targetRef, setTargetRef] = useState(null);

  useEffect(() => {
    let observer;
    if (targetRef) {
      function handleIntersect([entry], obs) {
        if (entry.isIntersecting) {
          obs.unobserve(entry.target);
          onIntersect();
        }
      }

      observer = new IntersectionObserver(handleIntersect, { threshold: 0.6 });
      observer.observe(targetRef);

      return () => {
        observer.disconnect();
      };
    }
  }, [onIntersect, targetRef]);
  console.log('타겟은?', targetRef);

  return { setTargetRef };
}
