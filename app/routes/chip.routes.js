module.exports = app => {
    const chips = require("../controllers/chip.controller.js");

    var router = require("express").Router();

    // Create a new Chip
    router.post("/", chips.create);

    // Retrieve all Chips
    router.get("/", chips.findAll);

    // Retrieve a single Chip with id
    router.get("/:id", chips.findOne);

    // Update a Chip with id
    router.put("/:id", chips.update);

    // Delete a Chip with id
    router.delete("/:id", chips.delete);

    app.use('/api/chips', router);
};