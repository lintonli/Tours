import { Iuser } from "../src/authInterface";
const userURL = "http://localhost:3000/users";
class LogUser {
  private users: Iuser[];

  constructor(users: Iuser[]) {
    this.users = users;
  }
  async fetchUsers(): Promise<Iuser[]> {
    const response = await fetch(userURL);
    const data = await response.json();
    this.users = data;
    return data;
  }
  async authenticate(username: string, password: string): Promise<boolean> {
    const users = await this.fetchUsers();
    console.log(users);

    const user = users.find(
      (auth) => auth.username === username && auth.password === password
    );
    console.log(user);
    // if(user){
    //    localStorage.setItem("currentUserId", user.id?);
    // }
    //     if (user?.role === "Admin") {
    //       window.location.href = "../AdminDashboard.html";
    //     } else {
    //       window.location.href = "../index.html";
    //     }
    //     if (!user) {
    //       console.log("user not found");
    //     }
    //     return user !== undefined;
    //   }
    if (user && user.id) {
      try {
        if (typeof Storage !== "undefined") {
          console.log("Local Storage is supported by this browser.");
          console.log("Current User ID:", user.id);
          localStorage.setItem("currentUserId", user.id);
          console.log("Stored User ID:", localStorage.getItem("currentUserId"));

          if (user.role === "Admin") {
            window.location.href = "../AdminDashboard.html";
          } else {
            window.location.href = "../index.html";
          }
          return true;
        } else {
          console.error("Local Storage is not supported by this browser.");
          return false;
        }
      } catch (error) {
        console.error("Error storing user ID in local storage:", error);
        return false;
      }
    } else {
      console.log("User not found or ID is undefined");
      return false;
    }
  }
}
const Login = new LogUser([]);

const loginform = document.getElementById("login") as HTMLFormElement;
loginform.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userName = (
    document.getElementById("login-username") as HTMLInputElement
  ).value;
  const userPassword = (
    document.getElementById("login-password") as HTMLInputElement
  ).value;

  if (await Login.authenticate(userName, userPassword)) {
    // console.log("login successfull");
    // window.location.href = "";
  } else {
    console.log("invalid username or password");
  }
});
