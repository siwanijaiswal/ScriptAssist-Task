import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import Landing from './pages/home/Home';
import ListPage from './pages/user/ListPage';
import DetailPage from './pages/user/DetailPage';
import ProtectedRoute from './routes/ProtectedRoutes';

export const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Landing />,
      },
      {
        path: '/users',
        element: (
          <ProtectedRoute>
            <ListPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/user/:id',
        element: (
          <ProtectedRoute>
            <DetailPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
];

const router = createBrowserRouter(routes);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      cacheTime: 1000 * 60 * 15,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
