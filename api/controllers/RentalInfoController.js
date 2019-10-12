/**
 * RentalInfoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

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
    }
};

