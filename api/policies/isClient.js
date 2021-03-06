module.exports = async function (req, res, proceed) {

    var username = req.session.username;
    if(username){
        const user = await User.findOne({ username: username });
        if(user.role == "client")
        return proceed();
    }
    return res.forbidden();
};