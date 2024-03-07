import React from "react";
import "./App.css";
import "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Admin from "./pages/admin/Admin";
import Book from "./pages/Book";
import Ticket from "./pages/Ticket";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Login from "./pages/login/LogIn";
import SignUp from "./pages/login/SignUp";
import Personal from "./pages/personal/Personal";
import AuthConTextProvider from "./contexts/AuthContext"
import ManagerRoute from "./components/auth/ManagerRoute"
import PrivateRoute from "./components/auth/PrivateRoute"
import LoginRoute from "./components/auth/LoginRoute"
const App = () => {
  return (
    <AuthConTextProvider>
      <Router>
        <div className="page-container">
          <div className="the-header">
        <Navbar />
        </div>
        <div className="inpage">
        <Switch>
          <Route exact path="/" component={ Home } />
          <ManagerRoute path="/quan-ly">
            <Admin/>
          </ManagerRoute>
          <LoginRoute exact path="/dang-nhap" component={ Login } />
          <LoginRoute exact path="/dang-ky" component={ SignUp } />
          <PrivateRoute path="/ca-nhan" component={ Personal } />
          <Route exact path="/san-bong" component={ Products } />
          <Route path="/san-bong/:productId" component={ Product }/>
          <PrivateRoute exact path="/dat-san">
            <Book/>
          </PrivateRoute>
          <PrivateRoute path="/tickets/:ticketId">
            <Ticket/>
          </PrivateRoute>
        </Switch>
        </div>
        <Footer />
        </div>
      </Router>
    </AuthConTextProvider>
  )
}

export default App;
