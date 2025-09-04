/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { toast } from 'sonner';
import { SchemaService } from '@/services/schemaService';
import { SchemaConfig, FormData } from '@/types/schema';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    <span className="ml-3 text-gray-600">Loading schema from Minio...</span>
  </div>
);

const ErrorMessage = ({ message }: { message: string }) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
    <div className="flex">
      <div className="text-red-400">
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="ml-3">
        <h3 className="text-sm font-medium text-red-800">Error</h3>
        <p className="mt-2 text-sm text-red-700">{message}</p>
      </div>
    </div>
  </div>
);

const SuccessMessage = ({ submissionId }: { submissionId: string }) => (
  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
    <div className="flex">
      <div className="text-green-400">
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="ml-3">
        <h3 className="text-sm font-medium text-green-800">Form Submitted Successfully</h3>
        <p className="mt-2 text-sm text-green-700">Submission ID: {submissionId}</p>
        <p className="mt-1 text-sm text-green-700">Project participant can now proceed with document upload.</p>
      </div>
    </div>
  </div>
);

export default function RJSFDemo() {
  const [schema, setSchema] = useState<SchemaConfig | null>(null);
  const [formData, setFormData] = useState<FormData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{ success: boolean; submissionId?: string; errors?: string[] } | null>(null);
  const [activeTab, setActiveTab] = useState<'formData' | 'jsonSchema' | 'uiSchema'>('formData');

  useEffect(() => {
    const fetchSchema = async () => {
      try {
        setLoading(true);
        const schemaConfig = await SchemaService.fetchSchemaById('ip-ownership-declaration');
        if (schemaConfig) {
          setSchema(schemaConfig);
        } else {
          setError('Schema not found in Minio bucket');
        }
      } catch (err) {
        setError('Failed to fetch schema from Minio bucket');
      } finally {
        setLoading(false);
      }
    };

    fetchSchema();
  }, []);

  const handleSubmit = async (data: any, event?: React.FormEvent) => {
    try {
      setSubmitting(true);
      setSubmissionResult(null);
      
      const result = await SchemaService.submitFormData('ip-ownership-declaration', data.formData);
      setSubmissionResult(result);
      
      if (result.success) {
        setFormData({});
        toast.success('Form submitted successfully!', {
          description: `Submission ID: ${result.submissionId}`
        });
      } else if (result.errors) {
        // Scroll to top of page to show errors
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err) {
      setSubmissionResult({
        success: false,
        errors: ['Failed to submit form data']
      });
      // Scroll to top of page to show errors
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleError = (errors: any) => {
    console.log('Form validation errors:', errors);
    // Scroll to top of page to show error messages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChange = (data: any) => {
    setFormData(data.formData);
    if (submissionResult) {
      setSubmissionResult(null);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !schema) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <ErrorMessage message={error || 'Schema not available'} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">React JSON Schema Form Demo</h1>
        <p className="text-lg text-gray-600 mb-6">
          This demo shows RJSF rendering the IP Ownership Declaration widget that a Trust architect configured and added to this form.
          The widget maintains its complex conditional logic through JSON Schema dependencies and oneOf structures.
        </p>
        
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">RJSF Widget Implementation:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Pre-built widget with embedded conditional logic via JSON Schema</li>
            <li>• Trust architect configures widget behavior through uiSchema</li>
            <li>• Dependencies and oneOf structures handle complex field interactions</li>
            <li>• Widget can be embedded in any RJSF form with consistent behavior</li>
          </ul>
        </div>
      </div>

      {submissionResult?.success && (
        <SuccessMessage submissionId={submissionResult.submissionId!} />
      )}

      {submissionResult?.errors && (
        <div className="mb-6">
          <ErrorMessage message={submissionResult.errors.join(', ')} />
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{schema.name}</h2>
        <p className="text-gray-600 mb-6">{schema.description}</p>
        
        <div className="rjsf-form">
          <Form
            schema={schema.jsonSchema as any}
            uiSchema={schema.rjsfUiSchema}
            formData={formData}
            validator={validator}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onError={handleError}
            disabled={submitting}
          >
            <div className="flex gap-3 mt-6">
              <button
                type="submit"
                disabled={submitting}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {submitting ? 'Submitting...' : 'Submit Declaration'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormData({});
                  setSubmissionResult(null);
                }}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors"
              >
                Reset Form
              </button>
            </div>
          </Form>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('formData')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'formData'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Form Data
            </button>
            <button
              onClick={() => setActiveTab('jsonSchema')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'jsonSchema'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              JSON Schema
            </button>
            <button
              onClick={() => setActiveTab('uiSchema')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'uiSchema'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              UI Schema
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {activeTab === 'formData' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Form Data (JSON)</h3>
              <pre className="text-sm overflow-auto">
                {JSON.stringify(formData, null, 2)}
              </pre>
            </div>
          )}
          
          {activeTab === 'jsonSchema' && schema && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">JSON Schema</h3>
              <pre className="text-sm overflow-auto">
                {JSON.stringify(schema.jsonSchema, null, 2)}
              </pre>
            </div>
          )}
          
          {activeTab === 'uiSchema' && schema && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">RJSF UI Schema</h3>
              <pre className="text-sm overflow-auto">
                {JSON.stringify(schema.rjsfUiSchema, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}