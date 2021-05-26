import dbContext from '@dbModel/dbContext';
import Tag from '@dbModel/tables/tags';


const createTag = async (item: Tag): Promise<Tag> => {
    return dbContext.put(item);
};

export default createTag;