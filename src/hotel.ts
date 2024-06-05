const hotelsURL = "http://localhost:3000/hotels";

interface IHotel {
  id?: string;
  hotelname: string;
  hotelimage: string;
  location: string;
  rating: number;
}

class Hotels {
  private hotels: IHotel[];
  private hotelElement: HTMLElement;
  constructor(hotels: IHotel[], hotelElement: HTMLElement) {
    this.hotelElement = hotelElement;
    this.hotels = hotels;
  }

  async fetchHotels(): Promise<IHotel[]> {
    const response = await fetch(hotelsURL);
    const data = await response.json();
    this.hotels = data;
    return data;
  }
  async getHotels(): Promise<IHotel[]> {
    if (this.hotels.length === 0) {
      await this.fetchHotels();
    }
    return this.hotels;
  }

  async displayHotels(): Promise<void> {
    const hotels = await this.fetchHotels();

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
  }
}
const hotelcontent = document.getElementById("hotelcontent")! as HTMLDivElement;
const display = new Hotels([], hotelcontent);
document.addEventListener("DOMContentLoaded", () => {
  display.displayHotels();
});
