module.exports = (sequelize, Sequelize) => {
    const Chip = sequelize.define("chip", {
        ChipId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Type: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Chip;
};