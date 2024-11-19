import { HomeOutlined, ShoppingCartOutlined, ShoppingFilled, UserOutlined } from "@ant-design/icons"
import { Link, useLocation } from "react-router-dom"



const MobileBottom=()=>{
    const params = useLocation()
    const {pathname} = params;

    const isActive = (uri) => {
        console.log(pathname);
        
        return pathname.includes(uri)
    }
    const display=(
        <>
           <div className="h-[60px] md:hidden" style={{zIndex:"999",position:"fixed" ,bottom:"-1px",left:"0px",right:"0px"}}>
                <div className="flex text-3xl justify-between items-center h-full bg-zinc-50 w-full px-4">
                      <Link to="/"><HomeOutlined className={`${pathname === '/' && 'text-blue-600'}`} /></Link>
                      <Link to="/cart"> <ShoppingFilled className={`${isActive('/shop') && 'text-blue-600'}`} /></Link>
                      <Link to="/shop"> <ShoppingCartOutlined className={`${isActive('/cart') && 'text-blue-600' }`} /></Link>
                      <Link to="/account"><UserOutlined className={`${isActive('/account') && 'text-blue-600' }`} /></Link>
                      
                </div>
           </div>
        </>
    )
    return display
}
export default MobileBottom