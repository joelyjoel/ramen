/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/demo.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/EntityComponentSystem.ts":
/*!**************************************!*\
  !*** ./src/EntityComponentSystem.ts ***!
  \**************************************/
/*! exports provided: EntityComponentSystem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EntityComponentSystem\", function() { return EntityComponentSystem; });\n/* harmony import */ var _advanceState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./advanceState */ \"./src/advanceState.ts\");\n\n;\nvar EntityComponentSystem = /** @class */ (function () {\n    function EntityComponentSystem(_a) {\n        var initialState = _a.initialState, systems = _a.systems;\n        this.currentState = initialState;\n        this.systems = systems;\n    }\n    EntityComponentSystem.prototype.advanceState = function (io) {\n        this.currentState = Object(_advanceState__WEBPACK_IMPORTED_MODULE_0__[\"advanceState\"])(this.currentState, this.systems, io);\n    };\n    Object.defineProperty(EntityComponentSystem.prototype, \"frame\", {\n        get: function () {\n            return this.currentState.frame;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    return EntityComponentSystem;\n}());\n\n\n\n//# sourceURL=webpack:///./src/EntityComponentSystem.ts?");

/***/ }),

/***/ "./src/Game.ts":
/*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
/*! exports provided: Game */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Game\", function() { return Game; });\n/* harmony import */ var _EntityComponentSystem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EntityComponentSystem */ \"./src/EntityComponentSystem.ts\");\n\n/** The game class handles the canvas on which the game is rendered and user input. */\nvar Game = /** @class */ (function () {\n    function Game(options) {\n        var canvas = options.canvas, systems = options.systems, initialState = options.initialState, _a = options.frameRate, frameRate = _a === void 0 ? 32 : _a;\n        if (canvas)\n            this.adoptCanvas(canvas);\n        this.ecs = new _EntityComponentSystem__WEBPACK_IMPORTED_MODULE_0__[\"EntityComponentSystem\"]({\n            initialState: initialState,\n            systems: systems\n        });\n        this.frameRate = frameRate;\n        this.frameInterval = 1 / this.frameRate;\n        this.downKeys = {};\n    }\n    Game.prototype.start = function () {\n        var _this = this;\n        this.tickTimer = setInterval(function () { return _this.tick(); }, 1000 / this.frameRate);\n    };\n    Game.prototype.tick = function () {\n        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n        var io = {\n            ctx: this.ctx,\n            game: this,\n            elapsed: this.frameInterval,\n            userInput: {\n                downKeys: this.downKeys,\n            }\n        };\n        this.ecs.advanceState(io);\n    };\n    Game.prototype.adoptCanvas = function (canvas) {\n        var _this = this;\n        if (this.canvas)\n            this.releaseCanvas();\n        this.canvas = canvas;\n        this.ctx = canvas.getContext('2d');\n        // Add input listeners\n        window.addEventListener('keydown', function (e) {\n            e.preventDefault();\n            _this.downKeys[e.keyCode] = true;\n        }, false);\n        window.addEventListener('keyup', function (e) {\n            e.preventDefault();\n            _this.downKeys[e.keyCode] = false;\n        }, false);\n    };\n    Game.prototype.releaseCanvas = function () {\n        this.canvas = null;\n        this.ctx = null;\n        // TODO: Remove event listeners\n    };\n    return Game;\n}());\n\n\n\n//# sourceURL=webpack:///./src/Game.ts?");

/***/ }),

/***/ "./src/advanceState.ts":
/*!*****************************!*\
  !*** ./src/advanceState.ts ***!
  \*****************************/
/*! exports provided: advanceState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"advanceState\", function() { return advanceState; });\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ \"./src/util.ts\");\n\nfunction advanceState(state, systems, io) {\n    var workingState = Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"copyState\"])(state);\n    // Increment the frame number\n    ++workingState.frame;\n    var _loop_1 = function (system) {\n        // Find matches in the state\n        var matches = Object.values(workingState.entities).filter(function (e) { return Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"entityHasComponents\"])(e, system.reads); });\n        // Apply behaviour to the matches\n        if (system.individualBehaviour) {\n            for (var _i = 0, matches_1 = matches; _i < matches_1.length; _i++) {\n                var e = matches_1[_i];\n                var result = system.individualBehaviour(e, io);\n                if (!system.observeOnly)\n                    Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"deepOverwrite\"])(e, result);\n            }\n        }\n        else if (system.behaviour) {\n            var results = system.behaviour(matches, io);\n            for (var i in results) {\n                // check id's are consistent\n                if (results[i].id != matches[i].id)\n                    throw \"Entity IDs are inconsistent.\";\n                Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"deepOverwrite\"])(matches[i], results[i]);\n            }\n        }\n        else\n            throw \"System behaviour is undefined.\";\n    };\n    // Loop through the systems,\n    for (var _i = 0, systems_1 = systems; _i < systems_1.length; _i++) {\n        var system = systems_1[_i];\n        _loop_1(system);\n    }\n    return workingState;\n}\n\n\n//# sourceURL=webpack:///./src/advanceState.ts?");

/***/ }),

/***/ "./src/demo.ts":
/*!*********************!*\
  !*** ./src/demo.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game */ \"./src/Game.ts\");\n/* harmony import */ var _systems_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./systems/index */ \"./src/systems/index.ts\");\n/* harmony import */ var _systems_game_mechanics_Gravity__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./systems/game-mechanics/Gravity */ \"./src/systems/game-mechanics/Gravity.ts\");\n/* harmony import */ var _systems_game_mechanics_Velocity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./systems/game-mechanics/Velocity */ \"./src/systems/game-mechanics/Velocity.ts\");\n/* harmony import */ var _systems_rendering_Label__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./systems/rendering/Label */ \"./src/systems/rendering/Label.ts\");\n/* harmony import */ var _systems_game_mechanics_BouncyFloor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./systems/game-mechanics/BouncyFloor */ \"./src/systems/game-mechanics/BouncyFloor.ts\");\n/* harmony import */ var _systems_game_mechanics_LeftRightControl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./systems/game-mechanics/LeftRightControl */ \"./src/systems/game-mechanics/LeftRightControl.ts\");\n/* harmony import */ var _systems_game_mechanics_Friction__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./systems/game-mechanics/Friction */ \"./src/systems/game-mechanics/Friction.ts\");\n\n\n\n\n\n\n\n\nvar myGame = new _Game__WEBPACK_IMPORTED_MODULE_0__[\"Game\"]({\n    systems: [\n        _systems_game_mechanics_Gravity__WEBPACK_IMPORTED_MODULE_2__[\"GravitySystem\"],\n        _systems_game_mechanics_Velocity__WEBPACK_IMPORTED_MODULE_3__[\"VelocitySystem\"],\n        _systems_game_mechanics_BouncyFloor__WEBPACK_IMPORTED_MODULE_5__[\"BouncyFloorSystem\"],\n        _systems_index__WEBPACK_IMPORTED_MODULE_1__[\"BoxSpriteSystem\"],\n        _systems_rendering_Label__WEBPACK_IMPORTED_MODULE_4__[\"LabelSystem\"],\n        _systems_game_mechanics_LeftRightControl__WEBPACK_IMPORTED_MODULE_6__[\"LeftRightControlSystem\"],\n        _systems_game_mechanics_Friction__WEBPACK_IMPORTED_MODULE_7__[\"FrictionSystem\"],\n    ],\n    initialState: {\n        frame: 0,\n        entities: {\n            0: {\n                id: 0,\n                // boxSprite: {\n                //     top: 10,\n                //     left:2,\n                //     right: 2,\n                // },\n                position: { x: 25, y: 25 },\n                gravity: { g: 98.1 },\n                velocity: { xspeed: 0, yspeed: 0 },\n                label: { text: 'Joel' },\n                bouncyFloor: { y: 100, bounce: 0 },\n                leftRightControl: { acceleration: 100 },\n                friction: { friction: 0.95 },\n            }\n        }\n    }\n});\nwindow.onload = function () {\n    var canvas = document.createElement('canvas');\n    document.body.appendChild(canvas);\n    myGame.adoptCanvas(canvas);\n    myGame.start();\n};\n\n\n//# sourceURL=webpack:///./src/demo.ts?");

/***/ }),

/***/ "./src/systems/game-mechanics/BouncyFloor.ts":
/*!***************************************************!*\
  !*** ./src/systems/game-mechanics/BouncyFloor.ts ***!
  \***************************************************/
/*! exports provided: BouncyFloorSystem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BouncyFloorSystem\", function() { return BouncyFloorSystem; });\n/* harmony import */ var _system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../system */ \"./src/systems/system.ts\");\n\nvar BouncyFloorSystem = new _system__WEBPACK_IMPORTED_MODULE_0__[\"System\"]({\n    reads: ['position', 'velocity', 'bouncyFloor'],\n    writes: ['position', 'velocity'],\n    individualBehaviour: function (e, io) {\n        if (e.position.y > e.bouncyFloor.y) {\n            return {\n                position: { y: e.bouncyFloor.y },\n                velocity: { yspeed: -Math.abs(e.velocity.yspeed) * (e.bouncyFloor.bounce || 1) },\n            };\n        }\n        else {\n            return {};\n        }\n    }\n});\n\n\n//# sourceURL=webpack:///./src/systems/game-mechanics/BouncyFloor.ts?");

/***/ }),

/***/ "./src/systems/game-mechanics/Friction.ts":
/*!************************************************!*\
  !*** ./src/systems/game-mechanics/Friction.ts ***!
  \************************************************/
/*! exports provided: FrictionSystem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FrictionSystem\", function() { return FrictionSystem; });\n/* harmony import */ var _system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../system */ \"./src/systems/system.ts\");\n\nvar FrictionSystem = new _system__WEBPACK_IMPORTED_MODULE_0__[\"System\"]({\n    reads: ['velocity', 'friction'],\n    writes: ['velocity'],\n    individualBehaviour: function (e) {\n        return {\n            velocity: {\n                xspeed: e.velocity.xspeed * e.friction.friction,\n                yspeed: e.velocity.yspeed * e.friction.friction\n            }\n        };\n    }\n});\n\n\n//# sourceURL=webpack:///./src/systems/game-mechanics/Friction.ts?");

/***/ }),

/***/ "./src/systems/game-mechanics/Gravity.ts":
/*!***********************************************!*\
  !*** ./src/systems/game-mechanics/Gravity.ts ***!
  \***********************************************/
/*! exports provided: GravitySystem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GravitySystem\", function() { return GravitySystem; });\n/* harmony import */ var _system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../system */ \"./src/systems/system.ts\");\n\nvar GravitySystem = new _system__WEBPACK_IMPORTED_MODULE_0__[\"System\"]({\n    reads: ['gravity', 'velocity'],\n    writes: ['velocity'],\n    individualBehaviour: function (e, io) {\n        var _a = e.gravity.g, g = _a === void 0 ? 9.81 : _a;\n        var yspeed = e.velocity.yspeed + g * io.elapsed;\n        return {\n            velocity: {\n                yspeed: yspeed,\n            }\n        };\n    }\n});\n\n\n//# sourceURL=webpack:///./src/systems/game-mechanics/Gravity.ts?");

/***/ }),

/***/ "./src/systems/game-mechanics/LeftRightControl.ts":
/*!********************************************************!*\
  !*** ./src/systems/game-mechanics/LeftRightControl.ts ***!
  \********************************************************/
/*! exports provided: LeftRightControlSystem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LeftRightControlSystem\", function() { return LeftRightControlSystem; });\n/* harmony import */ var _system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../system */ \"./src/systems/system.ts\");\n\nvar LeftRightControlSystem = new _system__WEBPACK_IMPORTED_MODULE_0__[\"System\"]({\n    reads: ['velocity', 'leftRightControl'],\n    writes: ['velocity'],\n    individualBehaviour: function (e, io) {\n        if (io.userInput.downKeys[37]) {\n            var xspeed = e.velocity.xspeed - (e.leftRightControl.acceleration || 5) * io.elapsed;\n            console.log(xspeed, e.leftRightControl.acceleration);\n            return { velocity: { xspeed: xspeed } };\n        }\n        else if (io.userInput.downKeys[39]) {\n            return {\n                velocity: { xspeed: e.velocity.xspeed + e.leftRightControl.acceleration * io.elapsed }\n            };\n        }\n        else\n            return {};\n    }\n});\n\n\n//# sourceURL=webpack:///./src/systems/game-mechanics/LeftRightControl.ts?");

/***/ }),

/***/ "./src/systems/game-mechanics/Velocity.ts":
/*!************************************************!*\
  !*** ./src/systems/game-mechanics/Velocity.ts ***!
  \************************************************/
/*! exports provided: VelocitySystem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"VelocitySystem\", function() { return VelocitySystem; });\n/* harmony import */ var _system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../system */ \"./src/systems/system.ts\");\n\nvar VelocitySystem = new _system__WEBPACK_IMPORTED_MODULE_0__[\"System\"]({\n    reads: ['position', 'velocity'],\n    writes: ['position'],\n    individualBehaviour: function (states, io) {\n        var position = states.position, velocity = states.velocity;\n        return {\n            position: {\n                x: position.x + velocity.xspeed * io.elapsed,\n                y: position.y + velocity.yspeed * io.elapsed,\n            },\n            velocity: velocity,\n        };\n    }\n});\n\n\n//# sourceURL=webpack:///./src/systems/game-mechanics/Velocity.ts?");

/***/ }),

/***/ "./src/systems/index.ts":
/*!******************************!*\
  !*** ./src/systems/index.ts ***!
  \******************************/
/*! exports provided: BoxSpriteSystem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _rendering_BoxSprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rendering/BoxSprite */ \"./src/systems/rendering/BoxSprite.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"BoxSpriteSystem\", function() { return _rendering_BoxSprite__WEBPACK_IMPORTED_MODULE_0__[\"BoxSpriteSystem\"]; });\n\n\n\n\n//# sourceURL=webpack:///./src/systems/index.ts?");

/***/ }),

/***/ "./src/systems/rendering/BoxSprite.ts":
/*!********************************************!*\
  !*** ./src/systems/rendering/BoxSprite.ts ***!
  \********************************************/
/*! exports provided: BoxSpriteSystem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BoxSpriteSystem\", function() { return BoxSpriteSystem; });\n/* harmony import */ var _system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../system */ \"./src/systems/system.ts\");\n\nvar BoxSpriteSystem = new _system__WEBPACK_IMPORTED_MODULE_0__[\"System\"]({\n    reads: ['position', 'boxSprite'],\n    writes: [],\n    individualBehaviour: function (e, io) {\n        if (io.ctx) {\n            var ctx = io.ctx;\n            var _a = e.boxSprite, _b = _a.top, top_1 = _b === void 0 ? 0 : _b, _c = _a.left, left = _c === void 0 ? 0 : _c, _d = _a.right, right = _d === void 0 ? 0 : _d, _e = _a.bottom, bottom = _e === void 0 ? 0 : _e, _f = _a.color, color = _f === void 0 ? '#ff0000' : _f;\n            var _g = e.position, x = _g.x, y = _g.y;\n            ctx.fillStyle = color;\n            ctx.fillRect(x - left, y - top_1, left + right, top_1 + bottom);\n            return {};\n        }\n        else {\n            throw 'BoxSprite system requires a rendering context.';\n        }\n    }\n});\n\n\n//# sourceURL=webpack:///./src/systems/rendering/BoxSprite.ts?");

/***/ }),

/***/ "./src/systems/rendering/Label.ts":
/*!****************************************!*\
  !*** ./src/systems/rendering/Label.ts ***!
  \****************************************/
/*! exports provided: LabelSystem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LabelSystem\", function() { return LabelSystem; });\n/* harmony import */ var _system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../system */ \"./src/systems/system.ts\");\n\nvar LabelSystem = new _system__WEBPACK_IMPORTED_MODULE_0__[\"System\"]({\n    reads: ['position', 'label'],\n    individualBehaviour: function (e, io) {\n        if (!io.ctx)\n            throw \"Label system expects a rendering context.\";\n        var x = e.position.x + (e.label.xOffset || 0);\n        var y = e.position.y + (e.label.yOffset || 0);\n        io.ctx.strokeText(e.label.text, x, y, e.label.maxWidth);\n        return {};\n    }\n});\n\n\n//# sourceURL=webpack:///./src/systems/rendering/Label.ts?");

/***/ }),

/***/ "./src/systems/system.ts":
/*!*******************************!*\
  !*** ./src/systems/system.ts ***!
  \*******************************/
/*! exports provided: System */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"System\", function() { return System; });\nvar System = /** @class */ (function () {\n    function System(options) {\n        var reads = options.reads, _a = options.writes, writes = _a === void 0 ? [] : _a, _b = options.behaviour, behaviour = _b === void 0 ? null : _b, _c = options.individualBehaviour, individualBehaviour = _c === void 0 ? null : _c;\n        this.reads = reads;\n        this.writes = writes;\n        this.behaviour = behaviour;\n        this.individualBehaviour = individualBehaviour;\n    }\n    return System;\n}());\n\n\n\n//# sourceURL=webpack:///./src/systems/system.ts?");

/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/*! exports provided: deepOverwrite, copyState, entityHasComponents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"deepOverwrite\", function() { return deepOverwrite; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"copyState\", function() { return copyState; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"entityHasComponents\", function() { return entityHasComponents; });\n/** Merge two objects on a recursive, deep level.\n *\n * Note: This function is non-functional, it modifies the `original` argument.\n */\nfunction deepOverwrite(original, updates) {\n    if (typeof original === 'object' && typeof updates === 'object') {\n        for (var key in updates) {\n            original[key] = deepOverwrite(original[key], updates[key]);\n        }\n        return original;\n    }\n    else\n        return updates;\n}\nfunction copyState(state) {\n    return JSON.parse(JSON.stringify(state));\n}\nfunction entityHasComponents(e, components) {\n    return components.every(function (c) { return e[c] != undefined; });\n}\n\n\n//# sourceURL=webpack:///./src/util.ts?");

/***/ })

/******/ });