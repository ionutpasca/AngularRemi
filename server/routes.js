module.exports = function(app, passport){
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', 'http://localhost:9000');
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    
    app.get('/userDetails', ensureAuthenticated, function(req, res){
        var result = req.user.facebook;
        result.token = '';
        res.json(result);
    });

    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email', 'publish_actions', 'user_friends','user_about_me', 
                'user_hometown', 'user_birthday', 'user_photos']
    }));

    app.get('/auth/facebook/callback/', passport.authenticate('facebook', {
        successRedirect:'http://localhost:9000',
        failureRedirect: '/fail'
    }));

    app.get('/logout', function(req, res){
        req.logout();
        res.json('User logged out!');
    });
};

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        next();
    }
    else{
        res.json('not authenticated');
    }
}