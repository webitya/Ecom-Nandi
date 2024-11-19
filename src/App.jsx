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
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </Provider>
        </BrowserRouter>
    </>
  )
  return display
}
export default App