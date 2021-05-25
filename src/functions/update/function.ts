import dbContext from '@dbModel/dbContext';
import Tag from '@dbModel/tables/tags';


const update = async (item: Tag): Promise<Tag> => {
    return dbContext.update(item, { onMissing: 'skip' });
};

export default update;