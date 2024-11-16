# Run in dev

1. Clone repo
2. Create a copy of `.env.template` and rename it `.env` and change env variables values
3. Install dependencies `npm install`
4. Run db `docker compose up -d`
5. Run Prisma migrations `npx prisma migrate dev`
6. Run seed `npm run seed`
7. Run project `npm run dev`
8. Clean localStorage of browser
