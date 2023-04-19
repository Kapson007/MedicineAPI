import mongoose from 'mongoose';
import {UserModel} from '../schemas/users';

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({email});
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = async (values: Record<string, any>) => new UserModel(values).save().then(user => user.toObject());
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({_id: id});
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);