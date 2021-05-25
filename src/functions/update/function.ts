import dbContext from '@dbModel/dbContext';
import Tag from '@dbModel/tables/tags';


const updateTag = async (item: Tag): Promise<Tag> => {
    return dbContext.update(item, { onMissing: 'skip' });
};

export default updateTag;