import sequelize from "./config/sequelize-config";
import bodyParser from 'body-parser';
import app from "./app";


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const PORT = process.env.PORT || 5432;

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((error: any) => {
    console.error("Unable to connect to the database:", error);
  });

app.listen(PORT, () => console.log(`Listening!...`,PORT));
