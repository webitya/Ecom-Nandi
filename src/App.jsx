import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import ShopPage from "./Pages/ShopPage"
import BookPandit from "./Pages/BookPanditPage"
import OffersPage from "./Pages/OffersPage"
import Register from "./Pages/Register"
import Login from "./Pages/Login"
import { Toaster } from "react-hot-toast"
import { useDispatch } from "react-redux"

import Verify from "./Pages/Verify"
import NotFound from "./Pages/Notfound"
import Accounts from "./Pages/Accounts"
import AddProduct from "./Pages/AddProduct"
import { useEffect } from "react"
import { useGetCurrUser } from "./hooks/useGetCurrUser"
import { setUser } from "./redux/features/userSlice/userSlice"

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const response = await useGetCurrUser();

      if (response) {
        dispatch(
          setUser({
            name: response.user.name,
            email: response.user.email,
            role: response.user.role,
          })
        )
      }
    }
    fetchData()
  }, [])

  const display = (
    <>
        <BrowserRouter>
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
        </BrowserRouter>
    </>
  )
  return display
}
export default App