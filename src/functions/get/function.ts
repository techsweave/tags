import dbContext from '@dbModel/dbContext';
import Tag from '@dbModel/tables/tags';

const getTag = async (id: string): Promise<Tag> => {
    const item: Tag = new Tag();
    item.id = id;
    return dbContext.get(item);
};

export default getTag;