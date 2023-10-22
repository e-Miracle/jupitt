import { Suspense, useEffect } from "react";
import Spinner from "./components/spinner/Spinner";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";
import store from "./store";
import { getUser } from "./store/reducers/auth";
import Cookies from "js-cookie";
import { setAuthToken } from "./utils";
import { USER_TOKEN } from "./constants/index";
if (Cookies.get(USER_TOKEN)) setAuthToken();
function App() {
  useEffect(() => {
    store.dispatch(getUser());
  }, []);
  const router = createBrowserRouter(routes);
  return (
    <Suspense fallback={<Spinner />}>
      <Toaster position={"top-right"} />
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </Suspense>
  );
}

export default App;
