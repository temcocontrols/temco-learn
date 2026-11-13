---
title: "Debugging the webview"
order: 50
appliesTo: "internal"
---

The webview is a separate process from the C++ shell, so debugging it means attaching to the right one. This is the setup, screen by screen.

Debugging T3000Webview

1. clone the T3000Webview source code to local with below command.

git clone https://github.com/temcocontrols/T3000Webview.git

![](media/debugging-the-webview-01.png)

2. open the source code via Visual Studio Code (or some other tool), find the .env.example file in the root folder “\T3000WEBVIEW”

![](media/debugging-the-webview-02.png)

3. add a new config file with name ”.env” and copy the keys from “.env.example” and set the new values as below.

![](media/debugging-the-webview-03.png)

API_URL=https://user-lib.temcocontrols.com

API_WS_URL=wss://user-lib.temcocontrols.com/ws

LOCAL_API_URL=http://localhost:9103/api

LOCAL_API_SECRET_KEY=

4. right click to open the “Integrated Terminal”.

![](media/debugging-the-webview-04.png)

5. install the packages with below command.

npm i

![](media/debugging-the-webview-05.png)

6. build the web project with below command.

npm run build

![](media/debugging-the-webview-06.png)

![](media/debugging-the-webview-07.png)

![](media/debugging-the-webview-08.png)

7. open the “.env-example” file under api folder. (full path should be \T3000Webview\api)

The api folder stores the source code of Rust back-end api

![](media/debugging-the-webview-09.png)

8. and a new config file under “\T3000Webview\api” with name “.env” and copy the keys from “.env-example”, update the values as below.

![](media/debugging-the-webview-10.png)

DATABASE_URL=sqlite://Database/webview_database.db

SPA_DIR=../dist/spa

API_SECRET_KEY=very_secret_key

9. open the “Integrated Terminal” again, and cd into api folder

![](media/debugging-the-webview-11.png)

10. execute following command to start the rust api server.

cargo run --example run_server

![](media/debugging-the-webview-12.png)

check with below urls to make sure the server has been started and working well.

http://localhost:9103/#/

http://localhost:9103/#/modbus-register

![](media/debugging-the-webview-13.png)

![](media/debugging-the-webview-14.png)

Notes: if no need to debug it via T3000, can ignore below steps 11 & 12, can just use any web browser to do it.

11. clone or update the source code of T3000_Buiding_Automation_System, make sure it’s updated.

![](media/debugging-the-webview-15.png)

12. open the “T3000 - VS2019.sln” solution file with visual studio as administrator.

comment the code as shown below.

Make sure the T3000.exe does not start the rust server in background.

![](media/debugging-the-webview-16.png)

13. rebuild the solutions and run T3000.exe under T3000 Ouput\Debug, and check whether the “Show Webview Graphic” can access the rust server which was started by step 10

![](media/debugging-the-webview-17.png)

![](media/debugging-the-webview-18.png)

14. open the T3000Webview folder with Visual Studio 2022.

![](media/debugging-the-webview-19.png)

![](media/debugging-the-webview-20.png)

15. add rust-analyzer.vs extension to visual studio 2022.

![](media/debugging-the-webview-21.png)

16. find auth.rs file under /api/src/auth.rs, and add a breakpoint for “require_auth” function.

![](media/debugging-the-webview-22.png)

add another breakpoint for “login” function

![](media/debugging-the-webview-23.png)

17. open the “Attach to Process” dialog, “Debug->Attach to Process”, and find the “run_server” process to attach.

![](media/debugging-the-webview-24.png)

18. open “HVAC Drawer” and click the “LOGIN” button, it will redirect to the source code for debugging. You can check the details in visual studio.

![](media/debugging-the-webview-25.png)

![](media/debugging-the-webview-26.png)

![](media/debugging-the-webview-27.png)

19. for the JavaScript and Html files, can open the Edge Dev Tools to check the log and some other details.

![](media/debugging-the-webview-28.png)

![](media/debugging-the-webview-29.png)
