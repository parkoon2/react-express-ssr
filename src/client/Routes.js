import App from "./App";
import HomePage from "./home";
import UsersListPage from "./pages/user-list";
import NotFoundPage from "./pages/not-found";

// 참고: https://www.npmjs.com/package/react-router-config
export default [
  {
    ...App,
    routes: [
      {
        ...HomePage,
        path: "/",
        exact: true
      },
      {
        ...UsersListPage,
        path: "/users"
      },
      {
        ...NotFoundPage
      }
    ]
  }
];
