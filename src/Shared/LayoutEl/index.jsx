
import { FooterEl } from "../FooterEl"
import NavbarEl from "../NavbarEl"
import MobileBottom from "../../Components/MobileBottom"



const LayoutEl=(data)=>{
      const display=(
        <>
           <NavbarEl/>
           {data.children}
          
           <FooterEl/>
           <MobileBottom/>

        </>
      )
      return display
}
export default LayoutEl