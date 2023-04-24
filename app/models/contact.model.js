module.exports = (sequelize, Sequelize) => {
    const Contact = sequelize.define("contact", {
        ContactId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        PngPath: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Age: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        Telephone: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        Admin: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        Chips: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Contact;
};