import dbContext from '@dbModel/dbContext';
import Tag from '@dbModel/tables/tags';
import { ScanOptions } from '@aws/dynamodb-data-mapper';


const scanTag = async (filter: any): Promise<{
    items: Tag[],
    lastKey: Partial<Tag>
}> => {
    let items: Tag[] = [];
    let lastKey: Partial<Tag>;
    const dbFilter: ScanOptions = {
        limit: filter.limit,
        startKey: filter.startKey ? {
            id: filter.startKey
        } : undefined,
        readConsistency: 'strong'
    };

    const paginator = dbContext.scan(Tag, dbFilter).pages();

    for await (const page of paginator) {
        items = items.concat(page);
        lastKey = paginator.lastEvaluatedKey;
    }


    return Promise.resolve({
        items: items,
        lastKey: lastKey
    });
};

export default scanTag;
