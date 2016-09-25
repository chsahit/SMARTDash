function requireLogin(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.json({
            success: 0,
            message: "You must be logged in"
        });
    }
}
module.exports = {requireLogin};
