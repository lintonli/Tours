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
const bookURL = "http://localhost:3000/bookings";
class Bookings {
    constructor(bookings, bookingElement) {
        this.bookingElement = bookingElement;
        this.bookings = bookings;
    }
    fetchBookings() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(bookURL);
            const data = yield response.json();
            this.bookings = data;
            return data;
        });
    }
    getBookings() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.bookings.length === 0) {
                yield this.fetchBookings();
            }
            return this.bookings;
        });
    }
    displayBookings() {
        return __awaiter(this, void 0, void 0, function* () {
            const booking = yield this.fetchBookings();
            console.log(booking);
            this.bookingElement.innerHTML = "";
            booking.forEach((book) => {
                var _a;
                const row = document.createElement("div");
                row.className = "booking";
                row.innerHTML = `
        <h4> Booking ID: ${book.id}</h4>
        <p>User:${book.username}</p>
         ${book.tourname ? `<p>Tour: ${book.tourname}</p>` : ""}
        ${book.hotelname ? `<p>Hotel: ${book.hotelname}</p>` : ""}
        <p>Date: ${book.date}</p>
        <button class="delete-booking" data-id="${book.id}">Delete</button>
        `;
                this.bookingElement.appendChild(row);
                (_a = row
                    .querySelector(".delete-booking")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
                    yield this.deleteBooking(book.id);
                    this.displayBookings();
                }));
            });
        });
    }
    deleteBooking(bookingId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!bookingId)
                return;
            try {
                const response = yield fetch(`${bookURL}/${bookingId}`, {
                    method: "DELETE",
                });
                if (response.ok) {
                    this.displayBookings();
                }
                else {
                    console.error("Error deleting booking");
                }
            }
            catch (error) {
                console.error("Error deleting booking:", error);
            }
        });
    }
}
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    const bookingContent = document.getElementById("bookingContent");
    if (bookingContent) {
        const bookingDisplay = new Bookings([], bookingContent);
        yield bookingDisplay.displayBookings();
    }
    else {
        console.error('Element with ID "bookingContent" not found');
    }
}));
// const bookingContent = document.getElementById(
//   "bookingContent"
// )! as HTMLDivElement;
// const bookingdisplay = new Bookings([], bookingContent);
// document.addEventListener("DOMContentLoaded", async () => {
//   await bookingdisplay.displayBookings();
// });
