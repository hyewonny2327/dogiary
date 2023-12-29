import { useEffect, useState } from 'react';

export default function useInfinityScroll(onIntersect) {
  const [targetRef, setTargetRef] = useState(null);
  function handleIntersect([entry], obs) {
    // console.log('hook 안에서 handleIntersect 호출', entry);

    if (entry.isIntersecting) {
      // console.log('onIntersect 호출');
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
  console.log('타겟은?', targetRef);

  return { setTargetRef };
}
