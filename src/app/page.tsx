'use client';
const FlowStep = ({ number, title, description, isActive = false }: { 
  number: number; 
  title: string; 
  description: string; 
  isActive?: boolean;
}) => (
  <div className={`flex items-start space-x-4 p-6 rounded-lg border transition-all ${
    isActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
  }`}>
    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${
      isActive ? 'bg-blue-500' : 'bg-gray-400'
    }`}>
      {number}
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600 mt-1">{description}</p>
    </div>
  </div>
);

export default function FlowOverview() {

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          STUF Form Configuration Flow
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Demonstrating the complete flow from Trust architect configuration to project participant form completion,
          comparing two leading schema-based form libraries.
        </p>
      </div>

      <div className="space-y-6 mb-12">
        <FlowStep
          number={1}
          title="Widget Selection & Configuration (Django Admin)"
          description="Trust architect selects from pre-built widgets (e.g., IP Ownership Declaration, File Classification, Access Controls) and configures them in the STUF admin panel. These widgets are composed into project-specific forms based on anticipated needs."
        />
        
        <FlowStep
          number={2}
          title="Widget Composition & Schema Storage (Minio)"
          description="The composed form (containing multiple configured widgets) is serialized as JSON Schema and UI Schema, then saved to the object store (Minio) associated with the STUF instance."
        />
        
        <FlowStep
          number={3}
          title="User Authentication (Keycloak IDP)"
          description="Project participant authenticates through Keycloak as the Identity Provider before accessing the STUF SPA."
        />
        
        <FlowStep
          number={4}
          title="Schema Retrieval & Validation"
          description="The STUF SPA fetches the form configuration from the object store, validates the JSON schema, and prepares the form for rendering."
        />
        
        <FlowStep
          number={5}
          title="Dynamic Widget Rendering"
          description="The composed form renders each configured widget using the chosen library (react-jsonschema-form or JSON Forms). Each widget maintains its conditional logic, validation, and styling."
        />
        
        <FlowStep
          number={6}
          title="Form Completion & Submission"
          description="Project participant completes all required fields. Form validation ensures data integrity before allowing document upload."
        />
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold mb-4">
            <a 
              href="https://www.npmjs.com/package/@rjsf/core" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-900 hover:text-blue-600 transition-colors duration-200"
            >
              React JSON Schema Form (RJSF)
            </a>
          </h2>
          <div className="space-y-3 text-gray-600">
            <p><strong>Approach:</strong> Schema-driven with dependencies and oneOf for conditionals</p>
            <p><strong>UI Customization:</strong> uiSchema for presentation tweaks and UI widget selection</p>
            <p><strong>Conditional Logic:</strong> JSON Schema dependencies with validation-first approach</p>
            <p><strong>Strength:</strong> Fast implmentation, mature ecosystem, JSON Schema compliance</p>
            <p><strong>Complexity Handling:</strong> Nested conditionals via schema structure</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6 relative">
          <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
            Recommended
          </div>
          <h2 className="text-2xl font-semibold mb-4">
            <a 
              href="https://www.npmjs.com/package/@jsonforms/core" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-900 hover:text-blue-600 transition-colors duration-200"
            >
              JSON Forms
            </a>
          </h2>
          <div className="space-y-3 text-gray-600">
            <p><strong>Approach:</strong> Separate data schema and UI schema with explicit rules</p>
            <p><strong>UI Customization:</strong> Rich layout system with Groups, VerticalLayout, etc.</p>
            <p><strong>Conditional Logic:</strong> Rule-based visibility and effects in UI schema</p>
            <p><strong>Strength:</strong> Flexible layouts, explicit conditional logic, cleaner separation</p>
            <p><strong>Complexity Handling:</strong> Rules with scopes and conditions for chained logic</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Widget Demo: IP Ownership Declaration</h3>
        <p className="text-blue-800 mb-4">
          Both demos showcase the same pre-built widget that Trust architects can configure and add to any form:
        </p>
        <ul className="text-blue-800 space-y-2 list-disc list-inside">
          <li><strong>Widget Purpose:</strong> Captures intellectual property ownership for uploaded files</li>
          <li><strong>Conditional Logic:</strong> File type determines if IP ownership fields appear</li>
          <li><strong>Nested Dependencies:</strong> Third-party ownership reveals explanation and license fields</li>
          <li><strong>Dynamic Validation:</strong> Context-aware validation based on selections</li>
          <li><strong>Reusable:</strong> Can be added to document upload, code submission, or publication forms</li>
        </ul>
      </div>

      <div className="text-center mt-12">
        <p className="text-gray-600 text-lg">
          Navigate to the demo pages above to see how both libraries handle the same configured widget with identical functionality.
        </p>
      </div>
    </div>
  );
}
