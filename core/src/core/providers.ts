import { timeProvider } from "../providers/time.ts";
import { IAgentRuntime, State, type Memory, type Provider } from "./types.ts";

export const defaultProviders: Provider[] = [timeProvider];

/**
 * Formats provider outputs into a string which can be injected into the context.
 * @param runtime The AgentRuntime object.
 * @param message The incoming message object.
 * @param state The current state object.
 * @returns A string that concatenates the outputs of each provider.
 */
export async function getProviders(
    runtime: IAgentRuntime,
    message: Memory,
    state?: State
) {
    const providerResults = await Promise.all(
        runtime.providers.map(async (provider) => {
            return await provider.get(runtime, message, state);
        })
    );

    return providerResults.join("\n");
}