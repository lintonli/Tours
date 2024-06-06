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
const hotelsURL = "http://localhost:3000/hotels";
const bookingsURLs = "http://localhost:3000/bookings";
const userURLS = "http://localhost:3000/users";
class Hotels {
    constructor(hotels, hotelElement) {
        this.currentUser = null;
        this.hotelElement = hotelElement;
        this.hotels = hotels;
    }
    fetchUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${userURLS}/${userId}`);
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
    fetchHotels() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(hotelsURL);
            const data = yield response.json();
            this.hotels = data;
            return data;
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
            yield this.getCurrentUser();
            const hotels = yield this.fetchHotels();
            this.hotelElement.innerHTML = "";
            hotels.forEach((hotel) => {
                var _a;
                const row = document.createElement("div");
                row.className = "accomm";
                row.innerHTML = `
        <h2> ${hotel.hotelname}</h1>
        <img src="${hotel.hotelimage}" alt="">
        <h4>${hotel.location}</h4>
        <p> Rating: <strong>${hotel.rating}</strong></p>

<label for="bookingDate">Choose a booking date:</label>
        <input type="date" id="bookingDate-${hotel.id}" class="bookingDate" required>

        <button class="bkbtn">BOOK NOW</button>
        `;
                this.hotelElement.appendChild(row);
                (_a = row.querySelector(".bkbtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
                    const bookingDateInput = document.getElementById(`bookingDate-${hotel.id}`);
                    const bookingDate = bookingDateInput.value;
                    if (!bookingDate) {
                        alert("Please select a booking date.");
                        return;
                    }
                    if (this.currentUser) {
                        yield this.bookHotel(this.currentUser.id, this.currentUser.username, hotel.id, hotel.hotelname, bookingDate);
                    }
                    else {
                        alert("user not logged in");
                    }
                }));
            });
        });
    }
    bookHotel(userId, username, hotelId, hotelname, bookingDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBooking = {
                userId,
                username,
                hotelId,
                hotelname,
                date: bookingDate,
            };
            const response = yield fetch(bookingsURLs, {
                method: "POST",
                body: JSON.stringify(newBooking),
            });
            if (response.ok) {
                alert(`Successfully booked tour: ${hotelname}`);
            }
            else {
                console.log("error when booking");
            }
        });
    }
}
const hotelcontent = document.getElementById("hotelcontent");
const display = new Hotels([], hotelcontent);
document.addEventListener("DOMContentLoaded", () => {
    display.displayHotels();
});
