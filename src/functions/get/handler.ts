import 'source-map-support/register';

import Tag from '@dbModel/tables/tags';
import get from './function';
import { ValidatedEventAPIGatewayProxyEvent, middyfy, Response } from 'utilities-techsweave';
import { StatusCodes } from 'http-status-codes';

const getHandler: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {
    let response: Response<Tag>;
    try {
        response = Response.fromData<Tag>(
            await get(event.pathParameters?.id),
            StatusCodes.OK);
    }
    catch (error) {
        response = Response.fromError<Tag>(error);
    }
    return response.toAPIGatewayProxyResult();
};

export const main = middyfy(getHandler);
