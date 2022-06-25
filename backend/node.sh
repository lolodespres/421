#!/bin/bash

npm init -y
npm install -D @types/express @types/node @types/cors nodemon ts-node tsconfig-paths tsup typescript
npm install express cors
npm i mongodb mongoose
mkdir src
touch tsconfig.json src/index.ts src/config.ts


