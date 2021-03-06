/**
 * RentalInfoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var type = 0;
var searchCount = 0;
var searchModels;
var estate, bedrooms, areaMin, areaMax, rentMin, rentMax;

module.exports = {
    home: async function (req, res) {
        let models = await RentalInfo.find({ where: { highlighted: 'true' }, limit: 4, sort: 'createdAt DESC' });
        return res.view('rentalInfo/home', { rentalInfo: models });
    },
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
        let reqdata = await RentalInfo.findOne({ id: reqid });
        let userName = req.session.username;
        if (!userName)
            return res.view('rentalInfo/details', { rentalInfo: reqdata, isRenter: false });
        else {
            var model = await RentalInfo.findOne({ id: reqid }).populate("rentedBy");
            var renterInfo = model.rentedBy;
            var isRenter = false;
            for (var i = 0, l = renterInfo.length; i < l; i++) {
                if (userName == renterInfo[i]["username"])
                    isRenter = true;
            }
            return res.view('rentalInfo/details', { rentalInfo: reqdata, isRenter: isRenter });
        }
    },
    admin: async function (req, res) {

        let models = await RentalInfo.find();

        return res.view('rentalInfo/admin', { rentalInfo: models });
    },
    updateAll: async function (req, res) {

        if (req.method == "GET") {

            let reqid = req.query.id;
            let reqdata = await RentalInfo.findOne({ where: { id: reqid } });

            return res.view('rentalInfo/update', { rentalInfo: reqdata });

        } else {

            if (!req.body.RentalInfo)
                return res.badRequest("Form-data not received.");

            let models = await RentalInfo.update(req.query.id).set({
                propertyTitle: req.body.RentalInfo.propertyTitle,
                estate: req.body.RentalInfo.estate,
                grossArea: req.body.RentalInfo.grossArea,
                rent: req.body.RentalInfo.rent,
                imageURL: req.body.RentalInfo.imageURL,
                bedrooms: req.body.RentalInfo.bedrooms,
                expectedTenants: req.body.RentalInfo.expectedTenants,
                highlighted: req.body.RentalInfo.highlighted,
            }).fetch();

            if (models.length == 0) return res.notFound();

            return res.ok("Record updated");
        }
    },
    delete: async function (req, res) {
        let models = await RentalInfo.destroy(req.body.id).fetch();
        if (models.length == 0) return res.notFound();
        return res.ok("Record Deleted");
    },
    search: async function (req, res) {

        const qPage = Math.max(req.query.page - 1, 0) || 0;
        const numOfItemsPerPage = 2;

        if (req.method == "GET" && type == 2) {
            numOfPage = Math.ceil(searchCount / numOfItemsPerPage);
            searchModels = await RentalInfo.find({
                where: {
                    estate: estate,
                    bedrooms: bedrooms,
                    and: [
                        { grossArea: { '>=': areaMin } },
                        { grossArea: { '<=': areaMax } },
                    ],
                    and: [
                        { rent: { '>=': rentMin } },
                        { rent: { '<=': rentMax } },
                    ],
                },
                limit: numOfItemsPerPage,
                skip: numOfItemsPerPage * qPage
            });
        } else if (req.method == "POST") {
            estate = req.body.RentalInfo.estate,
                bedrooms = req.body.RentalInfo.bedrooms,
                areaMin = req.body.RentalInfo.areaMin || 0,
                areaMax = req.body.RentalInfo.areaMax || Number.MAX_SAFE_INTEGER,
                rentMin = req.body.RentalInfo.rentMin || 0,
                rentMax = req.body.RentalInfo.rentMax || Number.MAX_SAFE_INTEGER;
            searchModels = await RentalInfo.find({
                where: {
                    estate: estate,
                    bedrooms: bedrooms,
                    and: [
                        { grossArea: { '>=': areaMin } },
                        { grossArea: { '<=': areaMax } },
                    ],
                    and: [
                        { rent: { '>=': rentMin } },
                        { rent: { '<=': rentMax } },
                    ],
                },
                limit: numOfItemsPerPage,
                skip: numOfItemsPerPage * qPage
            });
            searchCount = await RentalInfo.count({
                where: {
                    estate: estate,
                    bedrooms: bedrooms,
                    and: [
                        { grossArea: { '>=': areaMin } },
                        { grossArea: { '<=': areaMax } },
                    ],
                    and: [
                        { rent: { '>=': rentMin } },
                        { rent: { '<=': rentMax } },
                    ],
                }
            });
            type = 2;
            numOfPage = Math.ceil(searchCount / numOfItemsPerPage);
        } else {
            type = 0;
            searchModels = await RentalInfo.find({
                limit: numOfItemsPerPage,
                skip: numOfItemsPerPage * qPage
            });
            numOfPage = Math.ceil(await RentalInfo.count() / numOfItemsPerPage);
        }
        return res.view('rentalInfo/search', { rentalInfo: searchModels, count: numOfPage });

    },
    occupants: async function (req, res) {
        var rentalId = req.query.rentalId;
        var model = await RentalInfo.findOne(rentalId).populate("rentedBy");
        if (!model) return res.notFound();
        return res.view('rentalInfo/occupants', { users: model.rentedBy });
    }
};

