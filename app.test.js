const app = require("./app");
const airports = require("./airports")
const request = require("supertest");

describe("My Airport server", () => {
    test("can GET all the airports", (done) => {
        request(app)
            .get("/airports")
            .expect(200)
            .expect((response) => {
                expect(response.body.length).toBeGreaterThan(28000);
            })
            .end(done);
    });

    test("can get one airport", (done) => {
        var airport = airports[Math.floor(Math.random()*airports.length)];
        const airportID = airport.icao
        request(app)
            .get(`/airports/${airportID}`)
            .expect(200)
            .expect((response) => {
                expect(response.body).toEqual(airport);
            })
            .end(done);
    });

    test("can add an airport", (done) => {
        const testAirport = {
            "icao": "TEST",
            "iata": "",
            "name": "Test Airport",
            "city": "Test City",
            "state": "Testland",
            "country": "United Republic of Test",
            "elevation": 450,
            "lat": 59.94919968,
            "lon": -151.695999146,
            "tz": "UK/TestUK"
        }
        request(app)
            .post("/airports")
            .send(testAirport)
            .expect(201)
            .expect(() => {
                expect(airports[airports.length-1]).toEqual(testAirport);
            })
            .end(done);
    });

    test("can update an airport", (done) => {
        const newAirport = {
            "icao": "TEST",
            "iata": "",
            "name": "Test Airport",
            "city": "Test City",
            "state": "Testland",
            "country": "United Republic of Test",
            "elevation": 450,
            "lat": 59.94919968,
            "lon": -151.695999146,
            "tz": "UK/TestUK"
        }
        var airport = airports[Math.floor(Math.random()*airports.length)];
        const airportID = airport.icao
        const index = airports.indexOf(airport);
        request(app)
        .put(`/airports/${airportID}`)
        .send(newAirport)
        .expect(200)
        .expect(() => {
            expect(airports[index]).toEqual(newAirport)
        })
        .end(done)
    })
    
    test("can delete an airport", (done) => {
        var airport = airports[Math.floor(Math.random()*airports.length)];
        const airportID = airport.icao
        const arrayLengthBefore = airports.length;
        request(app)
            .delete(`/airports/${airportID}`)
            .expect(200)
            .expect(() => {
                expect(airports.indexOf(airport)).toEqual(-1);
            })
            .expect(() => {
                expect(airports.length).toEqual(arrayLengthBefore-1);
            })
            .end(done);
    })
});