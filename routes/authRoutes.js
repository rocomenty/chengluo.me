const passport = require('passport');

module.exports = (app) => {

    app.get('/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/failure' }),
        (req, res) => {
            res.redirect('/success');
        }
    );

    app.get('/auth/facebook',
        passport.authenticate('facebook')
    );

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { successRedirect: '/success', failureRedirect: 'failure' })
    );

    app.get('/api/logout', (req, res) => {
        console.log(req);
        req.logout();
        res.redirect('/');
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};