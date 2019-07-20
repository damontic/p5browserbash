# p5 browser bash

This repository was based on [mettamage/browserbash](https://github.com/mettamage/browserbash).

I decided to create this to ease the teaching of bash and make an interactive bash from the browser. To make it more interesting/funnier, I decided to use [p5.js](https://p5js.org) to animate the console emulator. Thanks to [Daniel Shiffman](https://www.youtube.com/channel/UCvjgXvBlbQiydffZU7m1_aw) for his excelent videos that inspired me in doing this!

The project uses [socket.io](https://socket.io/) to communicate a bash process running in a server and a p5 html frontend running in a client computer.

This has been configured to run in localhost, but it should be easy to make it compatible with any domain name.

## How to run

1. Run the backend which you can find in the **server** directory.
```bash
$ npm install
```
2. Open one client from a browser which you can find in the **clients** directory.
	- **basic_client**: p5.js based client which uses html elements.
	- **p5_client**: p5.js based client which uses an html canvas.

## p5 client
If you open this specific client, two new commands are available to animate the screen in a random way. The commands are:
- animate
- stopanimate
This can be extended to create new animations or select an animation at random.

## Problems

### history with pipelines
I which I could combine history with pipelines, but as bash in the server is not using the bash history and the history command is being emulated in the client logic, then this must be implemented in some weird way...

### Runs only in localhost
Should be easy to make it run in a remote server.
