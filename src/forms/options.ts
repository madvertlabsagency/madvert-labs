/** Plain constants shared by forms and schemas. Kept free of zod so client forms stay light. */
export const investmentOptions = [
  "Under 2,000 USD per month",
  "2,000 to 5,000 USD per month",
  "5,000 to 10,000 USD per month",
  "10,000 USD or more per month",
  "Not sure yet",
] as const;
