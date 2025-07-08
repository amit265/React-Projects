#!/bin/bash

BASE_DIR=$(pwd)
echo "📁 Starting React project deployment from: $BASE_DIR"
echo "---------------------------------------------"

OUTPUT_FILE="$BASE_DIR/deployed-projects.txt"
> "$OUTPUT_FILE"

for dir in */; do
  PROJECT_NAME=$(basename "$dir")
  echo "🚀 Deploying: $PROJECT_NAME"
  cd "$dir"

  # Clean previous Vercel config
  rm -rf .vercel

  # Create correct vercel.json for React
  echo "🛠️ Creating vercel.json for React"
  echo "{
  \"version\": 2,
  \"builds\": [{ \"src\": \"package.json\", \"use\": \"@vercel/static-build\" }],
  \"routes\": [{ \"src\": \"/(.*)\", \"dest\": \"/index.html\" }],
  \"framework\": \"create-react-app\"
}" > vercel.json

  # Install dependencies (optional but safer)
  echo "📦 Installing npm packages"
  npm install --legacy-peer-deps > /dev/null 2>&1

  # Deploy using Vercel CLI
  LIVE_URL=$(vercel --prod --name "$PROJECT_NAME" --confirm 2>/dev/null | grep -Eo 'https://[^ ]+')

  if [[ -n "$LIVE_URL" ]]; then
    echo "✅ $PROJECT_NAME → $LIVE_URL"
    echo "$PROJECT_NAME → $LIVE_URL" >> "$OUTPUT_FILE"
  else
    echo "❌ $PROJECT_NAME → Deployment failed"
    echo "$PROJECT_NAME → FAILED" >> "$OUTPUT_FILE"
  fi

  cd ..
  echo "---------------------------------------------"
done

echo "🎉 Done! Results saved to deployed-projects.txt"
