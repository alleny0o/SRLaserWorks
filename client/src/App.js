import Header from "./components/Header";
import ProductScreen from "./screens/ProductScreen";
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route, Outlet } from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root />}>
      <Route path='shop' element={<ProductScreen />} />
    </Route>
  )
);

function Root() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;