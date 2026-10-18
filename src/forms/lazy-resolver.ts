import type { FieldValues, Resolver } from "react-hook-form";

/**
 * A react-hook-form resolver whose validation library (zod) is downloaded only when the form is
 * first used, instead of with the page. Call `preload()` on first focus so validation is ready by
 * the time the visitor leaves the first field.
 */
export function lazyResolver<T extends FieldValues>(load: () => Promise<Resolver<T>>) {
  let pending: Promise<Resolver<T>> | null = null;
  const preload = () => (pending ??= load());
  const resolver: Resolver<T> = async (values, context, options) => (await preload())(values, context, options);
  return { resolver, preload };
}
