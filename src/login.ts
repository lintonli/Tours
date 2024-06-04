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
    return data;
  }
  async authenticate(username: string, password: string): Promise<boolean> {
    const users = await this.fetchUsers();
    const user = users.find(
      (auth) => auth.username === username && auth.password === password
    );
    if (user?.role === "Admin") {
      window.location.href = "../signup.html";
    } else {
      //   window.location.href = ".../index.html";
    }
    if (!user) {
      console.log("user not found");
    }
    return user !== undefined;
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
    alert(`welcome ${userName}`);
    // window.location.href = "../index.html";
  } else {
    console.log("invalid username or password");
  }
});