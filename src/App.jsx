import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import ShopPage from "./Pages/ShopPage"
import BookPandit from "./Pages/BookPanditPage"
import OffersPage from "./Pages/OffersPage"
import Register from "./Pages/Register"
import Login from "./Pages/Login"



const App=()=>{
  const display=(
    <>
         <BrowserRouter>
           <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/shop" element={<ShopPage/>}/>
              <Route path="/book-pandit" element={<BookPandit/>}/>
              <Route path="/offers" element={<OffersPage/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
           </Routes>
         </BrowserRouter>
    </>
  )
  return display
}
export default App