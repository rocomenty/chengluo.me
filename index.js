const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
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
    bodyParser.json(),
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // cookies' expiration time (in milliseconds)
        keys: [keys.cookieKey] // uses array, will pick one randomly to encrypt cookie
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes.js')(app);
require('./routes/projectRoutes.js')(app);

if (process.env.NODE_ENV === 'production') {
    // Make sure express will serve production assets from React
    // such as main.js or main.css
    app.use(express.static('client/build'));

    // Express will serve the index.html file if it does not
    // recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});