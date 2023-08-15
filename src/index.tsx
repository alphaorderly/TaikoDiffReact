import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './Screens/Main/Main';
import Header from './Screens/Header/Header';
import './index.css'
import { RecoilRoot } from 'recoil';
import Footer from './Screens/Footer/Footer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <RecoilRoot>
    <Header />
    <Main />
    <Footer />
  </RecoilRoot>
);


