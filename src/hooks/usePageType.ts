import { useLocation } from 'react-router-dom';

type PageType = 'home' | 'about' | 'journey' | 'skills' | 'projects' | 'analytics' | 'ai' | 'philosophy' | 'default';

export function usePageType(): PageType {
  const location = useLocation();

  switch (location.pathname) {
    case '/':
      return 'home';
    case '/about':
      return 'about';
    case '/journey':
      return 'journey';
    case '/skills':
      return 'skills';
    case '/projects':
    case '/projects/retail-analytics':
    case '/projects/image-processing':
      return 'projects';
    case '/analytics':
      return 'analytics';
    case '/ai':
      return 'ai';
    case '/philosophy':
      return 'philosophy';
    default:
      return 'default';
  }
}
