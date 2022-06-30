/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import Counter from "../islands/Counter.tsx";
import Countdown from "../islands/Countdown.tsx";

export const handler: Handlers<{ joke: string }> = {
  async GET(_, ctx) {
    const res = await fetch("http://localhost:3000/api/joke");
    const joke = await res.json();

    return ctx.render({ joke });
  },
};

export default function Home({ data, params }: PageProps) {
  const date = new Date();
  date.setSeconds(date.getSeconds() + 30);
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <div class={tw`flex items-center justify-between py-4`}>
        <a href="/">
          <img
            src="/logo.svg"
            height="100px"
            alt="the fresh logo: a sliced lemon dripping with juice"
          />
        </a>

        <ul>
          <li>
            <a href="/search" class={tw`text-blue-600`}>
              Search user
            </a>
          </li>
        </ul>
      </div>

      <Counter start={3} />
      <Countdown eventTime={date.toISOString()} />
      <div class={tw`mt-6`}>
        <h3 class={tw`text-xl`}>Jokes</h3>
        <p>{data.joke}</p>
      </div>
    </div>
  );
}
