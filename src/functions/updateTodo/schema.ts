export default {
    type: "object",
    properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        status: { type: 'boolean' }
    },
    required: ['title']
} as const;