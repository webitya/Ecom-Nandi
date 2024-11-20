import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import ShopPage from "./Pages/ShopPage"
import BookPandit from "./Pages/BookPanditPage"
import OffersPage from "./Pages/OffersPage"
import Register from "./Pages/Register"
import Login from "./Pages/Login"
import { Toaster } from "react-hot-toast"
import { Provider } from "react-redux"
import store from "./redux/store"
import Verify from "./Pages/Verify"
import NotFound from "./Pages/Notfound"
import Accounts from "./Pages/Accounts"
import AddProduct from "./Pages/AddProduct"


const App=()=>{
  const display=(
    <>
        <BrowserRouter>
          <Provider store={store}>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/shop" element={<ShopPage/>}/>
                <Route path="/book-pandit" element={<BookPandit/>}/>
                <Route path="/offers" element={<OffersPage/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/verify/:token" element={<Verify />} />
                <Route path="/account" element={<Accounts />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/add-product" element={<AddProduct />} />
            </Routes>
            <Toaster />
          </Provider>
        </BrowserRouter>
    </>
  )
  return display
}
export default App