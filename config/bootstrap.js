/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function () {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```

  if (await RentalInfo.count({highlighted:'true'}) > 3) {
    return ;
  }

  await RentalInfo.createEach([
    { "propertyTitle": "平絕同區", "estate": "Festival City", "grossArea": 700, "rent": 15000, "imageURL": "/images/4.png", "bedrooms": "3", "expectedTenants": 4, "highlighted": true, "createdAt": 1570683161164, "updatedAt": 1570683161164, "id": 5, "Bedrooms": 0, "_id": 5 },
    { "propertyTitle": "沙田第一城 套3房剛翻新", "estate": "City One Shatin", "grossArea": 900, "rent": 25000, "imageURL": "/images/3.png", "bedrooms": "4", "expectedTenants": 6, "highlighted": true, "createdAt": 1570683206202, "updatedAt": 1570683206202, "id": 6, "Bedrooms": 0, "_id": 6 },
    { "propertyTitle": "2房實用，交通方便", "estate": "Tin Ma Court", "grossArea": 550, "rent": 12000, "imageURL": "/images/2.png", "bedrooms": "2", "expectedTenants": 4, "highlighted": true, "createdAt": 1570683247112, "updatedAt": 1570683247112, "id": 7, "Bedrooms": 0, "_id": 7 },
    { "propertyTitle": "酒店式靚裝，有泳池會所", "estate": "Festival City", "grossArea": 700, "rent": 18000, "imageURL": "/images/1.png", "bedrooms": "3", "expectedTenants": 4, "highlighted": true, "createdAt": 1570683291441, "updatedAt": 1570683291441, "id": 8, "Bedrooms": 0, "_id": 8 }
    // etc.
  ]);

};
