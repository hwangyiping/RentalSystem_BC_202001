/**
 * RentalInfoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

 var isSearch = false;

module.exports = {
    home: async function (req, res) {
        let models = await RentalInfo.find({ where: { highlighted: 'true' }, limit: 4, sort: 'createdAt DESC' });
        return res.view('rentalInfo/home', { rentalInfo: models });
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
        let reqdata = await RentalInfo.findOne({ where: { id: reqid } });

        return res.view('rentalInfo/details', { rentalInfo: reqdata });
    },
    admin: async function (req, res) {

        let models = await RentalInfo.find();

        return res.view('rentalInfo/admin', { rentalInfo: models });
    },
    update: async function (req, res) {

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
        let models = await RentalInfo.destroy(req.query.id).fetch();
        if (models.length == 0) return res.notFound();
        return res.ok("Record Deleted");
    },
    search: async function (req, res) {
        // var type = req.body.type || 500;
        
        const qPage = Math.max(req.query.page - 1, 0) || 0;
        const numOfItemsPerPage = 2;
        
        if (req.method == "GET" && !isSearch) {
            searchModels = await RentalInfo.find({
                limit: numOfItemsPerPage,
                skip: numOfItemsPerPage * qPage
            });
        } else if (req.method == "POST") {
            var estate = req.body.RentalInfo.estate,
                bedrooms = req.body.RentalInfo.bedrooms,
                areaMin = req.body.RentalInfo.areaMin,
                areaMax = req.body.RentalInfo.areaMax,
                rentMin = req.body.RentalInfo.rentMin,
                rentMax = req.body.RentalInfo.rentMax;
            searchModels = await RentalInfo.find({
                where: {
                    estate: estate,
                    bedrooms: bedrooms,
                    and: [
                        {area: {'>=': areaMin}},
                        {area: {'<=': areaMax}},
                    ],
                    and: [
                        {rent: {'>=': rentMin}},
                        {rent: {'<=': rentMax}},
                    ],
                },
                limit: numOfItemsPerPage,
                skip: numOfItemsPerPage * qPage
            });
            isSearch = true;
        }
        var numOfPage = Math.ceil(await RentalInfo.count() / numOfItemsPerPage);

        return res.view('rentalInfo/search', { rentalInfo: searchModels, count: numOfPage });

    },
};

