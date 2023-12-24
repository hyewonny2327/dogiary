import { useCallback,useEffect,useRef } from 'react';

function useInfiniteScroll(onIntersect){
    const ref = useRef(null);

    const handleIntersect = useCallback(([entry], observer) => {
        //관찰 target이 true이면 onIntersect 함수 실행 
        if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            onIntersect(entry, observer);
        }
    }, [onIntersect]);

    useEffect(() => {
        let observer;
        if (ref.current) { // 관찰 대상이 존재하는 체크한다.
            observer = new IntersectionObserver(handleIntersect, { threshold: 0.6, }); // 관찰 대상이 존재한면 관찰자를 생성한다.
            observer.observe(ref.current); // 관찰자에게 타켓을 지정해준다.
        }
        return () => observer && observer.disconnect();
    }, [ref, handleIntersect]);

    return ref;
}

export default useInfiniteScroll;