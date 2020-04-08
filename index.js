const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys.js');

const app = express();
const PORT = 5000;

mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
require('./models/User.js');
require('./models/Project.js');
require('./models/Image.js');
require('./services/passport.js');

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // cookies' expiration time (in milliseconds)
        keys: [keys.cookieKey] // uses array, will pick one randomly to encrypt cookie
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes.js')(app);
require('./routes/projectRoutes.js')(app);

app.get('/', (req, res) => {
    res.send("Algorithm App");
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});