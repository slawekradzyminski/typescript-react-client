import { EditUser, User } from '../types';
import { apiUrl, deleteRequestOptions, getRequestOptions, postRequestOptions, putRequestOptions } from './apiCommons';
import { handleResponse } from './responseHandler';

export const userService = {
    login,
    logout,
    refresh,
    register,
    getAll,
    get,
    update,
    delete: _delete
};

async function login(username: string, password: string) {
    const response = await fetch(`${apiUrl}/users/signin`, postRequestOptions({ username, password }));
    const user = await handleResponse(response);
    return user;
}

async function logout() {
    const response = await fetch(`${apiUrl}/users/logout`, postRequestOptions({}));
    return handleResponse(response);
}

async function refresh() {
    const response = await fetch(`${apiUrl}/users/refresh`, getRequestOptions());
    const isAuthenticated = await handleResponse(response);
    return isAuthenticated;
}

async function getAll() {
    const response = await fetch(`${apiUrl}/users`, getRequestOptions());
    return handleResponse(response);
}

async function get(username: string) {
    const response = await fetch(`${apiUrl}/users/${username}`, getRequestOptions());
    return handleResponse(response);
}

async function register(user: User) {
    const response = await fetch(`${apiUrl}/users/signup`, postRequestOptions(user));
    return handleResponse(response);
}

async function update(username: string, user: EditUser) {
    const response = await fetch(`${apiUrl}/users/${username}`, putRequestOptions(user));
    return handleResponse(response);
}

async function _delete(username: string) {
    const response = await fetch(`${apiUrl}/users/${username}`, deleteRequestOptions());
    return handleResponse(response);
}

