import Anthropic from "@anthropic-ai/sdk";

export async function POST(req: Request) {
  const { jd, resume } = await req.json();

  if (!jd || typeof jd !== "string" || jd.length > 5000) {
    return Response.json({ error: "Invalid job description" }, { status: 400 });
  }
  if (!resume || typeof resume !== "string" || resume.length > 8000) {
    return Response.json({ error: "Invalid resume text" }, { status: 400 });
  }

  const client = new Anthropic();
  const msg = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1500,
    messages: [
      {
        role: "user",
        content: `Analyze this resume against the job description. Return ONLY valid JSON with keys: score (0-100 number), matchedKeywords (array of strings found in both), missingKeywords (array of important JD keywords missing from resume), strengths (array of 3-4 strings), suggestions (array of 4-5 actionable improvement strings).\n\nJOB DESCRIPTION:\n${jd}\n\nRESUME:\n${resume}`,
      },
    ],
  });

  const text = (msg.content[0] as { type: string; text: string }).text;
  const json = JSON.parse(text.match(/\{[\s\S]*\}/)?.[0] ?? "{}");
  return Response.json(json);
}
