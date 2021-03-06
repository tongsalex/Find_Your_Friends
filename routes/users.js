/* eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }] */

const express      = require('express');
const { createUser }    = require('../models/user.js');
const { authenticate }   = require('../lib/auth');
const { getMyListings } = require('../models/locations');
const { getMyFavorites } = require('../models/favorites');

const usersRouter  = express.Router();
/**
 * Creates a new user by handling the POST request from a form with action `/users`
 * It uses the createUser middleware from the user model
 */
usersRouter.post('/', createUser, (req, res) => { // ROUTE TO CREATE A NEW USER UPON LOGIN
  res.redirect('/login');
});

/**
 * Takes the user to its profile by handling any GET request to `/users/profile`
 * It redirects to /login when attempted to be reached by a non logged in user
 * It is "protected" by the authenticate middleware from the auth library
 */
usersRouter.get('/profile', authenticate, getMyListings, getMyFavorites, (req, res) => { // ROUTE TO GRAB PROFILE AND FILL OUT WITH USER SELLING LISTINGS AND FAVORITE BUY LISTINGS
  res.render('users/profile', {
    user: res.user,
    myListings: res.myListings || [],
    myFavorites: res.favorites[0].favoriteListings || [],
  });
  // res.json(res.favorites[0].favoriteListings);
});


module.exports = usersRouter;
