
 import mongoose from 'mongoose';
  export let Schema = mongoose.Schema;  
  
  /* class Employed extends Typegoose */
  export interface XmlI extends mongoose.Document  {
     
     boucher?:  string;
     certificate?:  string;
     currency?:  string;
     date?:  Date;
     proofPaymen?:  string;
     exchange?:  string;
     wayToPay?:  string;
     NoCertificate?:  string;
     stamp?:  string;
     sender?:  string;
     reciver?:  string;
     CFDIuse?:  string;
     subTotal?:  string;
     total?:  string;
     certificadoCSD?:  string;
     concept?:  string;
     timbreFiscal?:  {};
   }
 
   export const Xml = new Schema({
     boucher: {type: String, required:false}, // turn
     certificate: {type: String, required:false}, // turn
     currency: {type: String, required:false}, // turn
     date: {type: String, required:false}, // turn
     proofPaymen: {type: String, required:false}, // turn
     NoCertificate: {type: String, required:false}, // turn
     exchange: {type: String, required:false}, // turn
     wayToPay: {type: String, required:false}, // turn
     subTotal: {type: String, required:false}, // turn
     total: {type: String, required:false}, // turn
     stamp: {type: String, required:false}, // turn
     sender: {type: {}, required:false}, // turn
     reciver: {type: {}, required:false}, // turn
     timbreFiscal: {type: {}, required:false}, // turn
     certificadoCSD: {type: {}, required:false}, // turn
     CFDIuse: {type: String, required:false}, // turn
     concept: {type: {}, required:false}, // turn
    
       
 }, { collection: 'xml' }); 
 
 const XmlModel = mongoose.model<XmlI>('Xml', Xml);
 export default XmlModel;
 