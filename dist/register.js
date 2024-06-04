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
class RegisterUser {
    constructor(users) {
        this.users = users;
    }
    fetchUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(userURL);
            const data = yield response.json();
            return data;
        });
    }
    addUser(username, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.fetchUsers();
            if (this.users.find((user) => user.email === email ||
                user.password === password ||
                user.username === username)) {
                console.log("user already exist");
                return false;
            }
            const newUser = { username, email, password, role: "client" };
            const response = yield fetch(userURL, {
                method: "POST",
                body: JSON.stringify(newUser),
            });
            // console.log(newUser);
            if (response.ok) {
                console.log("User added successfully");
                window.location.href = "../login.html";
                return true;
            }
            else {
                console.log("Failed");
                return false;
            }
        });
    }
}
const signuplogic = new RegisterUser([]);
const signform = document.getElementById("signup");
signform === null || signform === void 0 ? void 0 : signform.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const userName = document.getElementById("username")
        .value;
    const userEmail = document.getElementById("email")
        .value;
    const userPassword = document.getElementById("password")
        .value;
    if (yield signuplogic.addUser(userName, userEmail, userPassword)) {
        alert(`successfully registerd`);
        window.location.href = "../login.html";
    }
    else {
        alert(`user exists`);
    }
}));
