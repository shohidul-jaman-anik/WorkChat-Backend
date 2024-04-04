const zod = require('zod');
const { z } = zod;

const SuggestionAndReportValidation = z.object({
  body: z.object({
    userId: z.string().refine(value => value !== undefined, { message: 'Required' }),
    type: z.enum(['Feedback', 'Issue']),
    message: z.string().refine(value => value.trim() !== '', {
      message: 'Message is required',
    }),
    resolved: z.boolean().default(false),
  }),
});

module.exports = SuggestionAndReportValidation;
