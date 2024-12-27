# Use the official Node.js image as the base  
FROM node:23.5.0

# Set the working directory inside the container  
WORKDIR /app  

# Copy package.json and package-lock.json to the container  
COPY package*.json ./  

# Install dependencies  
RUN yarn install

# Copy the app source code to the container  
COPY . .  

# Build the Next.js app  
RUN yarn build

# Expose the port the app will run on  
EXPOSE 3000  

# Start the app  
CMD ["npm", "start"] 

# docker build -t evup-app:0.0.1 . 
# docker tag evup-app:0.0.1 stetommy/evup-app:0.0.1
# docker push stetommy/evup-app:0.0.1