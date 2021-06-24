const accountClient = require("../clients/accountServiceClient");
const jwtService = require("../services/jwtService");
const hashService = require("../services/hashService");
const userModel = require("../models/userModel");

exports.getUser = async (token, userId) => {
  try {
    const jwtResponse = await jwtService.verifyToken(token);

    if (jwtResponse.userId != userId) {
      throw Error("not_authorized");
    }

    let profile = undefined;
    let user = undefined;

    if (process.env.DSWL_PROJECT_USE_MODELS) {
      profile = await userModel.getUserProfile(userId);

      user = await userModel.getUser(userId);
    } else {
      profile = await accountClient.getUserProfile(userId);

      user = await accountClient.getUser(userId);
    }

    return {
      ...user,
      profile: profile.description,
    };
  } catch (err) {
    throw err;
  }
};

exports.getUsersById = async (token, userId) => {
  try {
    const jwtResponse = await jwtService.verifyToken(token);

    if (jwtResponse.userId != userId) {
      throw Error("not_authorized");
    }

    const res = await accountClient.getUsersById(userId);

    return res;
  } catch (err) {
    throw err;
  }
};

exports.createUser = async (user) => {
  try {
    const passHashed = await hashService.hashingPasswordAsync(user.password);

    const userCreated = await accountClient.createUser(
      copyUserWIthPasswordHashed(passHashed, user)
    );

    return userCreated;
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

    if (!hasPermissionToCreateOrChangeAnUser(jwtResponse.profileId)) {
      throw Error("unauthorized_profile");
    }

    if (!isNewerUserProfileValid(user.profileId)) {
      throw Error("invalid_profile");
    }

    const passHashed = await hashService.hashingPasswordAsync(user.password);

    const userCreated = await accountClient.createUserChild(
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

const hasPermissionToCreateOrChangeAnUser = (profile) => {
  if (profile != "fcec55dc-9d24-4c0d-99ad-c99960660f2c") {
    throw Error("NotPermitedError");
  }

  return true;
};

const copyUserWIthPasswordHashed = (passwordHashed, user) => {
  const newerUserWithPasswordHashed = { ...user };

  newerUserWithPasswordHashed.password = passwordHashed;

  return newerUserWithPasswordHashed;
};

exports.getProfile = async (profileId) => {
  try {
    let profile = await accountClient.getProfile(profileId);

    return profile;
  } catch (error) {
    throw error;
  }
};

exports.changeUser = async (token, user, userId) => {
  try {
    const jwtResponse = await jwtService.verifyToken(token);

    if (jwtResponse.userId != userId) {
      throw Error("unauthorized_token");
    }

    const userChanged = await accountClient.changeUser(userId, {
      name: user.name,
    });

    return userChanged;
  } catch (err) {
    throw err;
  }
};

exports.changeUserCompany = async (token, company, userId) => {
  try {
    const jwtResponse = await jwtService.verifyToken(token);

    if (jwtResponse.userId != userId) {
      throw Error("unauthorized_token");
    }

    if (!hasPermissionToCreateOrChangeAnUser(jwtResponse.profileId)) {
      throw Error("unauthorized_profile");
    }

    const companyChanged = await accountClient.changeUser(userId, {
      company,
    });

    return companyChanged;
  } catch (err) {
    throw err;
  }
};

exports.changeUserLogin = async (token, userLogin, userId) => {
  try {
    const jwtResponse = await jwtService.verifyToken(token);

    if (jwtResponse.userId != userId) {
      throw Error("unauthorized_token");
    }

    if (!hasPermissionToCreateOrChangeAnUser(jwtResponse.profileId)) {
      throw Error("unauthorized_profile");
    }

    const responseUser = await accountClient.getUserLoginByUserId(userId);

    if (
      await hashService.comparePassword(
        userLogin.oldPassword,
        responseUser.password
      )
    ) {
      const userLoginChanged = await accountClient.changeUser(userId, {
        login: {
          userName: userLogin.login.username,
          password: await hashService.hashingPasswordAsync(
            userLogin.login.password
          ),
        },
      });

      return userLoginChanged;
    } else {
      throw Error("invalid_password");
    }
  } catch (err) {
    throw err;
  }
};
