const mongoose = require("mongoose");
const Card = mongoose.model("cards");

module.exports = app => {
    // Get all cards in the database
    app.get("/api/cards", async (req, res) => {
        const cards = await Card.find({})
        res.send(cards)
    })
    app.post("/api/cards", async (req, res) => {
        try {
            const {name, status, content, category, author} = req.body
            const card = await new Card({
                name, status, content, category, author
            }).save();
            res.status(200).send(car)
        } catch (err) {
            res.status(400).send(err)
        }
    })
}