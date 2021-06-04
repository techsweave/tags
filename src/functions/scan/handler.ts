import 'source-map-support/register';

import Tag from '@dbModel/tables/tags';
import scanTag from './function';

import { ValidatedEventAPIGatewayProxyEvent, middyfy, Response } from 'utilities-techsweave';
import StatusCodes from 'http-status-codes';

import schema from './schema';

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    let res: Response<Tag> = new Response<Tag>();

    try {
        const result = await scanTag(event.body);
        res = Response.fromMultipleData(result.items, StatusCodes.OK, result?.lastKey);

    } catch (error) {
        res = Response.fromError(error);
    }
    return res.toAPIGatewayProxyResult();
};

export const main = middyfy(handler);
