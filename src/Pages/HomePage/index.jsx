import { BookPanditButton } from "../../Components/HomeComp/BookPanditButton"
import { CalendarBanner } from "../../Components/HomeComp/CalendarBanner"
import { FeaturedProduct } from "../../Components/HomeComp/FeaturedProduct"
import { HomeCarousel } from "../../Components/HomeComp/HomeCarousel"
import HomeProductsLayoutEl from "../../Components/HomeComp/HomeProductLayout"
import { NewProduct } from "../../Components/HomeComp/NewProduct"
import TopProductCarEl from "../../Components/HomeComp/TopCardEl"
import LayoutEl from "../../Shared/LayoutEl"



const HomePage=()=>{
    const display=(
        <>
          <LayoutEl>
            <HomeCarousel/>
            <TopProductCarEl/>
            <FeaturedProduct/>
            <NewProduct/>
            <HomeProductsLayoutEl/>
            <CalendarBanner/>
            <BookPanditButton/>
          </LayoutEl>
        </>
    )
    return display
}
export default HomePage