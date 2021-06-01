import { expect } from 'chai';
import { v4 as uuidv4 } from 'uuid';
import createTag from '../../src/functions/create/function'
import deleteTag from '../../src/functions/delete/function'
import Tag from '../../src/models/database/tables/tags'

describe('function: deleteTag', async () => {

    let expectedResult: Tag;

    beforeEach(async () => {
        expectedResult = new Tag();
        expectedResult.name = uuidv4();
        expectedResult.description = uuidv4();

        expectedResult = await createTag(expectedResult);
    })

    it('Should return the deleted delete a tag, if the id exists', async () => {
        expect(await deleteTag(expectedResult.id)).to.be.deep.equal(expectedResult);
    })

    it('Should throw ItemNotFoundException, if the id doesn\'t exist', async () => {

        let result = null;
        try {
            result = await deleteTag('Not Exist At All');
        }
        catch (err) {
            expect(err.name).to.be.equal('ItemNotFoundException');
        }

        expect(result).to.not.exist;
    })

    afterEach(async () => {
        try {
            await deleteTag(expectedResult.id);
        }
        catch (e) { }
    })
})