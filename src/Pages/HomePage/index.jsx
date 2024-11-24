import { BookPanditButton } from "../../Components/HomeComp/BookPanditButton"
import { CalendarBanner } from "../../Components/HomeComp/CalendarBanner"
import { FeaturedProduct } from "../../Components/HomeComp/FeaturedProduct"
import { HomeCarousel } from "../../Components/HomeComp/HomeCarousel"
import HomeCarousel2 from "../../Components/HomeComp/HomeCarousel2"
import HomeProductsLayoutEl from "../../Components/HomeComp/HomeProductLayout"
import { NewProduct } from "../../Components/HomeComp/NewProduct"
import TopProductCarEl from "../../Components/HomeComp/TopCardEl"
import LoadMore from "../../Components/LoadMoreComp"
import LayoutEl from "../../Shared/LayoutEl"



const HomePage=()=>{
    const display=(
        <>
          <LayoutEl>
            <HomeCarousel2/>
            <TopProductCarEl/>
            {/* <HomeCarousel/> */}
           
            <FeaturedProduct/>
            <NewProduct/>
            <HomeProductsLayoutEl/>
            <LoadMore />
            <CalendarBanner/>
            <BookPanditButton/>
          </LayoutEl>
        </>
    )
    return display
}
export default HomePage