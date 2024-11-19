const NotFound= () => {
    return(
        <div className="w-dvw h-dvh flex justify-center items-center">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-red-500">404</h1>
                <p className="text-2xl">Page Not Found</p>
                <a href="/" className="mt-4 text-blue-500">Go back to Home</a>
            </div>
        </div>
    );
}

export default NotFound;