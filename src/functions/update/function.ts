import dbContext from '@dbModel/dbContext';
import Tag from '@dbModel/tables/tags';
import getTag from '@functions/get/function';


const updateTag = async (item: Tag): Promise<Tag> => {
    await getTag(item.id);
    return dbContext.update(item, { onMissing: 'skip' });
};

export default updateTag;