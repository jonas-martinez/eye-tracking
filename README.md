# Eye tracking visualisation alternatives

## Table of content

- [Eye tracking visualisation alternatives](#eye-tracking-visualisation-alternatives)
  - [Table of content](#table-of-content)
  - [Introduction](#introduction)
  - [Technologies](#technologies)
  - [Setup](#setup)
  - [Launch](#launch)

## Introduction

This is a research projet firstt aimed at two points:

- Gathering coordinates from eye-tracking analysis from specific hardware;
- Providing an testing interface containing test images and a choice mechanism of such images; 

Due to the current health context, we do note have access to eye-tracking hardware, therefore we will simulate such data input using [bubbleview](https://bubbleview.namwkim.org/). The user will be presented a blured image that can be discovered by clicking on it to reveal some of its parts to emulate an gaze path.

## Technologies

The technologies used for this project are as follows:

- NodeJS v10.19.0
- Bubbleview
- NPM v6.14.9
  - diff 5.0.0
  - heatmap 2.0.5
  - nouislider 14.6.3
  - stackblur-canvas 2.4.0
- Bulma 0.9.1

## Setup

Minimum requirements to run this project is to have installed NodeJS and NPM on your computer. To do so, please see the appropriate guide for yout environment of choice:

- [NodeJS](https://nodejs.org/en/download/);
- [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm);

Next you need to clone this repository using the following command:

```bash
git clone git@github.com:jonas-martinez/eye-tracking.git
```

Then it is only a matter of using NPM to install the required modules using this command (in the project folder):

```bash
npm install
```

At the time of writing this, Bubbleview doesn't provide a NPM module to use, therefore you will need to download the file `bubbleview.js` from their [github](https://github.com/namwkim/bubbleview) and put in the `app/js/` folder.

## Launch

Launching the project is quite simple, you only need to run this command in the project folder:

```bash
node app
```

If everything went well you should see this output:

![server_launch_output](./img/server_launch_output.png)

> **Note:** You can change the listening address and port in the [index.js](./app/index.js) file by modifying the variables nammed `ADDRESS` and `PORT`;