import { Models } from 'utilities-techsweave';
import { expect } from 'chai';
import getTag from '../../src/functions/get/function';

describe('function: getTag', async () => {

    it('Should return a specific tag, if the id exists', async () => {
        const expectedResult: Models.Tables.ITag = {
            id: '1b769d8e-af6e-407e-a51d-f0b592f5255c',
            name: 'In sconto',
            description: 'Prodotto in sconto',
        };

        expect(await getTag('1b769d8e-af6e-407e-a51d-f0b592f5255c')).to.be.deep.equal(expectedResult);
    });

    it('Should throw ItemNotFoundException, if the id doesn\'t exist', async () => {
        let result = null;
        try {
            result = await getTag('Not Exist At All');
        }
        catch (err) {
            expect(err.name).to.be.equal('ItemNotFoundException');
        }
        expect(result).to.be.null;
    });
});