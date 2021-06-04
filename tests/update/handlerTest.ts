import { TestUser, fakeContext, IFakeEvent, Models } from 'utilities-techsweave';
import { v4 as uuidv4 } from 'uuid';
import { expect } from 'chai';
import { main as updateTagHandler } from '../../src/functions/update/handler';
import deleteTag from '../../src/functions/delete/function';
import createTag from '../../src/functions/create/function';
import { StatusCodes } from 'http-status-codes';
import * as AWS from 'aws-sdk';
import Tag from '../../src/models/database/tables/tags';


describe('handler: updateTag', async () => {

    let vendor: TestUser;
    let customer: TestUser;
    let newTag: Tag;

    before(async () => {

        AWS.config.update({
            region: process.env.REGION
        });

        vendor = await TestUser.fromRole(true, process.env.USER_POOL_ID);
        customer = await TestUser.fromRole(false, process.env.USER_POOL_ID);
    });

    beforeEach(async () => {
        newTag = new Tag();
        newTag.name = uuidv4();
        newTag.description = uuidv4();

        newTag = await createTag(newTag);
    });


    it('Should return the update tag, if user is a vendor and the id exists', async () => {

        const expectedResult: Models.Tables.ITag = {
            id: newTag.id,
            name: uuidv4(),
            description: uuidv4()
        };

        const fakeEvent: IFakeEvent = {
            headers: {
                AccessToken: await vendor.getAccessToken()
            },
            pathParameters: {
                id: newTag.id
            },
            body: {
                name: expectedResult.name,
                description: expectedResult.description
            }
        };

        const response = await updateTagHandler(fakeEvent, fakeContext);

        expect(response).to.be.not.null;
        expect(response.statusCode, 'statusCode').to.be.equal(StatusCodes.OK);

        const body = JSON.parse(response.body);

        expect(body.count, 'body.count').to.be.equal(1);
        expect(body.data, 'body.data').to.be.deep.equal(expectedResult);
    });

    it('Should return a response with error ItemNotFoundException, if user is a vendor and the id doesn\'t exist', async () => {
        const fakeEvent: IFakeEvent = {
            headers: {
                AccessToken: await vendor.getAccessToken()
            },
            pathParameters: {
                id: 'Not exists at all'
            },
            body: {
                name: newTag.name,
                description: newTag.description
            }
        };

        const response = await updateTagHandler(fakeEvent, fakeContext);

        expect(response).to.be.not.null;
        expect(response.statusCode, 'statusCode').to.be.equal(StatusCodes.NOT_FOUND);

        const body = JSON.parse(response.body);

        expect(body.error.name, 'body.error.name').to.be.equal('ItemNotFoundException');
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

        const response = await updateTagHandler(fakeEvent, fakeContext);

        expect(response).to.be.not.null;
        expect(response.statusCode, 'statusCode').to.be.equal(StatusCodes.FORBIDDEN);

        const body = JSON.parse(response.body);

        expect(body.error.name, 'body.error.name').to.be.equal('UserNotAllowed');
    });

    afterEach(async () => {
        try {
            await deleteTag(newTag.id);
        }
        catch (e) { console.log(e); }
    });

});