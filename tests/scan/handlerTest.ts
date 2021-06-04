import { expect } from 'chai';
import { main as scanTagHandler } from '../../src/functions/scan/handler'
import { fakeContext, IFakeEvent, Models } from 'utilities-techsweave'
// import Tag from '../../src/models/database/tables/tags'

function instanceOfITag(object: any): object is Models.Tables.ITag {
    return 'id' in object &&
        'name' in object &&
        'description' in object;
}

describe('handler: scanTag', async () => {

    it('Should return a response with the first two tag', async () => {

        const event: IFakeEvent = {
            body: {
                limit: 2
            }
        }

        let response = await scanTagHandler(event, fakeContext);

        expect(response).to.be.not.null;
        expect(response.statusCode, 'statusCode').to.be.equal(200);

        const body = JSON.parse(response.body);

        expect(body.count, 'body.count').to.be.equal(2);

        expect(body.data).to.be.a('Array')
        expect(instanceOfITag(body.data[0])).to.be.true;
        expect(body.lastEvaluatedKey.id).to.be.a('string');
    })

    it('Should return a response whit a set of tags after a specified tag', async () => {

        const event: IFakeEvent = {
            body: {
                limit: 25,
                startKey: 'c04ce116-dcf4-4e7f-9e9b-3f3e97e0fecc'
            }
        }

        let response = await scanTagHandler(event, fakeContext);

        expect(response).to.be.not.null;
        expect(response.statusCode, 'statusCode').to.be.equal(200);

        const body = JSON.parse(response.body);

        expect(body.count, 'body.count').to.be.greaterThanOrEqual(1);

        expect(body.data).to.be.a('Array')
        expect(instanceOfITag(body.data[0])).to.be.true;
        expect(body.lastEvaluatedKey).to.not.exist;
    })
})