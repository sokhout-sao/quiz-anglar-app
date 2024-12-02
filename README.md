# quiz-angular-app

An angular web application for creating and passing quizzes.

# Description

As I was learning new IT frameworks and libraries, I had trouble remembering all the technical details.

So I tried creating power point slides on each frameworks and libraries with questions and responses. It helped me a lot but I have found it hard to daily train as many questions are already well known.

I needed something that could ask me more often the unwell known questions but still asking the other time to time.

That is the idea of this application. It will allow you for creating quizzes with questions and responses. You can pass a quiz and for each questions you can see the response or go to another question. Then when the response is displayed, you will be asked how well you knew the response. There is only 3 levels: Good, Moderate, Bad.

Here are the probabily of displaying a question :

- 40% if not answered yet
- 30% if answered as baddly known
- 20% if answered as moderately known
- 10% if answere as well known

As I wanted this application to be easily accessible, the data are stored in the local indexedDb of the web browser.

There is also an import/export to JSON format file feature. With this feature, people will be able to share their quizzes.

# Requirement

In order to code this application, here are the requirements:

- NodeJs and NPM environment. I use currently NodeJs v21 and NPM v10 but any old compatible version or newer version might suites too.
- An IDE like VsCode or Intellij or Eclipse
- A modern web browser having the local IndexedDb feature

# How to install

Just go to the project root directory and type this command:

```shell
npm install
```

# How to run local server

Just go to the project root directory and type this command:

```shell
ng serve
```

OR

```shell
npm run start
```

# How to code

## Framework

We are using Angular v18 and Material Design v18.
As there some compatibility issue with Angular v19, the version in the package.sjon dependencies are configure to ~18 (so >= v18.x.x and < v19.0.0).

A future Git repository will be created in order to use Angular v19 and Signals.

## The sofware architecture

The project follow the classic component based software architecture of Angular. There is no need for an hexagonal or clean architecture for a simple application like this one.

## The project structure

Here is the project structure:

```
.
├── angular.json
├── package-lock.json
├── package.json
├── src
│   ├── app
│   │   ├── directives
│   │   ├── guards
│   │   ├── pages
│   │   │   ├── quiz-form
│   │   │   │   ├── question-form-dialog
│   │   │   ├── quiz-list
│   │   │   ├── quiz-play
│   │   │   ├── signin
│   │   │   └── signup
│   │   └── services
│   ├── global_styles.css
│   ├── index.html
│   ├── main.ts
│   ├── manifest.webmanifest
│   └── styles.css
├── tsconfig.app.json
└── tsconfig.json
```

# Credits

- **Sok Hout SAO**: the author of this project, freelance full stack developer mainly in Java, NodeJs, Angular and React. You can reach him by email: sao.sokhout@gmail.com

# Licence

See the <a href="./LICENSE">LICENSE</a> file.
