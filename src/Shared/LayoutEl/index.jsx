import { FooterEl } from "../FooterEl"
import NavbarEl from "../NavbarEl"



const LayoutEl=(data)=>{
      const display=(
        <>
           <NavbarEl/>
           {data.children}
           <FooterEl/>

        </>
      )
      return display
}
export default LayoutEl