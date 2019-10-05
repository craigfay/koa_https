FROM node:12-slim

# Copy source files and install
WORKDIR /app
COPY ./app/src /app/src
COPY ./app/package* /app/
RUN npm install --only=production

# Switch to user "node", who is non-privileged
USER node
