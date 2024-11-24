// import React, { useState } from "react";
// import { Modal, Button } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import { acceptRequest } from "../../../../redux/features/sellerSlice"; // Correct import
// import { updateRole } from "../../../../redux/features/userSlice"; // Import the updateRole action

// const SellerChain = () => {
//   const dispatch = useDispatch();
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedRequest, setSelectedRequest] = useState(null);

//   // Get pending seller requests from Redux store
//   const sellerRequests = useSelector((state) => state.seller.pendingRequests);

//   // Show Modal with selected request data
//   const showModal = (request) => {
//     setSelectedRequest(request);
//     setIsModalVisible(true);
//   };

//   // Close Modal
//   const handleCancel = () => {
//     setIsModalVisible(false);
//     setSelectedRequest(null);
//   };

//   // Accept Request Handler
//   const acceptRequestHandler = (requestId, userId) => {
//     dispatch(acceptRequest({ requestId, userId })); // Dispatch to accept the request
//     dispatch(updateRole("seller")); // Dispatch to update the user's role to 'seller'
//     handleCancel(); // Close modal after accepting
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Pending Seller Requests</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {sellerRequests && sellerRequests.length > 0 ? (
//           sellerRequests.map((request) => (
//             <div
//               key={request._id}
//               className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
//               onClick={() => showModal(request)}
//             >
//               <h3 className="text-lg font-semibold mb-2">{request.userId.name}</h3>
//               <p className="text-gray-600 mb-1">
//                 <strong>Email:</strong> {request.userId.email}
//               </p>
//               <p className="text-gray-600 mb-1">
//                 <strong>Shop Name:</strong> {request.shopName}
//               </p>
//               <p className="text-gray-600 mb-1">
//                 <strong>Shop Address:</strong> {request.shopAddress}
//               </p>
//               <p className="text-gray-600">
//                 <strong>Contact:</strong> {request.shopContactNo}
//               </p>
//             </div>
//           ))
//         ) : (
//           <div className="text-gray-500">No pending requests available.</div>
//         )}
//       </div>

//       {/* Modal */}
//       <Modal
//         title="Seller Request Details"
//         visible={isModalVisible}
//         onCancel={handleCancel}
//         footer={[
//           <Button key="close" onClick={handleCancel}>
//             Close
//           </Button>,
//           <Button
//             key="accept"
//             type="primary"
//             onClick={() =>
//               acceptRequestHandler(selectedRequest._id, selectedRequest.userId._id)
//             }
//           >
//             Accept Request
//           </Button>,
//         ]}
//       >
//         {selectedRequest && (
//           <div className="text-gray-800">
//             <p>
//               <strong>Name:</strong> {selectedRequest.userId.name}
//             </p>
//             <p>
//               <strong>Email:</strong> {selectedRequest.userId.email}
//             </p>
//             <p>
//               <strong>Shop Name:</strong> {selectedRequest.shopName}
//             </p>
//             <p>
//               <strong>Shop Address:</strong> {selectedRequest.shopAddress}
//             </p>
//             <p>
//               <strong>Contact:</strong> {selectedRequest.shopContactNo}
//             </p>
//             <p>
//               <strong>Shop Document:</strong>{" "}
//               <a href={selectedRequest.shopDocument} target="_blank" rel="noopener noreferrer">
//                 View Document
//               </a>
//             </p>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default SellerChain;
import React, { useState } from "react";
import { Modal, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { acceptRequest } from "../../../../redux/features/sellerSlice"; // Correct import

const SellerChain = () => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Get pending and accepted seller requests from Redux store
  const sellerRequests = useSelector((state) => state.seller.pendingRequests);
  const acceptedSellers = useSelector((state) => state.seller.acceptedRequests);

  // Show Modal with selected request data
  const showModal = (request) => {
    setSelectedRequest(request);
    setIsModalVisible(true);
  };

  // Close Modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRequest(null);
  };

  // Accept Request Handler
  const acceptRequestHandler = (requestId) => {
    dispatch(acceptRequest({ requestId })); // Dispatch to accept the request
    handleCancel(); // Close modal after accepting
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Pending Seller Requests</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sellerRequests && sellerRequests.length > 0 ? (
          sellerRequests.map((request) => (
            <div
              key={request._id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => showModal(request)}
            >
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
          <div className="text-gray-500">No pending requests available.</div>
        )}
      </div>

    

      {/* Modal */}
      <Modal
        title="Seller Request Details"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="close" onClick={handleCancel}>
            Close
          </Button>,
          <Button
            key="accept"
            type="primary"
            onClick={() =>
              acceptRequestHandler(selectedRequest._id)
            }
          >
            Accept Request
          </Button>,
        ]}
      >
        {selectedRequest && (
          <div className="text-gray-800">
            <p>
              <strong>Name:</strong> {selectedRequest.userId.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedRequest.userId.email}
            </p>
            <p>
              <strong>Shop Name:</strong> {selectedRequest.shopName}
            </p>
            <p>
              <strong>Shop Address:</strong> {selectedRequest.shopAddress}
            </p>
            <p>
              <strong>Contact:</strong> {selectedRequest.shopContactNo}
            </p>
            <p>
              <strong>Shop Document:</strong>{" "}
              <a href={selectedRequest.shopDocument} target="_blank" rel="noopener noreferrer">
                View Document
              </a>
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SellerChain;


