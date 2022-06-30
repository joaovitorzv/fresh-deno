/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";

const NAMES = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "George"];

interface Data {
  results: string[];
  query: string;
  error?: string;
}

export const handler: Handlers<Data> = {
  GET(req, ctx) {
    const searchQuery = new URL(req.url).searchParams.get("q") || "";
    const queryResult = NAMES.filter((name) =>
      name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (!queryResult.length) {
      return ctx.render({
        results: [],
        query: searchQuery,
        error: `no results for "${searchQuery}"`,
      });
    }
    return ctx.render({ results: queryResult, query: searchQuery });
  },
};

export default function Search({ data, params }: PageProps<Data>) {
  const { results, error } = data;

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

      <ul>
        {results.map((name: string) => (
          <li>{name}</li>
        ))}
        <span class={tw`text-red-500`}>{error}</span>
      </ul>

      <form class={tw`py-6 flex flex-col`}>
        <input
          class={tw`border p-2`}
          type="text"
          name="q"
          value={params.q}
          placeholder="Search for something"
        />
        <button type="submit" class={tw`p-2 bg-green-400 mt-2`}>
          Search
        </button>
      </form>
    </div>
  );
}
