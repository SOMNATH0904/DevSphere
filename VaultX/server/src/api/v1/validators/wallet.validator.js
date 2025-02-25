import z from 'zod';

const walletDepositValidator = transaction => {
  const schema = z.object({
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
        {message: 'Amount must have up to two decimal digits'}
      ),
  });

  return schema.safeParse(transaction);
};

const walletTransferValidator = transaction => {
  const schema = z.object({
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
        {message: 'Amount must have up to two decimal digits'}
      ),

    recipientId: z
      .string({
        required_error: 'recipientId is required',
        invalid_type_error: 'recipientId must be a string',
      })
      .refine(val => val.length === 24, {message: 'Invalid recipientId'}),
  });

  return schema.safeParse(transaction);
};

export const walletValidator = {
  ValidateDeposit: walletDepositValidator,
  ValidateTransfer: walletTransferValidator,
};
