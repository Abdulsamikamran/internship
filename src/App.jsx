import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/Navbar";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "./components/Footer";
import AllItems from "./components/AllItems";
import Home from "./components/Home";
import Cart from "./components/Cart";

import Checkout from "./components/Checkout";
import Registration from "./components/Registration";
import SignIn from "./components/SignIn";
import Fpassword from "./components/Fpassword";
import ProtectedRoute from "./components/protectedRoutes";
import OrderPlaced from "./components/OrderPlaced";
import SingleItem from "./components/SingleItem";
import Account from "./components/Account";

function App() {
  // console.log(open);
  return (
    <>
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route exact path="/" element={<ProtectedRoute />}>
            <Route path="/checkout" element={<Checkout />} />
          </Route>
          <Route exact path="/home" element={<Home />} />

          <Route path="/all" element={<AllItems />} />
          <Route path="/account" element={<Account />} />
          <Route path="/singleItem/:productId" element={<SingleItem />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signup" element={<Registration />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/newpassword" element={<Fpassword />}></Route>
          <Route path="/orderplaced" element={<OrderPlaced />} />
        </Routes>

        <Footer />
      </BrowserRouter>
      <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
    </>
  );
}

export default App;
