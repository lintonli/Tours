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
const toursURL = "http://localhost:3000/tours";
const bookingsURL = "http://localhost:3000/bookings";
const usersURL = "http://localhost:3000/users";
class Tours {
    constructor(tours, tourElement) {
        this.currentUser = null;
        this.tourElement = tourElement;
        this.tours = tours;
    }
    fetchUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${usersURL}/${userId}`);
            if (response.ok) {
                return yield response.json();
            }
            else {
                return null;
            }
        });
    }
    getCurrentUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const userid = localStorage.getItem("currentUserId");
            if (userid) {
                this.currentUser = yield this.fetchUser(userid);
            }
            else {
                console.log(`no user is logged in`);
            }
        });
    }
    fetchTours() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(toursURL);
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
    displayTours() {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log("fetching");
            yield this.getCurrentUser();
            const tours = yield this.fetchTours();
            // console.log(tours);
            this.tourElement.innerHTML = "";
            tours.forEach((tour) => {
                var _a;
                const row = document.createElement("div");
                row.className = "accomm";
                row.innerHTML = `
        <h1>${tour.tourname}</h1>
        <img src="${tour.tourimage}" alt ="">
        <h5>${tour.destination}<h5>
        <h8>${tour.description}</h8>
        <p>Price: <strong>${tour.price}</strong></p>

 <label for="bookingDate-${tour.id}">Choose a booking date:</label>
        <input type="date" id="bookingDate-${tour.id}" class="bookingDate" required>

        <button class="bkbtn">BOOK NOW</button>
        `;
                this.tourElement.appendChild(row);
                (_a = row.querySelector(".bkbtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
                    const bookingDateInput = document.getElementById(`bookingDate-${tour.id}`);
                    const bookingDate = bookingDateInput.value;
                    if (!bookingDate) {
                        alert("Please select a booking date.");
                        return;
                    }
                    if (this.currentUser) {
                        yield this.bookTour(this.currentUser.id, this.currentUser.username, tour.id, tour.tourname, bookingDate);
                    }
                    else {
                        alert("user not logged in");
                    }
                }));
            });
        });
    }
    bookTour(userId, username, tourId, tourname, bookingDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBooking = {
                userId,
                username,
                tourId,
                tourname,
                date: bookingDate,
            };
            const response = yield fetch(bookingsURL, {
                method: "POST",
                body: JSON.stringify(newBooking),
            });
            if (response.ok) {
                alert(`Successfully booked tour: ${tourname}`);
            }
            else {
                console.log("error when booking");
            }
        });
    }
}
const tourcontents = document.getElementById("tourcontent");
const displays = new Tours([], tourcontents);
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("kkkk");
    yield displays.displayTours();
}));
