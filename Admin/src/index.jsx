import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AddItems } from './Pages/AddItems/AddItems.jsx';
import "./App.css"
import { AllItemsPage } from './Pages/AllItems/AllItems.jsx';
import { OrdersPage } from './Pages/AllOrders/AllOrders.jsx';
let allRoutes = createBrowserRouter([{
  path: "/",
  element: <AddItems />
},
{
  path: "/prdct/all",
  element: <AllItemsPage />
},
{
  path : "/ordrs/All",
  element : <OrdersPage />
}])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={allRoutes} />
)
