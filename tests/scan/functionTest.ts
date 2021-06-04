import { expect } from 'chai';
import scanTag from '../../src/functions/scan/function'
import Tag from '../../src/models/database/tables/tags'

describe('function: scanTag', async () => {

    it('Should return the first two tags', async () => {

        const body = {
            limit: 2
        }

        let result = await scanTag(body);
        expect(result.items).to.be.a('Array')
        expect(result.items.length).to.be.equal(2);
        expect(result.items[0] instanceof Tag, 'Is a tag').to.be.true;
        expect(result.lastKey.id).to.be.a('string');
    })

    it('Should return a set of tags after a specified tag', async () => {

        const body = {
            limit: 25,
            startKey: 'c04ce116-dcf4-4e7f-9e9b-3f3e97e0fecc'
        }

        let result = await scanTag(body);
        expect(result.items).to.be.a('Array')
        expect(result.items.length).to.be.greaterThanOrEqual(1);
        expect(result.items[0] instanceof Tag, 'Is a Tag').to.be.true;
        expect(result.lastKey).to.not.exist;
    })
})