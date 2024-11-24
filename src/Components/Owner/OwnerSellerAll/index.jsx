import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "antd";
import { acceptRequest } from "../../../redux/features/sellerSlice"; // Correct import

const OwnerSellerAll = () => {
    const dispatch = useDispatch();
    
    // Get accepted sellers data from Redux store
    const acceptedSellers = useSelector((state) => state.seller.acceptedRequests);

    // Render Accepted Sellers
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Accepted Sellers</h2>

            {/* Check if there are accepted sellers */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {acceptedSellers.length > 0 ? (
                    acceptedSellers.map((request) => (
                        <div key={request._id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <h3 className="text-lg font-semibold mb-2">{request.userId.name}</h3>
                            <p className="text-gray-600 mb-1">
                                <strong>Email:</strong> {request.userId.email}
                            </p>
                            <p className="text-gray-600 mb-1">
                                <strong>Shop Name:</strong> {request.shopName}
                            </p>
                            <p className="text-gray-600 mb-1">
                                <strong>Shop Address:</strong> {request.shopAddress}
                            </p>
                            <p className="text-gray-600">
                                <strong>Contact:</strong> {request.shopContactNo}
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="text-gray-500">No accepted sellers available.</div>
                )}
            </div>
        </div>
    );
};

export default OwnerSellerAll;
