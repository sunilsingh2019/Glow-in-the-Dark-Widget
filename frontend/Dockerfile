FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install tailwindcss postcss autoprefixer @tailwindcss/forms

COPY . ./

# Add Tailwind CSS configuration if it doesn't exist
RUN if [ ! -f tailwind.config.js ]; then \
    npx tailwindcss init -p; \
    fi

EXPOSE 3000

CMD ["npm", "start"] 