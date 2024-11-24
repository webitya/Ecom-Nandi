
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pendingRequests: [
        // Mock pending requests for testing
        {
            _id: "67430aa2feb6a97bd1e7ed2d",
            userId: { _id: "673dbe15f3a20771b874fc61", name: "aniket asdasd", email: "aniketchaturvedi309@gmail.com" },
            shopName: "Tech Haven",
            shopAddress: "1234 Elm Street, Springfield, IL 62704",
            shopDocument: "https://example.com/documents/shop-doc.pdf",
            shopContactNo: "+1-234-567-8901"
        },
        // Add more pending requests here
    ],
    acceptedRequests: [] // Empty at first
};

export const sellerSlice = createSlice({
    name: "seller",
    initialState,
    reducers: {
        acceptRequest(state, action) {
            // Find the request by ID
            const acceptedRequest = state.pendingRequests.find(
                (request) => request._id === action.payload.requestId
            );
            
            if (acceptedRequest) {
                // Remove the accepted request from pendingRequests
                state.pendingRequests = state.pendingRequests.filter(
                    (request) => request._id !== action.payload.requestId
                );
                
                // Add the accepted request to acceptedRequests
                state.acceptedRequests.push(acceptedRequest);
            }
        }
    }
});

export const { acceptRequest } = sellerSlice.actions;
export default sellerSlice.reducer;


