import {
  Sequelize
} from 'sequelize';
import 'dotenv/config';

const sequelize = new Sequelize(
  process.env.DB_NAME || 'autodiely_eshop',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || '', {
      host: process.env.DB_HOST || 'localhost',
      dialect: 'mysql',
      logging: false,
      timezone: '+2:00'
  }
);

(async () => {
  try {
      await sequelize.authenticate();
  } catch (error) {}
})();

export default sequelize;
