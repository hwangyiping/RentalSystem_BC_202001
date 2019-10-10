/**
 * RentalInfoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    home: async function (req, res) {
        let models = await RentalInfo.find({where: { highlighted: 'true' },limit:4, sort: 'createdAt DESC'});
        return res.view('rentalInfo/home', {rentalInfo: models});
    },
    // action - create
    create: async function (req, res) {

        if (req.method == "GET")
            return res.view('rentalInfo/create');

        if (!req.body.RentalInfo)
            return res.badRequest("Form-data not received.");

        await RentalInfo.create(req.body.RentalInfo);

        return res.ok("Successfully created!");
    },
    details: async function (req, res) {
        let reqid = req.query.id;
        let reqdata = await RentalInfo.findOne({where: { id: reqid }});
        return res.view('rentalInfo/details', {rentalInfo: reqdata});
    },

};

