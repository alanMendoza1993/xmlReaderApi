import { Router } from 'express';
import path from 'path';
import * as convert from 'xml-js';
import * as fs from 'fs';
import XmlModel from '../models/xmlModel';
import * as pdf from 'html-pdf';

const routerFiles = Router();

routerFiles.post('/upload', async (req, res) => {
        console.log('subiendo archivos');
        if (req.files) {
            let archivo: any = req.files.file;
            console.log('files save:', archivo);
            var nameFile = archivo.name.split('.');
            let ext = nameFile[nameFile.length -1];
            var nameFull = `prueba.${ext}`;
            let pathA = `./files/${nameFull}`;
            await archivo.mv(pathA, (err: Error) => {
                if(err) {
                    console.log('error::', err);
                    return res.status(400).json({
                        ok:false,
                        msj: 'error al mover archivo',
                        error: err
                    });
                }

                
/*                 var xml = path.resolve(__dirname,`../../files/${req.params.file}`);
 */                var xml = fs.readFileSync(path.resolve(__dirname,`../../files/prueba.xml`), 'utf8');
                let json = convert.xml2json(xml, { compact: true, spaces: 4 });
                let obj = JSON.parse(json);
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
                let xmlObj = new XmlModel({
                    certificate: obj['cfdi:Comprobante']._attributes.Certificado
                });
                if (obj['cfdi:Comprobante']._attributes.Moneda != undefined) xmlObj['currency'] = obj['cfdi:Comprobante']._attributes.Moneda;
                if (obj['cfdi:Comprobante']._attributes.Fecha != undefined) xmlObj['date'] = obj['cfdi:Comprobante']._attributes.Fecha;
                if (obj['cfdi:Comprobante']._attributes.NoCertificado != undefined) xmlObj['NoCertificate'] = obj['cfdi:Comprobante']._attributes.NoCertificate;
                if (obj['cfdi:Comprobante']._attributes.LugarExpedicion != undefined) xmlObj['proofPaymen'] = obj['cfdi:Comprobante']._attributes.LugarExpedicion;
                if (obj['cfdi:Comprobante']._attributes.TipoCambio != undefined) xmlObj['exchange'] = obj['cfdi:Comprobante']._attributes.TipoCambio;
                if (obj['cfdi:Comprobante']._attributes.FormaPago != undefined) xmlObj['wayToPay'] = obj['cfdi:Comprobante']._attributes.FormaPago;
                if (obj['cfdi:Comprobante']._attributes.Sello != undefined) xmlObj['stamp'] = obj['cfdi:Comprobante']._attributes.Sello;
                if (obj['cfdi:Comprobante']._attributes.SubTotal != undefined) xmlObj['subTotal'] = obj['cfdi:Comprobante']._attributes.SubTotal;
                if (obj['cfdi:Comprobante']._attributes.Total != undefined) xmlObj['total'] = obj['cfdi:Comprobante']._attributes.Total;
                if (obj['cfdi:Comprobante']['cfdi:Emisor']._attributes != undefined) xmlObj['sender'] = obj['cfdi:Comprobante']['cfdi:Emisor']._attributes;
                if (obj['cfdi:Comprobante']['cfdi:Receptor']._attributes != undefined) xmlObj['reciver'] = obj['cfdi:Comprobante']['cfdi:Receptor']._attributes;
                if (obj['cfdi:Comprobante']['cfdi:Receptor']._attributes.UsoCFDI != undefined) xmlObj['CFDIuse'] = obj['cfdi:Comprobante']['cfdi:Receptor']._attributes.UsoCFDI;
                if (obj['cfdi:Comprobante']['cfdi:Complemento']['tfd:TimbreFiscalDigital'] != undefined) xmlObj['timbreFiscal'] = obj['cfdi:Comprobante']['cfdi:Complemento']['tfd:TimbreFiscalDigital']._attributes;
                if (obj['cfdi:Comprobante']['cfdi:Conceptos']['cfdi:Concepto'] != undefined) xmlObj['concept'] = obj['cfdi:Comprobante']['cfdi:Conceptos']['cfdi:Concepto']._attributes;
                if (obj['cfdi:Comprobante']._attributes.NoCertificado != undefined) xmlObj['certificadoCSD'] = obj['cfdi:Comprobante']._attributes.NoCertificado;
                

                
                xmlObj.save((err: Error, xmlSaved: any) => {
                    if (err) {
                        return res.json({ok: false, obj: 'error al guardar xml'});
                    }
                    console.log('se supone qu eguarde', xmlSaved);
                    res.json({ok: true, obj: 'xml guardado xml'});
                });
                    
                        /* res.status(200).json({
                            ok: true,
                            msj: 'todo bien',
                            obj: json
                           
                        }); */
                    
                    
                   
                   
               
               
            });
        }

 
    
});

routerFiles.get('/allFiles', (req, res) => {
    XmlModel.find({}, (err: Error, xmlAll: any) => {
        if (err) {
            res.json({ok: false, obj: 'error al buscar' });
        }
        res.json({ok: true, obj: xmlAll})
    });
});

routerFiles.get('/getPdf/:id', async (req, res) => {
    console.log('el id del pdf:', req.params.id);

    

    XmlModel.findById(req.params.id, (err: Error, xml: any) => {

        let nameReciver = xml.reciver.Nombre || '';
        let nameSender = xml.sender.Nombre || '';
        let rfcReciver = xml.reciver.Rfc || '';
        let CFDIReciver = xml.reciver.UsoCFDI || '';
        let rfcSender = xml.sender.Rfc || '';
        let regimentSender = xml.sender.RegimenFiscal || '';
        let NoCertificate = xml.NoCertificate || '';
        let SATCertificate = xml.timbreFiscal.NoCertificadoSAT || '';
        let CSDCertificate = xml.certificadoCSD || '';
        let date = xml.date || '';
        let expeditionPlace = xml.proofPaymen || '';
        let concept = xml.concept || '';
        let subTotal = xml.subTotal|| '';
        let total = xml.total || '';
        var contentPdf = `<div style="border: .3rem solid black; height: 15rem; padding: 1rem">

        <div style="width: fit-content; float: right;">
        
        <p><strong>Folio y Serie:</strong></p>
        <p><strong>Certificado del SAT:</strong> ${SATCertificate}</p>
        <p><strong>Certificado CSD:</strong> ${CSDCertificate}</p>
        <p><strong>Fecha y hora de emision:</strong> ${date}</p>
        <p><strong>Lugar de expedicion:</strong> ${expeditionPlace}</p>
        </div>
        <div style="width: fit-content; padding-top: 2rem">
        <strong>${nameReciver}</strong>
        <p><strong>RFC:</strong> ${rfcReciver}</p>
        <p><strong>Regimen Fiscal:</strong> ${regimentSender}</p>
        </div>
        </div>
        <div style="padding: 1rem">
        <p><strong>Receptor:</strong> ${nameSender}<strong>RFC:</strong> ${rfcSender}</p>
        <p><strong>Receptor:</strong> ${CFDIReciver}</p>

        <table style="width: 100%; text-align: center; margin-top: 1rem">
        <thead style="width: 100%; text-align: center; background-color: #EEECE5 ">
            <th>Descuento</th>
            <th>Cantidad</th>
            <th>Clave U</th>
            <th>Clave Prod/Serv</th>
            <th>Descripcion</th>
            <th>Precio U</th>
            <th>Importe</th>
            <th>Sub Total</th>
            <th>Total</th>
        </thead>
        <tbody>
            <tr>
                <td>${concept.Descuento}</td>
                <td>${concept.Cantidad}</td>
                <td>${concept.ClaveUnidad}</td>
                <td>${concept.ClaveProdServ}</td>
                <td>${concept.Descripcion}</td>
                <td>${concept.ValorUnitario}</td>
                <td>${concept.Importe}</td>
                <td>${subTotal}</td>
                <td>${total}</td>
            </tr>
        </tbody>
        </table>
        </div>

        `;
        pdf.create(contentPdf).toFile('./files/salida.pdf',async function(err, res2) {
            if (err){
                console.log(err);
                return res.json({ok: false});
            }
            
            console.log('se a creado correctamente');
           
            var file = await path.resolve(__dirname, "../../files/salida.pdf");
            console.log('el archivo es : ', file);
            return res.download(file);    
        });
    });
    
    
/*     res.json({ok: true, obj: 'pdf creado'});
 */});


export default routerFiles;
