import { expect } from 'chai';
import { v4 as uuidv4 } from 'uuid';
import createTag from '../../src/functions/create/function';
import deleteTag from '../../src/functions/delete/function';
import Tag from '../../src/models/database/tables/tags';

describe('function: createTag', async () => {

    let id: string;

    it('Should create a tag, if the id exists', async () => {

        const expectedResult: Tag = new Tag();
        expectedResult.name = uuidv4();
        expectedResult.description = uuidv4();

        const result: Tag = await createTag(expectedResult);

        expect(result).to.exist;
        expectedResult.id = id = result.id;

        expect(result).to.be.deep.equal(expectedResult);
    });

    after(async () => {
        deleteTag(id);
    });
});