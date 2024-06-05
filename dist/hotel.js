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
class Hotels {
    constructor(hotels, hotelElement) {
        this.hotelElement = hotelElement;
        this.hotels = hotels;
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
            const hotels = yield this.fetchHotels();
            this.hotelElement.innerHTML = "";
            hotels.forEach((hotel) => {
                const row = document.createElement("div");
                row.className = "accomm";
                row.innerHTML = `
        <h2> ${hotel.hotelname}</h1>
        <img src="${hotel.hotelimage}" alt="">
        <h4>${hotel.location}</h4>
        <p> Rating: <strong>${hotel.rating}</strong></p>
        <button class="bkbtn">BOOK NOW</button>
        `;
                this.hotelElement.appendChild(row);
            });
        });
    }
}
const hotelcontent = document.getElementById("hotelcontent");
const display = new Hotels([], hotelcontent);
document.addEventListener("DOMContentLoaded", () => {
    display.displayHotels();
});
