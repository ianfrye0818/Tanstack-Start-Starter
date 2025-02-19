import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useController } from 'react-hook-form';
import { z } from 'zod';
import { Textarea } from '../ui/textarea';
import { FormInputItemProps } from './form-input-item';

export function FormTextAreaItem<T extends z.ZodTypeAny>({
  control,
  name,
  label,
  labelClassName,
  placeholder,
  required = false,
  rows = 5,
}: FormInputItemProps<T> & { rows?: number; labelClassName?: string }) {
  const { field } = useController({
    name,
    control,
  });
  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          {label && (
            <FormLabel className={labelClassName}>
              {label} {required && <span className='text-red-500'>*</span>}
            </FormLabel>
          )}
          <FormControl>
            <Textarea
              rows={rows}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
