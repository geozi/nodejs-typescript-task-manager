import mongoose from "mongoose";
import IUser from "../domain/interfaces/iUser.interface";
import userRepository from "../persistence/user.repository";
import IUserUpdateGeneral from "../presentation/interfaces/iUserUpdateGeneral.interface";
import NotFoundError from "./errors/notFound.error";
import ServerError from "./errors/server.error";
import serviceResponses from "./serviceResources/serviceResponses";
import bcrypt from "bcryptjs";
import IUserUpdateAdmin from "../presentation/interfaces/iUserUpdateAdmin.interface";

const retrieveAllUsers = async (): Promise<Array<IUser>> => {
  try {
    const users = userRepository.getUsers();
    return users;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new ServerError(serviceResponses.SERVER_ERROR);
  }
};

const retrieveUsersByRole = async (role: string): Promise<Array<IUser>> => {
  try {
    const users = await userRepository.getUsersByRole(role);
    if (users.length === 0) {
      throw new NotFoundError(serviceResponses.USERS_NOT_FOUND);
    }
    return users;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }

    throw new ServerError(serviceResponses.SERVER_ERROR);
  }
};

const retrieveUserByUsername = async (
  username: string
): Promise<IUser | null> => {
  try {
    const user = await userRepository.getUserByUsername(username);
    if (user === null) {
      throw new NotFoundError(serviceResponses.USER_NOT_FOUND);
    }

    return user;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }

    throw new ServerError(serviceResponses.SERVER_ERROR);
  }
};

const retrieveUserByEmail = async (email: string): Promise<IUser | null> => {
  try {
    const user = await userRepository.getUserByEmail(email);
    if (user === null) {
      throw new NotFoundError(serviceResponses.USER_NOT_FOUND);
    }

    return user;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }

    throw new ServerError(serviceResponses.SERVER_ERROR);
  }
};

const createUserProfile = async (newUser: IUser): Promise<IUser> => {
  try {
    const savedUser = await userRepository.addUser(newUser);
    return savedUser;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new ServerError(serviceResponses.SERVER_ERROR);
  }
};

const updateProfileAsGeneralUser = async (
  userUpdateInfo: IUserUpdateGeneral
): Promise<IUser | null> => {
  try {
    const { id, username, email, password } = userUpdateInfo;
    const idAsObjectId = new mongoose.Types.ObjectId(id);

    let userToUpdate = {};
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      userToUpdate = {
        username: username,
        email: email,
        password: hashedPassword,
      };
    }

    userToUpdate = {
      username: username,
      email: email,
    };

    const updatedUserProfile = await userRepository.updateUserInfo(
      idAsObjectId,
      userToUpdate
    );

    if (updatedUserProfile === null) {
      throw new NotFoundError(serviceResponses.USER_NOT_FOUND);
    }

    return updatedUserProfile;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }

    throw new ServerError(serviceResponses.SERVER_ERROR);
  }
};

const updateProfileAsAdminUser = async (
  userUpdateInfo: IUserUpdateAdmin
): Promise<IUser | null> => {
  try {
    const { id, role } = userUpdateInfo;
    const idAsObjectId = new mongoose.Types.ObjectId(id);
    const userToUpdate = {
      role: role,
    };

    const updatedUserProfile = await userRepository.updateUserInfo(
      idAsObjectId,
      userToUpdate
    );

    if (updatedUserProfile === null) {
      throw new NotFoundError(serviceResponses.USER_NOT_FOUND);
    }

    return updatedUserProfile;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }

    throw new ServerError(serviceResponses.SERVER_ERROR);
  }
};

const deleteUserProfile = async (id: string): Promise<IUser | null> => {
  try {
    const idAsObjectId = new mongoose.Types.ObjectId(id);
    const deletedUserProfile = await userRepository.deleteUserInfo(
      idAsObjectId
    );

    if (deletedUserProfile === null) {
      throw new NotFoundError(serviceResponses.USER_NOT_FOUND);
    }

    return deletedUserProfile;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }

    throw new ServerError(serviceResponses.USER_NOT_FOUND);
  }
};

export default {
  retrieveAllUsers,
  retrieveUsersByRole,
  retrieveUserByUsername,
  retrieveUserByEmail,
  createUserProfile,
  updateProfileAsGeneralUser,
  updateProfileAsAdminUser,
  deleteUserProfile,
};
