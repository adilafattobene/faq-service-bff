const accountClient = require("../clients/accountServiceClient");
const jwtService = require("../services/jwtService");
const hashService = require("../services/hashService");

exports.getUser = async (token, userId) => {
  try {
    const jwtResponse = await jwtService.verifyToken(token);

    const res = await accountClient.getUser(userId);
    return res;
  } catch (err) {
    throw err;
  }
};

exports.getUsersById = async (token, userId) => {
  try {
    const jwtResponse = await jwtService.verifyToken(token);

    console.log(jwtResponse);
    if (jwtResponse.userId != userId) {
      throw Error("not_authorized");
    }

    const res = await accountClient.getUsersById(userId);

    return res;
  } catch (err) {
    throw err;
  }
};

exports.createUser = (token, user, next) => {
  let newerUser = { ...user };

  try {
    jwtService.verifyToken(token, function (response) {
      if (
        hasPermissionToCreateNewProfile(response.userProfile) &&
        isNewerUserProfileValid(user.profile)
      ) {
        hashService.hashingPassword(
          newerUser.password,
          function (hashedPassword) {
            if (!hashedPassword) {
              throw Error("Error during hash password");
            }

            const userCreated = accountClient.createUser(
              copyUserWIthPasswordHashed(hashedPassword, user)
            );

            next(userCreated);
          }
        );
      } else {
        throw Error("Unauthorized");
      }
    });
  } catch (err) {
    throw err;
  }
};

exports.createChild = async (token, user, userId) => {
  try {
    const jwtResponse = await jwtService.verifyToken(token);

    if (jwtResponse.userId != userId) {
      throw Error("unauthorized_token");
    }

    if (!hasPermissionToCreateNewProfile(jwtResponse.profileId)) {
      throw Error("unauthorized_profile");
    }

    if (!isNewerUserProfileValid(user.profileId)) {
      throw Error("invalid_profile");
    }

    const passHashed = await hashService.hashingPasswordAsync(user.password);

    const userCreated = await accountClient.createUser(
      userId,
      copyUserWIthPasswordHashed(passHashed, user)
    );

    return userCreated;
  } catch (err) {
    throw err;
  }
};

const isNewerUserProfileValid = (newerUserProfile) => {
  if (!newerUserProfile) {
    throw Error("MissingProfileError");
  }

  if (newerUserProfile != "fcec55dc-9d24-4c0d-99ad-c99960660f2c") {
    return true;
  }

  return false;
};

const hasPermissionToCreateNewProfile = (profile) => {

  if (profile != "fcec55dc-9d24-4c0d-99ad-c99960660f2c") {
    console.log("profile")
    throw Error("NotPermitedError");
  }

  return true;
};

const copyUserWIthPasswordHashed = (passwordHashed, user) => {
  const newerUserWithPasswordHashed = { ...user };

  newerUserWithPasswordHashed.password = passwordHashed;

  return newerUserWithPasswordHashed;
};
