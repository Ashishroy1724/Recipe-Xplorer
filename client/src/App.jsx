import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import SignIn from "./pages/Signin";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import RecipeGenerator from "./components/RecipeGenerator";
import PrivateRoute from "./components/privateRoute";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing";
import Search from "./pages/Search";

export default function App() {
  return <BrowserRouter>
  <Header/>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/sign-in" element={<SignIn />} />
    <Route path="/sign-up" element={<SignUp />} />
    <Route path="/about" element={<About />} />
    <Route path="/search" element={<Search />} />
    <Route path="/recipe-generator" element={<RecipeGenerator />} />
    <Route path="/listing/:listingId" element={<Listing />} />
    <Route element={<PrivateRoute/>}>
    <Route path="/profile" element={<Profile />} />
    <Route path="/add-recipe" element={<CreateListing />} />
    <Route path="/update-recipe/:listingId" element={<UpdateListing />} />
    </Route>
  </Routes>
  </BrowserRouter>;
  
}
