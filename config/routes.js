/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': 'RentalInfoController.home',
  //rentalInfo
  'GET /rentalInfo/home': 'RentalInfoController.home',
  'GET /rentalInfo/create': 'RentalInfoController.create',
  'POST /rentalInfo': 'RentalInfoController.create',
  'GET /rentalInfo/details': 'RentalInfoController.details',
  'GET /rentalInfo/admin': 'RentalInfoController.admin',
  'DELETE /rentanInfo': 'RentalInfoController.delete',
  'GET /rentalInfo/update': 'RentalInfoController.updateAll',
  'POST /rentalInfo/update': 'RentalInfoController.updateAll',
  'GET /rentalInfo/search': 'RentalInfoController.search',
  'POST /rentalInfo/search': 'RentalInfoController.search',
  'GET /rentalInfo/occupants': 'RentalInfoController.occupants',

  //user
  'GET /user/login': 'UserController.login',
  'POST /user/login': 'UserController.login',
  'POST /user/logout': 'UserController.logout',
  'GET /user/myRentals': 'UserController.myRentals',
  



  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
