"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var mongoose_1 = __importDefault(require("mongoose"));
var index_1 = __importDefault(require("./routes/index"));
var body_parser_1 = __importDefault(require("body-parser"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
mongoose_1.default.connection.openUri('mongodb://localhost:27017/xmlReader', function (err) {
    if (err)
        throw err;
    console.log("Base de datos Online");
});
var app = express_1.default();
app.use(cors_1.default());
app.use(express_fileupload_1.default());
app.use(body_parser_1.default.json());
app.use('', index_1.default);
/* app.get('/', (req, res)=> {
    console.log('api 3000 ahora');
    res.json({ok:true});
}); */
app.listen(3000, function () {
    console.log('corriendo en el puerto 3000');
});
