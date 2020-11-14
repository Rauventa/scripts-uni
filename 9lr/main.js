const TICKETS = [
  {
    id: 7024,
    flightDate: new Date(),
    departureAirport: "MOW",
    arrivalAirport: "TMB",
    name: "Vladislav",
    surname: "Abramov",
    hotelBookID: 1337,
    visaIDS: [228, 322]
  }
];

const BOOKINGS = [
  {
    id: 1337,
    hotelName: "U Tri Berezi",
    stars: 3,
    roomNumber: 1108,
    checkInDate: new Date(),
    checkOffDate: new Date()
  }
];

const VISAS = [
  {
    id: 228,
    expireDate: new Date()
  },
  {
    id: 322,
    expireDate: new Date()
  }
];

async function getTicket(id) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      let foundTicket = TICKETS.find(el => el.id === id);
      if (foundTicket) {
        resolve(foundTicket);
      } else {
        reject("Такой билет не найден.");
      }
    }, 1300);
  });
}

async function getHotelBooking(id) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      let foundBooking = BOOKINGS.find(el => el.id === id);
      if (foundBooking) {
        resolve(foundBooking);
      } else {
        reject("Бронирование не найдено.");
      }
    }, 700);
  });
}

async function getVisa(id) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      let foundVisa = VISAS.find(el => el.id === id);
      if (foundVisa) {
        resolve(foundVisa);
      } else {
        reject("Виза не найдена.");
      }
    }, (Math.random() * 700).toFixed(0));
  });
}

(async function main() {
  try {
    let ticket = await getTicket(7024);
    let booking = await getHotelBooking(ticket.hotelBookID);
    let visas = await Promise.all(ticket.visaIDS.map(id => getVisa(id)));
    let allData = {
      ...ticket,
      ...booking,
      visas
    };
    delete allData.visaIDS;
    delete allData.id;
    delete allData.hotelBookID;
    console.log(allData);
  } catch (err) {
    console.error(err);
  }
})();
