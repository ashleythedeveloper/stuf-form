/* eslint-disable @typescript-eslint/no-explicit-any */
import { SchemaConfig, MockMinioResponse } from '@/types/schema';
import { ipOwnershipSchema } from '@/data/mockSchemas';

export class SchemaService {
  private static readonly MOCK_DELAY = 800;
  
  static async fetchSchemasFromMinio(): Promise<MockMinioResponse> {
    await this.mockDelay();
    
    return {
      schemas: [ipOwnershipSchema],
      lastModified: new Date().toISOString()
    };
  }
  
  static async fetchSchemaById(id: string): Promise<SchemaConfig | null> {
    await this.mockDelay();
    
    const response = await this.fetchSchemasFromMinio();
    return response.schemas.find(schema => schema.id === id) || null;
  }
  
  static async submitFormData(schemaId: string, data: any): Promise<{ success: boolean; submissionId?: string; errors?: string[] }> {
    await this.mockDelay();
    
    return {
      success: true,
      submissionId: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
  }
  
  private static mockDelay(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, this.MOCK_DELAY));
  }
  
}