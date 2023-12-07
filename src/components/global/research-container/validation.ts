import * as z from 'zod';

export const messageFormSchema = z.object({
  message: z.string({ required_error: 'This field is required.' }),
});
