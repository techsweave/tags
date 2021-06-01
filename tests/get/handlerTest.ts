import { expect } from 'chai';
import { main as getTagHandler } from '../../src/functions/get/handler'
import { fakeContext, IFakeEvent, Models } from 'utilities-techsweave'

describe('handler: getTag', async () => {

    it('Should return a response with a specific tag, if the id exists', async () => {

        const expectedResult: Models.Tables.ITag = {
            id: '2a856f59-86c6-4beb-a2b0-c8e7227d204e',
            name: 'Scelto dal ventiore',
            description: 'La nostra prima scelta!',
        }

        const event: IFakeEvent = {
            pathParameters: {
                id: '2a856f59-86c6-4beb-a2b0-c8e7227d204e'
            }
        }

        let response = await getTagHandler(event, fakeContext);

        expect(response).to.be.not.null;
        expect(response.statusCode, 'statusCode').to.be.equal(200);

        const body = JSON.parse(response.body);

        expect(body.count, 'body.count').to.be.equal(1);
        expect(body.data, 'body.data').to.be.deep.equal(expectedResult);
    })

    it('Should return a response with error ItemNotFoundException, if the id doesn\'t exists', async () => {

        const event: IFakeEvent = {
            pathParameters: {
                id: 'Not Exists At All'
            }
        }

        let response = await getTagHandler(event, fakeContext);

        expect(response).to.be.not.null;
        expect(response.statusCode, 'statusCode').to.be.equal(404);

        const body = JSON.parse(response.body);

        expect(body.error.name, 'body.name').to.be.equal('ItemNotFoundException');
    })
})