# Scout Edge — Deploy in 3 steps, no terminal needed

## Step 1 — Get API key
Go to https://sports.bzzoiro.com/register — register free, no credit card.
After confirming email, log in and copy your token from the Dashboard.

## Step 2 — Deploy to Netlify
1. Go to https://app.netlify.com
2. Click "Add new site" → "Deploy manually"
3. Drag the ENTIRE "scoutedge2" folder onto the drop zone
   ⚠️  Drag the FOLDER, not individual files inside it

## Step 3 — Add your API key
1. Site dashboard → Site configuration → Environment variables
2. Add variable:
   Key:   BZZOIRO_API_KEY
   Value: (paste your token from Step 1)
   Scope: All contexts
3. Go to Deploys → Trigger deploy → Deploy site
4. Open your site URL — it works!

## That's it.
The app calls /.netlify/functions/api which runs server-side,
attaches your API key, and returns live data — no CORS issues.
