import './tailwind.css';
import './index.css';
import Navigation from 'components/Navigation';
import LoginScreen from 'pages/Login';
import ScheduleScreen from 'pages/Schedule';
import EventModerationScreen from 'pages/EventsModeration';

import { createBrowserRouter,  RouterProvider } from "react-router-dom";
import { setupInterceptors } from 'utils/auth';
import AviableOffersScreen from 'pages/AviableOffers';
import React, { useState } from 'react';
import UserModerationScreen from 'pages/UserModeration';
import moment from 'moment';
import RequestModerationScreen from 'pages/RequestModeration';
import Profile from 'pages/Profile';
import FeedbackModerationScreen from 'pages/FeedbackModeration';
import UserOffersScreen from 'pages/UserOffers';
import StateAlert from 'components/Alert';
import UserAnswersScreen from 'pages/UserAnswers';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigation> <ScheduleScreen/> </Navigation>
  },
  {
    path: '/login',
    element: <LoginScreen />
  },
  {
    path: '/offers',
    element: <Navigation> <AviableOffersScreen/> </Navigation>
  },
  {
    path: '/moderation',
    element: <Navigation> <EventModerationScreen/> </Navigation>
  }, 
  {
    path: '/moderation/users',
    element: <Navigation> <UserModerationScreen /> </Navigation>
  },
  {
    path: '/moderation/requests',
    element: <Navigation> <RequestModerationScreen/> </Navigation>
  },
  {
    path: '/profile',
    element: <Navigation> <Profile /> </Navigation>
  },
  {
    path: '/moderation/feedback',
    element: <Navigation> <FeedbackModerationScreen/> </Navigation>
  },
  {
    path: 'offers/mine',
    element: <Navigation> <UserOffersScreen /> </Navigation>
  },
  {
    path: '/answers',
    element: <Navigation> <UserAnswersScreen /> </Navigation>

  }
])

export const AlertContext = React.createContext(null);

setupInterceptors();

moment.updateLocale('en', {
  months : [
      "Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля",
      "Августа", "Сентября", "Октября", "Ноября", "Декабря"
  ],
  weekdays: [
    "Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота",
  ]
})

function App() {
  const [alert, setAlert] = useState(null)

  return (
    <>
      <AlertContext.Provider value={setAlert}>
        <RouterProvider router={router} />
      </AlertContext.Provider>
      {alert && <StateAlert success={alert.success} label={alert.label} message={alert.message} onClose={() => setAlert(null)}/> }
    </>
  );
}

export default App;
