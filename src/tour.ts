const toursURL = "http://localhost:3000/tours";

interface ITour {
  id?: string;
  tourname: string;
  tourimage: string;
  destination: string;
  description: string;
  price: number;
}

class Tours {
  private tours: ITour[];
  private tourElement: HTMLElement;

  constructor(tours: ITour[], tourElement: HTMLElement) {
    this.tourElement = tourElement;
    this.tours = tours;
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
    console.log("fetching");

    const tours = await this.fetchTours();
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
  }
}
const tourcontents = document.getElementById("tourcontent")! as HTMLDivElement;
const displays = new Tours([], tourcontents);
document.addEventListener("DOMContentLoaded", async () => {
  console.log("kkkk");

  await displays.displayTours();
});
