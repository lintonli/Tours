"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const userURL = "http://localhost:3000/users";
class LogUser {
    constructor(users) {
        this.users = users;
    }
    fetchUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(userURL);
            const data = yield response.json();
            this.users = data;
            return data;
        });
    }
    authenticate(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.fetchUsers();
            console.log(users);
            const user = users.find((auth) => auth.username === username && auth.password === password);
            console.log(user);
            // if(user){
            //    localStorage.setItem("currentUserId", user.id?);
            // }
            //     if (user?.role === "Admin") {
            //       window.location.href = "../AdminDashboard.html";
            //     } else {
            //       window.location.href = "../index.html";
            //     }
            //     if (!user) {
            //       console.log("user not found");
            //     }
            //     return user !== undefined;
            //   }
            if (user && user.id) {
                try {
                    if (typeof Storage !== "undefined") {
                        console.log("Local Storage is supported by this browser.");
                        console.log("Current User ID:", user.id);
                        localStorage.setItem("currentUserId", user.id);
                        console.log("Stored User ID:", localStorage.getItem("currentUserId"));
                        if (user.role === "Admin") {
                            window.location.href = "../AdminDashboard.html";
                        }
                        else {
                            window.location.href = "../index.html";
                        }
                        return true;
                    }
                    else {
                        console.error("Local Storage is not supported by this browser.");
                        return false;
                    }
                }
                catch (error) {
                    console.error("Error storing user ID in local storage:", error);
                    return false;
                }
            }
            else {
                console.log("User not found or ID is undefined");
                return false;
            }
        });
    }
}
const Login = new LogUser([]);
const loginform = document.getElementById("login");
loginform.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const userName = document.getElementById("login-username").value;
    const userPassword = document.getElementById("login-password").value;
    if (yield Login.authenticate(userName, userPassword)) {
        // console.log("login successfull");
        // window.location.href = "";
    }
    else {
        console.log("invalid username or password");
    }
}));
