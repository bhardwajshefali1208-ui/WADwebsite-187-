//To display current date and set min date as current date
document.getElementById("today").textContent =
    new Date().toLocaleDateString();

function getTodayDate() {
    let today = new Date();
    let year = today.getFullYear();
    let month = String(today.getMonth() + 1).padStart(2, "0");
    let day = String(today.getDate()).padStart(2, "0");
    return year + "-" + month + "-" + day;
}
document.getElementById("departure").min = getTodayDate();
document.getElementById("return-date").min = getTodayDate();
document.getElementById("swap-btn")
    .addEventListener("click", function() {
        let from = document.getElementById("from");
        let to = document.getElementById("to");
        let temp = from.value;
        from.value = to.value;
        to.value = temp;
    });
// Sample flight data
let flights = [
    {
        airline: "IndiGo",
        from: "Delhi",
        to: "Mumbai",
        departure: "14:50",
        arrival: "22:20",
        duration: 450,
        price: 15744,
        stops: 0
    },
    {
        airline: "SpiceJet",
        from: "Delhi",
        to: "Mumbai",
        departure: "20:00",
        arrival: "22:20",
        duration: 140,
        price: 18735,
        stops: 0
    },
    {
        airline: "IndiGo",
        from: "Delhi",
        to: "Mumbai",
        departure: "15:45",
        arrival: "21:00",
        duration: 315,
        price: 18810,
        stops: 1
    },
    {
        airline: "Air India",
        from: "Delhi",
        to: "Pune",
        departure: "12:45",
        arrival: "17:20",
        duration: 275,
        price: 18720,
        stops: 1
    },
    {
        airline: "Air India",
        from: "Pune",
        to: "Mumbai",
        departure: "02:45",
        arrival: "5:15",
        duration: 150,
        price: 15240,
        stops: 0
    },
    {
        airline: "Air India",
        from: "Delhi",
        to: "Bangalore",
        departure: "12:45",
        arrival: "18:20",
        duration: 335,
        price: 19250,
        stops: 2
    },
    {
        airline: "IndiGo",
        from: "Pune",
        to: "Bangalore",
        departure: "02:45",
        arrival: "06:35",
        duration: 230,
        price: 10240,
        stops: 1
    },
    {
        airline: "SpiceJet",
        from: "Pune",
        to: "Bangalore",
        departure: "08:35",
        arrival: "10:05",
        duration: 90,
        price: 7280,
        stops: 0
    },
    {
        airline: "SpiceJet",
        from: "Pune",
        to: "Mumbai",
        departure: "04:45",
        arrival: "6:15",
        duration: 90,
        price: 6240,
        stops: 0
    },
    {
        airline: "IndiGo",
        from: "Pune",
        to: "Mumbai",
        departure: "01:45",
        arrival: "06:25",
        duration: 280,
        price: 9240,
        stops: 2
    },
    {
        airline: "SpiceJet",
        from: "Pune",
        to: "Delhi",
        departure: "22:45",
        arrival: "03:15",
        duration: 270,
        price: 12240,
        stops: 1
    },
    {
        airline: "IndiGo",
        from: "Pune",
        to: "Delhi",
        departure: "15:45",
        arrival: "20:15",
        duration: 270,
        price: 18240,
        stops: 2
    },
    {
        airline: "Air India",
        from: "Pune",
        to: "Bangalore",
        departure: "20:45",
        arrival: "05:15",
        duration: 510,
        price: 12540,
        stops: 3
    },
    {
        airline: "SpiceJet",
        from: "Bangalore",
        to: "Pune",
        departure: "02:45",
        arrival: "09:15",
        duration: 390,
        price: 17290,
        stops: 1
    },
    {
        airline: "Air India",
        from: "Delhi",
        to: "Chennai",
        departure: "02:45",
        arrival: "09:15",
        duration: 390,
        price: 12290,
        stops: 1
    },
    {
        airline: "Indigo",
        from: "Delhi",
        to: "Chennai",
        departure: "12:45",
        arrival: "15:00",
        duration: 195,
        price: 15370,
        stops: 0
    },
    {
        airline: "SpiceJet",
        from: "Chennai",
        to: "Delhi",
        departure: "02:45",
        arrival: "09:50",
        duration: 425,
        price: 17290,
        stops: 1
    },
    {
        airline: "Air India",
        from: "Bangalore",
        to: "Pune",
        departure: "14:45",
        arrival: "21:15",
        duration: 390,
        price: 21290,
        stops: 1
    },
    {
        airline: "IndiGo",
        from: "Bangalore",
        to: "Chennai",
        departure: "02:45",
        arrival: "04:05",
        duration: 80,
        price: 7290,
        stops: 0
    }
];
//To store searched flights
let currentFlights = [];
//To select one way or round trip
let tripOptions = document.querySelectorAll('input[name="trip"]');
for (let i = 0; i < tripOptions.length; i++) {
    tripOptions[i].addEventListener("change", function() {
        let returnField = document.getElementById("return-field");
        if (this.value == "round") {
            returnField.classList.remove("hidden");
        } else {
            returnField.classList.add("hidden");
        }
    });
}
//To search the available flights
document.getElementById("search-btn")
    .addEventListener("click", searchFlights);
function searchFlights() {

    let from = document.getElementById("from").value.trim();
    let to = document.getElementById("to").value.trim();

    let date = document.getElementById("departure").value;
    let returnDate = document.getElementById("return-date").value;

    let trip = document.querySelector(
        'input[name="trip"]:checked'
    ).value;
    //To check if all fields are filled and data is valid
    if (from == "" || to == "" || date == "") {
        alert("Please fill all required fields.");
        return;
    }
    if (from.toLowerCase() == to.toLowerCase()) {
        alert("Departure and destination cannot be the same.");
        return;
    }
    if (date < getTodayDate()) {
        alert("Please select a future date.");
        return;
    }
    if (trip == "round") {
        if (returnDate == "" || returnDate < date) {
            alert("Please select a valid return date.");
            return;
        }
    }
    //To show available flights
    currentFlights = [];
    for (let i = 0; i < flights.length; i++) {
        if (
            flights[i].from.toLowerCase() == from.toLowerCase() &&
            flights[i].to.toLowerCase() == to.toLowerCase()
        ) {
            currentFlights.push(flights[i]);
        }
    }
    document.getElementById("results").classList.remove("hidden");
    //To reset filters for new search
    document.getElementById("nonstop").checked = false;
    let airlineOptions = document.querySelectorAll(".airline");
    for (let i = 0; i < airlineOptions.length; i++) {
        airlineOptions[i].checked = false;
    }
    document.getElementById("time-filter").value = "all";
    document.getElementById("sort").value = "default";
    if (currentFlights.length == 0) {
        document.getElementById("cheapest").textContent = "--";
        document.getElementById("fastest").textContent = "--";
        displayFlights([]);
        return;
    }
    displayHighlights();
    displayFlights(currentFlights);
}
//To convert time from minutes into hours and minutes
function formatDuration(minutes) {
    let hours = Math.floor(minutes / 60);
    let mins = minutes % 60;
    return hours + "h " + mins + "m";
}
//To display the cheapest and fastest flights
function displayHighlights() {
    let cheapest = currentFlights[0];
    let fastest = currentFlights[0];
    for (let i = 1; i < currentFlights.length; i++) {
        if (currentFlights[i].price < cheapest.price) {
            cheapest = currentFlights[i];
        }
        if (currentFlights[i].duration < fastest.duration) {
            fastest = currentFlights[i];
        }
    }
    document.getElementById("cheapest").textContent =
        cheapest.airline + " - ₹" +
        cheapest.price.toLocaleString("en-IN");
    document.getElementById("fastest").textContent =
        fastest.airline + " - " +
        formatDuration(fastest.duration);
}
// To display the available flight cards
function displayFlights(data) {
    let list = document.getElementById("flight-list");
    list.innerHTML = "";
    if (data.length == 0) {
        list.innerHTML =
            '<div class="no-flights">No flights found for this route.</div>';
        return;
    }
    for (let i = 0; i < data.length; i++) {
        let flight = data[i];
        let stopText = "Non-stop";
        if (flight.stops > 0) {
            stopText = flight.stops + " Stop";
        }
        list.innerHTML +=
            '<div class="flight-card">' +
                '<div>' +
                    '<h3>' + flight.airline + '</h3>' +
                    '<p>' + flight.from + ' → ' + flight.to + '</p>' +
                '</div>' +

                '<div>' +
                    '<h3>' + flight.departure + '</h3>' +
                    '<p>Departure</p>' +
                '</div>' +

                '<div>' +
                    '<h3>' + flight.arrival + '</h3>' +
                    '<p>Arrival</p>' +
                '</div>' +

                '<div>' +
                    '<h3>' + formatDuration(flight.duration) + '</h3>' +
                    '<p>' + stopText + '</p>' +
                '</div>' +

                '<div>' +
                    '<p class="price">Per Person: ₹' +
                    flight.price.toLocaleString("en-IN") + '</p>' +
                    '<button onclick="bookFlight()">Book Now</button>' +
                '</div>' +

            '</div>';
    }
}

function bookFlight() {
    alert("Your flight is booked. Happy Journey!");
}
//To sort and apply the filters
function applyFilters() {
    let filteredFlights = [];
    let nonstop = document.getElementById("nonstop").checked;
    let selectedAirlines = [];
    let airlineOptions = document.querySelectorAll(".airline");
    for (let i = 0; i < airlineOptions.length; i++) {
        if (airlineOptions[i].checked) {
            selectedAirlines.push(airlineOptions[i].value);
        }
    }

    let time = document.getElementById("time-filter").value;
    for (let i = 0; i < currentFlights.length; i++) {
        let flight = currentFlights[i];
        let valid = true;
        if (nonstop && flight.stops != 0) {
            valid = false;
        }

        if (selectedAirlines.length > 0) {
            let found = false;
            for (let j = 0; j < selectedAirlines.length; j++) {
                if (flight.airline == selectedAirlines[j]) {
                    found = true;
                }
            }
            if (!found) {
                valid = false;
            }
        }

        let hour = Number(flight.departure.split(":")[0]);
        if (time == "morning" && !(hour >= 5 && hour < 12)) {
            valid = false;
        }
        if (time == "afternoon" && !(hour >= 12 && hour < 17)) {
            valid = false;
        }
        if (time == "evening" && !(hour >= 17 || hour < 5)) {
            valid = false;
        }
        if (valid) {
            filteredFlights.push(flight);
        }
    }
    let sort = document.getElementById("sort").value;
    if (sort == "price") {
        for (let i = 0; i < filteredFlights.length; i++) {
            for (let j = i + 1; j < filteredFlights.length; j++) {
                if (filteredFlights[i].price > filteredFlights[j].price) {
                    let temp = filteredFlights[i];
                    filteredFlights[i] = filteredFlights[j];
                    filteredFlights[j] = temp;
                }
            }
        }
    }
    if (sort == "duration") {
        for (let i = 0; i < filteredFlights.length; i++) {
            for (let j = i + 1; j < filteredFlights.length; j++) {
                if (filteredFlights[i].duration > filteredFlights[j].duration) {
                    let temp = filteredFlights[i];
                    filteredFlights[i] = filteredFlights[j];
                    filteredFlights[j] = temp;
                }
            }
        }
    }
    displayFlights(filteredFlights);
}
//To update result when a filter is selected or changed
document.getElementById("nonstop").addEventListener("change", applyFilters);
document.getElementById("time-filter").addEventListener("change", applyFilters);
document.getElementById("sort").addEventListener("change", applyFilters);
let airlines = document.getElementsByClassName("airline");
    "#nonstop, .airline, #time-filter, #sort"
for (let i = 0; i < airlines.length; i++) {
    airlines[i].addEventListener("change", applyFilters);
}