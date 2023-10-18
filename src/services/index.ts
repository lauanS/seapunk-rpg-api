export interface Service {
  execute(params: unknown): Promise<string|{ message: string, value: unknown }>;
}
