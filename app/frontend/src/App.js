import './App.css';

import React from 'react';
import {Footer} from 'flowbite-react';

import Navigation from './navbar';
import ScheludeScreen from './schelude';
import OffersScreen from './offers';
// import ErrorScreen from './error-screen';

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';


const router = createBrowserRouter([
  {
    path: '/',
    element: <ScheludeScreen />
  },
  {
    path: '/offers',
    element: <OffersScreen />
  }
]);

function App() {

  return (
    <div className="App bg-slate-50">
      <Navigation/>

      <React.StrictMode>
        <RouterProvider router={router}/>
      </React.StrictMode>

      <Footer container={true}>
        <Footer.Copyright by="Андрей Федин" year={2023}/>
        <Footer.LinkGroup>
          <Footer.Link>About</Footer.Link>
          <Footer.Link>Privacy Policy</Footer.Link>
          <Footer.Link>Licensing</Footer.Link>
          <Footer.Link>Contact</Footer.Link>
        </Footer.LinkGroup>
      </Footer>
    </div>
  );
}

export default App;
