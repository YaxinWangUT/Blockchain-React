import React from "react";
import { Navigate } from 'react-router-dom';

import Container from './container'
import Login from './components/login';
import Home from './components/home';
import CreatePoll from './components/CreatePoll';
import ViewResult from './components/ViewResult';
import Vote from './components/Vote';
import NotFound from './components/NotFound';

const Router = [
    // {
    //     path: 'home',
    //     element: <Home />,
    //     children: [
    //       { path: 'create', element: <CreatePoll /> },
    //       { path: 'vote/:id', element: <Vote /> },
    //       { path: 'result:id', element: <ViewResult /> },
    //     ]
    //   },
      {
        path: '/',
        element: <Container />,
        children: [
            { path: '/', element: <Navigate to="/login" /> },
            { path: 'login', element: <Login /> },
            { path: 'home', element: <Home /> },
            { path: 'create', element: <CreatePoll /> },
          { path: 'vote/:id', element: <Vote /> },
          { path: 'result/:id', element: <ViewResult /> },
            { path: '404', element: <NotFound /> },
            { path: '*', element: <Navigate to="/404" /> }
        ]
    }
]

export default Router;