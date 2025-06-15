# Jetara
project jetara is a event management system built with nextjs and typescript inorder to overcome the issue that our college had. Our college had so many events which students lost track of, so Jetara provides a central hub for organizing and managing events efficiently. Jetara not only act as event registration site also manage event participation. Its provides a inituaitve way to organize and manage events

## Features
- Event registration and management
- Event participation tracking
- Central hub for organizing and managing events
- google and passkey authentication

## Local Setup
- Clone the repository
- Copy the env file to .env
- Install dependencies using `npm install`
- Start the development server using `npm run dev`
env:
```bash
AUTH_SECRET="secret"

AUTH_GOOGLE_ID="provide one"
AUTH_GOOGLE_SECRET="provide one"

DATABASE_URL="db url"

DOMAIN_URL="http://localhost:3000"

NODE_ENV="development"

EDGE_STORE_ACCESS_KEY="key for the edge store"
EDGE_STORE_SECRET_KEY="secret for the edge store"
```

that's it
