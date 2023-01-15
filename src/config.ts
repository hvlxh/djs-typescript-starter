export interface Configure {
  token: string;
  db?: string;
  global?: boolean | true;
}

export const config: Configure = {
  token:
    "OTg5NDY1MjMwODU5OTg5MDI0.Gle0K8.jSkMIxpPIkt4v7XmzFTsjTOyBlYCqJIsjkLwDM", // Bot Token
  global: true, // If you gonna register the interactions globally
};
