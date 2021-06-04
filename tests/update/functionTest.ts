import { expect } from 'chai';
import { v4 as uuidv4 } from 'uuid';
import createTag from '../../src/functions/create/function';
import updateTag from '../../src/functions/update/function';
import deleteTag from '../../src/functions/delete/function';
import Tag from '../../src/models/database/tables/tags';

describe('function: updateTag', async () => {

    let newTag: Tag;

    beforeEach(async () => {
        newTag = new Tag();
        newTag.name = uuidv4();
        newTag.description = uuidv4();

        newTag = await createTag(newTag);
    });

    it('Should return the updated tag, if the id exists', async () => {

        const expectedResult: Tag = Object.assign(new Tag(),
            {
                id: newTag.id,
                name: uuidv4(),
                description: uuidv4(),
            });


        expect(await updateTag(expectedResult)).to.be.deep.equal(expectedResult);
    });

    it('Should throw ItemNotFoundException, if the id doesn\'t exist', async () => {

        let result = null;
        const expectedResult: Tag = Object.assign(new Tag(),
            {
                id: 'Not Exist At All',
                name: uuidv4(),
                description: uuidv4(),
            });
        try {
            result = await updateTag(expectedResult);
        }
        catch (err) {
            expect(err.name).to.be.equal('ItemNotFoundException');
        }

        expect(result).to.not.exist;
    });

    afterEach(async () => {
        try {
            await deleteTag(newTag.id);
        }
        catch (e) { console.log(e); }
    });
});