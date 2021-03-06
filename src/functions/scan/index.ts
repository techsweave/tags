// import schema from './schema';
import { handlerPath } from 'utilities-techsweave';
import schema from './schema';

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: 'post',
                path: 'tags/filter',
                cors: true,
                request: {
                    schemas: {
                        'application/json': schema
                    }
                }
            }
        }
    ]
};

