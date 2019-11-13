/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    login: async function (req, res) {
        if (req.method == "GET") return res.view('user/login');

        if (!req.body.username || !req.body.password) return res.status(400).send("Name and password cannot be empty");

        var user = await User.findOne({ username: req.body.username });

        if (!user) return res.status(401).send("User not found");

        const match = await sails.bcrypt.compare(req.body.password, user.password);

        if (!match) return res.status(401).send("Wrong Password");

        req.session.regenerate(function (err) {

            if (err) return res.serverError(err);

            req.session.username = req.body.username;

            req.session.userRole = user.role;

            return res.ok("Login successfully.");

        });
    },
    logout: async function (req, res) {

        req.session.destroy(function (err) {

            if (err) return res.serverError(err);

            return res.ok("Log out successfully.");

        });
    },
    coRent: async function (req, res) {
        let rentalId = req.body.rentalId;
        let userName = req.session.username;
        if (!userName) return res.status(401).send("You need to login first.");
        const user = await User.findOne({ username: userName });
        const rental = await RentalInfo.findOne({ id: rentalId });
        if (rental.expectedTenants - rental.rentedTenants == 0)
            res.status(401).send("No empty room");
        else {
            await User.addToCollection(user.id, 'rent').members(rental.id);
            return res.ok("Co-rent successfully.");
        }
    },
    moveOut: async function (req, res) {
        let rentalId = req.body.rentalId;
        let userName = req.session.username;
        const user = await User.findOne({ username: userName });
        const rental = await RentalInfo.findOne({ id: rentalId });
        if (!userName) return res.badRequest("You need to Login.");
        await User.removeFromCollection(user.id, 'rent').members(rental.id);
        return res.ok("Move out successfully.");
    },
    myRentals: async function (req, res) {
        let userName = req.session.username;
        const user = await User.findOne({ username: userName });
        userId = user.id;
        var model = await User.findOne(userId).populate("rent");
        if (!model) return res.notFound();
        return res.view('user/myRentals', { rental: model.rent });
    }
};

