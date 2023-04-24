const db = require("../models");
const Contact = db.contacts;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.Name) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
        return;
    }

    const contact = {
        Name: req.body.Name,
        PngPath: req.body.PngPath,
        Age: req.body.Age,
        Telephone: req.body.Telephone,
        Admin: false,
        Chips: "[]"
    };

    Contact.create(contact)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                Message: err.message || "Some error occurred while creating the contact."
            });
        });
};

exports.findAll = (req, res) => {
    const Telephone = req.query.Telephone;
    var condition = Telephone ? {
        Telephone: {
            [Op.like]: `%${Telephone}%`
        }
    } : null;

    Contact.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ Message: err.message || "Some error occurred while retrieving contacts." });
        });
};

exports.findOne = (req, res) => {
    const ContactId = req.params.id;

    Contact.findByPk(ContactId)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ Message: "Error retrieving contact with id=" + ContactId });
        });
};

exports.update = (req, res) => {
    const ContactId = req.params.id;

    Contact.update(req.body, {
            where: { ContactId: ContactId }
        })
        .then(num => {
            if (num == 1) {
                res.send({ Message: "Contact was updated successfully." });
            } else {
                res.send({ Message: `Cannot update contact with id=${ContactId}. Maybe contact was not found or req.body is empty!` });
            }
        })
        .catch(err => {
            res.status(500).send({ Message: "Error updating contact with id=" + ContactId });
        });
};

exports.delete = (req, res) => {
    const ContactId = req.params.id;

    Contact.destroy({
            where: { ContactId: ContactId }
        })
        .then(num => {
            if (num == 1) {
                res.send({ Message: "Contact was deleted successfully!" });
            } else {
                res.send({ Message: `Cannot delete contact with id=${ContactId}. Maybe contact was not found!` });
            }
        })
        .catch(err => {
            res.status(500).send({ Message: "Could not delete contact with id=" + ContactId });
        });
};