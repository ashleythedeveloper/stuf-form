import { RJSFSchema, UiSchema } from '@rjsf/utils';
import { JsonSchema, UISchemaElement } from '@jsonforms/core';

export interface SchemaConfig {
  id: string;
  name: string;
  description: string;
  jsonSchema: JsonSchema;
  rjsfUiSchema: UiSchema;
  jsonFormsUiSchema: UISchemaElement;
}

export interface FormData {
  fileType?: string;
  ipOwnershipGroup?: {
    ownership?: string;
    explanation?: string;
    legallyBinding?: boolean;
    legalText?: string;
    licenseGroup?: {
      licenseType?: string;
      freeText?: string;
    };
  };
}

export interface MockMinioResponse {
  schemas: SchemaConfig[];
  lastModified: string;
}