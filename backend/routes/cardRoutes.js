const mongoose = require("mongoose");
const Card = mongoose.model("cards");

module.exports = app => {
    // Get all cards in the database
    app.get("/api/cards", async (req, res) => {
        const cards = await Card.find({})
        res.send(cards)
    })
}