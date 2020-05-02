const passport = require('passport');

module.exports = (app) => {
    app.get('/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get('/auth/google/callback',
        passport.authenticate('google', { successRedirect: '/', failureRedirect: '/' })
    );

    app.get('/auth/facebook',
        passport.authenticate('facebook', {scope: 'email'})
    );

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/' })
    );

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });

    app.get('/success', (req, res) => {
        res.send("success!");
    });

    app.get('/failure', (req, res) => {
        res.status(401);
        res.send("failed!");
    });
};