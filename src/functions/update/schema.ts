export default {
    type: 'object',
    properties: {
        name: { type: 'string' },
        description: { type: 'string' }
    },
    required: ['id', 'name']
} as const;