const bookURL = "http://localhost:3000/bookings";
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
class Bookings {
  private bookings: IBooking[];
  private bookingElement: HTMLElement;
  constructor(bookings: IBooking[], bookingElement: HTMLElement) {
    this.bookingElement = bookingElement;
    this.bookings = bookings;
  }

  async fetchBookings(): Promise<IBooking[]> {
    const response = await fetch(bookURL);
    const data = await response.json();
    this.bookings = data;
    return data;
  }
  async getBookings(): Promise<IBooking[]> {
    if (this.bookings.length === 0) {
      await this.fetchBookings();
    }
    return this.bookings;
  }

  async displayBookings(): Promise<void> {
    const booking = await this.fetchBookings();
    console.log(booking);

    this.bookingElement.innerHTML = "";
    booking.forEach((book) => {
      const row = document.createElement("div");
      row.className = "booking";
      row.innerHTML = `
        <h4> Booking ID: ${book.id}</h4>
        <p>User:${book.username}</p>
         ${book.tourname ? `<p>Tour: ${book.tourname}</p>` : ""}
        ${book.hotelname ? `<p>Hotel: ${book.hotelname}</p>` : ""}
        <p>Date: ${book.date}</p>
        <button class="delete-booking" data-id="${book.id}">Delete</button>
        `;
      this.bookingElement.appendChild(row);
      row
        .querySelector(".delete-booking")
        ?.addEventListener("click", async () => {
          await this.deleteBooking(book.id);
          this.displayBookings();
        });
    });
  }
  async deleteBooking(bookingId: string | undefined): Promise<void> {
    if (!bookingId) return;
    try {
      const response = await fetch(`${bookURL}/${bookingId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        this.displayBookings();
      } else {
        console.error("Error deleting booking");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  }
}
document.addEventListener("DOMContentLoaded", async () => {
  const bookingContent = document.getElementById(
    "bookingContent"
  ) as HTMLDivElement;
  if (bookingContent) {
    const bookingDisplay = new Bookings([], bookingContent);
    await bookingDisplay.displayBookings();
  } else {
    console.error('Element with ID "bookingContent" not found');
  }
});
// const bookingContent = document.getElementById(
//   "bookingContent"
// )! as HTMLDivElement;
// const bookingdisplay = new Bookings([], bookingContent);
// document.addEventListener("DOMContentLoaded", async () => {
//   await bookingdisplay.displayBookings();
// });
