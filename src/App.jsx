import { Route, Routes } from "react-router-dom";
import ScrapSmartHomepage from "./pages/Home";
import AuthController from "./pages/AuthPage";
import ScrapDetailPage from "./pages/ScrapDetailPage";
import SellerDashboard from "./pages/SellerDashboard";
import ScrapListingsPage from "./pages/ScrapListing";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyOrders from "./pages/MyOrders";
import ProductOrders from "./pages/ProductOrders";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<ScrapSmartHomepage></ScrapSmartHomepage>}
        ></Route>
        <Route path="/auth" element={<AuthController></AuthController>}></Route>
        <Route
          path="/scrap-details/:id"
          element={<ScrapDetailPage></ScrapDetailPage>}
        ></Route>
        <Route
          path="/seller"
          element={<PrivateRoute roles={['seller']}><SellerDashboard></SellerDashboard></PrivateRoute>}
        ></Route>
        <Route
          path="/seller/:productId/orders"
          element={<PrivateRoute roles={['seller']}><ProductOrders></ProductOrders></PrivateRoute>}
        ></Route>
        <Route
          path="/buyer"
          element={<PrivateRoute roles={['buyer']}><ScrapListingsPage></ScrapListingsPage></PrivateRoute>}
        ></Route>
        <Route
          path="/buyer/orders"
          element={<PrivateRoute roles={['buyer']}><MyOrders></MyOrders></PrivateRoute>}
        ></Route>
      </Routes>
       <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}

export default App;
