import 'source-map-support/register';

import Tag from '@dbModel/tables/tags';
import deleteTag from './function';
import { ValidatedEventAPIGatewayProxyEvent, middyfy, Response } from 'utilities-techsweave';
import { StatusCodes } from 'http-status-codes';

const deleteHandler: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {
    let response: Response<Tag>;
    try {
        response = Response.fromData<Tag>(
            await deleteTag(event.pathParameters?.id),
            StatusCodes.OK);
    }
    catch (error) {
        response = Response.fromError(error);
    }
    return response.toAPIGatewayProxyResult();
};

export const main = middyfy(deleteHandler);
