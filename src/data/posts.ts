import type { Author, Category, CategorySlug, Post } from "../types";

export const CATEGORIES: Category[] = [
  { slug: "engineering", name: "Engineering", description: "Architecture, routing and the craft of building for the web." },
  { slug: "design", name: "Design", description: "Interfaces, typography and the details that make software feel considered." },
  { slug: "career", name: "Career", description: "Growing as an engineer, one project and one review at a time." },
];

export const categoryName = (slug: CategorySlug): string => CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;

const maya: Author = { name: "Maya Brennan", role: "Staff frontend engineer" };
const theo: Author = { name: "Theo Alvarez", role: "Product designer" };

const RAW: Post[] = [
  {
    slug: "nested-routes-beat-conditional-layouts", title: "Why nested routes beat conditional layouts",
    excerpt: "A shared shell that stays mounted while the page inside it changes is simpler than it sounds.",
    category: "engineering", tags: ["routing", "react"], author: maya, date: "2026-11-10", readMinutes: 6,
    body: [
      "Most apps start with one layout and a handful of if statements. Then a second layout arrives, and every page begins to ask which shell it belongs to.",
      "Nested routes invert the question. The parent route renders the shell and an Outlet; each child only describes what goes inside. The sidebar never remounts, so its scroll position and open menus survive navigation.",
      "The payoff compounds with depth. A settings area can add its own tab bar as another layer, and none of the pages above it need to know that it exists.",
    ],
  },
  {
    slug: "designing-urls-people-can-share", title: "Designing URLs people can share",
    excerpt: "If a filtered view cannot be pasted into a chat message, the state is living in the wrong place.",
    category: "engineering", tags: ["routing", "urls"], author: maya, date: "2026-11-03", readMinutes: 5,
    body: [
      "A search box that keeps its text in component state feels fine until someone wants to send the results to a teammate. The link opens the unfiltered list, and the context is lost.",
      "Query parameters fix this. The URL becomes the source of truth for filters: the page reads it on every render, and changing a filter simply updates the address.",
      "Keep the rest of the string intact when you change one key, and use replace for keystrokes so the back button does not turn into an undo history for typing.",
    ],
  },
  {
    slug: "the-case-for-dense-dashboards", title: "The case for dense dashboards",
    excerpt: "Operators scan hundreds of rows a day. Generous whitespace is a cost they pay with every scroll.",
    category: "design", tags: ["ux", "dashboards"], author: theo, date: "2026-10-27", readMinutes: 4,
    body: [
      "Marketing pages are read; dashboards are scanned. The people using them already know what the columns mean and want as many rows as possible on screen.",
      "Density does not mean clutter. It means tight rows, consistent alignment, tabular numerals and colour reserved for status, so the eye can jump straight to what changed.",
      "Test with real data volumes. A layout that looks calm with five rows can fall apart at five hundred.",
    ],
  },
  {
    slug: "typography-for-long-reads", title: "Typography for long reads",
    excerpt: "Line length, leading and a good serif do more for comprehension than any amount of decoration.",
    category: "design", tags: ["typography", "ux"], author: theo, date: "2026-10-18", readMinutes: 5,
    body: [
      "Readers tire when lines run too long. Aim for roughly sixty to seventy characters and let the column be narrow even on a wide screen.",
      "Give serif body text slightly more leading than you would a sans-serif, and keep headings tighter than the paragraphs beneath them. The contrast tells people where they are.",
      "Resist the urge to style everything. One typeface, a clear scale and generous margins are enough to make an article feel finished.",
    ],
  },
  {
    slug: "your-first-year-as-a-frontend-engineer", title: "Your first year as a frontend engineer",
    excerpt: "What to learn deeply, what to look up, and how to ask for the kind of feedback that helps.",
    category: "career", tags: ["career", "learning"], author: maya, date: "2026-10-05", readMinutes: 7,
    body: [
      "Your first year is not about knowing every API. It is about building a feel for how state, rendering and the browser fit together, so new tools make sense quickly.",
      "Ship small things often. Each pull request teaches you how your team thinks about naming, testing and trade-offs, and those habits matter more than any single framework.",
      "Ask for specific feedback. Instead of asking whether your code is fine, ask which part would be hardest to change in six months.",
    ],
  },
  {
    slug: "reading-code-you-didnt-write", title: "Reading code you didn't write",
    excerpt: "A practical routine for getting oriented in an unfamiliar codebase without reading every file.",
    category: "career", tags: ["career", "react"], author: theo, date: "2026-09-22", readMinutes: 6,
    body: [
      "Start from the outside. Find the route or entry point for the feature you care about and follow one request all the way through before opening anything else.",
      "Take notes as a diagram, not prose. Boxes for components, arrows for data, and a question mark wherever you are guessing. The question marks become your list of things to ask.",
      "Change one small thing early. A tiny edit that you can see in the browser proves you understand the path more than hours of reading.",
    ],
  },
];

export const POSTS: Post[] = [...RAW].sort((a, b) => b.date.localeCompare(a.date));
export const findPost = (slug: string): Post | undefined => POSTS.find((p) => p.slug === slug);
