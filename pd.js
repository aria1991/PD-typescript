const express = require("express");
const app = express();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

// Set up the JWT authentication strategy
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "secret",
    },
    (payload, done) => {
      // Check if the user exists in the database
      User.findById(payload.id, (err, user) => {
        if (err) return done(err);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    }
  )
);

// Hardcoded patient data for demonstration purposes
const patientData = {
  heartRate: 72,
  respirationRate: 18,
  bloodOxygenSaturation: 96,
  temperature: 36.6,
  checkUps: [
    {
      date: new Date("2020-01-01T00:00:00.000Z"),
      notes
// Set up a route to handle user login
app.post("/api/login", (req, res) => {
  // Authenticate the user (e.g. by checking their credentials against a database)
  const user = authenticate(req.body.username, req.body.password);

  if (user) {
    // If the authentication is successful, generate a JWT and send it back to the client
    const token = jwt.sign({ id: user.id }, "secret");
    res.json({ token });
  } else {
    // If the authentication fails, send a 401 Unauthorized response
    res.sendStatus(401);
  }
});

// Set up a route to serve the patient data
app.get("/api/patient", passport.authenticate("jwt", { session: false }), (req, res) => {
  // Get the user ID from the authenticated user
  const userId = req.user.id;

  // Fetch the patient data for the authenticated user from the database
  const patient = Patient.findById(userId);

  // Send the patient data back to the client
  res.json(patient);
});

// Set up a route to handle adding new check-ups
app.post("/api/patient/check-ups", passport.authenticate("jwt", { session: false }), (req, res) => {
  // Get the user ID from the authenticated user
  const userId = req.user.id;

  // Add the new check-up to the patient's check-up list
  Patient.updateOne({ _id: userId }, { $push: { checkUps: req.body } });

  // Send a 201 Created response
  res.sendStatus(201);
});

// Set up a route to handle adding new blood analyses
app.post("/api/patient/blood-analyses", passport.authenticate("jwt", { session: false }), (req, res) => {
  // Get the user ID from the authenticated user
  const userId = req.user.id;

  // Add the new blood analysis to the patient's blood analysis list
  Patient.updateOne({ _id: userId }, { $push: { bloodAnalyses: req.body } });

  // Send a 201 Created response
  res.sendStatus(201);
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
