
// This code defines a simple web application with a login and sign-up 
// page using the Express framework and MongoDB to store user data. 
// It uses the bcrypt library to hash passwords for added security. 
// The app listens for HTTP requests on port 3000.
// When a user navigates to the "/login" route, the app serves the "login" view to the user. 
// When the user submits a login form, the app checks the provided username and password 
// against the records in the MongoDB database.
// If the username and password match, the user is considered authenticated and is redirected to the "/users" route. 
// If the login is unsuccessful, the user is shown an error message. 
// The app also has a "/signup" route that allows users to create new accounts by providing a username and password.
// When a new user is created, their password is hashed and the hashed password is stored in the MongoDB database.




// This code is using the mongoose library to create a schema and model for a User object. 
// The schema defines the shape of the user object,
// specifying that it should have a username, password, and isDisabled property.
// The isDisabled property is set to false by default.

// The code then uses the User model to create new User objects and save them to a MongoDB database. 
// It also defines routes for logging in and signing up, which use the User model to 
// create and retrieve users from the database.



// Use modern JavaScript syntax, such as arrow functions and destructuring assignment, 
// to make the code more concise and easier to read.

// Move the MongoDB connection string and user schema definition to a
//  separate module to make the code more organized and modular.

// Use async/await syntax to simplify the code and avoid the use of 
// callbacks when working with asynchronous operations.




// To refactor this code with modern techniques, you could try the following:

// Use the async and await keywords to make your code more readable and easier to write. 
// This will allow you to write asynchronous code in a way that looks and behaves like synchronous code, 
// making it easier to reason about and understand.

// Use the findOneAndUpdate() method provided by the mongoose library to update user documents in the database. 
// This method allows you to find a document and update it in a single operation, reducing the amount of 
// code you need to write and making it more efficient.

// Use the bcrypt.hashSync() method provided by the bcrypt library to hash user passwords. 
// This method synchronously generates a hash of the password, which can be used to store the password securely in the database.

// Here is an example of how you could refactor the code using these techniques:



// Dependencies
const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const session = require("express-session");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// const html = require("html");
const app = express();


app.use(session({
  secret: "jendoskoskogbangbis1E%##",
  resave: false,
  saveUninitialized: false
}));

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true });


// Create user schema and model
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isDisabled: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model("User", userSchema);

// Use body-parser to parse request bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Set view engine to JSX
// app.set("view engine", "jsx");
// app.engine("jsx", require("express-react-views").createEngine());
app.set("view engine", "ejs");
app.engine("ejs", require("ejs").renderFile);

// Serve static files
app.use(express.static("public"));


// Login route
app.get("/login", (req, res) => {
  res.render("login", {message: "Please login!"}); // use res.render() to render the view
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username: username }, (err, user) => {
    if (err) {
      return res.render("login", { message: err });
    }

    if (!user) {
      return res.render("login", { message: "Invalid username or password" });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).send();
      }

      if (result) {
        // console.log(result);
        req.session.user = user;
        // return res.redirect("/users");
        console.log(`The userinfo is ${user}`);
        const userData = req.session.user;

        //Another method of passing data across
        // return res.redirect('/users?user=' + encodeURIComponent(userData.username));
        // use const data = req.query to pick the value of user (variable after the ?)
        return res.redirect('/users');
        // return res.render("main", { user: req.session.user });
      } else {
        return res.render("login", { message: "Invalid username or password" });
      }
    });
  });
});


app.get("/signup", (req, res) => {
  
  res.render("signup", {message: "Create a new user account!"}); // use res.render() to render the view
});

app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  console.log(`data sent upstream is:
  username: ${username}
  password: ${password}`);
  

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      res.render("signup", {message: err}); // use res.render() to render the view
    }

    // Create an instance of the User model and set its properties
    const user = new User({
      username,
      password: hash
    });

    user.save((err, user) => {
      if (err) {
        // return res.status(500).send();
        res.render("signup", {message: err}); // use res.render() to render the view
     
      }

      req.session.user = user;
      console.log('The user is: ' + user.username);
      res.redirect('/users');
    });
  });
});




// Users menu route (continued)
app.get("/users", (req, res) => {
  const userData = req.session.user;
  console.log("The userdata from login route is: "+userData.username)
  if (!req.session.user) {
    return res.redirect("/login");
  }

  User.find({}, (err, users) => {
    if (err) {
      // return res.status(500).send();
      if (err === "" || err===null) {
          err = "username does not exist"
      }
      return res.redirect("/login",{message: err});
    }
    res.render('users', { users,user: userData.username });
   
  });
});

// Logout route
app.get("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send();
    }

    res.redirect("/login");
  });
});


// User information route
app.get("/users/:id/edit", async (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    res.render("edit-user", { user});

  } catch (err) {
    res.status(500).send(err.message);
    }
    });




// Edit user route
app.get("/users/:id/edit", async (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  // Query the database for the user
  try {
    const user = await User.findById(req.params.id);

    // If the user does not exist, return a 404 error
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Otherwise, render the edit-user view with the user data
    res.render("edit-user", { user });

  } catch (err) {
    // If an error occurred while querying the database, return a 500 error
    res.status(500).send(err.message);
  }
});

    

  
  // app.post("/users/:id/edit", async (req, res) => {
  //   if (!req.session.user) {
  //   return res.redirect("/login");
  //   }
    
  //   try {
  //   const user = await User.findByIdAndUpdate(req.params.id, {
  //   username: req.body.username,
  //   password: bcrypt.hashSync(req.body.password, 10)
  //   });
    
  //   if (!user) {
  //     return res.status(404).send("User not found");
  //   }
    
  //   res.redirect("/users");
  //   } catch (err) {
  //   res.render("edit-user", { error: err.message });
  //   }
  //   });
    
    
    

app.post("/users/:id/edit", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  User.findByIdAndUpdate(
    req.params.id,
    { username: req.body.username, isDisabled: req.body.isDisabled },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(500).send();
      }

      res.redirect("/users");
    }
  );
});


// Remove user route
app.post("/users/:id/remove", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  User.findByIdAndRemove(req.params.id, err => {
    if (err) {
      return res.status(500).send();
    }

    res.redirect("/users");
  });
});


// Add new user
app.get("/users/add", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  res.render("add-user",{error:""});
});

// Add new user
app.post("/users/add", (req, res) => {
  // Check if the user is authenticated
  if (!req.session.user) {
    return res.redirect("/login");
  }

  // Get the username and password from the request body
  const { username, password } = req.body;

  // Create a new User object
  const user = new User({
    username,
    password: bcrypt.hashSync(password, 10) // Hash the password before storing it
  });

  // Save the user to the database
  user.save((err) => {
    if (err) {
      res.render("add-user", { error: err.message }); // Show an error message
    } else {
      res.redirect("/users"); // Redirect to the list of users
    }
  });
});





// Start the server on port 3000
const port = 8000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
