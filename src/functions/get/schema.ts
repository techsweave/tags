export default {
    type: 'object',
    properties: {
        limit: { type: 'number' },
        pageSize: { type: 'number' },
        // readConsistency: { type: 'string' },
        startKey: {
            type: 'object',
            properties: {
                id: { type: 'string' }
            },
            required: ['id']
        }
    },
    required: ['limit']
} as const;