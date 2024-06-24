"use client";
/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/s0MaKqCMfwn
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:

import { Libre_Franklin } from 'next/font/google'

libre_franklin({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { completion, evaluate } from "@/lib/ai";
import { useState } from "react";

export default function Joke() {
  const [joke, setJoke] = useState<string | undefined>(undefined);
  const [topic, setTopic] = useState<string | undefined>(undefined);
  const [tone, setTone] = useState<string | undefined>(undefined);
  const [type, setType] = useState<string | undefined>(undefined);
  const [evaluation, setEvaluation] = useState<string | undefined>(undefined);
  const [temperature, setTemperature] = useState<number>(0.5);
  const [loading, setLoading] = useState<boolean>(false);
  const [evaluating, setEvaluating] = useState<boolean>(false);

  async function generateJoke() {
    const jokeDescription = `Generate a joke about a topic: ${
      topic ?? "random"
    }, with a tone: ${tone ?? "random"}, and a type: ${type ?? "random"}.`;
    console.log({ jokeDescription, temperature });
    setLoading(true);
    const joke = await completion(jokeDescription, temperature);
    setJoke(joke);
    setEvaluation(undefined);
    setLoading(false);
  }

  async function evaluateJoke() {
    setEvaluating(true);
    const evaluation = await evaluate(joke ?? "");
    setEvaluation(evaluation);
    setEvaluating(false);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-100 text-yellow-800">
      <div className="max-w-md w-full space-y-6 px-4">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">
            <a
              href="https://www.youtube.com/watch?v=3rn2N0ZbLEQ&list=FLPKjhz6DgpHII07qf0KNMGQ&index=265"
              target="_blank"
            >
              AI Joke Generator
            </a>
          </h1>
          <p className="text-yellow-600">
            Customize your perfect joke with our AI-powered generator.
          </p>
        </div>
        <Card className="bg-yellow-200">
          <CardHeader>
            <CardTitle>Generate a Joke</CardTitle>
            <CardDescription>
              Fill out the form to create your custom joke.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="topic">Topic</Label>
                <Select onValueChange={(value) => setTopic(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="comedy">Comedy</SelectItem>
                    <SelectItem value="puns">Puns</SelectItem>
                    <SelectItem value="dad-jokes">Dad Jokes</SelectItem>
                    <SelectItem value="dark-humor">Dark Humor</SelectItem>
                    <SelectItem value="random">Random</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tone">Tone</Label>
                <Select onValueChange={(value) => setTone(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="funny">Funny</SelectItem>
                    <SelectItem value="witty">Witty</SelectItem>
                    <SelectItem value="sarcastic">Sarcastic</SelectItem>
                    <SelectItem value="wholesome">Wholesome</SelectItem>
                    <SelectItem value="random">Random</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Joke Type</Label>
                <Select onValueChange={(value) => setType(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a joke type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="one-liner">One-liner</SelectItem>
                    <SelectItem value="pun">Pun</SelectItem>
                    <SelectItem value="knock-knock">Knock-Knock</SelectItem>
                    <SelectItem value="riddle">Riddle</SelectItem>
                    <SelectItem value="random">Random</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="temperature">Temperature</Label>
                <Slider
                  id="temperature"
                  min={0}
                  max={1}
                  step={0.1}
                  defaultValue={[0.5]}
                  onValueChange={(value) => setTemperature(value[0])}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-yellow-500 text-white hover:bg-yellow-600"
              onClick={generateJoke}
            >
              {loading ? "Generating Joke..." : "Generate Joke"}
            </Button>
          </CardFooter>
        </Card>
        {joke && (
          <div className="bg-yellow-200 p-4 rounded-md shadow-sm">
            <div className="flex items-center gap-4">
              <Avatar className="w-10 h-10 border">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-medium">AI Joke Generator</div>
                <p className="text-yellow-600">Here is your custom joke:</p>
                <div className="text-lg font-medium">
                  {joke || "Click the button to generate a joke."}
                </div>

                <Button
                  variant="outline"
                  className="w-full bg-yellow-500 text-white hover:bg-yellow-600"
                  onClick={evaluateJoke}
                >
                  {evaluating ? "Evaluating Joke..." : "Evaluate Joke"}
                </Button>

                <div className="text-lg font-medium">{evaluation || ""}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
