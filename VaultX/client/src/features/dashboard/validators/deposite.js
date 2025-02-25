import z from 'zod';

const depositSchema = z.object({
  amount: z
    .number({
      required_error: 'Amount is required',
      invalid_type_error: 'Amount must be a number',
    })
    .min(0.01, {message: 'Minimum amount must be 0.01'})
    .max(100000, {message: 'Maximum amount must be 100000'})
    .refine(
      amount => {
        const decimalCount = (amount.toString().split('.')[1] || '').length;
        return decimalCount <= 2;
      },
      {message: 'Amount must have up to two decimal digits'},
    ),
});

export default depositSchema;
