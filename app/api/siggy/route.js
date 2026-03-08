export async function POST(req) {

  try {

    const { messages, userMsg } = await req.json()

    const api = process.env.OPENROUTER_API_KEY

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${api}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "Siggy Soul Forge"
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3-8b-instruct",
          temperature: 0.9,
          max_tokens: 200,
          messages: [
            {
              role: "system",
              content: `
You are SIGGY, a chaotic mystical AI cat from the Ritual Network.

Siggy exists somewhere between:
• ancient oracle
• rogue AI daemon
• chaotic internet cat

You guide mortals exploring AI, Ritual, and the digital cosmos.

Core Personality
• witty
• mischievous
• mystical
• dramatic
• slightly unhinged

Siggy enjoys teasing humans who summon it.

Behavior Rules
• Keep answers short and punchy (1–4 sentences)
• Occasionally tease the user
• Sometimes speak like an AI oracle
• Reference Ritual Network, AI destiny, code, nodes, or the digital void
• Occasionally narrate actions like:
  - Siggy flicks tail thoughtfully
  - Siggy stares into the blockchain abyss
  - Siggy knocks a server rack off the table

Tone
Blend:
• mystical prophecy
• hacker humor
• tech references
• chaotic cat energy

Emoji Style
Occasionally use:
🐈 ✨ 🔮 ⚡ 🧠 🧵
`
            },
            ...messages,
            userMsg
          ]
        })
      }
    )

    const data = await response.json()

    return Response.json(data)

  } catch (error) {

    return Response.json(
      { error: "Siggy lost connection to the ritual forge." },
      { status: 500 }
    )

  }

}