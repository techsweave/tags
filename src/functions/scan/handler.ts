import 'source-map-support/register';

import Tag from '@dbModel/tables/tags';
import scan from './function';

import { ValidatedEventAPIGatewayProxyEvent, middyfy, Response } from 'utilities-techsweave';
import StatusCodes from 'http-status-codes';

import schema from './schema';

const scanHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    let res: Response<Tag> = new Response<Tag>();

    try {
        const result = await scan(event.body);
        res = Response.fromMultipleData(result.items, StatusCodes.OK, result.lastKey);

    } catch (error) {
        res = Response.fromError(error);
    }
    return res.toAPIGatewayProxyResult();
};

export const main = middyfy(scanHandler);
