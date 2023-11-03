import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import productReducer, { productsFetch } from "./features/productSlice.jsx";
import cartReducer, { getTotal } from "./features/cartSlice.jsx";
import userReducer from "./features/userSlice.jsx";

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
  },
});

store.dispatch(productsFetch());
store.dispatch(getTotal());

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
