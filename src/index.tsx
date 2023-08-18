import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import { RecoilRoot } from 'recoil';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RankScreen from './Screens/Rank/RankScreen';
import DonderData from './Screens/DonderData/DonderData';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RankScreen />,
    errorElement: <center>그런 화면은 없습니다.</center>
  },
  {
    path: "/getclear",
    element: <DonderData />
  }
])

root.render(
  <RecoilRoot>
    <RouterProvider router={router} />
  </RecoilRoot>
);


