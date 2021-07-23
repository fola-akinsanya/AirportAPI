const express = require("express");
const airports = require("./airports");

const app = express();

app.use(express.json());

app.get("/airports", (req,res) => {
    let { page, pageSize } = req.query;
    page = parseInt(page)
    pageSize = parseInt(pageSize)
    const array = airports.slice(
        page*pageSize, 
        page*pageSize + pageSize
        );
    page && pageSize ? res.status(200).json(array) : res.status(200).json(airports)
});

app.post("/airports", (req,res) => {
    airports.push(req.body);
    res.sendStatus(201);
})

app.get("/airports/:icao", (req,res) => {
    const airportID = req.params.icao;
    const airport = airports.find(airport => airport.icao === airportID)
    res.json(airport);
    res.sendStatus(200);
})

app.put("/airports/:icao", (req,res) => {
    const airportID = req.params.icao;
    let index = airports.findIndex(airport => airport.icao === airportID)
    airports[index] = req.body;
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

