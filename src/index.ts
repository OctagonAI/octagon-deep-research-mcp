#!/usr/bin/env node

import type { RequestHandlerExtra } from "@modelcontextprotocol/sdk/shared/protocol.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import type { ServerNotification, ServerRequest } from "@modelcontextprotocol/sdk/types.js";
import dotenv from "dotenv";
import { readFile } from "fs/promises";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";
import { z } from "zod";

// Get package.json info
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageJsonPath = path.join(__dirname, "..", "package.json");
const packageJsonContent = await readFile(packageJsonPath, "utf8");
const packageInfo = JSON.parse(packageJsonContent) as { name: string; version: string };

// Load environment variables
dotenv.config();

// Check for required environment variables
const OCTAGON_API_KEY = process.env.OCTAGON_API_KEY;
const OCTAGON_API_BASE_URL = process.env.OCTAGON_API_BASE_URL || "https://api.octagonagents.com/v1";

if (!OCTAGON_API_KEY) {
  console.error("Error: OCTAGON_API_KEY is not set in the environment variables");
  console.error("Please set the OCTAGON_API_KEY environment variable or use 'env OCTAGON_API_KEY=your_key npx -y octagon-deep-research-mcp'");
  process.exit(1);
}

// Initialize OpenAI client with Octagon API
const octagonClient = new OpenAI({
  apiKey: OCTAGON_API_KEY,
  baseURL: OCTAGON_API_BASE_URL,
  defaultHeaders: {
    "User-Agent": `${packageInfo.name}/${packageInfo.version} (Node.js/${process.versions.node})`
  },
});

// Create MCP server
const server = new McpServer({
  name: packageInfo.name,
  version: packageInfo.version,
});

// Helper function to process streaming responses
async function processStreamingResponse(stream: any): Promise<string> {
  let fullResponse = "";
  let citations: any[] = [];

  try {
    // Process the streaming response
    for await (const chunk of stream) {
      // For Chat Completions API
      if (chunk.choices && chunk.choices[0]?.delta?.content) {
        fullResponse += chunk.choices[0].delta.content;

        // Check for citations in the final chunk
        if (chunk.choices[0]?.finish_reason === "stop" && chunk.choices[0]?.citations) {
          citations = chunk.choices[0].citations;
        }
      }

      // For Responses API
      if (chunk.type === "response.output_text.delta") {
        fullResponse += chunk.text?.delta || "";
      }
    }

    return fullResponse;
  } catch (error) {
    console.error("Error processing streaming response:", error);
    throw error;
  }
}

// Heartbeat helper for long-running tool calls (keeps transport alive, reduces client timeouts)
interface HeartbeatContext {
  sendLog: (message: string) => Promise<void>;
  sendProgress?: (progress: number, message: string) => Promise<void>;
}

const SPINNER_FRAMES = ["|", "/", "-", "\\"];

function startHeartbeat(ctx: HeartbeatContext): () => void {
  const startTime = Date.now();
  let tick = 0;

  const intervalId = setInterval(async () => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const frame = SPINNER_FRAMES[tick % SPINNER_FRAMES.length];
    const message = `${frame} Processing... (${elapsed}s)`;
    tick++;

    try {
      await ctx.sendLog(message);
      if (ctx.sendProgress) {
        await ctx.sendProgress(tick, message);
      }
    } catch {
      // Swallow errors -- heartbeat is best-effort
    }
  }, 1_000);

  return () => clearInterval(intervalId);
}

// Define a schema for the 'prompt' parameter that all tools will use
const promptSchema = z.object({
  prompt: z.string().describe("Your natural language query or request for the agent"),
});

type PromptParams = {
  prompt: string;
};

// Deep Research Agent - The core agent for comprehensive research
server.tool(
  "octagon-deep-research-agent",
  "A specialized agent for deep research and comprehensive analysis across any topic or domain. Capabilities: Multi-source data aggregation, web scraping, academic research synthesis, competitive analysis, market intelligence, technical analysis, policy research, trend analysis, and comprehensive report generation. Best for: Any research question requiring comprehensive, multi-source analysis and synthesis. Example queries: 'Research the current state of quantum computing development and commercial applications', 'Analyze the competitive landscape in the electric vehicle market focusing on battery technology and supply chains', 'Investigate recent developments in AI regulation across different countries and their potential impact', 'Research sustainable agriculture practices and their adoption rates globally', 'Analyze the gig economy's impact on traditional employment models', 'Study the evolution of remote work policies post-pandemic and their effectiveness', 'Research breakthrough medical treatments for Alzheimer's disease in the last 3 years', 'Investigate cybersecurity threats in IoT devices and mitigation strategies', 'Analyze renewable energy adoption trends and policy drivers worldwide', 'Research the impact of social media algorithms on information consumption patterns'.",
  {
    prompt: z.string().describe("Your natural language query or request for the agent"),
  },
  async ({ prompt }: PromptParams, extra: RequestHandlerExtra<ServerRequest, ServerNotification>) => {
    const sendLog = (message: string) =>
      extra.sendNotification({
        method: "notifications/message",
        params: { level: "info", data: message },
      });

    const progressToken = extra._meta?.progressToken;
    const sendProgress = progressToken
      ? (progress: number, message: string) =>
          extra.sendNotification({
            method: "notifications/progress",
            params: { progressToken, progress, total: 0, message },
          })
      : undefined;

    const stopHeartbeat = startHeartbeat({ sendLog, sendProgress });
    try {
      const response = await octagonClient.chat.completions.create({
        model: "octagon-deep-research-agent",
        messages: [{ role: "user", content: prompt }],
        stream: true,
        metadata: { tool: "mcp" }
      });

      const result = await processStreamingResponse(response);
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error("Error calling Deep Research agent:", error);
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `Error: Failed to process deep research query. ${error}`,
          },
        ],
      };
    } finally {
      stopHeartbeat();
    }
  }
);

// Start the server with stdio transport
async function main() {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
  } catch (error) {
    process.exit(1);
  }
}

main(); 
