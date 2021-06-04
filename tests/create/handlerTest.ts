import { Models, TestUser, fakeContext, IFakeEvent } from 'utilities-techsweave';
import { v4 as uuidv4 } from 'uuid';
import { expect } from 'chai';
import { main as createTagHandler } from '../../src/functions/create/handler';
import deleteTag from '../../src/functions/delete/function';
import { StatusCodes } from 'http-status-codes';
import * as AWS from 'aws-sdk';


describe('handler: createTag', async () => {

    let vendor: TestUser;
    let customer: TestUser;
    let id: string;

    before(async () => {

        AWS.config.update({
            region: process.env.REGION
        });

        vendor = await TestUser.fromRole(true, process.env.USER_POOL_ID);
        customer = await TestUser.fromRole(false, process.env.USER_POOL_ID);
    });


    it('Should return the created tag, if user is a vendor', async () => {

        const expectedResult: Models.Tables.ITag = {
            id: '',
            name: uuidv4(),
            description: uuidv4(),
        };

        const fakeEvent: IFakeEvent = {
            headers: {
                AccessToken: await vendor.getAccessToken()
            },
            body: {
                name: expectedResult.name,
                description: expectedResult.description
            }
        };

        const response = await createTagHandler(fakeEvent, fakeContext);

        expect(response).to.be.not.null;
        expect(response.statusCode, 'statusCode').to.be.equal(StatusCodes.CREATED);

        const body = JSON.parse(response.body);

        expect(body.count, 'body.count').to.be.equal(1);

        expectedResult.id = id = body.data.id;
        expect(body.data, 'body.data').to.be.deep.equal(expectedResult);

    });

    it('Should return a response with error UserNotAllowed, if the is not a vendor', async () => {
        const fakeEvent: IFakeEvent = {
            headers: {
                AccessToken: await customer.getAccessToken()
            },
            body: {
                name: uuidv4(),
                description: uuidv4()
            }
        };

        const response = await createTagHandler(fakeEvent, fakeContext);

        expect(response).to.be.not.null;
        expect(response.statusCode, 'statusCode').to.be.equal(StatusCodes.FORBIDDEN);

        const body = JSON.parse(response.body);

        expect(body.error.name, 'body.error.name').to.be.equal('UserNotAllowed');
    });


    after(async () => {
        deleteTag(id);
    });

});