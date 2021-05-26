import 'source-map-support/register';

import Tag from '@dbModel/tables/tags';
import deleteTag from './function';
import { ValidatedEventAPIGatewayProxyEvent, middyfy, Response, AuthenticatedUser } from 'utilities-techsweave';
import { StatusCodes } from 'http-status-codes';

const handler: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {
    let response: Response<Tag>;
    try {

        const user: AuthenticatedUser = await AuthenticatedUser.fromToken(event.headers?.AccessToken);
        if (!(await user.isVendor(process.env.USER_POOL_ID))) {
            throw {
                name: 'userNotAllowed',
                message: 'You must be a vendor to create a tag'
            };
        }

        response = Response.fromData<Tag>(
            await deleteTag(event.pathParameters?.id),
            StatusCodes.OK);
    }
    catch (error) {
        response = Response.fromError(error);
    }
    return response.toAPIGatewayProxyResult();
};

export const main = middyfy(handler);
