# 🔴 Circle Chaos

## 📖 Description

_The player takes control of a little white ball that must survive against the infinite waves of circles of many different colors and sizes. Each enemy will provide a different challenge as they vary in health and speed._

After learning enough about web development, the idea to create a little game came to mind. I grew up playing flash games, especially top-down shooters like SAS: Zombie Assault and Decision. My idea was to create something simple, but from scratch, to practice what I've learned so far. Some ideas were taken from one of Chris Course's videos because they were so creative!

I learned a lot of JavaScript, Canvas API, and Game Design concepts while developing this little game. I also committed many mistakes that taught me what not to do in future projects. I would like to move to a proper game engine or framework like Godot or Phaser in the near future, but I'd still create more games in vanilla JS (or TypeScript), just for fun.

> ⚠️ This project is my Canvas API playground. The game not having any sprites is a intentional design choice. Everything, aside from the menus and some UI, is drawn in real time on the canvas.

## 🕹️ Controls

- Use the mouse to aim.
- Move the character with `<WASD>` or `<ARROWS>`.
- Hold `<LMB>` to shoot.
- Press `<SPACE>` or `<RIGHT CTRL>` to activate fury mode.
- Press `<P>` or _click on the pause icon_ (top right of the screen) to pause.

## 📦 Install and usage

1. Clone this repo:

```bash
git clone https://github.com/GracilianoOG/2d-canvas-shooter.git
```

2. Enter the directory:

```bash
cd 2d-canvas-shooter/
```

3. Init Visual Studio Code (or any other IDE):

```bash
code .
```

1. Install the dependencies:

```bash
npm install
```

5. Run the project:

```bash
npm run dev
```

## 📜 Available scripts

| Script      | Command                      | Description                             |
| ----------- | ---------------------------- | --------------------------------------- |
| `dev`       | `vite`                       | Start in development mode               |
| `build`     | `vite build`                 | Build project to _dist_ folder          |
| `preview`   | `vite preview`               | Preview production build locally        |
| `deploy`    | `gh-pages -d dist`           | Deploy to GitHub Pages                  |

## 🛠️ Developed with

[![Tool icons from skillicons](https://skillicons.dev/icons?i=js,sass,vite,nodejs,npm,vscode)](https://skillicons.dev)

- HTML and CSS for the UI, menus, and canvas.
- Canvas API and JavaScript for game logic and input handling.
- [Howler.js](https://howlerjs.com/) for audio management (SFX and music).
- [Vite.js](https://vite.dev/) as the build tool.
- [Sass](https://sass-lang.com/) for styles.

## ✨ Features

- Fast paced, bullet hell style;
- Infinite waves of enemies;
- Neat retro music and sound effects;
- Several weapons and items to use during gameplay;
- No engine (made from scratch).

## 🎬 Credits

Source: [howler.js](https://howlerjs.com/)\
Description: Audio library for JavaScript.\
License: MIT

Source: [8bitRPG Battle](https://soundcloud.com/sei_peridot/8bitrpg-battle)\
Description: Background, battle music.\
License: CC BY 3.0

Source: [Online 8bit sound maker](https://sfxr.me/)\
Description: Program used to generate gameplay sounds.\
License: Unlicense

Source: [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P?query=CodeMan38)\
Description: Custom font.\
License: Open Font

Source: [Kenney](https://www.kenney.nl/)\
Description: Custom cursor.\
License: Creative Commons CC0

## 🔗 Links

These resources helped me to understand many things regarding game development in JavaScript and the mathematical logic behind it. Not everything was applied to the project, but they are still great study material for me.

### Animation

- [Animating with requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)

### Math

- [Math.hypot - Mozilla](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Math/hypot)
- [Pythagorean Theorem with JS](https://www.youtube.com/watch?v=iqSlzYXdFzw)

### Vector

- [2D Vectors in JavaScript](https://www.youtube.com/watch?v=nzyOCd9FcCA)
- [Vector Normalize](https://www.youtube.com/watch?v=ttz05d8DSOs)

### Components (ECS)

- [How You Can Easily Make Your Code Simpler in Godot 4](https://www.youtube.com/watch?v=74y6zWZfQKk&pp=ygUPZ29kb3QgY29tcG9uZW50)
- [The Entity-Component-System pattern](https://jsforgames.com/ecs/)
- [Use ECS to create a Match-3 game](https://medium.com/@rdolivo/ecs-for-gamedev-with-typescript-5a1204f594bc)

### Sound

- [GitHub - howler.js Docs](https://github.com/goldfire/howler.js)
- [Sound and Music in JS Games](https://www.youtube.com/watch?v=hn7MhPt24L4)

### Optimization

- [Optimizing Canvas #1](https://nicolahibbert.com/optimising-html5-canvas-games/)
- [Optimizing Canvas #2](https://stackoverflow.com/questions/8205828/html5-canvas-performance-and-optimization-tips-tricks-and-coding-best-practices)
- [Performance of JavaScript .forEach, .map and .reduce vs for and for..of](https://leanylabs.com/blog/js-forEach-map-reduce-vs-for-for_of/)
- [How to optimize your JavaScript apps using Loops](https://www.freecodecamp.org/news/how-to-optimize-your-javascript-apps-using-loops-d5eade9ba89f/)
- [What is the Fastest Loop Type in JavaScript?](https://blog.bitsrc.io/finding-the-fastest-loop-type-in-javascript-38af16fe7b4f)
- [When You Should Prefer Map Over Object In JavaScript](https://www.zhenghao.io/posts/object-vs-map)
- [Optimising HTML5 Canvas Rendering](https://blog.ag-grid.com/optimising-html5-canvas-rendering-best-practices-and-techniques/)
- [Garbage collection](https://javascript.info/garbage-collection)
- [Performance tips for JavaScript Game Developers](https://www.reddit.com/r/incremental_games/comments/mwx2xd/performance_tips_for_javascript_game_developers/)

### Game Loop

- [Standardize your JavaScript games' framerate for different monitors](https://chriscourses.com/blog/standardize-your-javascript-games-framerate-for-different-monitors)
- [Controlling the Frame Rate with requestAnimationFrame](https://codetheory.in/controlling-the-frame-rate-with-requestanimationframe/)
- [Supercharge Your Web Animations: Optimize requestAnimationFrame Like a Pro](https://dev.to/josephciullo/supercharge-your-web-animations-optimize-requestanimationframe-like-a-pro-22i5)
- [Why cap game loop delta-time?](https://gamedev.stackexchange.com/questions/83786/why-cap-game-loop-delta-time)
- [Performant Game Loops in JavaScript](https://www.aleksandrhovhannisyan.com/blog/javascript-game-loop/)

### JavaScript

- [Canvas and JS Game](https://www.youtube.com/watch?v=eI9idPTT0c4)
- [Empty an array in JavaScript](https://stackoverflow.com/a/1232046)
- [How to clear a JS array](https://www.freecodecamp.org/news/how-to-clear-a-javascript-array-js-empty-array/)
- [JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [String padStart - Mozilla](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/padStart)
- [Value of "this" in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
- [Object freeze() - FCC](https://www.freecodecamp.org/news/javascript-immutability-frozen-objects-with-examples/)
- [Object freeze benefits and drawbacks - Dev](https://dev.to/mattlewandowski93/objectfreeze-goes-hard-5cn1)
- [Use data attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/How_to/Use_data_attributes)

### Sass

- [Placeholder Selectors](https://sass-lang.com/documentation/style-rules/placeholder-selectors/)

### Patterns

- [Observable Pattern](https://oieduardorabelo.medium.com/padr%C3%B5es-em-js-observer-pattern-bff0ecc55d01)
- [Observable in Game App](https://dev.to/walosha/observer-pattern-in-the-context-of-a-game-app-5gck)
- [JavaScript Factory Method Design Pattern](https://dofactory.com/javascript/design-patterns/factory-method)
- [JavaScript Flyweight Design Pattern](https://www.dofactory.com/javascript/design-patterns/flyweight)
- [Javascript, Flyweight Pattern](https://mustafauzun.co/blog/javascript-flyweight-pattern/)
- [An introduction to finite state machines and the state pattern for game development](https://www.youtube.com/watch?v=-ZP2Xm-mY4E&pp=ygUcdGhlIHNoYWdneSBkZXYgc3RhdGUgbWFjaGluZQ%3D%3D)
- [Finite State Machines in Godot 4 in Under 10 Minutes](https://www.youtube.com/watch?v=ow_Lum-Agbs&pp=ygUTZ29kb3Qgc3RhdGUgbWFjaGluZQ%3D%3D)

### Other

- [Diagonal movement in games](https://www.youtube.com/shorts/0cYjreg7dpg?feature=share)
- [Nice colors](https://www.w3schools.com/cssref/css_colors.php)
- [50+ JavaScript Games](https://freefrontend.com/javascript-games/)
- [Tools, assets and tutorials (JS13K)](https://js13kgames.com/resources)
- [Nullish coalescing assignment (??=)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_assignment)
- [Env Variables and Modes ](https://vite.dev/guide/env-and-mode)
- [Vanilla JavaScript Game Development Course](https://www.youtube.com/playlist?list=PLYElE_rzEw_tjnJ_5gzRw0ZM5HRn7AIS0)

## 🧑🏻‍💻 Author

| [<img src="https://avatars.githubusercontent.com/u/72778164?s=96&v=4"><br><sub>GracilianoOG</sub>](https://github.com/GracilianoOG) |
| :---------------------------------------------------------------------------------------------------------------------------------: |
|                                       [Linkedin](https://www.linkedin.com/in/gabrielgmbarros)                                       |
