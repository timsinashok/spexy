# # Build stage
# FROM node:16-alpine as builder

# # Set working directory
# WORKDIR /app

# # Copy package files
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy all frontend files
# COPY . .

# # Build application
# RUN npm run build

# # Debugging: List files in the /app directory to verify build
# RUN ls -al /app

# # Runtime stage
# FROM nginx:alpine

# # Set default port
# ENV PORT=8080

# # Copy built files from builder (adjust path if necessary)
# COPY --from=builder /app/build /usr/share/nginx/html

# # Create nginx.conf template
# RUN printf 'server {\n\
#     listen $PORT;\n\
#     location / {\n\
#         root /usr/share/nginx/html;\n\
#         index index.html index.htm;\n\
#         try_files $uri $uri/ /index.html;\n\
#     }\n\
# }\n' > /etc/nginx/conf.d/default.conf.template

# # Substitute PORT and start Nginx
# CMD sh -c ": \${PORT:=8080} && envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"


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

# Set the REACT_APP_BACKEND_URL environment variable before building the React app
ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL

# Build application
RUN npm run build
# Debugging: List files in the /app directory to verify build
RUN ls -al /app

# Runtime stage
FROM nginx:alpine
# Set default port
ENV PORT=8080
# Copy built files from builder
COPY --from=builder /app/build /usr/share/nginx/html

# Create nginx.conf template with CORS headers
RUN printf 'server {\n\
    listen $PORT;\n\
    \n\
    location / {\n\
        root /usr/share/nginx/html;\n\
        index index.html index.htm;\n\
        try_files $uri $uri/ /index.html;\n\
        \n\
        # CORS headers\n\
        add_header Access-Control-Allow-Origin "*";\n\
        add_header Access-Control-Allow-Methods "GET, POST, OPTIONS";\n\
        add_header Access-Control-Allow-Headers "DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization";\n\
        \n\
        # Handle OPTIONS method for CORS preflight\n\
        if ($request_method = "OPTIONS") {\n\
            add_header Access-Control-Allow-Origin "*";\n\
            add_header Access-Control-Allow-Methods "GET, POST, OPTIONS";\n\
            add_header Access-Control-Allow-Headers "DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization";\n\
            add_header Access-Control-Max-Age 1728000;\n\
            add_header Content-Type "text/plain; charset=utf-8";\n\
            add_header Content-Length 0;\n\
            return 204;\n\
        }\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf.template

# Substitute PORT and start Nginx
# CMD sh -c ": \${PORT:=8080} && envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"

# Use shell to substitute PORT value in nginx.conf
CMD sh -c "envsubst '\$PORT \$REACT_APP_BACKEND_URL' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
