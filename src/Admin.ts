const userURL = "http://localhost:3000/users";
const bookURLs = "http://localhost:3000/bookings";
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
interface ITour {
  id?: string;
  tourname: string;
  tourimage: string;
  destination: string;
  description: string;
  price: number;
}
interface Iuser {
  id?: string;
  username: string;
  email: string;
  password: string;
  role: string;
}

interface IHotel {
  id?: string;
  hotelname: string;
  hotelimage: string;
  location: string;
  rating: number;
}

const homediv = document.querySelector(".homec")! as HTMLDivElement;
const tourdiv = document.querySelector(".Tours")! as HTMLDivElement;
const userdiv = document.querySelector(".Users")! as HTMLDivElement;
const bookdiv = document.querySelector(".Book")! as HTMLDivElement;
const addhoteldiv = document.querySelector(
  ".add-hotel-form"
)! as HTMLDivElement;
const addtourdiv = document.querySelector(".add-tour-form")! as HTMLDivElement;
const hoteldiv = document.querySelector(".Hotel")! as HTMLDivElement;

const homebtn = document.getElementById("home")! as HTMLButtonElement;
const userbtn = document.getElementById("users")! as HTMLButtonElement;
const tourbtn = document.getElementById("tours")! as HTMLButtonElement;
const hotelbtn = document.getElementById("hotel")! as HTMLButtonElement;
const addhotelbtn = document.getElementById("addHotel")! as HTMLButtonElement;
const addtourbtn = document.getElementById("addTour")! as HTMLButtonElement;
const bookbtn = document.getElementById("book")! as HTMLButtonElement;
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
  private users: Iuser[];

  constructor(users: Iuser[]) {
    this.users = users;
  }

  async fetchUsers(): Promise<Iuser[]> {
    const response = await fetch(userURL);
    const data = await response.json();
    return data;
  }
  async getUsers(): Promise<Iuser[]> {
    if (this.users.length === 0) {
      await this.fetchUsers();
    }
    return this.users;
  }
  async displayUsers(): Promise<void> {
    const users = await this.fetchUsers();
    console.log(users);

    const userTableBody = document.getElementById("userinfo") as HTMLElement;
    userTableBody.innerHTML = "";
    users.forEach((user) => {
      const row = document.createElement("tr");
      row.innerHTML = `
       
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td><i class=" delete-icon" data-id="${user.id}"><ion-icon name="trash-outline"></ion-icon></td>
           
        
        `;
      userTableBody.appendChild(row);
      row.querySelector(".delete-icon")?.addEventListener("click", (event) => {
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
  async deleteUser(userId: string | undefined): Promise<void> {
    if (!userId) return;
    try {
      const response = await fetch(`${userURL}/${userId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        this.displayUsers();
      } else {
        console.error("Error deleting user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }
}

const userdisplay = new Users([]);

// hotels logic

const hotelURL = "http://localhost:3000/hotels";
class HotelLaCost {
  private hotels: IHotel[];
  private hotelElement: HTMLElement;
  constructor(hotels: IHotel[], hotelElement: HTMLElement) {
    this.hotels = hotels;
    this.hotelElement = hotelElement;
  }
  async addHotels(
    hotelname: string,
    hotelimage: string,
    location: string,
    rating: number
  ): Promise<void> {
    const newHotel: IHotel = {
      //  id?:this.hotels.length + 1,
      hotelname,
      hotelimage,
      location,
      rating,
    };
    // if (hotelbutton?.textContent === "Add Hotel") {
    await fetch(hotelURL, {
      method: "POST",
      body: JSON.stringify(newHotel),
    });
    // console.log("hhh");

    console.log(`Added: ${hotelname}`);
    this.displayHotels();
    // }
  }
  async fetchHotels(): Promise<IHotel[]> {
    const response = await fetch(hotelURL);
    const data = await response.json();
    this.hotels = data;
    return data;
    // console.log(data);
  }
  async getHotels(): Promise<IHotel[]> {
    if (this.hotels.length === 0) {
      await this.fetchHotels();
    }
    return this.hotels;
  }

  async displayHotels(): Promise<void> {
    const myhotels = await this.fetchHotels();
    console.log(myhotels);
    //const hotelTableBody = document.getElementById("hotelinfo") as HTMLElement;
    this.hotelElement.innerHTML = "";
    myhotels.forEach((hotel) => {
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
      row.querySelector(".delete-icon")?.addEventListener("click", (event) => {
        this.deleteHotel(hotel.id);
      });
    });
  }
  async deleteHotel(hotelId: string | undefined): Promise<void> {
    if (!hotelId) return;
    try {
      const response = await fetch(`${hotelURL}/${hotelId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        this.displayHotels();
      } else {
        console.error("Error deleting hotel");
      }
    } catch (error) {
      console.error("Error deleting hotel:", error);
    }
  }
}
const content = document.getElementById("hotelinfo") as HTMLDivElement;
const hotelDisplay = new HotelLaCost([], content);

const addHotelForm = document.getElementById("addHotelForm")! as HTMLDivElement;
const hotelForm = document.getElementById("hotelForm")! as HTMLFormElement;
const hotelbutton = document.getElementById(
  "addhotelbtn"
)! as HTMLButtonElement;
if (hotelForm) {
  hotelForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const hotelName = (
      document.getElementById("hotelName")! as HTMLInputElement
    ).value;
    const hotelImage = (
      document.getElementById("hotelImage")! as HTMLInputElement
    ).value;
    const location = (document.getElementById("location")! as HTMLInputElement)
      .value;
    const rating = parseInt(
      (document.getElementById("rating")! as HTMLInputElement).value
    );

    await hotelDisplay.addHotels(hotelName, hotelImage, location, rating);
    hotelForm.reset();
    hotelDisplay.displayHotels();
  });
} else {
  console.log("no hotels to display");
}

const tourURL = "http://localhost:3000/tours";
class TourLaCost {
  private tours: ITour[];
  private tourElement: HTMLElement;

  constructor(tours: ITour[], tourElement: HTMLElement) {
    this.tours = tours;
    this.tourElement = tourElement;
  }
  async fetchTours(): Promise<ITour[]> {
    const response = await fetch(tourURL);
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
  async addTour(
    tourname: string,
    tourimage: string,
    description: string,
    destination: string,
    price: number
  ): Promise<void> {
    const newTour: ITour = {
      tourname,
      tourimage,
      destination,
      description,
      price,
    };

    // if (tourbutton.textContent === "Add Tour") {
    // console.log("hhhhh")
    await fetch(tourURL, {
      method: "POST",
      body: JSON.stringify(newTour),
    });
    console.log(newTour);
    console.log(`Added Tour: ${tourname}`);
    // } else {
    //   console.log(tourbutton.textContent);
    // }
  }

  async displayTours(): Promise<void> {
    const mytours = await this.fetchTours();
    this.tourElement.innerHTML = "";
    mytours.forEach((tour) => {
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
      row.querySelector(".delete-icon")?.addEventListener("click", (event) => {
        this.deleteTour(tour.id);
      });
    });
  }
  async deleteTour(tourId: string | undefined): Promise<void> {
    if (!tourId) return;
    try {
      const response = await fetch(`${tourURL}/${tourId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        this.displayTours();
      } else {
        console.error("Error deleting tour");
      }
    } catch (error) {
      console.error("Error deleting tour:", error);
    }
  }
}
const tourcontent = document.getElementById("tourinfo")! as HTMLDivElement;
const toursdisplay = new TourLaCost([], tourcontent);
const addtourform = document.getElementById("addTourForm")! as HTMLDivElement;
const tourForm = document.getElementById("TourForm")! as HTMLFormElement;
const tourbutton = document.getElementById("addtourbtn")! as HTMLButtonElement;
if (tourForm) {
  tourForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const tourName = (document.getElementById("tourName")! as HTMLInputElement)
      .value;
    const tourImage = (
      document.getElementById("tourImage")! as HTMLInputElement
    ).value;
    const tourDestination = (
      document.getElementById("destination")! as HTMLInputElement
    ).value;
    const tourDescription = (
      document.getElementById("description")! as HTMLInputElement
    ).value;
    const tourPrice = parseInt(
      (document.getElementById("tourPrice")! as HTMLInputElement).value
    );
    console.log(tourName);

    await toursdisplay.addTour(
      tourName,
      tourImage,
      tourDestination,
      tourDescription,
      tourPrice
    );
    // tourForm.reset();
    toursdisplay.displayTours();
  });
} else {
  console.log("no tours to display");
}
class Book {
  private books: IBooking[];
  // private bookElement: HTMLElement;

  constructor(books: IBooking[]) {
    // this.bookElement = bookElement;
    this.books = books;
  }

  async fetchBooking(): Promise<IBooking[]> {
    const response = await fetch(bookURLs);
    const data = await response.json();
    this.books = data;
    return data;
  }
  async getBookings(): Promise<IBooking[]> {
    if (this.books.length === 0) {
      await this.fetchBooking();
    }
    return this.books;
  }

  async displayBookings(): Promise<void> {
    const books = await this.fetchBooking();
    const userTableBody = document.getElementById("bookinfo") as HTMLElement;
    userTableBody.innerHTML = "";
    books.forEach((book) => {
      const row = document.createElement("tr");
      row.innerHTML = `
       
            <td>${book.id}</td>
            <td>${book.username}</td>
            <td>${book.tourname || ""}</td>
            <td>${book.hotelname || ""}</td>
            <td>${book.date}</td>
            <td><i class=" delete-icon" data-id="${
              book.id
            }"><ion-icon name="trash-outline"></ion-icon></td>
        
        `;
      userTableBody.appendChild(row);
      row.querySelector(".delete-icon")?.addEventListener("click", (event) => {
        this.deletebook(book.id);
      });
    });
  }
  async deletebook(bookId: string | undefined): Promise<void> {
    if (!bookId) return;
    try {
      const response = await fetch(`${bookURLs}/${bookId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        this.displayBookings();
      } else {
        console.error("Error deleting tour");
      }
    } catch (error) {
      console.error("Error deleting tour:", error);
    }
  }
}
// const bookcontent = document.getElementById("bookinfo")! as HTMLDivElement;
// const bookdisplay = new Book([]);
// document.addEventListener("DOMContentLoaded", async () => {
const bookdisplay = new Book([]);
bookdisplay.displayBookings();
// });
