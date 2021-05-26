import dbContext from '@dbModel/dbContext';
import Tag from '@dbModel/tables/tags';

const deleteTag = async (id: string): Promise<Tag> => {
    const item: Tag = new Tag();
    item.id = id;
    return dbContext.delete(item);
};

export default deleteTag;