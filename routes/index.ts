import { Router } from 'express';

import routerFiles from './files';

/* import fileUpload from 'express-fileupload';
 */const router = Router();
 
 router.use('/files', routerFiles );

 export default router;
