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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EntityComponentSystem\", function() { return EntityComponentSystem; });\n/* harmony import */ var _GamestateTracker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GamestateTracker */ \"./src/GamestateTracker.ts\");\n\n;\nvar EntityComponentSystem = /** @class */ (function () {\n    function EntityComponentSystem(_a) {\n        var initialState = _a.initialState, systems = _a.systems;\n        this.stateTracker = new _GamestateTracker__WEBPACK_IMPORTED_MODULE_0__[\"GameStateTracker\"](initialState, systems.map(function (system) { return system.reads; }));\n        this.systems = systems;\n    }\n    EntityComponentSystem.prototype.advanceState = function (io) {\n        var _this = this;\n        // Loop through the systems,\n        for (var _i = 0, _a = this.systems; _i < _a.length; _i++) {\n            var system = _a[_i];\n            // Select apropriate group\n            var group = this.stateTracker.fetchGroup(system.groupName);\n            // Apply behaviour to the matches\n            if (system.individualBehaviour) {\n                // Loop through each entity in the group\n                for (var _b = 0, _c = group.entities; _b < _c.length; _b++) {\n                    var id = _c[_b];\n                    var e = this.stateTracker.fetchEntity(id);\n                    var update = system.individualBehaviour(e, io);\n                    if (update === undefined)\n                        // do nothing\n                        continue;\n                    if (!system.observeOnly) {\n                        if (update === null)\n                            this.stateTracker.deleteEntity(id);\n                        else\n                            this.stateTracker.modifyEntity(id, update);\n                    }\n                }\n            }\n            else if (system.behaviour) {\n                var entities = group.entities.map(function (id) { return _this.stateTracker.fetchEntity(id); });\n                var update = system.behaviour(entities, io);\n                if (!system.observeOnly && update != undefined)\n                    this.stateTracker.modifyState(update);\n            }\n            else\n                throw new Error(\"System behaviour is undefined.\");\n            // let results = system.behaviour(matches);\n        }\n    };\n    return EntityComponentSystem;\n}());\n\n\n\n//# sourceURL=webpack:///./src/EntityComponentSystem.ts?");

/***/ }),

/***/ "./src/Game.ts":
/*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
/*! exports provided: Game */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Game\", function() { return Game; });\n/* harmony import */ var _EntityComponentSystem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EntityComponentSystem */ \"./src/EntityComponentSystem.ts\");\n/* harmony import */ var _UserInputReporter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserInputReporter */ \"./src/UserInputReporter.ts\");\n\n\n/** The game class handles the canvas on which the game is rendered and user input. */\nvar Game = /** @class */ (function () {\n    function Game(options) {\n        var canvas = options.canvas, systems = options.systems, initialState = options.initialState, _a = options.frameRate, frameRate = _a === void 0 ? 32 : _a;\n        this.uireporter = new _UserInputReporter__WEBPACK_IMPORTED_MODULE_1__[\"UserInputReporter\"];\n        if (canvas)\n            this.adoptCanvas(canvas);\n        this.ecs = new _EntityComponentSystem__WEBPACK_IMPORTED_MODULE_0__[\"EntityComponentSystem\"]({\n            initialState: initialState,\n            systems: systems\n        });\n        this.frameRate = frameRate;\n        this.frameInterval = 1 / this.frameRate;\n    }\n    Game.prototype.start = function () {\n        var _this = this;\n        this.tickTimer = setInterval(function () { return _this.tick(); }, 1000 / this.frameRate);\n    };\n    Game.prototype.tick = function () {\n        var tsStart = Date.now();\n        if (this.onenterframe)\n            this.onenterframe();\n        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n        var io = {\n            ctx: this.ctx,\n            game: this,\n            elapsed: this.frameInterval,\n            userInput: this.uireporter.getReport(),\n        };\n        this.ecs.advanceState(io);\n        var tsEnd = Date.now();\n        this.efficiencyMessage = tsEnd - tsStart + \" / \" + this.frameInterval * 1000 + \"ms\";\n    };\n    Game.prototype.adoptCanvas = function (canvas) {\n        if (this.canvas)\n            this.releaseCanvas();\n        this.canvas = canvas;\n        this.ctx = canvas.getContext('2d');\n        this.uireporter.adoptCanvas(canvas);\n    };\n    Game.prototype.releaseCanvas = function () {\n        this.canvas = null;\n        this.ctx = null;\n        this.uireporter.releaseCanvas();\n    };\n    return Game;\n}());\n\n\n\n//# sourceURL=webpack:///./src/Game.ts?");

/***/ }),

/***/ "./src/GamestateTracker.ts":
/*!*********************************!*\
  !*** ./src/GamestateTracker.ts ***!
  \*********************************/
/*! exports provided: getEntityGroupName, GameStateTracker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getEntityGroupName\", function() { return getEntityGroupName; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GameStateTracker\", function() { return GameStateTracker; });\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ \"./src/util.ts\");\n\nfunction getEntityGroupName(components) {\n    return components.sort().join('-');\n}\n/** The game state tracker class applies updates to a game state (in place) and keeps a set of entity groups updated  */\nvar GameStateTracker = /** @class */ (function () {\n    function GameStateTracker(initialState, groups) {\n        this.setState(initialState);\n        for (var _i = 0, groups_1 = groups; _i < groups_1.length; _i++) {\n            var group = groups_1[_i];\n            this.addGroup(group);\n        }\n        console.log(this.groups);\n    }\n    GameStateTracker.prototype.addGroup = function (components) {\n        // Generate the name\n        var name = getEntityGroupName(components);\n        // Check whether group exists\n        if (this.groups[name])\n            return this.groups[name];\n        // Find entities which match the group.\n        var entities = [];\n        for (var id in this.state.entities) {\n            var e = this.state.entities[id];\n            if (Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"entityHasComponents\"])(e, components))\n                entities.push(parseInt(id));\n        }\n        var group = {\n            name: name,\n            components: components,\n            entities: entities,\n        };\n        this.groups[name] = group;\n    };\n    GameStateTracker.prototype.fetchGroup = function (name) {\n        return this.groups[name];\n    };\n    GameStateTracker.prototype.modifyState = function (updates) {\n        // For each entity,\n        for (var id in updates) {\n            if (updates[id] == undefined) {\n                // Skip, maybe log a warning because this shouldn't happen.\n                console.warn(\"This shouldn't happen.\");\n                continue;\n            }\n            if (updates[id] == null) {\n                // Delete entity\n                this.deleteEntity(id);\n            }\n            else {\n                // If entity exists,\n                if (this.state.entities[id]) {\n                    // modify the entity.\n                    this.modifyEntity(parseInt(id), updates[id]);\n                }\n                else {\n                    // otherwise create the entity.\n                    this.createEntity(parseInt(id), updates[id]);\n                }\n            }\n        }\n    };\n    GameStateTracker.prototype.fetchEntity = function (id) {\n        return this.state.entities[id];\n    };\n    GameStateTracker.prototype.deleteEntity = function (id) {\n        var e = this.state.entities[id];\n        delete this.state.entities[id];\n        for (var name_1 in this.groups) {\n            if (Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"entityHasComponents\"])(e, this.groups[name_1].components)) {\n                var idx = this.groups[name_1].entities.indexOf(id);\n                if (idx != -1)\n                    this.groups[name_1].entities.splice(idx, 1);\n            }\n        }\n    };\n    GameStateTracker.prototype.createEntity = function (id, initialState) {\n        var e = { id: id };\n        this.state.entities[id] = e;\n        this.modifyEntity(id, initialState);\n    };\n    GameStateTracker.prototype.modifyEntity = function (id, update) {\n        var e = this.state.entities[id];\n        for (var component in update) {\n            if (update[component] == null) {\n                // remove the component\n                delete e[component];\n                for (var name_2 in this.groups)\n                    if (this.groups[name_2].components.includes(component)) {\n                        var idx = this.groups[name_2].entities.indexOf(id);\n                        if (idx != -1)\n                            this.groups[name_2].entities.splice(idx, 1);\n                    }\n            }\n            else if (e[component]) {\n                // modify the component\n                Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"deepOverwrite\"])(e[component], update[component]);\n            }\n            else {\n                // add the component\n                e[component] = update[component];\n                for (var name_3 in this.groups) {\n                    var group = this.groups[name_3];\n                    if (group.components.includes(component) && Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"entityHasComponents\"])(e, group.components))\n                        group.entities.push(id);\n                }\n            }\n        }\n    };\n    // TODO: setState() function\n    GameStateTracker.prototype.setState = function (state) {\n        this.state = state;\n        this.rebuildGroups();\n    };\n    GameStateTracker.prototype.rebuildGroups = function () {\n        var groupDefs = [];\n        for (var name_4 in this.groups)\n            groupDefs.push(this.groups[name_4].components);\n        this.groups = {};\n        for (var _i = 0, groupDefs_1 = groupDefs; _i < groupDefs_1.length; _i++) {\n            var components = groupDefs_1[_i];\n            this.addGroup(components);\n        }\n    };\n    return GameStateTracker;\n}());\n\n\n\n//# sourceURL=webpack:///./src/GamestateTracker.ts?");

/***/ }),

/***/ "./src/UserInputReporter.ts":
/*!**********************************!*\
  !*** ./src/UserInputReporter.ts ***!
  \**********************************/
/*! exports provided: UserInputReporter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"UserInputReporter\", function() { return UserInputReporter; });\nvar UserInputReporter = /** @class */ (function () {\n    function UserInputReporter() {\n        this.message = \"\";\n        this.downKeys = {};\n    }\n    UserInputReporter.prototype.adoptCanvas = function (canvas) {\n        if (this.canvas)\n            this.releaseCanvas();\n        this.canvas = canvas;\n        canvas.tabIndex = 0;\n        canvas.focus();\n        canvas.addEventListener('keydown', this.handleKeyDown.bind(this));\n        canvas.addEventListener('keyup', this.handleKeyUp.bind(this));\n        canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));\n    };\n    UserInputReporter.prototype.releaseCanvas = function () {\n        this.canvas.removeEventListener('keydown', this.handleKeyDown);\n        this.canvas.removeEventListener('keyup', this.handleKeyUp);\n        this.canvas.removeEventListener('mousedown', this.handleMouseDown);\n    };\n    UserInputReporter.prototype.getReport = function () {\n        var report = {\n            downKeys: this.downKeys,\n            clicks: this.clicks,\n            message: this.sendMessage ? this.message : undefined,\n        };\n        this.clicks = [];\n        if (this.sendMessage)\n            this.message = '';\n        this.sendMessage = false;\n        return report;\n    };\n    UserInputReporter.prototype.handleKeyDown = function (e) {\n        console.log(\"handleKeyDown(\" + e.key + \")\");\n        this.downKeys[e.keyCode] = true;\n        if (!e.metaKey && !e.ctrlKey && !e.altKey) {\n            // Add to the message\n            if (/^[A-Za-z0-9 .,?!]$/.test(e.key))\n                this.message += e.key;\n            else if (e.key == 'Backspace')\n                this.message = this.message.slice(0, -1);\n            else if (e.keyCode == 13)\n                this.sendMessage = true;\n            console.log(this.message);\n        }\n        e.preventDefault();\n    };\n    UserInputReporter.prototype.handleKeyUp = function (e) {\n        console.log(\"## handleKeyUp(\" + e + \")\");\n        this.downKeys[e.keyCode] = false;\n        e.preventDefault();\n    };\n    UserInputReporter.prototype.handleMouseDown = function (e) {\n        // TODO: Apply camera transformation to the clicks.\n        this.canvas.focus();\n        this.clicks.push({ x: e.clientX, y: e.clientY });\n        // e.preventDefault();\n    };\n    return UserInputReporter;\n}());\n\n\n\n//# sourceURL=webpack:///./src/UserInputReporter.ts?");

/***/ }),

/***/ "./src/demo.ts":
/*!*********************!*\
  !*** ./src/demo.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game */ \"./src/Game.ts\");\n/* harmony import */ var _systems_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./systems/index */ \"./src/systems/index.ts\");\n/* harmony import */ var _systems_game_mechanics_Gravity__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./systems/game-mechanics/Gravity */ \"./src/systems/game-mechanics/Gravity.ts\");\n/* harmony import */ var _systems_game_mechanics_Velocity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./systems/game-mechanics/Velocity */ \"./src/systems/game-mechanics/Velocity.ts\");\n/* harmony import */ var _systems_rendering_Label__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./systems/rendering/Label */ \"./src/systems/rendering/Label.ts\");\n/* harmony import */ var _systems_game_mechanics_BouncyFloor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./systems/game-mechanics/BouncyFloor */ \"./src/systems/game-mechanics/BouncyFloor.ts\");\n/* harmony import */ var _systems_game_mechanics_LeftRightControl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./systems/game-mechanics/LeftRightControl */ \"./src/systems/game-mechanics/LeftRightControl.ts\");\n/* harmony import */ var _systems_game_mechanics_Friction__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./systems/game-mechanics/Friction */ \"./src/systems/game-mechanics/Friction.ts\");\n/* harmony import */ var _systems_game_mechanics_TimeOut__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./systems/game-mechanics/TimeOut */ \"./src/systems/game-mechanics/TimeOut.ts\");\n\n\n\n\n\n\n\n\n\nvar myGame = new _Game__WEBPACK_IMPORTED_MODULE_0__[\"Game\"]({\n    systems: [\n        _systems_game_mechanics_Gravity__WEBPACK_IMPORTED_MODULE_2__[\"GravitySystem\"],\n        _systems_game_mechanics_Velocity__WEBPACK_IMPORTED_MODULE_3__[\"VelocitySystem\"],\n        _systems_game_mechanics_BouncyFloor__WEBPACK_IMPORTED_MODULE_5__[\"BouncyFloorSystem\"],\n        _systems_index__WEBPACK_IMPORTED_MODULE_1__[\"BoxSpriteSystem\"],\n        _systems_rendering_Label__WEBPACK_IMPORTED_MODULE_4__[\"LabelSystem\"],\n        _systems_game_mechanics_LeftRightControl__WEBPACK_IMPORTED_MODULE_6__[\"LeftRightControlSystem\"],\n        _systems_game_mechanics_Friction__WEBPACK_IMPORTED_MODULE_7__[\"FrictionSystem\"],\n        _systems_game_mechanics_TimeOut__WEBPACK_IMPORTED_MODULE_8__[\"TimeOutSystem\"],\n    ],\n    initialState: {\n        frame: 0,\n        entities: {\n            0: {\n                id: 0,\n                // boxSprite: {\n                //     top: 10,\n                //     left:2,\n                //     right: 2,\n                // },\n                position: { x: 25, y: 25 },\n                gravity: { g: 98.1 },\n                velocity: { xspeed: 0, yspeed: 0 },\n                label: { text: 'Joel' },\n                bouncyFloor: { y: 100, bounce: 0 },\n                leftRightControl: { acceleration: 100 },\n            },\n            1: {\n                id: 1,\n                position: { x: 25, y: 50 },\n                label: { text: 'I will dissappear in 5 seconds' },\n                timeOut: { timeRemaining: 5 },\n            }\n        }\n    }\n});\nwindow.onload = function () {\n    var canvas = document.createElement('canvas');\n    document.body.appendChild(canvas);\n    myGame.adoptCanvas(canvas);\n    var stateView = document.createElement('pre');\n    document.body.appendChild(stateView);\n    myGame.onenterframe = function () {\n        stateView.innerText = JSON.stringify(this.ecs.stateTracker.state, undefined, 4) + '\\n' + myGame.efficiencyMessage;\n    };\n    myGame.start();\n};\n\n\n//# sourceURL=webpack:///./src/demo.ts?");

/***/ }),

/***/ "./src/systems/game-mechanics/BouncyFloor.ts":
/*!***************************************************!*\
  !*** ./src/systems/game-mechanics/BouncyFloor.ts ***!
  \***************************************************/
/*! exports provided: BouncyFloorSystem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BouncyFloorSystem\", function() { return BouncyFloorSystem; });\n/* harmony import */ var _system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../system */ \"./src/systems/system.ts\");\n\nvar BouncyFloorSystem = new _system__WEBPACK_IMPORTED_MODULE_0__[\"System\"]({\n    reads: ['position', 'velocity', 'bouncyFloor'],\n    writes: ['position', 'velocity'],\n    individualBehaviour: function (e, io) {\n        var _a = e.bouncyFloor.bounce, bounce = _a === void 0 ? 1 : _a;\n        if (e.position.y > e.bouncyFloor.y) {\n            return {\n                position: { y: e.bouncyFloor.y },\n                velocity: { yspeed: -Math.abs(e.velocity.yspeed) * bounce },\n            };\n        }\n        else {\n            return {};\n        }\n    }\n});\n\n\n//# sourceURL=webpack:///./src/systems/game-mechanics/BouncyFloor.ts?");

/***/ }),

/***/ "./src/systems/game-mechanics/Friction.ts":
/*!************************************************!*\
  !*** ./src/systems/game-mechanics/Friction.ts ***!
  \************************************************/
/*! exports provided: FrictionSystem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FrictionSystem\", function() { return FrictionSystem; });\n/* harmony import */ var _system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../system */ \"./src/systems/system.ts\");\n\nvar FrictionSystem = new _system__WEBPACK_IMPORTED_MODULE_0__[\"System\"]({\n    reads: ['velocity', 'friction'],\n    writes: ['velocity'],\n    individualBehaviour: function (e) {\n        // TODO: Apply friction according to elapsed frame time.\n        return {\n            velocity: {\n                xspeed: e.velocity.xspeed * e.friction.friction,\n                yspeed: e.velocity.yspeed * e.friction.friction\n            }\n        };\n    }\n});\n\n\n//# sourceURL=webpack:///./src/systems/game-mechanics/Friction.ts?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LeftRightControlSystem\", function() { return LeftRightControlSystem; });\n/* harmony import */ var _system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../system */ \"./src/systems/system.ts\");\n\nvar LeftRightControlSystem = new _system__WEBPACK_IMPORTED_MODULE_0__[\"System\"]({\n    reads: ['velocity', 'leftRightControl'],\n    writes: ['velocity'],\n    individualBehaviour: function (e, io) {\n        if (io.userInput.downKeys[37]) {\n            var xspeed = e.velocity.xspeed - (e.leftRightControl.acceleration || 5) * io.elapsed;\n            return { velocity: { xspeed: xspeed } };\n        }\n        else if (io.userInput.downKeys[39]) {\n            return {\n                velocity: { xspeed: e.velocity.xspeed + e.leftRightControl.acceleration * io.elapsed }\n            };\n        }\n        else\n            return {};\n    }\n});\n\n\n//# sourceURL=webpack:///./src/systems/game-mechanics/LeftRightControl.ts?");

/***/ }),

/***/ "./src/systems/game-mechanics/TimeOut.ts":
/*!***********************************************!*\
  !*** ./src/systems/game-mechanics/TimeOut.ts ***!
  \***********************************************/
/*! exports provided: TimeOutSystem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TimeOutSystem\", function() { return TimeOutSystem; });\n/* harmony import */ var _system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../system */ \"./src/systems/system.ts\");\n\nvar TimeOutSystem = new _system__WEBPACK_IMPORTED_MODULE_0__[\"System\"]({\n    reads: ['timeOut'],\n    individualBehaviour: function (e, io) {\n        var timeRemaining = e.timeOut.timeRemaining - io.elapsed;\n        if (timeRemaining > 0)\n            return { timeOut: { timeRemaining: timeRemaining } };\n        else\n            // Delete the entitiy\n            return null;\n    }\n});\n\n\n//# sourceURL=webpack:///./src/systems/game-mechanics/TimeOut.ts?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"System\", function() { return System; });\n/* harmony import */ var _GamestateTracker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../GamestateTracker */ \"./src/GamestateTracker.ts\");\n\nvar System = /** @class */ (function () {\n    function System(options) {\n        var reads = options.reads, _a = options.writes, writes = _a === void 0 ? [] : _a, _b = options.behaviour, behaviour = _b === void 0 ? null : _b, _c = options.individualBehaviour, individualBehaviour = _c === void 0 ? null : _c;\n        // TODO: Change back to just one field: components\n        this.reads = reads;\n        this.writes = writes;\n        this.groupName = Object(_GamestateTracker__WEBPACK_IMPORTED_MODULE_0__[\"getEntityGroupName\"])(this.reads);\n        this.behaviour = behaviour;\n        this.individualBehaviour = individualBehaviour;\n    }\n    return System;\n}());\n\n\n\n//# sourceURL=webpack:///./src/systems/system.ts?");

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