import 'source-map-support/register';

import Tag from '@dbModel/tables/tags';
import schema from './schema';
import update from './function';
import { ValidatedEventAPIGatewayProxyEvent, middyfy, Response, AuthenticatedUser } from 'utilities-techsweave';
import { StatusCodes } from 'http-status-codes';

const updateHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    let res: Response<Tag>;

    try {

        const user: AuthenticatedUser = await AuthenticatedUser.fromToken(event.headers?.Authorization);
        if (!(await user.isVendor(process.env.USER_POOL_ID))) {
            throw {
                name: 'userNotAllowed',
                message: 'You must be a vendor to update a tag'
            };
        }

        const tag: Tag = new Tag();

        tag.id = event.pathParameters?.id;
        tag.name = event.body.name;
        tag.description = event.body?.description;

        res = Response.fromData<Tag>(await update(tag), StatusCodes.OK);

    } catch (error) {
        res = Response.fromError(error);
    }
    return res.toAPIGatewayProxyResult();
};

export const main = middyfy(updateHandler);
