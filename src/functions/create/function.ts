import dbContext from '@dbModel/dbContext';
import Tag from '@dbModel/tables/tags';


const create = async (item: Tag): Promise<Tag> => {
    return dbContext.put(item);
};

export default create;