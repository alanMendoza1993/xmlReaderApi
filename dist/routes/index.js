"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var files_1 = __importDefault(require("./files"));
/* import fileUpload from 'express-fileupload';
 */ var router = express_1.Router();
router.use('/files', files_1.default);
exports.default = router;
