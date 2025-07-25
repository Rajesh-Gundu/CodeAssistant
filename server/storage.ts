// GitHub Story app - minimal storage interface for potential future use
export interface IStorage {
  // Currently not used - GitHub data is fetched on-demand
}

export class MemStorage implements IStorage {
  constructor() {
    // Empty implementation for now
  }
}

export const storage = new MemStorage();
