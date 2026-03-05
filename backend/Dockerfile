FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . . 

RUN npm run build

FROM node:20-alpine
WORKDIR /app

# Copy ONLY the package files
COPY package*.json ./

# Install ONLY production dependencies (no devDeps)
# This keeps the image tiny and secure
RUN npm install --omit=dev

# Copy the compiled code from the builder stage
COPY --from=builder /app/dist ./dist

# Start the app
CMD ["node", "dist/main"]