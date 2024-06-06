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
const bookURLs = "http://localhost:3000/bookings";
const homediv = document.querySelector(".homec");
const tourdiv = document.querySelector(".Tours");
const userdiv = document.querySelector(".Users");
const bookdiv = document.querySelector(".Book");
const addhoteldiv = document.querySelector(".add-hotel-form");
const addtourdiv = document.querySelector(".add-tour-form");
const hoteldiv = document.querySelector(".Hotel");
const homebtn = document.getElementById("home");
const userbtn = document.getElementById("users");
const tourbtn = document.getElementById("tours");
const hotelbtn = document.getElementById("hotel");
const addhotelbtn = document.getElementById("addHotel");
const addtourbtn = document.getElementById("addTour");
const bookbtn = document.getElementById("book");
class Admin {
    eventListeners() {
        homebtn.addEventListener("click", () => this.showHome());
        userbtn.addEventListener("click", () => this.showUser());
        tourbtn.addEventListener("click", () => this.showTour());
        addhotelbtn.addEventListener("click", () => this.showAddHotel());
        addtourbtn.addEventListener("click", () => this.showAddTour());
        hotelbtn.addEventListener("click", () => this.showHotel());
        bookbtn.addEventListener("click", () => this.showBooking());
    }
    showAddTour() {
        addtourdiv.style.display = "block";
        addhoteldiv.style.display = "none";
        homediv.style.display = "none";
        tourdiv.style.display = "none";
        hoteldiv.style.display = "none";
        bookdiv.style.display = "none";
        userdiv.style.display = "none";
    }
    showAddHotel() {
        addhoteldiv.style.display = "block";
        homediv.style.display = "none";
        tourdiv.style.display = "none";
        hoteldiv.style.display = "none";
        bookdiv.style.display = "none";
        userdiv.style.display = "none";
        addtourdiv.style.display = "none";
    }
    showHome() {
        homediv.style.display = "block";
        tourdiv.style.display = "none";
        hoteldiv.style.display = "none";
        bookdiv.style.display = "none";
        userdiv.style.display = "none";
        addhoteldiv.style.display = "none";
        addtourdiv.style.display = "none";
    }
    showTour() {
        tourdiv.style.display = "block";
        hoteldiv.style.display = "none";
        bookdiv.style.display = "none";
        userdiv.style.display = "none";
        homediv.style.display = "none";
        addhoteldiv.style.display = "none";
        addtourdiv.style.display = "none";
        toursdisplay.displayTours();
    }
    showHotel() {
        // console.log("hhh");
        hoteldiv.style.display = "block";
        bookdiv.style.display = "none";
        userdiv.style.display = "none";
        homediv.style.display = "none";
        tourdiv.style.display = "none";
        addhoteldiv.style.display = "none";
        addtourdiv.style.display = "none";
        hotelDisplay.displayHotels();
    }
    showUser() {
        // console.log("hhhhh");
        userdiv.style.display = "block";
        hoteldiv.style.display = "none";
        bookdiv.style.display = "none";
        homediv.style.display = "none";
        tourdiv.style.display = "none";
        addhoteldiv.style.display = "none";
        addtourdiv.style.display = "none";
        userdisplay.displayUsers();
    }
    showBooking() {
        bookdiv.style.display = "block";
        userdiv.style.display = "none";
        homediv.style.display = "none";
        tourdiv.style.display = "none";
        hoteldiv.style.display = "none";
        addhoteldiv.style.display = "none";
        addtourdiv.style.display = "none";
        bookdisplay.displayBookings();
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
                    // row.querySelector(".update-icon")?.addEventListener("click", () => {
                    //   this.updateUser(
                    //     user.id!,
                    //     user.email,
                    //     user.password,
                    //     user.username,
                    //     user.role
                    //   );
                    // });
                });
            });
        });
    }
    // async updateUser(
    //   id: string,
    //   username: string,
    //   email: string,
    //   password: string,
    //   role: string
    // ) {
    //   let updatedUser = {
    //     id,
    //     username,
    //     email,
    //     password,
    //     role,
    //   };
    //   await fetch(`${userURL}/${id}`, {
    //     method: "PUT",
    //     body: JSON.stringify(updatedUser),
    //   });
    //   this.displayUsers();
    // }
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
// hotels logic
const hotelURL = "http://localhost:3000/hotels";
class HotelLaCost {
    constructor(hotels, hotelElement) {
        this.hotels = hotels;
        this.hotelElement = hotelElement;
    }
    addHotels(hotelname, hotelimage, location, rating) {
        return __awaiter(this, void 0, void 0, function* () {
            const newHotel = {
                //  id?:this.hotels.length + 1,
                hotelname,
                hotelimage,
                location,
                rating,
            };
            // if (hotelbutton?.textContent === "Add Hotel") {
            yield fetch(hotelURL, {
                method: "POST",
                body: JSON.stringify(newHotel),
            });
            // console.log("hhh");
            console.log(`Added: ${hotelname}`);
            this.displayHotels();
            // }
        });
    }
    fetchHotels() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(hotelURL);
            const data = yield response.json();
            this.hotels = data;
            return data;
            // console.log(data);
        });
    }
    getHotels() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.hotels.length === 0) {
                yield this.fetchHotels();
            }
            return this.hotels;
        });
    }
    displayHotels() {
        return __awaiter(this, void 0, void 0, function* () {
            const myhotels = yield this.fetchHotels();
            console.log(myhotels);
            //const hotelTableBody = document.getElementById("hotelinfo") as HTMLElement;
            this.hotelElement.innerHTML = "";
            myhotels.forEach((hotel) => {
                var _a;
                const row = document.createElement("tr");
                row.innerHTML = `
      <td>${hotel.id}</td>
    <td>${hotel.hotelname}</td>
    <td><img src="${hotel.hotelimage}" alt =""></td>
    <td>${hotel.location}</td>
    <td>${hotel.rating}</td>
    <td><i class=" delete-icon" data-id="${hotel.id}"><ion-icon name="trash-outline"></ion-icon></td>
      `;
                this.hotelElement.appendChild(row);
                (_a = row.querySelector(".delete-icon")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (event) => {
                    this.deleteHotel(hotel.id);
                });
            });
        });
    }
    deleteHotel(hotelId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!hotelId)
                return;
            try {
                const response = yield fetch(`${hotelURL}/${hotelId}`, {
                    method: "DELETE",
                });
                if (response.ok) {
                    this.displayHotels();
                }
                else {
                    console.error("Error deleting hotel");
                }
            }
            catch (error) {
                console.error("Error deleting hotel:", error);
            }
        });
    }
}
const content = document.getElementById("hotelinfo");
const hotelDisplay = new HotelLaCost([], content);
const addHotelForm = document.getElementById("addHotelForm");
const hotelForm = document.getElementById("hotelForm");
const hotelbutton = document.getElementById("addhotelbtn");
if (hotelForm) {
    hotelForm.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const hotelName = document.getElementById("hotelName").value;
        const hotelImage = document.getElementById("hotelImage").value;
        const location = document.getElementById("location")
            .value;
        const rating = parseInt(document.getElementById("rating").value);
        yield hotelDisplay.addHotels(hotelName, hotelImage, location, rating);
        hotelForm.reset();
        hotelDisplay.displayHotels();
    }));
}
else {
    console.log("no hotels to display");
}
const tourURL = "http://localhost:3000/tours";
class TourLaCost {
    constructor(tours, tourElement) {
        this.tours = tours;
        this.tourElement = tourElement;
    }
    fetchTours() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(tourURL);
            const data = yield response.json();
            this.tours = data;
            return data;
        });
    }
    getTours() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.tours.length === 0) {
                yield this.fetchTours();
            }
            return this.tours;
        });
    }
    addTour(tourname, tourimage, description, destination, price) {
        return __awaiter(this, void 0, void 0, function* () {
            const newTour = {
                tourname,
                tourimage,
                destination,
                description,
                price,
            };
            // if (tourbutton.textContent === "Add Tour") {
            // console.log("hhhhh")
            yield fetch(tourURL, {
                method: "POST",
                body: JSON.stringify(newTour),
            });
            console.log(newTour);
            console.log(`Added Tour: ${tourname}`);
            // } else {
            //   console.log(tourbutton.textContent);
            // }
        });
    }
    displayTours() {
        return __awaiter(this, void 0, void 0, function* () {
            const mytours = yield this.fetchTours();
            this.tourElement.innerHTML = "";
            mytours.forEach((tour) => {
                var _a;
                const row = document.createElement("tr");
                row.innerHTML = `
      <td>${tour.id}</td>
    <td>${tour.tourname}</td>
    <td><img src="${tour.tourimage}" alt =""></td>
    <td>${tour.destination}</td>
    <td>${tour.description}</td>
    <td> ksh${tour.price}</td>
    <td><i class=" delete-icon" data-id="${tour.id}"><ion-icon name="trash-outline"></ion-icon></td>
      `;
                this.tourElement.appendChild(row);
                (_a = row.querySelector(".delete-icon")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (event) => {
                    this.deleteTour(tour.id);
                });
            });
        });
    }
    deleteTour(tourId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!tourId)
                return;
            try {
                const response = yield fetch(`${tourURL}/${tourId}`, {
                    method: "DELETE",
                });
                if (response.ok) {
                    this.displayTours();
                }
                else {
                    console.error("Error deleting tour");
                }
            }
            catch (error) {
                console.error("Error deleting tour:", error);
            }
        });
    }
}
const tourcontent = document.getElementById("tourinfo");
const toursdisplay = new TourLaCost([], tourcontent);
const addtourform = document.getElementById("addTourForm");
const tourForm = document.getElementById("TourForm");
const tourbutton = document.getElementById("addtourbtn");
if (tourForm) {
    tourForm.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const tourName = document.getElementById("tourName")
            .value;
        const tourImage = document.getElementById("tourImage").value;
        const tourDestination = document.getElementById("destination").value;
        const tourDescription = document.getElementById("description").value;
        const tourPrice = parseInt(document.getElementById("tourPrice").value);
        console.log(tourName);
        yield toursdisplay.addTour(tourName, tourImage, tourDestination, tourDescription, tourPrice);
        // tourForm.reset();
        toursdisplay.displayTours();
    }));
}
else {
    console.log("no tours to display");
}
class Book {
    // private bookElement: HTMLElement;
    constructor(books) {
        // this.bookElement = bookElement;
        this.books = books;
    }
    fetchBooking() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(bookURLs);
            const data = yield response.json();
            this.books = data;
            return data;
        });
    }
    getBookings() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.books.length === 0) {
                yield this.fetchBooking();
            }
            return this.books;
        });
    }
    displayBookings() {
        return __awaiter(this, void 0, void 0, function* () {
            const books = yield this.fetchBooking();
            const userTableBody = document.getElementById("bookinfo");
            userTableBody.innerHTML = "";
            books.forEach((book) => {
                var _a;
                const row = document.createElement("tr");
                row.innerHTML = `
       
            <td>${book.id}</td>
            <td>${book.username}</td>
            <td>${book.tourname || ""}</td>
            <td>${book.hotelname || ""}</td>
            <td>${book.date}</td>
            <td><i class=" delete-icon" data-id="${book.id}"><ion-icon name="trash-outline"></ion-icon></td>
        
        `;
                userTableBody.appendChild(row);
                (_a = row.querySelector(".delete-icon")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (event) => {
                    this.deletebook(book.id);
                });
            });
        });
    }
    deletebook(bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!bookId)
                return;
            try {
                const response = yield fetch(`${bookURLs}/${bookId}`, {
                    method: "DELETE",
                });
                if (response.ok) {
                    this.displayBookings();
                }
                else {
                    console.error("Error deleting tour");
                }
            }
            catch (error) {
                console.error("Error deleting tour:", error);
            }
        });
    }
}
// const bookcontent = document.getElementById("bookinfo")! as HTMLDivElement;
// const bookdisplay = new Book([]);
// document.addEventListener("DOMContentLoaded", async () => {
const bookdisplay = new Book([]);
bookdisplay.displayBookings();
// });
