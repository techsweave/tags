import { TestUser, fakeContext, IFakeEvent } from 'utilities-techsweave';
import { v4 as uuidv4 } from 'uuid';
import { expect } from 'chai';
import { main as deleteTagHandler } from '../../src/functions/delete/handler'
import deleteTag from '../../src/functions/delete/function'
import createTag from '../../src/functions/create/function'
import { StatusCodes } from 'http-status-codes';
import * as AWS from 'aws-sdk'
import Tag from '../../src/models/database/tables/tags'


describe('handler: deleteTag', async () => {

    let vendor: TestUser;
    let customer: TestUser;
    let expectedResult: Tag;

    before(async () => {

        AWS.config.update({
            region: process.env.REGION
        })

        vendor = await TestUser.fromRole(true, process.env.USER_POOL_Id);
        customer = await TestUser.fromRole(false, process.env.USER_POOL_Id);
    })

    beforeEach(async () => {
        expectedResult = new Tag();
        expectedResult.name = uuidv4();
        expectedResult.description = uuidv4();

        expectedResult = await createTag(expectedResult);
    })


    it('Should return the created tag, if user is a vendor and the id exists', async () => {
        const fakeEvent: IFakeEvent = {
            headers: {
                AccessToken: await vendor.getAccessToken()
            },
            pathParameters: {
                id: expectedResult.id
            }
        }

        const response = await deleteTagHandler(fakeEvent, fakeContext);

        expect(response).to.be.not.null;
        expect(response.statusCode, 'statusCode').to.be.equal(StatusCodes.OK);

        const body = JSON.parse(response.body);

        expect(body.count, 'body.count').to.be.equal(1);
        expect(body.data, 'body.data').to.be.deep.equal(expectedResult);

    })

    it('Should return a response with error ItemNotFoundException, if user is a vendor and the id doesn\'t exist', async () => {
        const fakeEvent: IFakeEvent = {
            headers: {
                AccessToken: await vendor.getAccessToken()
            },
            pathParameters: {
                id: 'Not exists at all'
            }
        }

        const response = await deleteTagHandler(fakeEvent, fakeContext);

        expect(response).to.be.not.null;
        expect(response.statusCode, 'statusCode').to.be.equal(StatusCodes.NOT_FOUND);

        const body = JSON.parse(response.body);

        expect(body.error.name, 'body.error.name').to.be.equal('ItemNotFoundException');

    })

    it('Should return a response with error UserNotAllowed, if the is not a vendor', async () => {
        const fakeEvent: IFakeEvent = {
            headers: {
                AccessToken: await customer.getAccessToken()
            },
            body: {
                name: uuidv4(),
                description: uuidv4()
            }
        }

        let response = await deleteTagHandler(fakeEvent, fakeContext);

        expect(response).to.be.not.null;
        expect(response.statusCode, 'statusCode').to.be.equal(StatusCodes.FORBIDDEN);

        const body = JSON.parse(response.body);

        expect(body.error.name, 'body.error.name').to.be.equal('UserNotAllowed');
    })

    afterEach(async () => {
        try {
            await deleteTag(expectedResult.id);
        }
        catch (e) { }
    })

})