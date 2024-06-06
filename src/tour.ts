const toursURL = "http://localhost:3000/tours";
const bookingsURL = "http://localhost:3000/bookings";
const usersURL = "http://localhost:3000/users";

interface ITour {
  id?: string;
  tourname: string;
  tourimage: string;
  destination: string;
  description: string;
  price: number;
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

class Tours {
  private tours: ITour[];
  private tourElement: HTMLElement;
  private currentUser: IUser | null = null;

  constructor(tours: ITour[], tourElement: HTMLElement) {
    this.tourElement = tourElement;
    this.tours = tours;
  }

  async fetchUser(userId: string): Promise<IUser | null> {
    const response = await fetch(`${usersURL}/${userId}`);
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
  async fetchTours(): Promise<ITour[]> {
    const response = await fetch(toursURL);
    const data = await response.json();
    this.tours = data;
    return data;
  }
  async getTours(): Promise<ITour[]> {
    if (this.tours.length === 0) {
      await this.fetchTours();
    }
    return this.tours;
  }

  async displayTours(): Promise<void> {
    // console.log("fetching");
    await this.getCurrentUser();

    const tours = await this.fetchTours();
    // console.log(tours);

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

 <label for="bookingDate-${tour.id}">Choose a booking date:</label>
        <input type="date" id="bookingDate-${tour.id}" class="bookingDate" required>

        <button class="bkbtn">BOOK NOW</button>
        `;
      this.tourElement.appendChild(row);

      row.querySelector(".bkbtn")?.addEventListener("click", async () => {
        const bookingDateInput = document.getElementById(
          `bookingDate-${tour.id}`
        ) as HTMLInputElement;
        const bookingDate = bookingDateInput.value;
        if (!bookingDate) {
          alert("Please select a booking date.");
          return;
        }
        if (this.currentUser) {
          await this.bookTour(
            this.currentUser.id,
            this.currentUser.username,
            tour.id!,
            tour.tourname,
            bookingDate
          );
        } else {
          alert("user not logged in");
        }
      });
    });
  }
  async bookTour(
    userId: string,
    username: string,
    tourId: string,
    tourname: string,
    bookingDate: string
  ): Promise<void> {
    const newBooking: IBooking = {
      userId,
      username,
      tourId,
      tourname,
      date: bookingDate,
    };
    const response = await fetch(bookingsURL, {
      method: "POST",
      body: JSON.stringify(newBooking),
    });
    if (response.ok) {
      alert(`Successfully booked tour: ${tourname}`);
    } else {
      console.log("error when booking");
    }
  }
}

const tourcontents = document.getElementById("tourcontent")! as HTMLDivElement;
const displays = new Tours([], tourcontents);
document.addEventListener("DOMContentLoaded", async () => {
  // console.log("kkkk");

  await displays.displayTours();
});
