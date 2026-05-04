# Step 1: Build frontend
FROM node:20 AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Step 2: Run app
FROM node:20

WORKDIR /app

# Copy backend
COPY backend ./backend

# Copy frontend build (IMPORTANT CHANGE)
COPY --from=build /app/dist ./dist

# Install backend dependencies
WORKDIR /app/backend
RUN npm install

# Install serve
RUN npm install -g serve

# Go back to root
WORKDIR /app

# Expose ports
EXPOSE 3000 5000

# Run both
CMD ["sh", "-c", "node backend/server.js & serve -s dist -l 3000"]
