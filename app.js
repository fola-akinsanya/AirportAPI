const express = require("express");
const airports = require("./airports");

const app = express();

app.use(express.json());

app.get("/airports", (req,res) => {
    res.json(airports)
});

app.post("/airports", (req,res) => {
    airports.push(req.body);
    res.sendStatus(201);
})

app.get(`/airports/:icao`, (req,res) => {
    const airportID = req.params.icao;
    const airport = airports.find(airport => airport.icao === airportID)
    res.json(airport);
    res.sendStatus(200);
})

app.put(`/airports/:icao`, (req,res) => {
    const airportID = req.params.icao;
    let airport = airports.find(airport => airport.icao === airportID)
    const index = airports.indexOf(airport);
    airport = req.body;
    airports[index] = airport
    res.json(airport);
    res.sendStatus(200);
})

app.delete(`/airports/:icao`, (req,res) => {
    const airportID = req.params.icao;
    let airport = airports.find(airport => airport.icao === airportID)
    const index = airports.indexOf(airport);
    airports.splice(index, 1);
    console.log(airports[index], "had been deleted")
    res.sendStatus(200);
})

module.exports = app;

