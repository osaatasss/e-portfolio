import { useEffect } from 'react';

const useScrollReveal = () => {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('.rv').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
};

export default useScrollReveal;
