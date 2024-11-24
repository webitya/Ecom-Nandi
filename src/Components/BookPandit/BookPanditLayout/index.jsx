import BookPanditFormEl from "../BookPanditForm"



const BookPanditLayout=()=>{
    const display=(
        <>
           <div className="bg-[#f2f2f2] md:flex md:flex-row min-h-[80vh] flex-col justify-between w-full items-center py-10 md:px-10" style={{userSelect:"none"}}>
                 <div className="p-4">
                    <img src="/pandit.jpg"  className="rounded-lg"/>
                 </div>
                 <BookPanditFormEl/>
           </div>
        </>
    )
    return display
}
export default BookPanditLayout