import dbContext from '@dbModel/dbContext';
import Tag from '@dbModel/tables/tags';
import getTag from '@functions/get/function';

const deleteTag = async (id: string): Promise<Tag> => {
    const item: Tag = new Tag();
    item.id = id;
    await getTag(id);
    return dbContext.delete(item);
};

export default deleteTag;