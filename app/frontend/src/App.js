import './App.css';
import './tailwind.css';

import React from 'react';

import CustomFooter from './components/Footer'
import Navigation from './components/Navigation'

import UserSchedule from './screens/UserSchedule';
import OffersScreen from './screens/offers';


// import ErrorScreen from './error-screen';

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';


const router = createBrowserRouter([
  {
    path: '/',
    element: <UserSchedule />
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

      <CustomFooter/>
    </div>
  );
}

export default App;
