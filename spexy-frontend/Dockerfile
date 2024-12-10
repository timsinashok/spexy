# Build stage
FROM node:16-alpine as builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all frontend files
COPY . .

# Build application
RUN npm run build

# Debugging: List files in the /app directory to verify build
RUN ls -al /app

# Runtime stage
FROM nginx:alpine

# Set default port
ENV PORT=8080

# Copy built files from builder (adjust path if necessary)
COPY --from=builder /app/build /usr/share/nginx/html

# Create nginx.conf template
RUN printf 'server {\n\
    listen $PORT;\n\
    location / {\n\
        root /usr/share/nginx/html;\n\
        index index.html index.htm;\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf.template

# Substitute PORT and start Nginx
CMD sh -c ": \${PORT:=8080} && envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
