const userURL = "http://localhost:3000/users";
interface ITour {
  id?: string;
  tourname: string;
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
  location: string;
  rating: number;
}

const homediv = document.querySelector(".home")! as HTMLDivElement;
const tourdiv = document.querySelector(".Tours")! as HTMLDivElement;
const userdiv = document.querySelector(".Users")! as HTMLDivElement;
const bookdiv = document.querySelector(".Book")! as HTMLDivElement;
const hoteldiv = document.querySelector(".Hotel")! as HTMLDivElement;

const homebtn = document.getElementById("home")! as HTMLButtonElement;
const userbtn = document.getElementById("users")! as HTMLButtonElement;
const tourbtn = document.getElementById("tours")! as HTMLButtonElement;
const hotelbtn = document.getElementById("hotel")! as HTMLButtonElement;
const bookbtn = document.getElementById("book")! as HTMLButtonElement;
class Admin {
  eventListeners() {
    homebtn.addEventListener("click", () => this.showHome());
    userbtn.addEventListener("click", () => this.showUser());
    tourbtn.addEventListener("click", () => this.showTour());
    hotelbtn.addEventListener("click", () => this.showHotel());
    bookbtn.addEventListener("click", () => this.showBooking());
  }

  showHome() {
    homediv.style.display = "block";
    tourdiv.style.display = "none";
    hoteldiv.style.display = "none";
    bookdiv.style.display = "none";
    userdiv.style.display = "none";
  }
  showTour() {
    tourdiv.style.display = "block";
    hoteldiv.style.display = "none";
    bookdiv.style.display = "none";
    userdiv.style.display = "none";
    homediv.style.display = "none";
  }
  showHotel() {
    hoteldiv.style.display = "block";
    bookdiv.style.display = "none";
    userdiv.style.display = "none";
    homediv.style.display = "none";
    tourdiv.style.display = "none";
  }
  showUser() {
    // console.log("hhhhh");

    userdiv.style.display = "block";
    hoteldiv.style.display = "none";
    bookdiv.style.display = "none";
    homediv.style.display = "none";
    tourdiv.style.display = "none";
    userdisplay.displayUsers();
  }
  showBooking() {
    bookdiv.style.display = "block";
    userdiv.style.display = "none";
    homediv.style.display = "none";
    tourdiv.style.display = "none";
    hoteldiv.style.display = "none";
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
      });
    });
  }
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
