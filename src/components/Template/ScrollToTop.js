import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// See https://reacttraining.com/react-router/web/guides/scroll-restoration/scroll-to-top
// FazziCLAY: скролит ввех при переходе на новую страницу
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
