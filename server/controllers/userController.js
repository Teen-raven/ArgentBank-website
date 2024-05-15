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
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("openModalBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Submit form action
var editUsernameForm = document.getElementById("editUsernameForm");
editUsernameForm.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission

  // Get the new username
  var newUsername = document.getElementById("newUsername").value;

  // Update the username display (you may replace this with your own logic)
  document.querySelector('.main-nav-item').innerText = newUsername;

  // Close the modal
  modal.style.display = "none";
});
