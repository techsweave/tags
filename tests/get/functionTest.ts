import { Models } from 'utilities-techsweave';
import { expect } from 'chai';
import getTag from '../../src/functions/get/function'

describe('function: getTag', async () => {

    it('Should return a specific tag, if the id exists', async () => {
        const expectedResult: Models.Tables.ITag = {
            id: '2a856f59-86c6-4beb-a2b0-c8e7227d204e',
            name: 'Scelto dal ventiore',
            description: 'La nostra prima scelta!',
        }

        expect(await getTag('2a856f59-86c6-4beb-a2b0-c8e7227d204e')).to.be.deep.equal(expectedResult);
    })

    it('Should throw ItemNotFoundException, if the id doesn\'t exist', async () => {
        let result = null;
        try {
            result = await getTag('Not Exist At All');
        }
        catch (err) {
            expect(err.name).to.be.equal('ItemNotFoundException');
        }
        expect(result).to.be.null;
    })
})