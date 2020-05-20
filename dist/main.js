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
/*! exports provided: mergeGameStateUpdates, EntityComponentSystem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mergeGameStateUpdates\", function() { return mergeGameStateUpdates; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EntityComponentSystem\", function() { return EntityComponentSystem; });\n/* harmony import */ var _GamestateTracker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GamestateTracker */ \"./src/GamestateTracker.ts\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ \"./src/util.ts\");\nvar __spreadArrays = (undefined && undefined.__spreadArrays) || function () {\n    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;\n    for (var r = Array(s), k = 0, i = 0; i < il; i++)\n        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)\n            r[k] = a[j];\n    return r;\n};\n\n\nfunction mergeGameStateUpdates(a, b) {\n    var _a;\n    if (b.create) {\n        if (a.create)\n            (_a = a.create).push.apply(_a, b.create);\n        else\n            a.create = __spreadArrays(b.create);\n    }\n    for (var id in b) {\n        if (id == 'create')\n            continue;\n        if (a[id])\n            // WARNING: Could run into shared memory problems with this.\n            Object(_util__WEBPACK_IMPORTED_MODULE_1__[\"deepAssign\"])(a[id], b[id]);\n        else\n            a[id] = b[id];\n    }\n}\n;\nvar EntityComponentSystem = /** @class */ (function () {\n    function EntityComponentSystem(_a) {\n        var initialState = _a.initialState, systems = _a.systems;\n        this.stateTracker = new _GamestateTracker__WEBPACK_IMPORTED_MODULE_0__[\"GameStateTracker\"](initialState);\n        this.systems = systems;\n        for (var _i = 0, systems_1 = systems; _i < systems_1.length; _i++) {\n            var system = systems_1[_i];\n            for (var _b = 0, _c = system.reads; _b < _c.length; _b++) {\n                var components = _c[_b];\n                this.stateTracker.addGroup(components);\n            }\n        }\n    }\n    EntityComponentSystem.prototype.advanceState = function (io) {\n        var _this = this;\n        var stateUpdate = {};\n        // Loop through the systems,\n        for (var _i = 0, _a = this.systems; _i < _a.length; _i++) {\n            var system = _a[_i];\n            // Select groups\n            var groups = system.groupNames.map(function (groupName) { return _this.stateTracker.fetchGroupState(groupName); });\n            // Apply behaviour to the matches\n            var groupUpdate = system.behaviour(groups, io);\n            if (groupUpdate != undefined) {\n                this.stateTracker.assignIdToNewEntities(groupUpdate);\n                this.stateTracker.modifyState(groupUpdate);\n                mergeGameStateUpdates(stateUpdate, groupUpdate);\n            }\n        }\n        return stateUpdate;\n    };\n    Object.defineProperty(EntityComponentSystem.prototype, \"currentState\", {\n        get: function () {\n            return this.stateTracker.state;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    return EntityComponentSystem;\n}());\n\n\n\n//# sourceURL=webpack:///./src/EntityComponentSystem.ts?");

/***/ }),

/***/ "./src/GamestateTracker.ts":
/*!*********************************!*\
  !*** ./src/GamestateTracker.ts ***!
  \*********************************/
/*! exports provided: getEntityGroupName, GameStateTracker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getEntityGroupName\", function() { return getEntityGroupName; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GameStateTracker\", function() { return GameStateTracker; });\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ \"./src/util.ts\");\nvar __assign = (undefined && undefined.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\n\nfunction getEntityGroupName(components) {\n    return components.sort().join('-');\n}\n/** The game state tracker class applies updates to a game state (in place) and keeps a set of entity groups updated  */\nvar GameStateTracker = /** @class */ (function () {\n    function GameStateTracker(initialState, groups) {\n        if (groups === void 0) { groups = []; }\n        this.setState(initialState);\n        for (var _i = 0, groups_1 = groups; _i < groups_1.length; _i++) {\n            var group = groups_1[_i];\n            this.addGroup(group);\n        }\n        this.idCounter = 0;\n    }\n    GameStateTracker.prototype.addGroup = function (components) {\n        // Generate the name\n        var name = getEntityGroupName(components);\n        // Check whether group exists\n        if (this.groups[name])\n            return this.groups[name];\n        // Find entities which match the group.\n        var entities = [];\n        for (var id in this.state.entities) {\n            var e = this.state.entities[id];\n            if (Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"entityHasComponents\"])(e, components))\n                entities.push(parseInt(id));\n        }\n        var group = {\n            name: name,\n            components: components,\n            entities: entities,\n        };\n        this.groups[name] = group;\n    };\n    GameStateTracker.prototype.fetchGroup = function (name) {\n        return this.groups[name];\n    };\n    GameStateTracker.prototype.fetchGroupState = function (name) {\n        var ids = this.groups[name].entities;\n        var substate = {};\n        for (var _i = 0, ids_1 = ids; _i < ids_1.length; _i++) {\n            var id = ids_1[_i];\n            substate[id] = this.state.entities[id];\n        }\n        return substate;\n    };\n    GameStateTracker.prototype.modifyState = function (updates) {\n        // For each entity,\n        if (updates.create) {\n            for (var _i = 0, _a = updates.create; _i < _a.length; _i++) {\n                var newEntity = _a[_i];\n                var id = this.generateNewEntityId(updates);\n                this.createEntity(id, __assign({ id: id }, newEntity));\n            }\n        }\n        for (var id in updates) {\n            // Skip special field(s)\n            if (id == 'create')\n                continue;\n            if (updates[id] === undefined) {\n                // Skip, maybe log a warning because this shouldn't happen.\n                console.warn(\"This shouldn't happen.\");\n                continue;\n            }\n            if (updates[id] === null) {\n                // Delete entity\n                console.log(\"deleting entity #\" + id);\n                this.deleteEntity(parseInt(id));\n            }\n            else {\n                // If entity exists,\n                if (this.state.entities[id]) {\n                    // modify the entity.\n                    this.modifyEntity(parseInt(id), updates[id]);\n                }\n                else {\n                    // otherwise create the entity.\n                    if (typeof updates[id].id == 'number')\n                        this.createEntity(parseInt(id), updates[id]);\n                    else\n                        throw \"Attempt to modify entity which does not exist\";\n                }\n            }\n        }\n    };\n    GameStateTracker.prototype.fetchEntity = function (id) {\n        return this.state.entities[id];\n    };\n    GameStateTracker.prototype.deleteEntity = function (id) {\n        var e = this.state.entities[id];\n        delete this.state.entities[id];\n        for (var name_1 in this.groups) {\n            if (Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"entityHasComponents\"])(e, this.groups[name_1].components)) {\n                console.log(\"Removing entity #\" + id + \" from group '\" + name_1 + \"'\");\n                var idx = this.groups[name_1].entities.indexOf(id);\n                if (idx != -1)\n                    this.groups[name_1].entities.splice(idx, 1);\n                else\n                    console.warn(\"Entity #\" + id + \" was not in group as expected: '\" + name_1 + \"'\");\n            }\n        }\n    };\n    GameStateTracker.prototype.createEntity = function (id, initialState) {\n        var e = { id: id };\n        this.state.entities[id] = e;\n        this.modifyEntity(id, initialState);\n    };\n    GameStateTracker.prototype.modifyEntity = function (id, update) {\n        var e = this.state.entities[id];\n        for (var component in update) {\n            if (update[component] == null) {\n                // remove the component\n                delete e[component];\n                for (var name_2 in this.groups)\n                    if (this.groups[name_2].components.includes(component)) {\n                        var idx = this.groups[name_2].entities.indexOf(id);\n                        if (idx != -1)\n                            this.groups[name_2].entities.splice(idx, 1);\n                    }\n            }\n            else if (e[component]) {\n                // modify the component\n                Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"deepAssign\"])(e[component], update[component]);\n            }\n            else {\n                // add the component\n                e[component] = update[component];\n                for (var name_3 in this.groups) {\n                    var group = this.groups[name_3];\n                    if (group.components.includes(component) && Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"entityHasComponents\"])(e, group.components))\n                        group.entities.push(id);\n                }\n            }\n        }\n    };\n    GameStateTracker.prototype.setState = function (state) {\n        this.state = state;\n        this.rebuildGroups();\n    };\n    GameStateTracker.prototype.rebuildGroups = function () {\n        var groupDefs = [];\n        for (var name_4 in this.groups)\n            groupDefs.push(this.groups[name_4].components);\n        this.groups = {};\n        for (var _i = 0, groupDefs_1 = groupDefs; _i < groupDefs_1.length; _i++) {\n            var components = groupDefs_1[_i];\n            this.addGroup(components);\n        }\n    };\n    GameStateTracker.prototype.generateNewEntityId = function (update) {\n        var id = this.idCounter + 1;\n        if (update)\n            while (this.state.entities[id] || update[id])\n                ++id;\n        else\n            while (this.state.entities[id])\n                ++id;\n        this.idCounter = id;\n        return id;\n    };\n    /** Edits first argument */\n    GameStateTracker.prototype.assignIdToNewEntities = function (update) {\n        if (update.create) {\n            for (var _i = 0, _a = update.create; _i < _a.length; _i++) {\n                var e = _a[_i];\n                var id = this.generateNewEntityId(update);\n                e.id = id;\n                update[id] = e;\n            }\n            delete update.create;\n            return update;\n        }\n        else\n            return update;\n    };\n    return GameStateTracker;\n}());\n\n\n\n//# sourceURL=webpack:///./src/GamestateTracker.ts?");

/***/ }),

/***/ "./src/Renderer.ts":
/*!*************************!*\
  !*** ./src/Renderer.ts ***!
  \*************************/
/*! exports provided: Renderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Renderer\", function() { return Renderer; });\n/* harmony import */ var _EntityComponentSystem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EntityComponentSystem */ \"./src/EntityComponentSystem.ts\");\n/* harmony import */ var _systems_rendering_RenderSystem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./systems/rendering/RenderSystem */ \"./src/systems/rendering/RenderSystem.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\n\nvar Renderer = /** @class */ (function (_super) {\n    __extends(Renderer, _super);\n    function Renderer(_a) {\n        var canvas = _a.canvas, systems = _a.systems, initialState = _a.initialState;\n        var _this = this;\n        for (var _i = 0, systems_1 = systems; _i < systems_1.length; _i++) {\n            var system = systems_1[_i];\n            if (!(system instanceof _systems_rendering_RenderSystem__WEBPACK_IMPORTED_MODULE_1__[\"RenderSystem\"]))\n                throw new Error(\"All systems in the renederer must be RenderSystem instances.\");\n        }\n        _this = _super.call(this, { initialState: initialState, systems: systems }) || this;\n        if (canvas)\n            _this.adoptCanvas(canvas);\n        // Claim the systems\n        for (var _b = 0, systems_2 = systems; _b < systems_2.length; _b++) {\n            var system = systems_2[_b];\n            system.renderer = _this;\n        }\n        return _this;\n    }\n    Renderer.prototype.adoptCanvas = function (canvas) {\n        if (this.canvas)\n            throw new Error(\"Renderer already has a <canvas> element\");\n        this.canvas = canvas;\n        this.ctx = canvas.getContext('2d');\n    };\n    Renderer.prototype.renderUpdate = function (update, io) {\n        this.stateTracker.modifyState(update);\n        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n        this.cycleSystems(io);\n    };\n    Renderer.prototype.renderState = function (state, io) {\n        this.stateTracker.setState(state);\n        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n        this.cycleSystems(io);\n    };\n    /** Psuedo-concurrently run all systems without modifying state. */\n    Renderer.prototype.cycleSystems = function (io) {\n        var _this = this;\n        // Loop through the systems,\n        for (var _i = 0, _a = this.systems; _i < _a.length; _i++) {\n            var system = _a[_i];\n            // Select groups\n            var groups = system.groupNames.map(function (groupName) { return _this.stateTracker.fetchGroupState(groupName); });\n            // Apply behaviour to the matches\n            var groupUpdate = system.behaviour(groups, io);\n            // if(groupUpdate)\n            //     throw new Error('Renderer systems should not return state updates.')\n        }\n    };\n    return Renderer;\n}(_EntityComponentSystem__WEBPACK_IMPORTED_MODULE_0__[\"EntityComponentSystem\"]));\n\n\n\n//# sourceURL=webpack:///./src/Renderer.ts?");

/***/ }),

/***/ "./src/UserInputReporter.ts":
/*!**********************************!*\
  !*** ./src/UserInputReporter.ts ***!
  \**********************************/
/*! exports provided: UserInputReporter, mergeUserInputReports, emptyUIReport */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"UserInputReporter\", function() { return UserInputReporter; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mergeUserInputReports\", function() { return mergeUserInputReports; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"emptyUIReport\", function() { return emptyUIReport; });\nvar __spreadArrays = (undefined && undefined.__spreadArrays) || function () {\n    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;\n    for (var r = Array(s), k = 0, i = 0; i < il; i++)\n        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)\n            r[k] = a[j];\n    return r;\n};\nvar UserInputReporter = /** @class */ (function () {\n    function UserInputReporter() {\n        this.message = \"\";\n        this.downKeys = {};\n        this.clicks = [];\n    }\n    UserInputReporter.prototype.adoptCanvas = function (canvas) {\n        if (this.canvas)\n            this.releaseCanvas();\n        this.canvas = canvas;\n        canvas.tabIndex = 0;\n        canvas.focus();\n        canvas.addEventListener('keydown', this.handleKeyDown.bind(this));\n        canvas.addEventListener('keyup', this.handleKeyUp.bind(this));\n        canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));\n    };\n    UserInputReporter.prototype.releaseCanvas = function () {\n        this.canvas.removeEventListener('keydown', this.handleKeyDown);\n        this.canvas.removeEventListener('keyup', this.handleKeyUp);\n        this.canvas.removeEventListener('mousedown', this.handleMouseDown);\n    };\n    UserInputReporter.prototype.previewReport = function () {\n        return {\n            downKeys: this.downKeys,\n            clicks: this.clicks,\n            message: this.sendMessage ? this.message : undefined,\n        };\n    };\n    UserInputReporter.prototype.getReport = function () {\n        var report = {\n            downKeys: this.downKeys,\n            clicks: this.clicks,\n            message: this.sendMessage ? this.message : undefined,\n        };\n        // Clear the report\n        this.clicks = [];\n        if (this.sendMessage)\n            this.message = '';\n        this.sendMessage = false;\n        return report;\n    };\n    UserInputReporter.prototype.handleKeyDown = function (e) {\n        // console.log(`handleKeyDown(${e.key})`)\n        this.downKeys[e.keyCode] = true;\n        if (!e.metaKey && !e.ctrlKey && !e.altKey) {\n            // Add to the message\n            if (/^[A-Za-z0-9 .,?!]$/.test(e.key))\n                this.message += e.key;\n            else if (e.key == 'Backspace')\n                this.message = this.message.slice(0, -1);\n            else if (e.keyCode == 13)\n                this.sendMessage = true;\n        }\n        e.preventDefault();\n    };\n    UserInputReporter.prototype.handleKeyUp = function (e) {\n        // console.log(`## handleKeyUp(${e})`)\n        this.downKeys[e.keyCode] = false;\n        e.preventDefault();\n    };\n    UserInputReporter.prototype.handleMouseDown = function (e) {\n        // TODO: Apply camera transformation to the clicks.\n        this.canvas.focus();\n        this.clicks.push({ x: e.clientX, y: e.clientY });\n        // e.preventDefault();\n    };\n    return UserInputReporter;\n}());\n\nfunction mergeUserInputReports(a, b) {\n    var message = undefined;\n    if (a.message) {\n        if (b.message)\n            message = a.message + \"\\n\" + b.message;\n        else\n            message = a.message;\n    }\n    else\n        message = b.message;\n    var clicks = __spreadArrays(a.clicks, b.clicks);\n    var downKeys = {};\n    Object.assign(downKeys, a.downKeys);\n    for (var i in b.downKeys) {\n        if (b.downKeys[i])\n            downKeys[i] = true;\n    }\n    return {\n        downKeys: downKeys,\n        clicks: clicks,\n        message: message,\n    };\n}\nfunction emptyUIReport() {\n    return {\n        clicks: [],\n        downKeys: {},\n    };\n}\n\n\n//# sourceURL=webpack:///./src/UserInputReporter.ts?");

/***/ }),

/***/ "./src/client-server-model/GameClient.ts":
/*!***********************************************!*\
  !*** ./src/client-server-model/GameClient.ts ***!
  \***********************************************/
/*! exports provided: GameClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GameClient\", function() { return GameClient; });\n/* harmony import */ var _Renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Renderer */ \"./src/Renderer.ts\");\n/* harmony import */ var _UserInputReporter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../UserInputReporter */ \"./src/UserInputReporter.ts\");\n\n\nvar GameClient = /** @class */ (function () {\n    function GameClient(_a) {\n        var _this = this;\n        var game = _a.game, canvas = _a.canvas, socket = _a.socket;\n        this.renderer = new _Renderer__WEBPACK_IMPORTED_MODULE_0__[\"Renderer\"]({\n            canvas: canvas,\n            systems: game.renderSystems,\n            initialState: game.initialState\n        });\n        this.uiReporter = new _UserInputReporter__WEBPACK_IMPORTED_MODULE_1__[\"UserInputReporter\"];\n        this.uiReporter.adoptCanvas(canvas);\n        this.frameRate = game.frameRate;\n        this.frameInterval = 1 / this.frameRate;\n        this.socket = socket;\n        var userInput = [];\n        userInput[this.playerIndex] = this.uiReporter.previewReport();\n        this.socket.on('state update', function (update) {\n            _this.renderer.renderUpdate(update, {\n                elapsed: _this.frameInterval,\n                userInput: userInput,\n            });\n        });\n        this.socket.on('initial state', function (state) {\n            _this.renderer.renderState(state, {\n                elapsed: _this.frameInterval,\n                userInput: userInput,\n            });\n        });\n        this.socket.on('playerIndex', function (i) {\n            _this.playerIndex = i;\n        });\n    }\n    ;\n    GameClient.prototype.sendUIReport = function () {\n        var report = this.uiReporter.getReport();\n        this.socket.emit('uireport', report);\n    };\n    GameClient.prototype.start = function () {\n        var _this = this;\n        setInterval(function () { return _this.sendUIReport(); }, 1000 * this.frameInterval);\n    };\n    return GameClient;\n}());\n\n\n\n//# sourceURL=webpack:///./src/client-server-model/GameClient.ts?");

/***/ }),

/***/ "./src/demo.game.ts":
/*!**************************!*\
  !*** ./src/demo.game.ts ***!
  \**************************/
/*! exports provided: demoGame */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"demoGame\", function() { return demoGame; });\n/* harmony import */ var _systems_game_mechanics_Gravity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./systems/game-mechanics/Gravity */ \"./src/systems/game-mechanics/Gravity.ts\");\n/* harmony import */ var _systems_game_mechanics_Velocity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./systems/game-mechanics/Velocity */ \"./src/systems/game-mechanics/Velocity.ts\");\n/* harmony import */ var _systems_game_mechanics_BouncyFloor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./systems/game-mechanics/BouncyFloor */ \"./src/systems/game-mechanics/BouncyFloor.ts\");\n/* harmony import */ var _systems_game_mechanics_LeftRightControl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./systems/game-mechanics/LeftRightControl */ \"./src/systems/game-mechanics/LeftRightControl.ts\");\n/* harmony import */ var _systems_game_mechanics_MessageSystem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./systems/game-mechanics/MessageSystem */ \"./src/systems/game-mechanics/MessageSystem.ts\");\n/* harmony import */ var _systems_game_mechanics_Friction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./systems/game-mechanics/Friction */ \"./src/systems/game-mechanics/Friction.ts\");\n/* harmony import */ var _systems_game_mechanics_TimeOut__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./systems/game-mechanics/TimeOut */ \"./src/systems/game-mechanics/TimeOut.ts\");\n/* harmony import */ var _systems_rendering_BoxSprite__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./systems/rendering/BoxSprite */ \"./src/systems/rendering/BoxSprite.ts\");\n/* harmony import */ var _systems_rendering_Label__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./systems/rendering/Label */ \"./src/systems/rendering/Label.ts\");\n\n\n\n\n\n\n\n\n\nvar demoGame = {\n    frameRate: 32,\n    systems: [\n        new _systems_game_mechanics_Gravity__WEBPACK_IMPORTED_MODULE_0__[\"GravitySystem\"],\n        new _systems_game_mechanics_Velocity__WEBPACK_IMPORTED_MODULE_1__[\"VelocitySystem\"],\n        new _systems_game_mechanics_BouncyFloor__WEBPACK_IMPORTED_MODULE_2__[\"BouncyFloorSystem\"]({ y: 200 }),\n        new _systems_game_mechanics_LeftRightControl__WEBPACK_IMPORTED_MODULE_3__[\"LeftRightControlSystem\"],\n        new _systems_game_mechanics_MessageSystem__WEBPACK_IMPORTED_MODULE_4__[\"MessageSystem\"],\n        new _systems_game_mechanics_Friction__WEBPACK_IMPORTED_MODULE_5__[\"FrictionSystem\"],\n        new _systems_game_mechanics_TimeOut__WEBPACK_IMPORTED_MODULE_6__[\"TimeOutSystem\"],\n    ],\n    renderSystems: [\n        new _systems_rendering_BoxSprite__WEBPACK_IMPORTED_MODULE_7__[\"BoxSpriteSystem\"],\n        new _systems_rendering_Label__WEBPACK_IMPORTED_MODULE_8__[\"LabelSystem\"],\n    ],\n    initialState: {\n        frame: 0,\n        entities: {}\n    },\n    addPlayer: function (playerIndex, state) {\n        return {\n            create: [\n                {\n                    position: { y: 100, x: 50 * playerIndex },\n                    velocity: { xspeed: 0, yspeed: 0 },\n                    label: { text: \"Player \" + playerIndex },\n                    leftRightControl: { acceleration: 10, user: playerIndex },\n                    message: { user: playerIndex }\n                }\n            ]\n        };\n    },\n    removePlayer: function (playerIndex, state, addPlayerStateUpdate) {\n        var update = {};\n        update[Object.keys(addPlayerStateUpdate)[0]] = null;\n        return update;\n    }\n};\n\n\n//# sourceURL=webpack:///./src/demo.game.ts?");

/***/ }),

/***/ "./src/demo.ts":
/*!*********************!*\
  !*** ./src/demo.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _client_server_model_GameClient__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client-server-model/GameClient */ \"./src/client-server-model/GameClient.ts\");\n/* harmony import */ var _demo_game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./demo.game */ \"./src/demo.game.ts\");\n\n\nwindow.onload = function () {\n    var socket = io();\n    var canvas = document.createElement('canvas');\n    document.body.appendChild(canvas);\n    var gameClient = new _client_server_model_GameClient__WEBPACK_IMPORTED_MODULE_0__[\"GameClient\"]({ game: _demo_game__WEBPACK_IMPORTED_MODULE_1__[\"demoGame\"], socket: socket, canvas: canvas });\n    gameClient.start();\n};\n\n\n//# sourceURL=webpack:///./src/demo.ts?");

/***/ }),

/***/ "./src/systems/game-mechanics/BouncyFloor.ts":
/*!***************************************************!*\
  !*** ./src/systems/game-mechanics/BouncyFloor.ts ***!
  \***************************************************/
/*! exports provided: BouncyFloorSystem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BouncyFloorSystem\", function() { return BouncyFloorSystem; });\n/* harmony import */ var _system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../system */ \"./src/systems/system.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\nvar BouncyFloorSystem = /** @class */ (function (_super) {\n    __extends(BouncyFloorSystem, _super);\n    function BouncyFloorSystem(_a) {\n        var y = _a.y, _b = _a.left, left = _b === void 0 ? null : _b, _c = _a.right, right = _c === void 0 ? null : _c;\n        var _this = _super.call(this, {\n            reads: ['position', 'velocity', 'bouncyFloor'],\n            writes: ['position', 'velocity'],\n        }) || this;\n        _this.y = y;\n        _this.right = right;\n        _this.left = left;\n        return _this;\n    }\n    BouncyFloorSystem.prototype.individualBehaviour = function (e, io) {\n        var _a = e.bouncyFloor.bounce, bounce = _a === void 0 ? 1 : _a;\n        if (e.position.y > this.y &&\n            (this.left === null || this.left < e.position.x) &&\n            (this.right === null || this.right > e.position.x)) {\n            return {\n                position: { y: this.y },\n                velocity: { yspeed: -Math.abs(e.velocity.yspeed) * bounce },\n            };\n        }\n        else {\n            return {};\n        }\n    };\n    return BouncyFloorSystem;\n}(_system__WEBPACK_IMPORTED_MODULE_0__[\"IntrospectiveSystem\"]));\n\n\n\n//# sourceURL=webpack:///./src/systems/game-mechanics/BouncyFloor.ts?");

/***/ }),

/***/ "./src/systems/game-mechanics/Friction.ts":
/*!************************************************!*\
  !*** ./src/systems/game-mechanics/Friction.ts ***!
  \************************************************/
/*! exports provided: FrictionSystem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FrictionSystem\", function() { return FrictionSystem; });\n/* harmony import */ var _system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../system */ \"./src/systems/system.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\nvar FrictionSystem = /** @class */ (function (_super) {\n    __extends(FrictionSystem, _super);\n    function FrictionSystem() {\n        return _super.call(this, {\n            reads: ['velocity', 'friction'],\n            writes: ['velocity'],\n        }) || this;\n    }\n    FrictionSystem.prototype.individualBehaviour = function (e) {\n        // TODO: Apply friction according to elapsed frame time.\n        return {\n            velocity: {\n                xspeed: e.velocity.xspeed * e.friction.friction,\n                yspeed: e.velocity.yspeed * e.friction.friction\n            }\n        };\n    };\n    return FrictionSystem;\n}(_system__WEBPACK_IMPORTED_MODULE_0__[\"IntrospectiveSystem\"]));\n\n\n\n//# sourceURL=webpack:///./src/systems/game-mechanics/Friction.ts?");

/***/ }),

/***/ "./src/systems/game-mechanics/Gravity.ts":
/*!***********************************************!*\
  !*** ./src/systems/game-mechanics/Gravity.ts ***!
  \***********************************************/
/*! exports provided: GravitySystem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GravitySystem\", function() { return GravitySystem; });\n/* harmony import */ var _system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../system */ \"./src/systems/system.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\nvar GravitySystem = /** @class */ (function (_super) {\n    __extends(GravitySystem, _super);\n    function GravitySystem(options) {\n        if (options === void 0) { options = {}; }\n        var _this = _super.call(this, {\n            reads: ['gravity', 'velocity'],\n            writes: ['velocity'],\n        }) || this;\n        _this.g = options.g || 9.81;\n        return _this;\n    }\n    GravitySystem.prototype.individualBehaviour = function (e, io) {\n        var yspeed = e.velocity.yspeed + this.g * io.elapsed;\n        return {\n            velocity: {\n                yspeed: yspeed,\n            }\n        };\n    };\n    return GravitySystem;\n}(_system__WEBPACK_IMPORTED_MODULE_0__[\"IntrospectiveSystem\"]));\n\n\n\n//# sourceURL=webpack:///./src/systems/game-mechanics/Gravity.ts?");

/***/ }),

/***/ "./src/systems/game-mechanics/LeftRightControl.ts":
/*!********************************************************!*\
  !*** ./src/systems/game-mechanics/LeftRightControl.ts ***!
  \********************************************************/
/*! exports provided: LeftRightControlSystem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LeftRightControlSystem\", function() { return LeftRightControlSystem; });\n/* harmony import */ var _system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../system */ \"./src/systems/system.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\nvar LeftRightControlSystem = /** @class */ (function (_super) {\n    __extends(LeftRightControlSystem, _super);\n    function LeftRightControlSystem() {\n        return _super.call(this, {\n            reads: ['velocity', 'leftRightControl'],\n            writes: ['velocity'],\n        }) || this;\n    }\n    LeftRightControlSystem.prototype.individualBehaviour = function (e, io) {\n        var userInput = io.userInput[e.leftRightControl.user];\n        if (userInput.downKeys[37]) {\n            var xspeed = e.velocity.xspeed - (e.leftRightControl.acceleration || 5) * io.elapsed;\n            return { velocity: { xspeed: xspeed } };\n        }\n        else if (userInput.downKeys[39]) {\n            return {\n                velocity: { xspeed: e.velocity.xspeed + e.leftRightControl.acceleration * io.elapsed }\n            };\n        }\n        else\n            return {};\n    };\n    return LeftRightControlSystem;\n}(_system__WEBPACK_IMPORTED_MODULE_0__[\"IntrospectiveSystem\"]));\n\n\n\n//# sourceURL=webpack:///./src/systems/game-mechanics/LeftRightControl.ts?");

/***/ }),

/***/ "./src/systems/game-mechanics/MessageSystem.ts":
/*!*****************************************************!*\
  !*** ./src/systems/game-mechanics/MessageSystem.ts ***!
  \*****************************************************/
/*! exports provided: MessageSystem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MessageSystem\", function() { return MessageSystem; });\n/* harmony import */ var _system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../system */ \"./src/systems/system.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\nvar MessageSystem = /** @class */ (function (_super) {\n    __extends(MessageSystem, _super);\n    function MessageSystem() {\n        return _super.call(this, {\n            reads: [['message', 'position']],\n            spawns: true,\n        }) || this;\n    }\n    MessageSystem.prototype.behaviour = function (groups, io) {\n        var group = groups[0];\n        for (var id in group) {\n            var e = group[id];\n            var userInput = io.userInput[e.message.user];\n            if (userInput.message)\n                // Create a new message\n                return {\n                    create: [{\n                            label: { text: userInput.message },\n                            position: {\n                                x: e.position.x,\n                                y: e.position.y,\n                            },\n                            velocity: {\n                                xspeed: 0,\n                                yspeed: -2,\n                            },\n                            timeOut: { timeRemaining: 10 }\n                        }]\n                };\n        }\n        return {};\n    };\n    return MessageSystem;\n}(_system__WEBPACK_IMPORTED_MODULE_0__[\"System\"]));\n\n\n\n//# sourceURL=webpack:///./src/systems/game-mechanics/MessageSystem.ts?");

/***/ }),

/***/ "./src/systems/game-mechanics/TimeOut.ts":
/*!***********************************************!*\
  !*** ./src/systems/game-mechanics/TimeOut.ts ***!
  \***********************************************/
/*! exports provided: TimeOutSystem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TimeOutSystem\", function() { return TimeOutSystem; });\n/* harmony import */ var _system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../system */ \"./src/systems/system.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\nvar TimeOutSystem = /** @class */ (function (_super) {\n    __extends(TimeOutSystem, _super);\n    function TimeOutSystem() {\n        return _super.call(this, {\n            reads: ['timeOut'],\n            deletes: true,\n        }) || this;\n    }\n    TimeOutSystem.prototype.individualBehaviour = function (e, io) {\n        var timeRemaining = e.timeOut.timeRemaining - io.elapsed;\n        if (timeRemaining > 0)\n            return { timeOut: { timeRemaining: timeRemaining } };\n        else\n            // Delete the entitiy\n            return null;\n    };\n    return TimeOutSystem;\n}(_system__WEBPACK_IMPORTED_MODULE_0__[\"IntrospectiveSystem\"]));\n\n\n\n//# sourceURL=webpack:///./src/systems/game-mechanics/TimeOut.ts?");

/***/ }),

/***/ "./src/systems/game-mechanics/Velocity.ts":
/*!************************************************!*\
  !*** ./src/systems/game-mechanics/Velocity.ts ***!
  \************************************************/
/*! exports provided: VelocitySystem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"VelocitySystem\", function() { return VelocitySystem; });\n/* harmony import */ var _system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../system */ \"./src/systems/system.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\nvar VelocitySystem = /** @class */ (function (_super) {\n    __extends(VelocitySystem, _super);\n    function VelocitySystem() {\n        return _super.call(this, {\n            reads: ['velocity', 'position'],\n            writes: ['position'],\n        }) || this;\n    }\n    VelocitySystem.prototype.individualBehaviour = function (e) {\n        return {\n            position: {\n                x: e.position.x + e.velocity.xspeed,\n                y: e.position.y + e.velocity.yspeed,\n            }\n        };\n    };\n    return VelocitySystem;\n}(_system__WEBPACK_IMPORTED_MODULE_0__[\"IntrospectiveSystem\"]));\n\n\n\n//# sourceURL=webpack:///./src/systems/game-mechanics/Velocity.ts?");

/***/ }),

/***/ "./src/systems/rendering/BoxSprite.ts":
/*!********************************************!*\
  !*** ./src/systems/rendering/BoxSprite.ts ***!
  \********************************************/
/*! exports provided: BoxSpriteSystem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BoxSpriteSystem\", function() { return BoxSpriteSystem; });\n/* harmony import */ var _RenderSystem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RenderSystem */ \"./src/systems/rendering/RenderSystem.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\n// export const BoxSpriteSystem = new System({\n//     reads: ['position', 'boxSprite'],\n//     writes: [],\n//     individualBehaviour(e: {position: PositionComponentState, boxSprite:BoxSpriteComponentState}, io:IOObject) {\n//         if(io.ctx) {\n//             const ctx = io.ctx;\n//             const {top=0, left=0, right=0, bottom=0, color='#ff0000'} = e.boxSprite;\n//             const {x, y} = e.position;\n//             ctx.fillStyle = color;\n//             ctx.fillRect(\n//                 x - left,\n//                 y - top,\n//                 left + right,\n//                 top + bottom\n//             );\n//             return {}\n//         } else {\n//             throw 'BoxSprite system requires a rendering context.';\n//         }\n//     }\n// })\n/** @deprecated */\nvar BoxSpriteSystem = /** @class */ (function (_super) {\n    __extends(BoxSpriteSystem, _super);\n    function BoxSpriteSystem() {\n        return _super.call(this, {\n            reads: ['position', 'boxSprite'],\n        }) || this;\n    }\n    BoxSpriteSystem.prototype.individualBehaviour = function (e, io) {\n        var ctx = this.renderer.ctx;\n        var _a = e.boxSprite, _b = _a.top, top = _b === void 0 ? 0 : _b, _c = _a.left, left = _c === void 0 ? 0 : _c, _d = _a.right, right = _d === void 0 ? 0 : _d, _e = _a.bottom, bottom = _e === void 0 ? 0 : _e, _f = _a.color, color = _f === void 0 ? '#ff0000' : _f;\n        var _g = e.position, x = _g.x, y = _g.y;\n        ctx.fillStyle = color;\n        ctx.fillRect(x - left, y - top, left + right, top + bottom);\n        return {};\n    };\n    return BoxSpriteSystem;\n}(_RenderSystem__WEBPACK_IMPORTED_MODULE_0__[\"RenderSystem\"]));\n\n\n\n//# sourceURL=webpack:///./src/systems/rendering/BoxSprite.ts?");

/***/ }),

/***/ "./src/systems/rendering/Label.ts":
/*!****************************************!*\
  !*** ./src/systems/rendering/Label.ts ***!
  \****************************************/
/*! exports provided: LabelSystem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LabelSystem\", function() { return LabelSystem; });\n/* harmony import */ var _RenderSystem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RenderSystem */ \"./src/systems/rendering/RenderSystem.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\n/** @deprecated */\nvar LabelSystem = /** @class */ (function (_super) {\n    __extends(LabelSystem, _super);\n    function LabelSystem() {\n        return _super.call(this, {\n            reads: ['label', 'position'],\n        }) || this;\n    }\n    LabelSystem.prototype.individualBehaviour = function (e, io) {\n        var x = e.position.x + (e.label.xOffset || 0);\n        var y = e.position.y + (e.label.yOffset || 0);\n        this.renderer.ctx.strokeText(e.label.text, x, y, e.label.maxWidth);\n        return undefined;\n    };\n    return LabelSystem;\n}(_RenderSystem__WEBPACK_IMPORTED_MODULE_0__[\"RenderSystem\"]));\n\n\n\n//# sourceURL=webpack:///./src/systems/rendering/Label.ts?");

/***/ }),

/***/ "./src/systems/rendering/RenderSystem.ts":
/*!***********************************************!*\
  !*** ./src/systems/rendering/RenderSystem.ts ***!
  \***********************************************/
/*! exports provided: RenderSystem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RenderSystem\", function() { return RenderSystem; });\n/* harmony import */ var _system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../system */ \"./src/systems/system.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\nvar RenderSystem = /** @class */ (function (_super) {\n    __extends(RenderSystem, _super);\n    function RenderSystem(_a) {\n        var reads = _a.reads;\n        return _super.call(this, {\n            reads: reads,\n            writes: [],\n            deletes: false,\n        }) || this;\n    }\n    return RenderSystem;\n}(_system__WEBPACK_IMPORTED_MODULE_0__[\"IntrospectiveSystem\"]));\n\n\n\n//# sourceURL=webpack:///./src/systems/rendering/RenderSystem.ts?");

/***/ }),

/***/ "./src/systems/system.ts":
/*!*******************************!*\
  !*** ./src/systems/system.ts ***!
  \*******************************/
/*! exports provided: System, IntrospectiveSystem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"System\", function() { return System; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"IntrospectiveSystem\", function() { return IntrospectiveSystem; });\n/* harmony import */ var _GamestateTracker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../GamestateTracker */ \"./src/GamestateTracker.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\n/** Base class for all systems */\nvar System = /** @class */ (function () {\n    function System(options) {\n        var reads = options.reads, _a = options.writes, writes = _a === void 0 ? [] : _a, _b = options.spawns, spawns = _b === void 0 ? false : _b, _c = options.deletes, deletes = _c === void 0 ? false : _c;\n        this.reads = reads;\n        this.writes = writes;\n        this.spawns = spawns;\n        this.deletes = deletes;\n        this.groupNames = this.reads.map(function (components) { return Object(_GamestateTracker__WEBPACK_IMPORTED_MODULE_0__[\"getEntityGroupName\"])(components); });\n    }\n    System.prototype.behaviour = function (groups, io) {\n        throw \"Behaviour is not implemented for this system.\";\n    };\n    return System;\n}());\n\n/** Introspective systems modify one entity state at a time. */\nvar IntrospectiveSystem = /** @class */ (function (_super) {\n    __extends(IntrospectiveSystem, _super);\n    function IntrospectiveSystem(options) {\n        return _super.call(this, {\n            reads: [options.reads],\n            writes: options.writes || [],\n            deletes: options.deletes || false,\n            spawns: false,\n        }) || this;\n    }\n    IntrospectiveSystem.prototype.behaviour = function (groups, io) {\n        // There should be just the one group\n        var group = groups[0];\n        var updates = {};\n        for (var id in group) {\n            var e = group[id];\n            var result = this.individualBehaviour(e, io);\n            if (result === undefined)\n                continue;\n            else\n                updates[id] = result;\n        }\n        return updates;\n    };\n    IntrospectiveSystem.prototype.individualBehaviour = function (e, io) {\n        throw \"Behaviour of introspective system is not defined.\";\n    };\n    return IntrospectiveSystem;\n}(System));\n\n\n\n//# sourceURL=webpack:///./src/systems/system.ts?");

/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/*! exports provided: deepAssign, copyState, entityHasComponents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"deepAssign\", function() { return deepAssign; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"copyState\", function() { return copyState; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"entityHasComponents\", function() { return entityHasComponents; });\n/** Merge two objects on a recursive, deep level.\n *\n * Note: This function is non-functional, it modifies the `original` argument.\n */\nfunction deepAssign(original, updates) {\n    if (typeof original === 'object' && typeof updates === 'object') {\n        for (var key in updates) {\n            original[key] = deepAssign(original[key], updates[key]);\n        }\n        return original;\n    }\n    else\n        return updates;\n}\nfunction copyState(state) {\n    return JSON.parse(JSON.stringify(state));\n}\nfunction entityHasComponents(e, components) {\n    return components.every(function (c) { return e[c] != undefined; });\n}\n\n\n//# sourceURL=webpack:///./src/util.ts?");

/***/ })

/******/ });