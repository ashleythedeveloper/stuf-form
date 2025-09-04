import { SchemaConfig } from '@/types/schema';
import { UISchemaElement } from '@jsonforms/core';

export const ipOwnershipSchema: SchemaConfig = {
  id: 'ip-ownership-declaration',
  name: 'IP Ownership Declaration Widget',
  description: 'Pre-built widget for capturing intellectual property ownership information. Trust architects can add this widget to document upload.',
  
  jsonSchema: {
    type: 'object',
    title: 'IP Ownership Declaration',
    properties: {
      fileType: {
        type: 'string',
        title: 'File Type',
        enum: ['Source Code', 'Documentation', 'Other'],
        default: 'Documentation'
      },
      ipOwnershipGroup: {
        type: 'object',
        title: 'IP Ownership Details',
        properties: {
          ownership: {
            type: 'string',
            title: 'Ownership Type',
            enum: ['Personal Work', 'Employer-Owned', 'Third-Party', "Don't Know"]
          },
          explanation: {
            type: 'string',
            title: 'Explanation (required for Third-Party or Don\'t Know)',
            minLength: 1
          },
          legallyBinding: {
            type: 'boolean',
            title: 'Make this declaration legally binding?',
            default: false
          },
          legalText: {
            type: 'string',
            title: 'Custom Legal Text',
            minLength: 1
          },
          licenseGroup: {
            type: 'object',
            title: 'License Conditions',
            properties: {
              licenseType: {
                type: 'string',
                title: 'License Type',
                enum: ['Proprietary', 'Open Source', 'Public Domain', 'Other']
              },
              freeText: {
                type: 'string',
                title: 'Specify License Details',
                minLength: 1
              }
            }
          }
        }
      }
    },
    required: ['fileType'],
    dependencies: {
      fileType: {
        oneOf: [
          {
            properties: {
              fileType: { enum: ['Source Code'] },
              ipOwnershipGroup: { required: ['ownership'] }
            }
          },
          {
            properties: {
              fileType: { enum: ['Documentation', 'Other'] }
            }
          }
        ]
      }
    }
  },

  rjsfUiSchema: {
    fileType: {
      'ui:widget': 'select',
      'ui:description': 'Select the type of file you are uploading'
    },
    ipOwnershipGroup: {
      'ui:options': { expandable: true },
      ownership: { 
        'ui:widget': 'select',
        'ui:description': 'Select who owns the intellectual property'
      },
      explanation: { 
        'ui:widget': 'textarea',
        'ui:description': 'Required for Third-Party or Don\'t Know selections',
        'ui:options': { rows: 3 }
      },
      legallyBinding: {
        'ui:description': 'Check this to make the declaration legally binding'
      },
      legalText: { 
        'ui:widget': 'textarea',
        'ui:description': 'Enter custom legal text if making this legally binding',
        'ui:options': { rows: 4 }
      },
      licenseGroup: {
        'ui:description': 'License details for third-party content',
        licenseType: { 
          'ui:widget': 'select' 
        },
        freeText: { 
          'ui:widget': 'textarea',
          'ui:description': 'Provide additional license details if needed',
          'ui:options': { rows: 3 }
        }
      }
    }
  },

  jsonFormsUiSchema: ({
    type: 'VerticalLayout',
    elements: [
      {
        type: 'Control',
        scope: '#/properties/fileType',
        options: {
          format: 'radio'
        }
      },
      {
        type: 'Group',
        label: 'IP Ownership Details',
        elements: [
          {
            type: 'Control',
            scope: '#/properties/ipOwnershipGroup/properties/ownership'
          },
          {
            type: 'Control',
            scope: '#/properties/ipOwnershipGroup/properties/explanation',
            options: {
              multi: true
            },
            rule: {
              effect: 'SHOW' as const,
              condition: {
                scope: '#/properties/ipOwnershipGroup/properties/ownership',
                schema: { enum: ['Third-Party', "Don't Know"] }
              }
            }
          },
          {
            type: 'Control',
            scope: '#/properties/ipOwnershipGroup/properties/legallyBinding'
          },
          {
            type: 'Control',
            scope: '#/properties/ipOwnershipGroup/properties/legalText',
            options: {
              multi: true
            },
            rule: {
              effect: 'SHOW' as const,
              condition: {
                scope: '#/properties/ipOwnershipGroup/properties/legallyBinding',
                schema: { const: true }
              }
            }
          },
          {
            type: 'Group',
            label: 'License Conditions',
            elements: [
              {
                type: 'Control',
                scope: '#/properties/ipOwnershipGroup/properties/licenseGroup/properties/licenseType'
              },
              {
                type: 'Control',
                scope: '#/properties/ipOwnershipGroup/properties/licenseGroup/properties/freeText',
                options: {
                  multi: true
                },
                rule: {
                  effect: 'SHOW' as const,
                  condition: {
                    scope: '#/properties/ipOwnershipGroup/properties/licenseGroup/properties/licenseType',
                    schema: { enum: ['Other'] }
                  }
                }
              }
            ],
            rule: {
              effect: 'SHOW' as const,
              condition: {
                scope: '#/properties/ipOwnershipGroup/properties/ownership',
                schema: { enum: ['Third-Party'] }
              }
            }
          }
        ],
        rule: {
          effect: 'SHOW' as const,
          condition: {
            scope: '#/properties/fileType',
            schema: { enum: ['Source Code'] }
          }
        }
      }
    ]
  } as UISchemaElement)
};