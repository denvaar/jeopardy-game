# jeopardy-game
Create and play your own game of Jeopardy. I threw this together to play with my family over Christmas time. Used React, React-router, Redux, and Electron.

# Installation
There's an app in the `dist` directory.
To run the app for development, comment out the necessary things and run:

```npm install```

```npm run-script watch```

```npm start```

To package the app for OSX:

```npm run-script build```

```electron-packager ./jeopardy Jeopardy --version 1.2.4 --platform=darwin --out=[insert output path here] --arch=all --ignore="(node_modules)"```

## Screen shots
<img width="635" alt="screen shot 2016-12-17 at 3 46 48 pm" src="https://cloud.githubusercontent.com/assets/10538978/21290243/3abb4ae8-c470-11e6-83cb-67bdc88f6952.png">
<img width="542" alt="screen shot 2016-12-17 at 3 53 04 pm" src="https://cloud.githubusercontent.com/assets/10538978/21290266/e93ddd92-c470-11e6-8379-c8787b6de75d.png">
<img width="673" alt="screen shot 2016-12-17 at 4 00 53 pm" src="https://cloud.githubusercontent.com/assets/10538978/21290289/03a7379a-c472-11e6-9832-f8570a577021.png">
