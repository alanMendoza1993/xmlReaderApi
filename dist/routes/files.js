"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var path_1 = __importDefault(require("path"));
var convert = __importStar(require("xml-js"));
var fs = __importStar(require("fs"));
var xmlModel_1 = __importDefault(require("../models/xmlModel"));
var pdf = __importStar(require("html-pdf"));
var routerFiles = express_1.Router();
routerFiles.post('/upload', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var archivo, nameFile, ext, nameFull, pathA;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('subiendo archivos');
                if (!req.files) return [3 /*break*/, 2];
                archivo = req.files.file;
                console.log('files save:', archivo);
                nameFile = archivo.name.split('.');
                ext = nameFile[nameFile.length - 1];
                nameFull = "prueba." + ext;
                pathA = "./files/" + nameFull;
                return [4 /*yield*/, archivo.mv(pathA, function (err) {
                        if (err) {
                            console.log('error::', err);
                            return res.status(400).json({
                                ok: false,
                                msj: 'error al mover archivo',
                                error: err
                            });
                        }
                        /*                 var xml = path.resolve(__dirname,`../../files/${req.params.file}`);
                         */ var xml = fs.readFileSync(path_1.default.resolve(__dirname, "../../files/prueba.xml"), 'utf8');
                        var json = convert.xml2json(xml, { compact: true, spaces: 4 });
                        var obj = JSON.parse(json);
                        console.log('es el Comprobante ', obj._declaration);
                        console.log('es el Certificado ', obj['cfdi:Comprobante']._attributes.Certificado);
                        console.log('es el Moneda ', obj['cfdi:Comprobante']._attributes.Moneda);
                        console.log('es el Fecha y hora ', obj['cfdi:Comprobante']._attributes.Fecha);
                        console.log('es el Lugar de expedicion ', obj['cfdi:Comprobante']._attributes.LugarExpedicion);
                        console.log('es el Metodo de pago ', obj['cfdi:Comprobante']._attributes.MetodoPago);
                        console.log('es el Tipo de cambio', obj['cfdi:Comprobante']._attributes.TipoCambio);
                        console.log('es el Forma de pago', obj['cfdi:Comprobante']._attributes.FormaPago);
                        console.log('es el Sello ', obj['cfdi:Comprobante']._attributes.Sello);
                        console.log('es el Tipo de Comprobante ', obj['cfdi:Comprobante']._attributes.TipoDeComprobante);
                        console.log('es el Tipo de Total', obj['cfdi:Comprobante']._attributes.Total);
                        console.log('es el Tipo de SUBTotal ', obj['cfdi:Comprobante']._attributes.SubTotal);
                        console.log('es el Tipo de Emisor ', obj['cfdi:Comprobante']['cfdi:Emisor']._attributes);
                        console.log('es el Tipo de Receptor ', obj['cfdi:Comprobante']['cfdi:Receptor']._attributes);
                        console.log('es el uso de CFDI ', obj['cfdi:Comprobante']['cfdi:Receptor']._attributes.UsoCFDI);
                        console.log('es el uso de Conceptos ', obj['cfdi:Comprobante']['cfdi:Conceptos']['cfdi:Concepto']._attributes);
                        console.log('es el uso de TimbreFiscal ', obj['cfdi:Comprobante']['cfdi:Complemento']['tfd:TimbreFiscalDigital']);
                        console.log('es el uso obj', obj);
                        var xmlObj = new xmlModel_1.default({
                            certificate: obj['cfdi:Comprobante']._attributes.Certificado
                        });
                        if (obj['cfdi:Comprobante']._attributes.Moneda != undefined)
                            xmlObj['currency'] = obj['cfdi:Comprobante']._attributes.Moneda;
                        if (obj['cfdi:Comprobante']._attributes.Fecha != undefined)
                            xmlObj['date'] = obj['cfdi:Comprobante']._attributes.Fecha;
                        if (obj['cfdi:Comprobante']._attributes.NoCertificado != undefined)
                            xmlObj['NoCertificate'] = obj['cfdi:Comprobante']._attributes.NoCertificate;
                        if (obj['cfdi:Comprobante']._attributes.LugarExpedicion != undefined)
                            xmlObj['proofPaymen'] = obj['cfdi:Comprobante']._attributes.LugarExpedicion;
                        if (obj['cfdi:Comprobante']._attributes.TipoCambio != undefined)
                            xmlObj['exchange'] = obj['cfdi:Comprobante']._attributes.TipoCambio;
                        if (obj['cfdi:Comprobante']._attributes.FormaPago != undefined)
                            xmlObj['wayToPay'] = obj['cfdi:Comprobante']._attributes.FormaPago;
                        if (obj['cfdi:Comprobante']._attributes.Sello != undefined)
                            xmlObj['stamp'] = obj['cfdi:Comprobante']._attributes.Sello;
                        if (obj['cfdi:Comprobante']._attributes.SubTotal != undefined)
                            xmlObj['subTotal'] = obj['cfdi:Comprobante']._attributes.SubTotal;
                        if (obj['cfdi:Comprobante']._attributes.Total != undefined)
                            xmlObj['total'] = obj['cfdi:Comprobante']._attributes.Total;
                        if (obj['cfdi:Comprobante']['cfdi:Emisor']._attributes != undefined)
                            xmlObj['sender'] = obj['cfdi:Comprobante']['cfdi:Emisor']._attributes;
                        if (obj['cfdi:Comprobante']['cfdi:Receptor']._attributes != undefined)
                            xmlObj['reciver'] = obj['cfdi:Comprobante']['cfdi:Receptor']._attributes;
                        if (obj['cfdi:Comprobante']['cfdi:Receptor']._attributes.UsoCFDI != undefined)
                            xmlObj['CFDIuse'] = obj['cfdi:Comprobante']['cfdi:Receptor']._attributes.UsoCFDI;
                        if (obj['cfdi:Comprobante']['cfdi:Complemento']['tfd:TimbreFiscalDigital'] != undefined)
                            xmlObj['timbreFiscal'] = obj['cfdi:Comprobante']['cfdi:Complemento']['tfd:TimbreFiscalDigital']._attributes;
                        if (obj['cfdi:Comprobante']['cfdi:Conceptos']['cfdi:Concepto'] != undefined)
                            xmlObj['concept'] = obj['cfdi:Comprobante']['cfdi:Conceptos']['cfdi:Concepto']._attributes;
                        if (obj['cfdi:Comprobante']._attributes.NoCertificado != undefined)
                            xmlObj['certificadoCSD'] = obj['cfdi:Comprobante']._attributes.NoCertificado;
                        xmlObj.save(function (err, xmlSaved) {
                            if (err) {
                                return res.json({ ok: false, obj: 'error al guardar xml' });
                            }
                            console.log('se supone qu eguarde', xmlSaved);
                            res.json({ ok: true, obj: 'xml guardado xml' });
                        });
                        /* res.status(200).json({
                            ok: true,
                            msj: 'todo bien',
                            obj: json
                           
                        }); */
                    })];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); });
routerFiles.get('/allFiles', function (req, res) {
    xmlModel_1.default.find({}, function (err, xmlAll) {
        if (err) {
            res.json({ ok: false, obj: 'error al buscar' });
        }
        res.json({ ok: true, obj: xmlAll });
    });
});
routerFiles.get('/getPdf/:id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log('el id del pdf:', req.params.id);
        xmlModel_1.default.findById(req.params.id, function (err, xml) {
            var nameReciver = xml.reciver.Nombre || '';
            var nameSender = xml.sender.Nombre || '';
            var rfcReciver = xml.reciver.Rfc || '';
            var CFDIReciver = xml.reciver.UsoCFDI || '';
            var rfcSender = xml.sender.Rfc || '';
            var regimentSender = xml.sender.RegimenFiscal || '';
            var NoCertificate = xml.NoCertificate || '';
            var SATCertificate = xml.timbreFiscal.NoCertificadoSAT || '';
            var CSDCertificate = xml.certificadoCSD || '';
            var date = xml.date || '';
            var expeditionPlace = xml.proofPaymen || '';
            var concept = xml.concept || '';
            var subTotal = xml.subTotal || '';
            var total = xml.total || '';
            var contentPdf = "<div style=\"border: .3rem solid black; height: 15rem; padding: 1rem\">\n\n        <div style=\"width: fit-content; float: right;\">\n        \n        <p><strong>Folio y Serie:</strong></p>\n        <p><strong>Certificado del SAT:</strong> " + SATCertificate + "</p>\n        <p><strong>Certificado CSD:</strong> " + CSDCertificate + "</p>\n        <p><strong>Fecha y hora de emision:</strong> " + date + "</p>\n        <p><strong>Lugar de expedicion:</strong> " + expeditionPlace + "</p>\n        </div>\n        <div style=\"width: fit-content; padding-top: 2rem\">\n        <strong>" + nameReciver + "</strong>\n        <p><strong>RFC:</strong> " + rfcReciver + "</p>\n        <p><strong>Regimen Fiscal:</strong> " + regimentSender + "</p>\n        </div>\n        </div>\n        <div style=\"padding: 1rem\">\n        <p><strong>Receptor:</strong> " + nameSender + "<strong>RFC:</strong> " + rfcSender + "</p>\n        <p><strong>Receptor:</strong> " + CFDIReciver + "</p>\n\n        <table style=\"width: 100%; text-align: center; margin-top: 1rem\">\n        <thead style=\"width: 100%; text-align: center; background-color: #EEECE5 \">\n            <th>Descuento</th>\n            <th>Cantidad</th>\n            <th>Clave U</th>\n            <th>Clave Prod/Serv</th>\n            <th>Descripcion</th>\n            <th>Precio U</th>\n            <th>Importe</th>\n            <th>Sub Total</th>\n            <th>Total</th>\n        </thead>\n        <tbody>\n            <tr>\n                <td>" + concept.Descuento + "</td>\n                <td>" + concept.Cantidad + "</td>\n                <td>" + concept.ClaveUnidad + "</td>\n                <td>" + concept.ClaveProdServ + "</td>\n                <td>" + concept.Descripcion + "</td>\n                <td>" + concept.ValorUnitario + "</td>\n                <td>" + concept.Importe + "</td>\n                <td>" + subTotal + "</td>\n                <td>" + total + "</td>\n            </tr>\n        </tbody>\n        </table>\n        </div>\n\n        ";
            pdf.create(contentPdf).toFile('./files/salida.pdf', function (err, res2) {
                return __awaiter(this, void 0, void 0, function () {
                    var file;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (err) {
                                    console.log(err);
                                    return [2 /*return*/, res.json({ ok: false })];
                                }
                                console.log('se a creado correctamente');
                                return [4 /*yield*/, path_1.default.resolve(__dirname, "../../files/salida.pdf")];
                            case 1:
                                file = _a.sent();
                                console.log('el archivo es : ', file);
                                return [2 /*return*/, res.download(file)];
                        }
                    });
                });
            });
        });
        return [2 /*return*/];
    });
}); });
exports.default = routerFiles;
