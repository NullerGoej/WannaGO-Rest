const db = require("../models");
const Chip = db.chips;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.Name) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
        return;
    }

    const chip = {
        Name: req.body.Name,
        Type: req.body.Type
    };

    Chip.create(chip)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                Message: err.message || "Some error occurred while creating the Chip."
            });
        });
};

exports.findAll = (req, res) => {
    const Type = req.query.Type;
    var condition = Type ? {
        Type: {
            [Op.like]: `%${Type}%`
        }
    } : null;

    Chip.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ Message: err.message || "Some error occurred while retrieving Chips." });
        });
};

exports.findOne = (req, res) => {
    const ChipId = req.params.id;

    Chip.findByPk(ChipId)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ Message: "Error retrieving Chip with id=" + ChipId });
        });
};

exports.update = (req, res) => {
    const ChipId = req.params.id;

    Chip.update(req.body, {
            where: { ChipId: ChipId }
        })
        .then(num => {
            if (num == 1) {
                res.send({ Message: "Chip was updated successfully." });
            } else {
                res.send({ Message: `Cannot update Chip with id=${ChipId}. Maybe Chip was not found or req.body is empty!` });
            }
        })
        .catch(err => {
            res.status(500).send({ Message: "Error updating Chip with id=" + ChipId });
        });
};

exports.delete = (req, res) => {
    const ChipId = req.params.id;

    Chip.destroy({
            where: { ChipId: ChipId }
        })
        .then(num => {
            if (num == 1) {
                res.send({ Message: "Chip was deleted successfully!" });
            } else {
                res.send({ Message: `Cannot delete Chip with id=${ChipId}. Maybe Chip was not found!` });
            }
        })
        .catch(err => {
            res.status(500).send({ Message: "Could not delete Chip with id=" + ChipId });
        });
};