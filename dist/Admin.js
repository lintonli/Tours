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
const userURL = "http://localhost:3000/users";
const homediv = document.querySelector(".home");
const tourdiv = document.querySelector(".Tours");
const userdiv = document.querySelector(".Users");
const bookdiv = document.querySelector(".Book");
const hoteldiv = document.querySelector(".Hotel");
const homebtn = document.getElementById("home");
const userbtn = document.getElementById("users");
const tourbtn = document.getElementById("tours");
const hotelbtn = document.getElementById("hotel");
const bookbtn = document.getElementById("book");
class Admin {
    eventListeners() {
        homebtn.addEventListener("click", () => this.showHome());
        userbtn.addEventListener("click", () => this.showUser());
        tourbtn.addEventListener("click", () => this.showTour());
        hotelbtn.addEventListener("click", () => this.showHotel());
        bookbtn.addEventListener("click", () => this.showBooking());
    }
    showHome() {
        homediv.style.display = "block";
        tourdiv.style.display = "none";
        hoteldiv.style.display = "none";
        bookdiv.style.display = "none";
        userdiv.style.display = "none";
    }
    showTour() {
        tourdiv.style.display = "block";
        hoteldiv.style.display = "none";
        bookdiv.style.display = "none";
        userdiv.style.display = "none";
        homediv.style.display = "none";
    }
    showHotel() {
        hoteldiv.style.display = "block";
        bookdiv.style.display = "none";
        userdiv.style.display = "none";
        homediv.style.display = "none";
        tourdiv.style.display = "none";
    }
    showUser() {
        // console.log("hhhhh");
        userdiv.style.display = "block";
        hoteldiv.style.display = "none";
        bookdiv.style.display = "none";
        homediv.style.display = "none";
        tourdiv.style.display = "none";
        userdisplay.displayUsers();
    }
    showBooking() {
        bookdiv.style.display = "block";
        userdiv.style.display = "none";
        homediv.style.display = "none";
        tourdiv.style.display = "none";
        hoteldiv.style.display = "none";
    }
}
let adminListeners = new Admin();
adminListeners.eventListeners();
class Users {
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
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.users.length === 0) {
                yield this.fetchUsers();
            }
            return this.users;
        });
    }
    displayUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.fetchUsers();
            console.log(users);
            const userTableBody = document.getElementById("userinfo");
            userTableBody.innerHTML = "";
            users.forEach((user) => {
                var _a;
                const row = document.createElement("tr");
                row.innerHTML = `
       
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td><i class=" delete-icon" data-id="${user.id}"><ion-icon name="trash-outline"></ion-icon></td>
        
        `;
                userTableBody.appendChild(row);
                (_a = row.querySelector(".delete-icon")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (event) => {
                    this.deleteUser(user.id);
                });
            });
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId)
                return;
            try {
                const response = yield fetch(`${userURL}/${userId}`, {
                    method: "DELETE",
                });
                if (response.ok) {
                    this.displayUsers();
                }
                else {
                    console.error("Error deleting user");
                }
            }
            catch (error) {
                console.error("Error deleting user:", error);
            }
        });
    }
}
const userdisplay = new Users([]);
