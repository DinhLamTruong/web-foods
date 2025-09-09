# Dockerfile
FROM nginx:latest

# Copy the files from the current directory to the nginx root directory
COPY . /usr/share/nginx/html


# The default port of nginx is 80
EXPOSE 80

# Run nginx in foreground mode
CMD ["nginx", "-g", "daemon off;"]

