const mongoose = require("mongoose");
const Card = mongoose.model("cards");

const check_user = (request_author, original_author) => {
    if (request_author === original_author) {
        return true
    } else {
        return false
    }
}

module.exports = app => {
    // Get all cards in the database
    app.get("/api/cards", async (req, res) => {
        const cards = await Card.find({})
        res.send(cards)
    })
    // Create a card in the database
    app.post("/api/cards", async (req, res) => {
        
        try {
            const {name, status, content, category, author} = req.body
            const card = await new Card({
                name, status, content, category, author
            }).save();
            res.status(200).send(card)
        } catch (err) {
            res.status(400).send(err)
        }
    })
    // Edit the card
    app.put("/api/cards", async (req, res) => {
        // I don't know whether I can use "_id" in url params instead of name of card?
        const {name, status, content, category, author} = req.body
        
        try {
            const card = await Card.findOne({name})
            console.log("Card info")
            console.log(card)
            console.log(author, card.author)
            if (check_user(author, card.author)) {
                if (name) {
                    card.name = name
                }
                if (content) {
                    card.content = content
                }
                if (category) {
                    card.category = category
                }
                if (status) {
                    card.status = status
                }
                await card.save()

                const message = "Update a card successfully!"
                res.send(message)
            }
            res.send("You are not authorized to edit this card")
        } catch (err) {
            console.log(err)
        }
    })
    // Delete the card
    app.delete("/api/cards", async (req, res) => {
        // I don't know whether I can use "_id" in url params instead of name of card?
        const {name, author} = req.body
        try {
            const card = await Card.findOne({name})
            console.log()
            console.log("Card info")
            console.log(card)

            if (check_user(author, card["author"])) {
                await Card.deleteOne({ _id: card._id })
                const message = "Delete a card successfully!"
                res.send(message)
            }
            res.send("You are not authorized to delete this card")
        } catch (err) {
            console.log(err)
        }
    })
}