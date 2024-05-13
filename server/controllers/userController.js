const userService = require('../services/userService');

module.exports.createUser = async (req, res) => {
  let response = {};

  try {
    const responseFromService = await userService.createUser(req.body);
    response.status = 200;
    response.message = 'User successfully created';
    response.body = responseFromService;
  } catch (error) {
    console.error('Something went wrong in userController.js', error);
    response.status = 400;
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.loginUser = async (req, res) => {
  let response = {};

  try {
    const { username, password } = req.body;

    // Recherche de l'utilisateur par nom d'utilisateur
    const user = await userService.findUserByUsername(username);

    if (!user) {
      throw new Error('User not found');
    }

    // Vérification du mot de passe
    const isMatch = await userService.comparePasswords(password, user.password);

    if (!isMatch) {
      throw new Error('Incorrect password');
    }

    // Génération du token JWT ou autre mécanisme d'authentification
    const token = await userService.generateAuthToken(user);

    response.status = 200;
    response.message = 'User successfully logged in';
    response.body = { user, token };

  } catch (error) {
    console.error('Error in loginUser (userController.js)', error);
    response.status = 400;
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.logoutUser = async (req, res) => {
  let response = {};

  try {
    // Ici, vous pouvez ajouter la logique pour supprimer le token ou les informations d'authentification

    response.status = 200;
    response.message = 'User successfully logged out';

  } catch (error) {
    console.error('Error in logoutUser (userController.js)', error);
    response.status = 400;
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.getUserProfile = async (req, res) => {
  let response = {};

  try {
    const responseFromService = await userService.getUserProfile(req);
    response.status = 200;
    response.message = 'Successfully got user profile data';
    response.body = responseFromService;
  } catch (error) {
    console.log('Error in getUserProfile - userController.js', error);
    response.status = 400;
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.updateUserProfile = async (req, res) => {
  let response = {};

  try {
    const responseFromService = await userService.updateUserProfile(req);
    response.status = 200;
    response.message = 'Successfully updated user profile data';
    response.body = responseFromService;
  } catch (error) {
    console.log('Error in updateUserProfile - userController.js', error);
    response.status = 400;
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};
