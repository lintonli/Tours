const hotelsURL = "http://localhost:3000/hotels";
const bookingsURLs = "http://localhost:3000/bookings";
const userURLS = "http://localhost:3000/users";

interface IHotel {
  id?: string;
  hotelname: string;
  hotelimage: string;
  location: string;
  rating: number;
}
interface IUser {
  id: string;
  username: string;
}
interface IBooking {
  id?: string;
  userId: string;
  username: string;
  tourId?: string;
  tourname?: string;
  hotelId?: string;
  hotelname?: string;
  date: string;
}

class Hotels {
  private hotels: IHotel[];
  private hotelElement: HTMLElement;
  private currentUser: IUser | null = null;

  constructor(hotels: IHotel[], hotelElement: HTMLElement) {
    this.hotelElement = hotelElement;
    this.hotels = hotels;
  }

  async fetchUser(userId: string): Promise<IUser | null> {
    const response = await fetch(`${userURLS}/${userId}`);
    if (response.ok) {
      return await response.json();
    } else {
      return null;
    }
  }

  async getCurrentUser(): Promise<void> {
    const userid = localStorage.getItem("currentUserId");
    if (userid) {
      this.currentUser = await this.fetchUser(userid);
    } else {
      console.log(`no user is logged in`);
    }
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
    await this.getCurrentUser();
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

<label for="bookingDate">Choose a booking date:</label>
        <input type="date" id="bookingDate-${hotel.id}" class="bookingDate" required>

        <button class="bkbtn">BOOK NOW</button>
        `;
      this.hotelElement.appendChild(row);
      row.querySelector(".bkbtn")?.addEventListener("click", async () => {
        const bookingDateInput = document.getElementById(
          `bookingDate-${hotel.id}`
        ) as HTMLInputElement;
        const bookingDate = bookingDateInput.value;
        if (!bookingDate) {
          alert("Please select a booking date.");
          return;
        }
        if (this.currentUser) {
          await this.bookHotel(
            this.currentUser.id,
            this.currentUser.username,
            hotel.id!,
            hotel.hotelname,
            bookingDate
          );
        } else {
          alert("user not logged in");
        }
      });
    });
  }
  async bookHotel(
    userId: string,
    username: string,
    hotelId: string,
    hotelname: string,
    bookingDate: string
  ): Promise<void> {
    const newBooking: IBooking = {
      userId,
      username,
      hotelId,
      hotelname,
      date: bookingDate,
    };
    const response = await fetch(bookingsURLs, {
      method: "POST",
      body: JSON.stringify(newBooking),
    });
    if (response.ok) {
      alert(`Successfully booked tour: ${hotelname}`);
    } else {
      console.log("error when booking");
    }
  }
}
const hotelcontent = document.getElementById("hotelcontent")! as HTMLDivElement;
const display = new Hotels([], hotelcontent);
document.addEventListener("DOMContentLoaded", () => {
  display.displayHotels();
});
