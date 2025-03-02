# 🌩️ Room-Ready  
**HenHacks 2025**  

## 📌 Overview  
Room-Ready is a web-based weather preparedness tool that helps users determine if their location is ready for upcoming severe weather.  
By simply snapping a picture, Room-Ready gathers weather data based on your location and assesses your surroundings to provide insights on potential weather risks. By using Gemini's API to asses the risks through various other API calls. 

```
               @@@@%@               🌎 **How it Works:**  
              @%==--#@              Just **snap a picture**, and Room-Ready will gather  
             @#--=*#=#@             real-time weather data based on your location.  
            @@------#-%             It then assesses your surroundings and provides  
           %*-------=+#             **instant insights** on potential weather risks.  
          @#----------+%@           
        %#+=-----------++*%         
        #-----------------#         
        #-----------------#         
        %#################%         
         @@@@@@@@@@@@@@@@@           
               %==@                 
              @#=+##%@                                🚀 **How to Use:**  
              @***=+@               1️⃣ **Visit** the Room-Ready web app.  
              @@@@+@@               2️⃣ **Snap a picture** of your surroundings using your device.  
                @#%@                
                @%@                 3️⃣ The app **analyzes** your location  
                @@                  and retrieves real-time weather data.  
                @                   4️⃣ Receive **instant feedback** on whether  
                                     your area is prepared for upcoming severe weather.  
                                ```

                                ## 📚 Sources  
                                 - 🌟 **Gemini**  
                                 - 🌩️ **NOAA-API**
                               ---

🌪️ Stay safe. Stay prepared. Get **Room-Ready!**  

                        .           '              +                  .              +                    o            
*           +   .                                           .:'         | '                           .-.         .    
     +                                          o       _.::' .        -o-                   ++      (   )         '   
          |    '           .      /      '             (_.'    '        |                 .           `-'.         o   
   .   ' -+-              .      /                          .               _|_    *                             *     
          |                +~~  *        '                                   |    +                          +         



## Building and Running

### Client

You will need npm to run the client as it uses Typescript and ReactJS.

in the /client directory, please run:

```npm install``` which installs the dependences

Then the website will start on localhost:5173 and the API will only accept requests
from localhost:8080 and localhost:5173 due to CORS, so it is preferred to use that port

```npm run dev```

### API

The API is built using Docker so you will need the Docker Engine and docker.io.

You'll also need your own API keys for Gemini and NOAA-API.

you can put your keys in, /API/main.py

In the /API directory, please run:

```docker build -t yourcontainer:latest```.

The client will look for the api on port 8080, so youll need to expose the container to that port:

```docker run -p 8080:8080 yourcontainer:latest```

Once the API is running and the client is running, then you have the fully working website,
(Asssuming your API keys are right)
