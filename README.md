# fotovagg, this app is an image carousel fetching images from Flickr

It loads 6 images at a time and toggles between displaying them in chronological order and random order. 
After 7 seconds, it goes on to load the next following 6 images for the specific term based on user search.
This procedure lasts until the last 'page' and starts all over again. 

note: the amount of images and seconds could be changed

# Requirements to run the application.

1. Clone or download the repository. 

2. Install https://nodejs.org/en/ in your computer. 

3. Go to root folder fotovagg-two and run in terminal: npm install 

4. .env file needed with API_KEY, get one at https://www.flickr.com/services/api/ or ask for it, email me. 

5. Open a new terminal and go to the directory fotovagg-front and run: npm install


//----Start the application

6. Start the server by going to the fotovagg-two in your terminal and run the command: node server/index.js

7. In the other terminal go to fotovagg-front and run the command: npm start

//---Modify application
This application uses sass, in the command line type: sass --help or check out: https://sass-lang.com/dart-sass




# Tools used and links
 
This app is created with React create-react-app.
For more info on how to run it visit: https://reactjs.org/docs/create-a-new-react-app.html

https://www.flickr.com/services/api/misc.overview.html

Flickr Api index: 
https://www.flickr.com/services/api/

Method used in this app is flickr.photos.search: 
https://www.flickr.com/services/api/flickr.photos.search.html
