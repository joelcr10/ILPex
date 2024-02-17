import express,{Express} from 'express'


const PORT = 3000;

const app: Express = express();

app.use(express.json()); 

