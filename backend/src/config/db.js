const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  port: process.env.DB_PORT || 3306,
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Required for Azure MySQL SSL connections
    },
  },
});

async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log(`Database '${process.env.DB_NAME}' connected successfully with SSL!`);
    return sequelize;
  } catch (error) {
    console.error("Database initialization failed:", error);
    process.exit(1);
  }
}

module.exports = initializeDatabase;
