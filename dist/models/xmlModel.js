"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
exports.Schema = mongoose_1.default.Schema;
exports.Xml = new exports.Schema({
    boucher: { type: String, required: false },
    certificate: { type: String, required: false },
    currency: { type: String, required: false },
    date: { type: String, required: false },
    proofPaymen: { type: String, required: false },
    NoCertificate: { type: String, required: false },
    exchange: { type: String, required: false },
    wayToPay: { type: String, required: false },
    subTotal: { type: String, required: false },
    total: { type: String, required: false },
    stamp: { type: String, required: false },
    sender: { type: {}, required: false },
    reciver: { type: {}, required: false },
    timbreFiscal: { type: {}, required: false },
    certificadoCSD: { type: {}, required: false },
    CFDIuse: { type: String, required: false },
    concept: { type: {}, required: false },
}, { collection: 'xml' });
var XmlModel = mongoose_1.default.model('Xml', exports.Xml);
exports.default = XmlModel;
