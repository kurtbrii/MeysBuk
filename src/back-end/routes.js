import { signUp, login, checkIfLoggedIn, findUser, addFriendById, removeFriendRequest, userAllRequests, userRequestDetails, removeUserFromRequests, confirmFriendRequest1, confirmFriendRequest2, removeFriend1, removeFriend2 } from "./controllers/auth-controller.js";
import { createPost, postAll, deleteById, editPostById } from "./controllers/post-controller.js";

const setUpRoutes = (app) => {
  app.post("/sign-up", signUp);
  app.post("/login", login);
  app.post("/checkifloggedin", checkIfLoggedIn);
  
  app.post("/create-post", createPost);
  app.get("/post-all", postAll);
  app.post("/delete-by-id", deleteById);
  app.post("/edit-post-by-id", editPostById);

  app.get("/search-by-name", findUser);
  app.post("/add-user-by-id", addFriendById);
  app.post("/cancel-friend-request", removeFriendRequest);
  app.post("/all-requests", userAllRequests);
  app.post("/user-request-details", userRequestDetails);
  app.post("/reject-friend-request", removeUserFromRequests);

  app.post("/confirm-friend-request1", confirmFriendRequest1);
  app.post("/confirm-friend-request2", confirmFriendRequest2);

  app.post("/remove-friend1", removeFriend1);
  app.post("/remove-friend2", removeFriend2);
}

export default setUpRoutes;