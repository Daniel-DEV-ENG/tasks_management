

// ** Router imports
import { useRoutes, Navigate } from 'react-router-dom'




// ** GetRoutes

import LoginPage from '../features/login'
import NotAuthorized from '../features/notAuthorized'
import SignupPage from '../features/sinup'
import MangmentTasks from '../features/MangmentTasks'





const Router = () => {
  // ** Hooks


//   const allRoutes = getRoutes(layout)
//   const getHomeRoute = () => {
//     const user = getUserData()
//     if (user) {
//       console.log("🚀 ~ file: Router.js:36 ~ getHomeRoute ~ user.role:", localStorage.managing_level)
//       return getHomeRouteForLoggedInUser(user.managing_level)
//     } else if(!user) {
//       return '/login'
//     }

//   }

  const routes = useRoutes([
    {
      path: '/',
      index: true,
      element:  <MangmentTasks />
    },
    {
      path: '/login',
      element: <LoginPage />,
     
    },
    {
      path: '/not-auth',
      element: <NotAuthorized />,
      
    },
    {
      path: '/signup',
      element: <SignupPage />,
      
    },
    // {
    //   path: '*',
    //   element: <BlankLayout />,
    //   children: [{ path: '*', element: <Error /> }]
    // },
    // ...allRoutes
  ])

  return routes
}

export default Router
