module.exports = {
    ensureAuthenticated: function(req, res, next) {
        console.log(req.isAuthenticated());
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash("error_msg", "Please login to view this resource");
        res.redirect("/users/login");
    },
};


// cloudinary.config({
//     cloud_name: 'warrentymanagement',
//     api_key: '232167499544133',
//     api_secret: '_cpUyJhOFDt1jD8AG_zOGDGcyjw'
// });