import React, { useMemo, useState } from 'react';

import { FormFields, FormInstrumentContent, FormInstrumentData } from '@ddcp/common';
import { JSONSchemaType } from 'ajv';
import { clsx } from 'clsx';
import { useTranslation } from 'react-i18next';

import { Button } from '../Button';

import { ArrayField, ArrayFieldProps } from './ArrayField';
import { PrimitiveFormField, PrimitiveFormFieldProps } from './PrimitiveFormField';
import { FormErrors, FormValues, NullableArrayFieldValue, NullablePrimitiveFieldValue } from './types';
import { getDefaultValues } from './utils';

import { ajv } from '@/services/ajv';

export interface FormProps<T extends FormInstrumentData> {
  content: FormInstrumentContent<T>;
  className?: string;
  initialValues?: FormValues<T> | null;
  submitBtnLabel?: string;
  validationSchema: JSONSchemaType<T>;
  onSubmit: (data: T) => void;
}

export const Form = <T extends FormInstrumentData>({
  content,
  className,
  initialValues,
  submitBtnLabel,
  validationSchema,
  onSubmit
}: FormProps<T>) => {
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [values, setValues] = useState<FormValues<T>>(() => initialValues ?? getDefaultValues(content));

  const { t } = useTranslation('form');

  const reset = () => {
    setValues(getDefaultValues(content));
    setErrors({});
  };
  const validate = useMemo(() => ajv.compile(validationSchema), [validationSchema]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const valid = validate(values);
    if (valid) {
      reset();
      onSubmit(values as T);
    } else {
      validate.errors?.forEach((error) => {
        const path = error.instancePath.split('/').filter((e) => e);
        const errorMessage = `${error.message ?? 'Unknown Error'}`;
        setErrors((prevErrors) => {
          return { ...prevErrors, [path[0]]: errorMessage };
        });
      });
    }
  };

  const renderFormFields = (fields: FormFields<T>): JSX.Element[] => {
    const formFields: JSX.Element[] = [];
    for (const fieldName in fields) {
      const props = {
        name: fieldName,
        value: values[fieldName],
        setValue: (value: NullablePrimitiveFieldValue | NullableArrayFieldValue) => {
          setValues((prevValues) => ({ ...prevValues, [fieldName]: value }));
        },
        ...fields[fieldName]
      };
      if (props.kind === 'array') {
        formFields.push(<ArrayField key={fieldName} {...(props as ArrayFieldProps)} />);
      } else {
        formFields.push(<PrimitiveFormField key={fieldName} {...(props as PrimitiveFormFieldProps)} />);
      }
    }
    return formFields;
  };

  return (
    <form autoComplete="off" className={clsx('w-full', className)} onSubmit={handleSubmit}>
      {Array.isArray(content)
        ? content.map((fieldGroup, i) => {
            return (
              <div className="font-semibold" key={i}>
                <h3>{fieldGroup.title}</h3>
                {renderFormFields(fieldGroup.fields as FormFields<T>)}
              </div>
            );
          })
        : renderFormFields(content)}
      <div className="w-full">
        <Button className="w-full" label={submitBtnLabel ?? t('submit')} type="submit" />
      </div>
    </form>
  );
};
