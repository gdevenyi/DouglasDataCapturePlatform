import React from 'react';

import { ArrayFormField } from '@ddcp/common';

import { Button } from '../Button';

import { PrimitiveFormField, PrimitiveFormFieldProps } from './PrimitiveFormField';
import { BaseFieldProps, NullableArrayFieldValue, NullablePrimitiveFieldValue } from './types';
import { DEFAULT_PRIMITIVE_VALUES } from './utils';

export type ArrayFieldProps = BaseFieldProps<NullableArrayFieldValue> & ArrayFormField;

export const ArrayField = ({ label, fieldset, value: arrayValue, setValue: setArrayValue }: ArrayFieldProps) => {
  const appendField = () => {
    setArrayValue([
      ...arrayValue,
      Object.fromEntries(
        Object.keys(fieldset).map((fieldName) => [fieldName, DEFAULT_PRIMITIVE_VALUES[fieldset[fieldName].kind]])
      )
    ]);
  };

  const removeField = () => {
    if (arrayValue.length > 1) {
      arrayValue.pop();
      setArrayValue(arrayValue);
    }
  };

  return (
    <div>
      <span className="field-header">{label}</span>
      {arrayValue.map((fields, i) =>
        Object.keys(fields).map((fieldName) => {
          const props = {
            name: fieldName + i,
            value: fields[fieldName],
            setValue: (value: NullablePrimitiveFieldValue) => {
              const newArrayValue = [...arrayValue];
              newArrayValue[i][fieldName] = value;
              setArrayValue(newArrayValue);
            },
            ...fieldset[fieldName]
          };
          return <PrimitiveFormField key={fieldName} {...(props as PrimitiveFormFieldProps)} />;
        })
      )}
      <div className="mb-5 flex gap-5">
        <Button label="Append" type="button" onClick={appendField} />
        <Button label="Remove" type="button" onClick={removeField} />
      </div>
    </div>
  );
};
