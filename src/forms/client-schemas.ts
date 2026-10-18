import { zodResolver } from "@hookform/resolvers/zod";
import type { Resolver } from "react-hook-form";
import { z } from "zod";
import { challengeFields, growthBriefFields, resourceRequestFields } from "./schemas";

/**
 * Client-side validation for the public forms. Imported only through `lazyResolver`, so zod is
 * a separate chunk loaded on first interaction (the API routes still validate everything).
 */
const honeypot = { website_confirm: z.string().optional() };

export const contactSchema = growthBriefFields.extend(honeypot);
export const challengeSchema = challengeFields.extend(honeypot);
export const resourceSchema = resourceRequestFields.extend(honeypot);

export type ContactValues = z.input<typeof contactSchema>;
export type ChallengeValues = z.input<typeof challengeSchema>;
export type ResourceValues = z.input<typeof resourceSchema>;

export const contactResolver = zodResolver(contactSchema) as unknown as Resolver<ContactValues>;
export const challengeResolver = zodResolver(challengeSchema) as unknown as Resolver<ChallengeValues>;
export const resourceResolver = zodResolver(resourceSchema) as unknown as Resolver<ResourceValues>;
