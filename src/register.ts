import { Iuser } from "../src/authInterface";
const userURL = "http://localhost:3000/users";
class RegisterUser {
  private users: Iuser[];
  constructor(users: Iuser[]) {
    this.users = users;
  }
  async fetchUsers(): Promise<void> {
    const response = await fetch(userURL);
    const data = await response.json();
    return data;
  }
  async addUser(
    username: string,
    email: string,
    password: string
  ): Promise<boolean> {
    await this.fetchUsers();
    if (
      this.users.find(
        (user) =>
          user.email === email ||
          user.password === password ||
          user.username === username
      )
    ) {
      console.log("user already exist");

      return false;
    }
    const newUser: Iuser = { username, email, password, role: "client" };
    const response = await fetch(userURL, {
      method: "POST",
      body: JSON.stringify(newUser),
    });
    // console.log(newUser);
    if (response.ok) {
      console.log("User added successfully");
      window.location.href = "../login.html";
      return true;
    } else {
      console.log("Failed");
      return false;
    }
  }
}

const signuplogic = new RegisterUser([]);
const signform = document.getElementById("signup");
signform?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userName = (document.getElementById("username") as HTMLInputElement)
    .value;
  const userEmail = (document.getElementById("email") as HTMLInputElement)
    .value;
  const userPassword = (document.getElementById("password") as HTMLInputElement)
    .value;

  if (await signuplogic.addUser(userName, userEmail, userPassword)) {
    alert(`successfully registerd`);
    window.location.href = "../login.html";
  } else {
    alert(`user exists`);
  }
});
