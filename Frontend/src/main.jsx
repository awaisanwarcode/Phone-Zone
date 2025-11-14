// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import ContextProviderFun from './Context/context.jsx';
import { CartPage } from './Pages/Cart/Cart.jsx';
import { DeliveryForm } from './Pages/DeliveryForm/deliveryform.jsx';

const allroutes = createBrowserRouter([{
  path: "/",
  element: <App />
},
{
  path: "/cart",
  element: <CartPage />
},
{
  path: "/pay",
  element: <DeliveryForm />
}
])


createRoot(document.getElementById('root')).render(
  <ContextProviderFun>
    <RouterProvider router={allroutes}>
    </RouterProvider>
  </ContextProviderFun>
)
