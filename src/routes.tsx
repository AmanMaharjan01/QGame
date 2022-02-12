import { useRoutes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import NotFound from './pages/404notfound';
import QuizApp from './pages/Quiz';
import RouteGuard from './components/authentication/RouteGaurd';

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Homepage />
    },
    {
      path: '/quiz',
      element: <RouteGuard component={QuizApp} />
    },
    {
      path: '*',
      element: <NotFound />
    }
  ]);
}
