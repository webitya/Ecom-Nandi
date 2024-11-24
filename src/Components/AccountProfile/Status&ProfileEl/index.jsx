const StatusAndProfileEl= () => {
    return(
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="sm:text-3xl text-xl font-bold mb-6 text-gray-800">Status and Profile</h2>
            <div className="flex sm:justify-between sm:flex-row flex-col gap-3">
                <div className="flex sm:gap-2 justify-between sm:justify-normal items-center">
                    <p className="sm:text-xl text-base font-medium">Registration Status: </p>
                    <p 
                    className="bg-[#f1f1f1] text-[#6c757d] font-semibold text-sm sm:px-4 sm:py-2 px-1.5 py-0.5 sm:rounded-md rounded-sm"
                    >
                        not applied
                    </p>
                </div>
                <button 
                type="button"
                disabled
                className="bg-[#f44336] text-white px-4 py-1.5 font-semibold rounded-md opacity-50"
                >
                    Cancel registration
                </button>
            </div>
        </div>
    );
}

export default StatusAndProfileEl;