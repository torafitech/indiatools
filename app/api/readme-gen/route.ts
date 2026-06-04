import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(req: Request) {
  let body: {
    projectName?: unknown;
    description?: unknown;
    techStack?: unknown;
    features?: unknown;
    installation?: unknown;
    usage?: unknown;
    license?: unknown;
  };

  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { projectName, description, techStack, features, installation, usage, license } = body;

  if (
    !projectName || typeof projectName !== "string" ||
    !description || typeof description !== "string" ||
    !techStack || typeof techStack !== "string" ||
    !features || typeof features !== "string"
  ) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  const msg = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2500,
    messages: [
      {
        role: "user",
        content: `Generate a complete, professional GitHub README.md for this project:
Project Name: ${projectName}
Description: ${description}
Tech Stack: ${techStack}
Key Features: ${features}
Installation: ${installation || ""}
Usage: ${usage || ""}
License: ${license || "MIT"}

Include: badges (shields.io format for tech stack), table of contents, About section, Features list, Installation steps, Usage with code example, Contributing section, License. Make it engaging and developer-friendly. Return only the markdown content, no explanation.`,
      },
    ],
  });

  const readme = (msg.content[0] as { type: string; text: string }).text;
  return Response.json({ readme });
}
