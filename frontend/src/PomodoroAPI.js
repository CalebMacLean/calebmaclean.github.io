// Imports
import axios from "axios";

// Global Vars
const BASE_URL = import.meta.VITE_BASE_URL || "http://localhost:3001";

/** API Class
 * 
 * Static class tying together methods used to get/send to the API. There shouldn't be any frontend-specific functionality here, and there shouldn't be any API-aware stuff elsewhere in the frontend.
 * 
 */
class PomodoroAPI {
    // the token for interactions with the API will be stored here
    static token = localStorage.getItem("token") ? localStorage.getItem("token") : null;

    /** request class method
     * 
     * Facilitates the making of HTTP requests to the application's REST API. It constructs, sends a request, handles authorization, and processes a response.
     * 
     * Parameters:
     * endpoint: (str) valid API endpoint
     * data: (obj) payload for a request. Defaults to an empty obj.
     * method: (str) the type of HTTP request. Defaults to "get".
     */
    static async request(endpoint, data={}, method="get") {
        // Log API call details for debugging
        // console.debug("API Call: ", endpoint, data, method);

        const handleApiError = (methodName, endpoint, err) => {
            console.log(`API Error in ${methodName}: `, err.response);
            console.log(`Error details: `, {
                url: err.config?.url,
                method: err.config?.method,
                status: err.response?.status,
                statusText: err.response?.statusText,
                data: err.response?.data,
                path: endpoint
            });
            let message = err.response?.data?.error?.message || err.message;
            throw Array.isArray(message) ? [`${methodName}: ${message}`] : [`${methodName}: ${message}`];
        }

        // construct parameters for any axios request to the API
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${this.token}`};
        console.log("API header: ", headers);
        const params = ( method === 'get' )
            ? data
            : {};
        
        // contain constructed parameters in an obj
        const reqObj = { url, method, data, params, headers }
        console.log("reqObj: ", reqObj);

        try {
            // attempt to make an API call using axios, return its data
            return (await axios({ url, method, data, params, headers })).data;
        }
        catch (err) {
            // log the error, and throw an array of the error messages
            handleApiError(method, endpoint, err);
        }
    }

    // Individual API routes
    /** Post a user to /token to retrieve a token */
    static async login(data) {
        let res = await this.request(`auth/token`, data, "post");
        this.token = res.token;
        return res.token;
    }

    /** Post a user to /register route */
    static async registerUser(data) {
        let res = await this.request(`auth/register`, data, "post");
        return res.token;
    }

    /** Get a user object with their username 
     * 
     * This method assumes that a validation token has already been set for the class.
    */
    static async getUser(username) {
        // make request to /users/:username, return response
        let res = await this.request(`users/${username}`);
        console.log("getUser response: ", res);
        return res.user;
    }

    /** Get all users */
    static async getUsers() {
        let res = await this.request('users');
        return res.users;
    }

    /** Get users based on search term */
    static async findUsers(searchTerm) {
        let res = await this.request(`users/?nameLike=${searchTerm}`);
        return res.users;
    }

    /** Update a users pomodoros */
    static async incrementPomodoros(username, data={}) {
        let res = await this.request(`users/${username}/increment`, data, "patch")
    }

    /** Post a list */
    static async createList(data) {
        let res = await this.request('lists', data, "post");
        return res.list;
    }

    /** Get all lists */
    static async getLists() {
        let res = await this.request('lists');
        // console.log("Lists res: ", lists);
        return res.lists;
    }

    /** Get lists based on search term */
    static async findLists(searchTerm) {
        let res = await this.request(`lists/?nameLike=${searchTerm}`);
        return res.lists;
    }

    /** Get a list by id */
    static async getList(id) {
        let res = await this.request(`lists/${id}`);
        return res.list;
    }

    /** Update a task's completed cycles */
    static async incrementTask(listId, id) {
        let res = await this.request(`lists/${listId}/tasks/${id}`);
        return res.task;
    }

    /** Get all task for a specified list */
    static async getTasksForList(listId) {
        let res = await this.request(`lists/${listId}/tasks`);
        return res.tasks;
    }

    /** Remove completed tasks  */
    static async removeCompletedTasks(listId, ids) {
        let res = await this.request(`lists/${listId}/tasks/remove`, {ids: ids}, 'delete');
    }

    /** Create a task */
    static async createTask(data) {
        let res = await this.request(`lists/${data.listId}/tasks`, data, 'post');
        return res.task;
    }

    /** Update a task */
    static async updateTask(listId, taskId, data) {
        let res = this.request(`lists/${listId}/tasks/${taskId}`, data, 'patch');
        return res.task;
    }

    /** Get all friends for a user */
    static async getFriends(username) {
        let res = await this.request(`users/${username}/friends`);
        return res.friends;
    }

    /** Get all friends requests for a user */
    static async getFriendRequests(username) {
        let res = await this.request(`users/${username}/friends/received`);
        return res.friendRequests;
    }

    /** Approve a friend request */
    static async approveRequest(username, sender) {
        let res = await this.request(`users/${username}/friends/request/${sender}`, {}, "patch")
    }

    /** Deny a friend request */
    static async denyRequest(username, sender) {
        let res = await this.request(`users/${username}/friends/request/${sender}`, {}, "delete")
    }

    /** Create new friend request  */
    static async requestFriend(username, receiver) {
        let res = await this.request(`users/${username}/friends/request/${receiver}`, {}, "post")
    }

    /** Get a single friend or request */
    static async getFriend(username, receiver) {
        let res;
        let res2;
        try {
            res = await this.request(`users/${username}/friends/request/${receiver}`);
            return res.friendRequest;
        } catch (error) {
            if(!res){
                try {
                    res2 = await this.request(`users/${receiver}/friends/request/${username}`);
                    return res2.friendRequest
                } catch (error) { 
                    return undefined;
                }
            }
         }
    }
};

// Exports
export default PomodoroAPI;