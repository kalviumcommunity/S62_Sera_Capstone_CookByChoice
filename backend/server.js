const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const passport = require("passport");
const session = require("express-session");
const jwt = require("jsonwebtoken"); 
const User=require('./models/user.model')
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();
const userRoute = require("./routes/user.route");
const recipeRoute = require("./routes/recipe.route");
const ingredientRoute = require("./routes/ingredient.route");
const favouriteRecipe = require("./routes/favourite.route");
const mealPlannerRoutes = require("./routes/mealplanner.route");

app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/users", userRoute);
app.use("/api/recipes", recipeRoute);
app.use("/api/ingredients", ingredientRoute);
app.use("/api/favourite", favouriteRecipe);
app.use("/api/meal-planner", mealPlannerRoutes);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, { profile, accessToken });
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error connecting"));

app.get("/", (req, res) => {
  res.send("<a href='/auth/google'>Login with Google</a>");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  async(req, res) => {
    const user = req.user.profile;
    const email = user.emails[0].value;
    const name = user.displayName;

    try {
      // Check if the user exists in the database
      let existingUser = await User.findOne({ email });

      if (!existingUser) {
        // Create a new user if not found
        existingUser = new User({ name, email, password: "google-auth" });
        await existingUser.save();
      }

      // Redirect to frontend after login
      console.log("Login successful")
      const token = jwt.sign(
        { id: existingUser._id, name: existingUser.name, email: existingUser.email },
        process.env.SECRET_KEY,
        { expiresIn: "1h" } // Token expires in 1 hour
      );
      res.cookie("token",token,{httpOnly:true})
      res.redirect(`http://localhost:5173/recipes?token=${token}`);
    } catch (error) {
      console.error("Login failed:", error);
      res.redirect("http://localhost:5173?error=login_failed");
    }
  }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
