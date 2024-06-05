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
class Tours {
    constructor(tours, tourElement) {
        this.tourElement = tourElement;
        this.tours = tours;
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
            console.log("fetching");
            const tours = yield this.fetchTours();
            console.log(tours);
            this.tourElement.innerHTML = "";
            tours.forEach((tour) => {
                const row = document.createElement("div");
                row.className = "accomm";
                row.innerHTML = `
        <h1>${tour.tourname}</h1>
        <img src="${tour.tourimage}" alt ="">
        <h5>${tour.destination}<h5>
        <h8>${tour.description}</h8>
        <p>Price: <strong>${tour.price}</strong></p>
        <button class="bkbtn">BOOK NOW</button>
        `;
                this.tourElement.appendChild(row);
            });
        });
    }
}
const tourcontents = document.getElementById("tourcontent");
const displays = new Tours([], tourcontents);
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("kkkk");
    yield displays.displayTours();
}));
