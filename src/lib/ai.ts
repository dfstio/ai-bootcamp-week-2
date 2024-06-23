"use server";

import OpenAI from "openai";

// generate completion with OpenAI

export async function completion(prompt: string): Promise<string> {
  const openai = new OpenAI();
  const messages: any[] = [
    {
      role: "system",
      content:
        "You are a helpful assistant. Generate a great joke using the user's taste provided by the user",
      name: "system",
    },
    { role: "user", content: prompt, name: "user" },
  ];
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages,
  });
  console.log("ChatGPT full log", completion);

  const answer = completion?.choices[0]?.message.content;
  console.log("ChatGPT answer", answer);
  return (
    answer ??
    "ChatGPT could not generate a joke for this request. Please try again."
  );
}

export async function evaluate(joke: string): Promise<string> {
  const openai = new OpenAI();
  const messages: any[] = [
    {
      role: "system",
      content:
        "You are a helpful assistant. Evaluate if the joke is funny or not",
      name: "system",
    },
    { role: "user", content: joke, name: "user" },
  ];
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages,
  });
  console.log("ChatGPT full log", completion);

  const answer = completion?.choices[0]?.message.content;
  console.log("ChatGPT answer", answer);
  return answer ?? "ChatGPT could not evaluate a joke. Please try again.";
}
