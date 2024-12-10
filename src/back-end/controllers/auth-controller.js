import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';


// get user model registered in Mongoose
const User = mongoose.model("User");

const signUp = (req, res) => {
  const newuser = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password,
    friends: [],
    requests: []
  });

  // finds the user with the same email
  const email = req.body.email.trim();
  User.findOne({ email }, (err, user) => {
    if (err || !user) {  // indicates that user with that email address does not exist yet
      console.log("New user: ");
      console.log(newuser);

      newuser.save((err) => { // there exists a user with the same email
        if (err) { return res.send({ success: false }); }
        else { return res.send({ success: true }); }
      });
    } else {
      console.log("Cannot save user!")
      return res.send({ success: false });
    }
  });
}

const login = (req, res) => {
  const email = req.body.email.trim();
  const password = req.body.password;

  User.findOne({ email }, (err, user) => {
    // check if email exists
    if (err || !user) {
      //  Scenario 1: FAIL - User doesn't exist
      console.log("user doesn't exist");
      return res.send({ success: false });
    }

    // check if password is correct
    user.comparePassword(password, (err, isMatch) => {
      if (err || !isMatch) {
        // Scenario 2: FAIL - Wrong password
        console.log("wrong password");
        return res.send({ success: false });
      }

      console.log("Successfully logged in");

      // Scenario 3: SUCCESS - time to create a token
      const tokenPayload = {
        _id: user._id
      }

      const token = jwt.sign(tokenPayload, "THIS_IS_A_SECRET_STRING");

      // return the token to the client
      return res.send({ success: true, token, fname: user.fname, id: user._id, lname: user.lname });
    })
  })
}

const checkIfLoggedIn = (req, res) => {

  if (!req.cookies || !req.cookies.authToken) {
    // Scenario 1: FAIL - No cookies / no authToken cookie sent
    return res.send({ isLoggedIn: false });
  }

  // Token is present. Validate it
  return jwt.verify(
    req.cookies.authToken,
    "THIS_IS_A_SECRET_STRING",
    (err, tokenPayload) => {
      if (err) {
        // Scenario 2: FAIL - Error validating token
        return res.send({ isLoggedIn: false });
      }

      const userId = tokenPayload._id;

      // check if user exists
      return User.findById(userId, (userErr, user) => {
        if (userErr || !user) {
          // Scenario 3: FAIL - Failed to find user based on id inside token payload
          return res.send({ isLoggedIn: false });
        }

        // Scenario 4: SUCCESS - token and user id are valid
        console.log("user is currently logged in");
        return res.send({ isLoggedIn: true });
      });
    });
}

const findUser = (req, res) => {
  User.find({}, (err, users) => {
    if (!err && users) { res.send(users); console.log(users); }
  });
}

const addFriendById = (req, res) => {
  const yourID = req.body.yourID
  const friendID = req.body.friendID;
  User.updateOne( // https://stackoverflow.com/questions/33049707/push-items-into-mongo-array-via-mongoose
    { _id: friendID },
    { $push: { requests: [yourID] } },
    (err, users) => {
      if (!err && users) {
        res.send({ friendAdded: true })
      } else {
        res.send({ friendAdded: false })
      }
    }
  )
}

const removeFriendRequest = (req, res) => {
  const yourID = req.body.yourID
  const friendID = req.body.friendID;

  User.updateOne(
    { _id: friendID },
    { $pullAll: { requests: [yourID] } },
    (err, user) => {
      if (!err && user) {
        res.send({ requestCancelled: true })
      } else {
        res.send({ requestCancelled: false })
      }
    }
  )
}

const removeUserFromRequests = (req, res) => {
  const yourID = req.body.yourID
  const friendID = req.body.friendID;

  User.updateOne(
    { _id: yourID },
    { $pullAll: { requests: [friendID] } },
    (err, user) => {
      if (!err && user) {
        res.send({ requestCancelled: true })
      } else {
        res.send({ requestCancelled: false })
      }
    }
  )
}

const userAllRequests = (req, res) => {
  const userID = req.body.userID;
  User.find({}, (err, users) => {
    if (!err && users) { res.send(users); console.log(users); }
  }).where('_id').equals(userID);
}

const userRequestDetails = (req, res) => {
  const userID = req.body.userID;
  User.find({}, (err, users) => {
    if (!err && users) { res.send(users); console.log(users); }
  }).where('_id').equals(userID);
}

const confirmFriendRequest1 = (req, res) => {
  const yourID = req.body.yourID
  const friendID = req.body.friendID;
  User.updateOne(
    { _id: yourID },
    { $push: { friends: [friendID] } },
    (err, users) => {
      if (!err && users) {
        res.send({ confirmedRequest: true })
      } else {
        res.send({ confirmedRequest: false })
      }
    }
  )
}

const confirmFriendRequest2 = (req, res) => {
  const yourID = req.body.yourID
  const friendID = req.body.friendID;
  User.updateOne(
    { _id: friendID },
    { $push: { friends: [yourID] } },
    (err, users) => {
      if (!err && users) {
        res.send({ confirmedRequest: true })
      } else {
        res.send({ confirmedRequest: false })
      }
    }
  )
}

const removeFriend1 = (req, res) => {
  const yourID = req.body.yourID
  const friendID = req.body.friendID;
  User.updateOne(
    { _id: friendID },
    { $pullAll: { friends: [yourID] } },
    (err, users) => {
      if (!err && users) {
        res.send({ unfriendRequest: true })
      } else {
        res.send({ unfriendRequest: false })
      }
    }
  )
}

const removeFriend2 = (req, res) => {
  const yourID = req.body.yourID
  const friendID = req.body.friendID;
  User.updateOne(
    { _id: yourID },
    { $pullAll: { friends: [friendID] } },
    (err, users) => {
      if (!err && users) {
        res.send({ unfriendRequest: true })
      } else {
        res.send({ unfriendRequest: false })
      }
    }
  )
}

export { signUp, login, checkIfLoggedIn, findUser, addFriendById, removeFriendRequest, userAllRequests, userRequestDetails, removeUserFromRequests, confirmFriendRequest1, confirmFriendRequest2, removeFriend1, removeFriend2 }