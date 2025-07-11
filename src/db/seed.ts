import { reset, seed } from "drizzle-seed";
import { db, sql } from "./connection.ts";
import { rooms } from "./schema/rooms.ts";
import { questions } from "./schema/questions.ts";

// Schema without audioChunks to avoid vector column issues
const seedSchema = {
  rooms,
  questions,
};

await reset(db, seedSchema);

await seed(db, seedSchema).refine((f) => {
  return {
    rooms: {
      count: 5,
      columns: {
        name: f.companyName(),
        description: f.loremIpsum(),
      },
    },
    questions: {
      count: 20,
    },
  };
});

await sql.end();

// biome-ignore lint/suspicious/noConsole: only used in dev
console.log("Database seeded");
