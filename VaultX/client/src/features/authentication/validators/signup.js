import z from 'zod';

const signupSchema = z
  .object({
    name: z
      .string({required_error: 'Name is required'})
      .min(3, 'Name must be at least 3 characters')
      .max(255, 'Name must be at most 255 characters'),

    email: z.string({required_error: 'Email is required'}).email(),

    password: z
      .string({required_error: 'Password is required'})
      .min(
        6,
        'Password must have at least 6 characters, one uppercase letter, one lowercase letter, one digit, and one special character.',
      )
      .refine(password => {
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
        return passwordRegex.test(password);
      }, 'Password must have at least 6 characters, one uppercase letter, one lowercase letter, one digit, and one special character.'),

    confirmPassword: z.string({
      required_error: 'Confirm Password is required',
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export default signupSchema;
