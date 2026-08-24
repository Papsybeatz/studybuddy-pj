# StudyBuddy

StudyBuddy is a Next.js learning companion MVP for guided lessons, quizzes, revision planning, past-paper topic extraction, and onboarding-based study personalization.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The current demo account is Student ID `STU001`, PIN `1234`.

## Verify before a deploy

```bash
npm run lint
npm run build
```

The lint command currently reports one non-blocking image optimization warning in the past-paper preview.

## Deploy to Vercel

1. Import this repository into Vercel.
2. Set the project root to `studybuddy-pj` if importing from the parent workspace.
3. Add `AUTH_SECRET` for Production and Preview. Use a long random value, not the local fallback.
4. Use the default Next.js build command: `npm run build`.
5. Test login, logout, onboarding, dashboard, lesson, quiz, revision, past-paper, and settings routes on the deployed URL.

## Current MVP boundary

This deployment is suitable for a controlled demo or a single-user internal MVP walkthrough. Authentication uses a signed HTTP-only cookie, but student records and progress still use the in-memory mock database in `lib/mockDB.ts`; data is not durable across Vercel instances or deployments.

Before inviting multiple external testers, replace the mock database with a hosted database, load the student ID from the authenticated session on every server route, and add ownership checks to all profile/progress writes. The Study MVP agent classes and storage/embedding utilities under `src/` are architectural scaffolds and are not yet connected to live AI or durable document storage.

## Recommended tester smoke pass

- Invalid PIN stays on login and shows an error.
- Valid login reaches the dashboard and creates a session cookie.
- Direct access to protected routes redirects to login when signed out.
- Logout clears the session and protected routes redirect again.
- Onboarding requires a free-text Academic Identity Check response.
- Completing onboarding shows the exploration badge and subject panel when appropriate.
- Lesson completion returns to dashboard.
- Quiz submission shows a score and updates difficulty for the demo process.
- Revision items can be marked done.
- Past-paper upload reaches the canned extraction result; live OCR is not implemented yet.
- `/settings` loads without a 404.
