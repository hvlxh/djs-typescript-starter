export interface Configure {
  token: string;
  db?: string;
  global?: boolean | true;
}

export const config: Configure = {
  token: "", // Bot Token
  global: true, // If you gonna register the interactions globally
};
