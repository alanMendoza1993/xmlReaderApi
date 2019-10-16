import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes/index';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

mongoose.connection.openUri('mongodb://localhost:27017/xmlReader', (err: Error) => {
    if (err) throw err;
    console.log("Base de datos Online");
});
const app = express();
app.use(cors());

app.use(fileUpload());
app.use(bodyParser.json());
app.use('' , router);
/* app.get('/', (req, res)=> {
    console.log('api 3000 ahora');
    res.json({ok:true});
}); */

app.listen(3000, () => {
    console.log('corriendo en el puerto 3000');
});