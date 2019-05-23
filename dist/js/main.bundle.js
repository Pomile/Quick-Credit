/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "72de472d17904ac813de";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
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
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
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
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./index.js")(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/UI.js":
/*!*************************!*\
  !*** ./assets/js/UI.js ***!
  \*************************/
/*! exports provided: sidenav, backdrop, backdrop1, tabCon, loanDetailsNode, tabMenuNavigation, email, password */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sidenav", function() { return sidenav; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "backdrop", function() { return backdrop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "backdrop1", function() { return backdrop1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tabCon", function() { return tabCon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loanDetailsNode", function() { return loanDetailsNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tabMenuNavigation", function() { return tabMenuNavigation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "email", function() { return email; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "password", function() { return password; });
var sidenav = document.getElementById("sidenavWrapper");
var backdrop = document.getElementById("backdrop");
var backdrop1 = document.getElementById("backdrop1");
var tabCon = document.getElementById("tab");
var loanDetailsNode = document.getElementById("loanDetails");
var tabMenuNavigation = document.getElementById("tabMenuNavigation");
var email = document.getElementById("email");
var password = document.getElementById("password");

/***/ }),

/***/ "./assets/js/buttons.js":
/*!******************************!*\
  !*** ./assets/js/buttons.js ***!
  \******************************/
/*! exports provided: sidedrawerBtn, backDrobBtn, backDrobBtn1, backDrobBtn2, signupBtn, signinBtn, tabMenu, tabMenu2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sidedrawerBtn", function() { return sidedrawerBtn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "backDrobBtn", function() { return backDrobBtn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "backDrobBtn1", function() { return backDrobBtn1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "backDrobBtn2", function() { return backDrobBtn2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "signupBtn", function() { return signupBtn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "signinBtn", function() { return signinBtn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tabMenu", function() { return tabMenu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tabMenu2", function() { return tabMenu2; });
var sidedrawerBtn = document.getElementById('sidedrawer');
var backDrobBtn = document.getElementById('backdrop');
var backDrobBtn1 = document.getElementById('backdrop1');
var backDrobBtn2 = document.getElementById('backdrop2');
var signupBtn = document.getElementById('signupBtn');
var signinBtn = document.getElementById('signinBtn');
var tabMenu = document.getElementById('tabMenu');
var tabMenu2 = document.getElementById('tabMenu2');

/***/ }),

/***/ "./assets/js/events/capFirstLetter.js":
/*!********************************************!*\
  !*** ./assets/js/events/capFirstLetter.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var capitalizeFirstLetter = function capitalizeFirstLetter(name) {
  var firstLetter = name[0].toUpperCase();
  var arr = name.split('');
  var len = arr.length;
  var otherLetters = arr.slice(1, len).join('');
  var newWord = firstLetter + otherLetters;
  return newWord;
};

var capitalizeWords = function capitalizeWords(string) {
  if (string.includes(' ')) {
    var splitName = string.split(' ');
    var formatedString = [];
    splitName.forEach(function (name) {
      if (name !== '') {
        var nam = capitalizeFirstLetter(name);
        formatedString.push(nam);
      }
    });
    return formatedString.join(' ');
  }

  return capitalizeFirstLetter(string);
};

/* harmony default export */ __webpack_exports__["default"] = (capitalizeWords);

/***/ }),

/***/ "./assets/js/events/loanDetails.js":
/*!*****************************************!*\
  !*** ./assets/js/events/loanDetails.js ***!
  \*****************************************/
/*! exports provided: openLoanDetails, closeLoanDetails, openLoanMsg, closeLoanMsg */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openLoanDetails", function() { return openLoanDetails; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeLoanDetails", function() { return closeLoanDetails; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openLoanMsg", function() { return openLoanMsg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeLoanMsg", function() { return closeLoanMsg; });
var openLoanDetails = function openLoanDetails() {
  document.getElementById('loanDetails').classList.remove('hide');
  document.getElementById('backdrop1').classList.remove('hide');
  document.getElementById('backdrop1').classList.add('show');
  document.getElementById('loanDetails').classList.add('show');
};
var closeLoanDetails = function closeLoanDetails() {
  document.getElementById('loanDetails').classList.remove('show');
  document.getElementById('backdrop1').classList.remove('show');
  document.getElementById('loanDetails').classList.add('hide');
  document.getElementById('backdrop1').classList.add('hide');
};
var openLoanMsg = function openLoanMsg() {
  document.getElementById('loanMsg').classList.remove('hide');
  document.getElementById('backdrop2').classList.remove('hide');
  document.getElementById('backdrop2').classList.add('show');
  document.getElementById('loanMsg').classList.add('show');
};
var closeLoanMsg = function closeLoanMsg() {
  document.getElementById('loanMsg').classList.remove('show');
  document.getElementById('backdrop2').classList.remove('show');
  document.getElementById('loanMsg').classList.add('hide');
  document.getElementById('backdrop2').classList.add('hide');
};

/***/ }),

/***/ "./assets/js/events/sidedrawer.js":
/*!****************************************!*\
  !*** ./assets/js/events/sidedrawer.js ***!
  \****************************************/
/*! exports provided: openSideNav, hideSideNav */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openSideNav", function() { return openSideNav; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hideSideNav", function() { return hideSideNav; });
var openSideNav = function openSideNav(sidenav, backdrop) {
  backdrop.classList.remove('hide');
  sidenav.classList.remove('hideSideNav');
  backdrop.classList.add('show');
  sidenav.classList.add('showSideNav');
};
var hideSideNav = function hideSideNav(sidenav, backdrop) {
  backdrop.classList.remove('show');
  sidenav.classList.remove('showSideNav');
  backdrop.classList.add('hide');
  sidenav.classList.add('hideSideNav');
};

/***/ }),

/***/ "./assets/js/events/signin.js":
/*!************************************!*\
  !*** ./assets/js/events/signin.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var signin = function signin(event, email, password) {
  event.preventDefault();

  if (email === '' && password === '') {
    return window.location.href = "./user.html";
  } else if (email === 'admin@mail.com' && password === 'admin') {
    return window.location.href = "./admin.html";
  }
};

/* harmony default export */ __webpack_exports__["default"] = (signin);

/***/ }),

/***/ "./assets/js/events/signup.js":
/*!************************************!*\
  !*** ./assets/js/events/signup.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var signup = function signup(event) {
  event.preventDefault();
  return window.location.href = "./signin.html";
};

/* harmony default export */ __webpack_exports__["default"] = (signup);

/***/ }),

/***/ "./assets/js/events/statusEvt.js":
/*!***************************************!*\
  !*** ./assets/js/events/statusEvt.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _loanDetails__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loanDetails */ "./assets/js/events/loanDetails.js");


function toggleStatus(evt, status1, status2, msgp) {
  var index;
  var len1 = document.getElementsByClassName(status1).length;
  var msg = document.getElementById('loanMsg');

  for (var _len = arguments.length, args = new Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
    args[_key - 4] = arguments[_key];
  }

  for (var counter = 0; counter < len1; counter++) {
    if (evt.currentTarget.id === document.getElementsByClassName(status1)[counter].id) {
      index = counter;
      var id1 = document.getElementsByClassName(status1)[counter].id;
      var id2 = document.getElementsByClassName(status2)[counter].id;

      if (status1 === 'approve') {
        msg.innerHTML = msgp;
      } else if (status1 === 'cancel') {
        msg.innerHTML = msgp;
      } else if (status1 === 'verify') {
        msg.innerHTML = msgp;
      } else if (status1 === 'unverify') {
        msg.innerHTML = msgp;
      }

      if (args.length > 3) {
        var status3 = args[0],
            color1 = args[1],
            color2 = args[2],
            color3 = args[3];
        var id3 = document.getElementsByClassName(status3)[counter].id;
        document.getElementById(id3).style.color = color3;
        document.getElementById(id1).style.color = color1;
        document.getElementById(id2).style.color = color2;
        msg.innerHTML = msgp;
      } else if (args.length === 2) {
        var _color = args[0],
            _color2 = args[1];
        document.getElementById(id1).style.color = _color;
        document.getElementById(id2).style.color = _color2;
      }
    }
  }

  Object(_loanDetails__WEBPACK_IMPORTED_MODULE_0__["openLoanMsg"])();
}

/* harmony default export */ __webpack_exports__["default"] = (toggleStatus);

/***/ }),

/***/ "./assets/js/events/tab.js":
/*!*********************************!*\
  !*** ./assets/js/events/tab.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _capFirstLetter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./capFirstLetter */ "./assets/js/events/capFirstLetter.js");


function openTab(evt, tabName) {
  // Declare all variables
  var i;
  var tabcontent;
  var tablinks; // Get all elements with class="tabcontent" and hide them

  tabcontent = document.getElementsByClassName('tabcontent');

  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none';
  } // Get all elements with class="tablinks" and remove the class "active"


  tablinks = document.getElementsByClassName('tablinks');

  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '');
  }

  var name;

  if (evt.currentTarget.innerHTML === undefined) {
    name = Object(_capFirstLetter__WEBPACK_IMPORTED_MODULE_0__["default"])(tabName);
    document.getElementById('tabHeader').innerHTML = "".concat(name);
  } else {
    name = Object(_capFirstLetter__WEBPACK_IMPORTED_MODULE_0__["default"])(evt.currentTarget.innerHTML);
    document.getElementById('tabHeader').innerHTML = "".concat(name);
  } // Show the current tab, and add an "active" class to the button that opened the tab


  document.getElementById(tabName).style.display = 'block';
  evt.currentTarget.className += ' active';
}

/* harmony default export */ __webpack_exports__["default"] = (openTab);

/***/ }),

/***/ "./assets/js/events/tabMenu.js":
/*!*************************************!*\
  !*** ./assets/js/events/tabMenu.js ***!
  \*************************************/
/*! exports provided: openTabMenuNav, hideTabMenuNav, showTab */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openTabMenuNav", function() { return openTabMenuNav; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hideTabMenuNav", function() { return hideTabMenuNav; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showTab", function() { return showTab; });
var openTabMenuNav = function openTabMenuNav(tabMenuNavigation, tabMenu, tabMenu2) {
  window.tabMenuStatus = 0;
  tabMenu.classList.remove('show');
  tabMenu.classList.add('hide');
  tabMenu2.classList.remove('hide');
  tabMenu2.classList.add('show');
  tabMenuNavigation.classList.remove('hide');
  tabMenuNavigation.classList.add('show');
};
var hideTabMenuNav = function hideTabMenuNav(tabMenuNavigation, tabMenu, tabMenu2) {
  window.tabMenuStatus = 1;
  tabMenu.classList.remove('hide');
  tabMenu.classList.add('show');
  tabMenu2.classList.remove('show');
  tabMenu2.classList.add('hide');
  tabMenuNavigation.classList.remove('show');
  tabMenuNavigation.classList.add('hide');
};
var showTab = function showTab(evt, tabName) {
  // Declare all variables
  var tabNav;
  openTab(evt, tabName); // close tab navigation

  tabNav = document.getElementById('tabMenuNavigation');
  tabNav.classList.remove('show');
  tabNav.classList.add('hide'); // remove active from previous tab link

  if (window.tabNavLinkInnerHTML !== evt.currentTarget.innerHTML) {
    window.tabNavLink.classList.remove('active');
  } else {
    evt.currentTarget.classList.add('active');
  }

  window.tabNavLinkInnerHTML = evt.currentTarget.innerHTML;
  window.tabNavLink = evt.currentTarget;
};

/***/ }),

/***/ "./assets/js/events/toggler.js":
/*!*************************************!*\
  !*** ./assets/js/events/toggler.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function toggler() {
  document.getElementById("dropdown").classList.toggle("show");
}

/* harmony default export */ __webpack_exports__["default"] = (toggler);

/***/ }),

/***/ "./index.css":
/*!*******************!*\
  !*** ./index.css ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ "./index.css");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _assets_js_buttons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/js/buttons */ "./assets/js/buttons.js");
/* harmony import */ var _assets_js_UI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/js/UI */ "./assets/js/UI.js");
/* harmony import */ var _assets_js_events_sidedrawer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assets/js/events/sidedrawer */ "./assets/js/events/sidedrawer.js");
/* harmony import */ var _assets_js_events_loanDetails__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./assets/js/events/loanDetails */ "./assets/js/events/loanDetails.js");
/* harmony import */ var _assets_js_events_tabMenu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./assets/js/events/tabMenu */ "./assets/js/events/tabMenu.js");
/* harmony import */ var _assets_js_events_signup__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./assets/js/events/signup */ "./assets/js/events/signup.js");
/* harmony import */ var _assets_js_events_signin__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./assets/js/events/signin */ "./assets/js/events/signin.js");
/* harmony import */ var _assets_js_events_tab__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./assets/js/events/tab */ "./assets/js/events/tab.js");
/* harmony import */ var _assets_js_events_statusEvt__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./assets/js/events/statusEvt */ "./assets/js/events/statusEvt.js");
/* harmony import */ var _assets_js_events_toggler__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./assets/js/events/toggler */ "./assets/js/events/toggler.js");











window.openTab = _assets_js_events_tab__WEBPACK_IMPORTED_MODULE_8__["default"];
window.showTab = _assets_js_events_tabMenu__WEBPACK_IMPORTED_MODULE_5__["showTab"];
window.openLoanDetails = _assets_js_events_loanDetails__WEBPACK_IMPORTED_MODULE_4__["openLoanDetails"];
window.toggler = _assets_js_events_toggler__WEBPACK_IMPORTED_MODULE_10__["default"];
window.tabNavLink = document.getElementsByClassName('tabMenu-navigation__link')[0];

if (_assets_js_buttons__WEBPACK_IMPORTED_MODULE_1__["sidedrawerBtn"]) {
  _assets_js_buttons__WEBPACK_IMPORTED_MODULE_1__["sidedrawerBtn"].addEventListener('click', function () {
    return Object(_assets_js_events_sidedrawer__WEBPACK_IMPORTED_MODULE_3__["openSideNav"])(_assets_js_UI__WEBPACK_IMPORTED_MODULE_2__["sidenav"], _assets_js_UI__WEBPACK_IMPORTED_MODULE_2__["backdrop"]);
  });
}

if (_assets_js_buttons__WEBPACK_IMPORTED_MODULE_1__["backDrobBtn1"]) {
  _assets_js_buttons__WEBPACK_IMPORTED_MODULE_1__["backDrobBtn1"].addEventListener('click', _assets_js_events_loanDetails__WEBPACK_IMPORTED_MODULE_4__["closeLoanDetails"]);
}

if (_assets_js_buttons__WEBPACK_IMPORTED_MODULE_1__["backDrobBtn2"]) {
  _assets_js_buttons__WEBPACK_IMPORTED_MODULE_1__["backDrobBtn2"].addEventListener('click', _assets_js_events_loanDetails__WEBPACK_IMPORTED_MODULE_4__["closeLoanMsg"]);
}

if (_assets_js_buttons__WEBPACK_IMPORTED_MODULE_1__["backDrobBtn"]) {
  _assets_js_buttons__WEBPACK_IMPORTED_MODULE_1__["backDrobBtn"].addEventListener('click', function () {
    return Object(_assets_js_events_sidedrawer__WEBPACK_IMPORTED_MODULE_3__["hideSideNav"])(_assets_js_UI__WEBPACK_IMPORTED_MODULE_2__["sidenav"], _assets_js_UI__WEBPACK_IMPORTED_MODULE_2__["backdrop"]);
  });
}

if (_assets_js_buttons__WEBPACK_IMPORTED_MODULE_1__["signupBtn"]) {
  _assets_js_buttons__WEBPACK_IMPORTED_MODULE_1__["signupBtn"].onclick = function (event) {
    return Object(_assets_js_events_signup__WEBPACK_IMPORTED_MODULE_6__["default"])(event);
  };
}

if (_assets_js_buttons__WEBPACK_IMPORTED_MODULE_1__["signinBtn"]) {
  _assets_js_buttons__WEBPACK_IMPORTED_MODULE_1__["signinBtn"].onclick = function (event) {
    return Object(_assets_js_events_signin__WEBPACK_IMPORTED_MODULE_7__["default"])(event, _assets_js_UI__WEBPACK_IMPORTED_MODULE_2__["email"].value.trim(), _assets_js_UI__WEBPACK_IMPORTED_MODULE_2__["password"].value.trim());
  };
}

if (_assets_js_UI__WEBPACK_IMPORTED_MODULE_2__["tabCon"] && window.location.pathname === '/Quick-Credit/dist/profile.html') {
  window.addEventListener('load', function () {
    return Object(_assets_js_events_tab__WEBPACK_IMPORTED_MODULE_8__["default"])(event, 'account');
  });
}

if (_assets_js_UI__WEBPACK_IMPORTED_MODULE_2__["tabCon"] && window.location.pathname === '/Quick-Credit/dist/manageloan.html') {
  window.addEventListener('load', function () {
    return Object(_assets_js_events_tab__WEBPACK_IMPORTED_MODULE_8__["default"])(event, 'allLoans');
  });
}

if (_assets_js_buttons__WEBPACK_IMPORTED_MODULE_1__["tabMenu"]) {
  _assets_js_buttons__WEBPACK_IMPORTED_MODULE_1__["tabMenu"].addEventListener('click', function () {
    return Object(_assets_js_events_tabMenu__WEBPACK_IMPORTED_MODULE_5__["openTabMenuNav"])(_assets_js_UI__WEBPACK_IMPORTED_MODULE_2__["tabMenuNavigation"], _assets_js_buttons__WEBPACK_IMPORTED_MODULE_1__["tabMenu"], _assets_js_buttons__WEBPACK_IMPORTED_MODULE_1__["tabMenu2"]);
  });
}

if (_assets_js_buttons__WEBPACK_IMPORTED_MODULE_1__["tabMenu2"]) {
  _assets_js_buttons__WEBPACK_IMPORTED_MODULE_1__["tabMenu2"].addEventListener('click', function () {
    return Object(_assets_js_events_tabMenu__WEBPACK_IMPORTED_MODULE_5__["hideTabMenuNav"])(_assets_js_UI__WEBPACK_IMPORTED_MODULE_2__["tabMenuNavigation"], _assets_js_buttons__WEBPACK_IMPORTED_MODULE_1__["tabMenu"], _assets_js_buttons__WEBPACK_IMPORTED_MODULE_1__["tabMenu2"]);
  });
}

if (window.location.pathname === '/') {
  window.toggleStatus = _assets_js_events_statusEvt__WEBPACK_IMPORTED_MODULE_9__["default"];
  window.addEventListener('scroll', function () {
    if (window.scrollY > 150) {
      document.getElementById('header').style.backgroundColor = 'rgb(3, 75, 75)';
    } else if (window.scrollY < 150) {
      document.getElementById('header').style.backgroundColor = '';
    }
  });
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL1VJLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9idXR0b25zLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9ldmVudHMvY2FwRmlyc3RMZXR0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2V2ZW50cy9sb2FuRGV0YWlscy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvZXZlbnRzL3NpZGVkcmF3ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2V2ZW50cy9zaWduaW4uanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2V2ZW50cy9zaWdudXAuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2V2ZW50cy9zdGF0dXNFdnQuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2V2ZW50cy90YWIuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2V2ZW50cy90YWJNZW51LmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9ldmVudHMvdG9nZ2xlci5qcyIsIndlYnBhY2s6Ly8vLi9pbmRleC5jc3MiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiXSwibmFtZXMiOlsic2lkZW5hdiIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJiYWNrZHJvcCIsImJhY2tkcm9wMSIsInRhYkNvbiIsImxvYW5EZXRhaWxzTm9kZSIsInRhYk1lbnVOYXZpZ2F0aW9uIiwiZW1haWwiLCJwYXNzd29yZCIsInNpZGVkcmF3ZXJCdG4iLCJiYWNrRHJvYkJ0biIsImJhY2tEcm9iQnRuMSIsImJhY2tEcm9iQnRuMiIsInNpZ251cEJ0biIsInNpZ25pbkJ0biIsInRhYk1lbnUiLCJ0YWJNZW51MiIsImNhcGl0YWxpemVGaXJzdExldHRlciIsIm5hbWUiLCJmaXJzdExldHRlciIsInRvVXBwZXJDYXNlIiwiYXJyIiwic3BsaXQiLCJsZW4iLCJsZW5ndGgiLCJvdGhlckxldHRlcnMiLCJzbGljZSIsImpvaW4iLCJuZXdXb3JkIiwiY2FwaXRhbGl6ZVdvcmRzIiwic3RyaW5nIiwiaW5jbHVkZXMiLCJzcGxpdE5hbWUiLCJmb3JtYXRlZFN0cmluZyIsImZvckVhY2giLCJuYW0iLCJwdXNoIiwib3BlbkxvYW5EZXRhaWxzIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIiwiY2xvc2VMb2FuRGV0YWlscyIsIm9wZW5Mb2FuTXNnIiwiY2xvc2VMb2FuTXNnIiwib3BlblNpZGVOYXYiLCJoaWRlU2lkZU5hdiIsInNpZ25pbiIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJzaWdudXAiLCJ0b2dnbGVTdGF0dXMiLCJldnQiLCJzdGF0dXMxIiwic3RhdHVzMiIsIm1zZ3AiLCJpbmRleCIsImxlbjEiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwibXNnIiwiYXJncyIsImNvdW50ZXIiLCJjdXJyZW50VGFyZ2V0IiwiaWQiLCJpZDEiLCJpZDIiLCJpbm5lckhUTUwiLCJzdGF0dXMzIiwiY29sb3IxIiwiY29sb3IyIiwiY29sb3IzIiwiaWQzIiwic3R5bGUiLCJjb2xvciIsIm9wZW5UYWIiLCJ0YWJOYW1lIiwiaSIsInRhYmNvbnRlbnQiLCJ0YWJsaW5rcyIsImRpc3BsYXkiLCJjbGFzc05hbWUiLCJyZXBsYWNlIiwidW5kZWZpbmVkIiwiY2FwRmlyc3RMZXR0ZXIiLCJvcGVuVGFiTWVudU5hdiIsInRhYk1lbnVTdGF0dXMiLCJoaWRlVGFiTWVudU5hdiIsInNob3dUYWIiLCJ0YWJOYXYiLCJ0YWJOYXZMaW5rSW5uZXJIVE1MIiwidGFiTmF2TGluayIsInRvZ2dsZXIiLCJ0b2dnbGUiLCJhZGRFdmVudExpc3RlbmVyIiwib25jbGljayIsInZhbHVlIiwidHJpbSIsInBhdGhuYW1lIiwic2Nyb2xsWSIsImJhY2tncm91bmRDb2xvciJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBNkI7QUFDN0IscUNBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUFxQixnQkFBZ0I7QUFDckM7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSw2QkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEJBQWtCLDhCQUE4QjtBQUNoRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFF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LENBQUNDLGNBQVQsQ0FBd0IsUUFBeEIsRUFBa0N5RSxLQUFsQyxDQUF3QzJCLGVBQXhDLEdBQTBELEVBQTFEO0FBQ0Q7QUFDRixHQU5EO0FBT0QsQyIsImZpbGUiOiJqcy9tYWluLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdGZ1bmN0aW9uIGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKSB7XG4gXHRcdGRlbGV0ZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHR9XG4gXHR2YXIgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2sgPSB3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdO1xuIFx0d2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXSA9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gd2VicGFja0hvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdFx0aWYgKHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKSBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHR9IDtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gXHRcdHNjcmlwdC5jaGFyc2V0ID0gXCJ1dGYtOFwiO1xuIFx0XHRzY3JpcHQuc3JjID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGNodW5rSWQgKyBcIi5cIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc1wiO1xuIFx0XHRpZiAobnVsbCkgc2NyaXB0LmNyb3NzT3JpZ2luID0gbnVsbDtcbiBcdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QocmVxdWVzdFRpbWVvdXQpIHtcbiBcdFx0cmVxdWVzdFRpbWVvdXQgPSByZXF1ZXN0VGltZW91dCB8fCAxMDAwMDtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QobmV3IEVycm9yKFwiTm8gYnJvd3NlciBzdXBwb3J0XCIpKTtcbiBcdFx0XHR9XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdFBhdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzb25cIjtcbiBcdFx0XHRcdHJlcXVlc3Qub3BlbihcIkdFVFwiLCByZXF1ZXN0UGF0aCwgdHJ1ZSk7XG4gXHRcdFx0XHRyZXF1ZXN0LnRpbWVvdXQgPSByZXF1ZXN0VGltZW91dDtcbiBcdFx0XHRcdHJlcXVlc3Quc2VuZChudWxsKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QoZXJyKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHJldHVybjtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCkge1xuIFx0XHRcdFx0XHQvLyB0aW1lb3V0XG4gXHRcdFx0XHRcdHJlamVjdChcbiBcdFx0XHRcdFx0XHRuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiB0aW1lZCBvdXQuXCIpXG4gXHRcdFx0XHRcdCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzID09PSA0MDQpIHtcbiBcdFx0XHRcdFx0Ly8gbm8gdXBkYXRlIGF2YWlsYWJsZVxuIFx0XHRcdFx0XHRyZXNvbHZlKCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzICE9PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgIT09IDMwNCkge1xuIFx0XHRcdFx0XHQvLyBvdGhlciBmYWlsdXJlXG4gXHRcdFx0XHRcdHJlamVjdChuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiBmYWlsZWQuXCIpKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdC8vIHN1Y2Nlc3NcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHR2YXIgdXBkYXRlID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcbiBcdFx0XHRcdFx0XHRyZWplY3QoZSk7XG4gXHRcdFx0XHRcdFx0cmV0dXJuO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdHJlc29sdmUodXBkYXRlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0dmFyIGhvdEFwcGx5T25VcGRhdGUgPSB0cnVlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudEhhc2ggPSBcIjcyZGU0NzJkMTc5MDRhYzgxM2RlXCI7XG4gXHR2YXIgaG90UmVxdWVzdFRpbWVvdXQgPSAxMDAwMDtcbiBcdHZhciBob3RDdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xuIFx0dmFyIGhvdEN1cnJlbnRDaGlsZE1vZHVsZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50c1RlbXAgPSBbXTtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRpZiAoIW1lKSByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXztcbiBcdFx0dmFyIGZuID0gZnVuY3Rpb24ocmVxdWVzdCkge1xuIFx0XHRcdGlmIChtZS5ob3QuYWN0aXZlKSB7XG4gXHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XSkge1xuIFx0XHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpID09PSAtMSkge1xuIFx0XHRcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSByZXF1ZXN0O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1lLmNoaWxkcmVuLmluZGV4T2YocmVxdWVzdCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdG1lLmNoaWxkcmVuLnB1c2gocmVxdWVzdCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgK1xuIFx0XHRcdFx0XHRcdHJlcXVlc3QgK1xuIFx0XHRcdFx0XHRcdFwiKSBmcm9tIGRpc3Bvc2VkIG1vZHVsZSBcIiArXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdCk7XG4gXHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhyZXF1ZXN0KTtcbiBcdFx0fTtcbiBcdFx0dmFyIE9iamVjdEZhY3RvcnkgPSBmdW5jdGlvbiBPYmplY3RGYWN0b3J5KG5hbWUpIHtcbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdO1xuIFx0XHRcdFx0fSxcbiBcdFx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiBcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXSA9IHZhbHVlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH07XG4gXHRcdGZvciAodmFyIG5hbWUgaW4gX193ZWJwYWNrX3JlcXVpcmVfXykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfX3dlYnBhY2tfcmVxdWlyZV9fLCBuYW1lKSAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJlXCIgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwidFwiXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIE9iamVjdEZhY3RvcnkobmFtZSkpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRmbi5lID0gZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicmVhZHlcIikgaG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHRob3RDaHVua3NMb2FkaW5nKys7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShjaHVua0lkKS50aGVuKGZpbmlzaENodW5rTG9hZGluZywgZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRmaW5pc2hDaHVua0xvYWRpbmcoKTtcbiBcdFx0XHRcdHRocm93IGVycjtcbiBcdFx0XHR9KTtcblxuIFx0XHRcdGZ1bmN0aW9uIGZpbmlzaENodW5rTG9hZGluZygpIHtcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmctLTtcbiBcdFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiKSB7XG4gXHRcdFx0XHRcdGlmICghaG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XG4gXHRcdFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9O1xuIFx0XHRmbi50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0XHRpZiAobW9kZSAmIDEpIHZhbHVlID0gZm4odmFsdWUpO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnQodmFsdWUsIG1vZGUgJiB+MSk7XG4gXHRcdH07XG4gXHRcdHJldHVybiBmbjtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIGhvdCA9IHtcbiBcdFx0XHQvLyBwcml2YXRlIHN0dWZmXG4gXHRcdFx0X2FjY2VwdGVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxuIFx0XHRcdF9zZWxmRGVjbGluZWQ6IGZhbHNlLFxuIFx0XHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxuIFx0XHRcdF9tYWluOiBob3RDdXJyZW50Q2hpbGRNb2R1bGUgIT09IG1vZHVsZUlkLFxuXG4gXHRcdFx0Ly8gTW9kdWxlIEFQSVxuIFx0XHRcdGFjdGl2ZTogdHJ1ZSxcbiBcdFx0XHRhY2NlcHQ6IGZ1bmN0aW9uKGRlcCwgY2FsbGJhY2spIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmQWNjZXB0ZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKSBob3QuX3NlbGZBY2NlcHRlZCA9IGRlcDtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0XHRlbHNlIGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0fSxcbiBcdFx0XHRkZWNsaW5lOiBmdW5jdGlvbihkZXApIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBbaV1dID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRpc3Bvc2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5pbmRleE9mKGNhbGxiYWNrKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vIE1hbmFnZW1lbnQgQVBJXG4gXHRcdFx0Y2hlY2s6IGhvdENoZWNrLFxuIFx0XHRcdGFwcGx5OiBob3RBcHBseSxcbiBcdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGlmICghbCkgcmV0dXJuIGhvdFN0YXR1cztcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdFN0YXR1c0hhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvL2luaGVyaXQgZnJvbSBwcmV2aW91cyBkaXNwb3NlIGNhbGxcbiBcdFx0XHRkYXRhOiBob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF1cbiBcdFx0fTtcbiBcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gdW5kZWZpbmVkO1xuIFx0XHRyZXR1cm4gaG90O1xuIFx0fVxuXG4gXHR2YXIgaG90U3RhdHVzSGFuZGxlcnMgPSBbXTtcbiBcdHZhciBob3RTdGF0dXMgPSBcImlkbGVcIjtcblxuIFx0ZnVuY3Rpb24gaG90U2V0U3RhdHVzKG5ld1N0YXR1cykge1xuIFx0XHRob3RTdGF0dXMgPSBuZXdTdGF0dXM7XG4gXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaG90U3RhdHVzSGFuZGxlcnMubGVuZ3RoOyBpKyspXG4gXHRcdFx0aG90U3RhdHVzSGFuZGxlcnNbaV0uY2FsbChudWxsLCBuZXdTdGF0dXMpO1xuIFx0fVxuXG4gXHQvLyB3aGlsZSBkb3dubG9hZGluZ1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlcyA9IDA7XG4gXHR2YXIgaG90Q2h1bmtzTG9hZGluZyA9IDA7XG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RBdmFpbGFibGVGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdERlZmVycmVkO1xuXG4gXHQvLyBUaGUgdXBkYXRlIGluZm9cbiBcdHZhciBob3RVcGRhdGUsIGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdGZ1bmN0aW9uIHRvTW9kdWxlSWQoaWQpIHtcbiBcdFx0dmFyIGlzTnVtYmVyID0gK2lkICsgXCJcIiA9PT0gaWQ7XG4gXHRcdHJldHVybiBpc051bWJlciA/ICtpZCA6IGlkO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RDaGVjayhhcHBseSkge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcImlkbGVcIikge1xuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xuIFx0XHR9XG4gXHRcdGhvdEFwcGx5T25VcGRhdGUgPSBhcHBseTtcbiBcdFx0aG90U2V0U3RhdHVzKFwiY2hlY2tcIik7XG4gXHRcdHJldHVybiBob3REb3dubG9hZE1hbmlmZXN0KGhvdFJlcXVlc3RUaW1lb3V0KS50aGVuKGZ1bmN0aW9uKHVwZGF0ZSkge1xuIFx0XHRcdGlmICghdXBkYXRlKSB7XG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRcdFx0cmV0dXJuIG51bGw7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90QXZhaWxhYmxlRmlsZXNNYXAgPSB1cGRhdGUuYztcbiBcdFx0XHRob3RVcGRhdGVOZXdIYXNoID0gdXBkYXRlLmg7XG5cbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRob3REZWZlcnJlZCA9IHtcbiBcdFx0XHRcdFx0cmVzb2x2ZTogcmVzb2x2ZSxcbiBcdFx0XHRcdFx0cmVqZWN0OiByZWplY3RcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0aG90VXBkYXRlID0ge307XG4gXHRcdFx0dmFyIGNodW5rSWQgPSBcIm1haW5cIjtcbiBcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbG9uZS1ibG9ja3NcbiBcdFx0XHR7XG4gXHRcdFx0XHQvKmdsb2JhbHMgY2h1bmtJZCAqL1xuIFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIgJiZcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiZcbiBcdFx0XHRcdGhvdFdhaXRpbmdGaWxlcyA9PT0gMFxuIFx0XHRcdCkge1xuIFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gcHJvbWlzZTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSB8fCAhaG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0pXG4gXHRcdFx0cmV0dXJuO1xuIFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IGZhbHNlO1xuIFx0XHRmb3IgKHZhciBtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0aG90VXBkYXRlW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYgKC0taG90V2FpdGluZ0ZpbGVzID09PSAwICYmIGhvdENodW5rc0xvYWRpbmcgPT09IDApIHtcbiBcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzKys7XG4gXHRcdFx0aG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RVcGRhdGVEb3dubG9hZGVkKCkge1xuIFx0XHRob3RTZXRTdGF0dXMoXCJyZWFkeVwiKTtcbiBcdFx0dmFyIGRlZmVycmVkID0gaG90RGVmZXJyZWQ7XG4gXHRcdGhvdERlZmVycmVkID0gbnVsbDtcbiBcdFx0aWYgKCFkZWZlcnJlZCkgcmV0dXJuO1xuIFx0XHRpZiAoaG90QXBwbHlPblVwZGF0ZSkge1xuIFx0XHRcdC8vIFdyYXAgZGVmZXJyZWQgb2JqZWN0IGluIFByb21pc2UgdG8gbWFyayBpdCBhcyBhIHdlbGwtaGFuZGxlZCBQcm9taXNlIHRvXG4gXHRcdFx0Ly8gYXZvaWQgdHJpZ2dlcmluZyB1bmNhdWdodCBleGNlcHRpb24gd2FybmluZyBpbiBDaHJvbWUuXG4gXHRcdFx0Ly8gU2VlIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTQ2NTY2NlxuIFx0XHRcdFByb21pc2UucmVzb2x2ZSgpXG4gXHRcdFx0XHQudGhlbihmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIGhvdEFwcGx5KGhvdEFwcGx5T25VcGRhdGUpO1xuIFx0XHRcdFx0fSlcbiBcdFx0XHRcdC50aGVuKFxuIFx0XHRcdFx0XHRmdW5jdGlvbihyZXN1bHQpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XG4gXHRcdFx0XHRcdH0sXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdChlcnIpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHQpO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2godG9Nb2R1bGVJZChpZCkpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90QXBwbHkob3B0aW9ucykge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcInJlYWR5XCIpXG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiYXBwbHkoKSBpcyBvbmx5IGFsbG93ZWQgaW4gcmVhZHkgc3RhdHVzXCIpO1xuIFx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuIFx0XHR2YXIgY2I7XG4gXHRcdHZhciBpO1xuIFx0XHR2YXIgajtcbiBcdFx0dmFyIG1vZHVsZTtcbiBcdFx0dmFyIG1vZHVsZUlkO1xuXG4gXHRcdGZ1bmN0aW9uIGdldEFmZmVjdGVkU3R1ZmYodXBkYXRlTW9kdWxlSWQpIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW3VwZGF0ZU1vZHVsZUlkXTtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcblxuIFx0XHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpLm1hcChmdW5jdGlvbihpZCkge1xuIFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0Y2hhaW46IFtpZF0sXG4gXHRcdFx0XHRcdGlkOiBpZFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdFx0dmFyIHF1ZXVlSXRlbSA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWVJdGVtLmlkO1xuIFx0XHRcdFx0dmFyIGNoYWluID0gcXVldWVJdGVtLmNoYWluO1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAoIW1vZHVsZSB8fCBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1kZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9tYWluKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJ1bmFjY2VwdGVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudCA9IGluc3RhbGxlZE1vZHVsZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRpZiAoIXBhcmVudCkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJkZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdHBhcmVudElkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHRcdH07XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKG91dGRhdGVkTW9kdWxlcy5pbmRleE9mKHBhcmVudElkKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXG4gXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcbiBcdFx0XHRcdFx0cXVldWUucHVzaCh7XG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRpZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuXG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdHR5cGU6IFwiYWNjZXB0ZWRcIixcbiBcdFx0XHRcdG1vZHVsZUlkOiB1cGRhdGVNb2R1bGVJZCxcbiBcdFx0XHRcdG91dGRhdGVkTW9kdWxlczogb3V0ZGF0ZWRNb2R1bGVzLFxuIFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXM6IG91dGRhdGVkRGVwZW5kZW5jaWVzXG4gXHRcdFx0fTtcbiBcdFx0fVxuXG4gXHRcdGZ1bmN0aW9uIGFkZEFsbFRvU2V0KGEsIGIpIHtcbiBcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdHZhciBpdGVtID0gYltpXTtcbiBcdFx0XHRcdGlmIChhLmluZGV4T2YoaXRlbSkgPT09IC0xKSBhLnB1c2goaXRlbSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gYXQgYmVnaW4gYWxsIHVwZGF0ZXMgbW9kdWxlcyBhcmUgb3V0ZGF0ZWRcbiBcdFx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxuIFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcbiBcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xuXG4gXHRcdHZhciB3YXJuVW5leHBlY3RlZFJlcXVpcmUgPSBmdW5jdGlvbiB3YXJuVW5leHBlY3RlZFJlcXVpcmUoKSB7XG4gXHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXN1bHQubW9kdWxlSWQgKyBcIikgdG8gZGlzcG9zZWQgbW9kdWxlXCJcbiBcdFx0XHQpO1xuIFx0XHR9O1xuXG4gXHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdG1vZHVsZUlkID0gdG9Nb2R1bGVJZChpZCk7XG4gXHRcdFx0XHQvKiogQHR5cGUge1RPRE99ICovXG4gXHRcdFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRcdFx0aWYgKGhvdFVwZGF0ZVtpZF0pIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0gZ2V0QWZmZWN0ZWRTdHVmZihtb2R1bGVJZCk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJkaXNwb3NlZFwiLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBpZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0LyoqIEB0eXBlIHtFcnJvcnxmYWxzZX0gKi9cbiBcdFx0XHRcdHZhciBhYm9ydEVycm9yID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9BcHBseSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvRGlzcG9zZSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGNoYWluSW5mbyA9IFwiXCI7XG4gXHRcdFx0XHRpZiAocmVzdWx0LmNoYWluKSB7XG4gXHRcdFx0XHRcdGNoYWluSW5mbyA9IFwiXFxuVXBkYXRlIHByb3BhZ2F0aW9uOiBcIiArIHJlc3VsdC5jaGFpbi5qb2luKFwiIC0+IFwiKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHN3aXRjaCAocmVzdWx0LnR5cGUpIHtcbiBcdFx0XHRcdFx0Y2FzZSBcInNlbGYtZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBzZWxmIGRlY2xpbmU6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0XCIgaW4gXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wYXJlbnRJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwidW5hY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uVW5hY2NlcHRlZCkgb3B0aW9ucy5vblVuYWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlVW5hY2NlcHRlZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIiArIGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25BY2NlcHRlZCkgb3B0aW9ucy5vbkFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9BcHBseSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkaXNwb3NlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGlzcG9zZWQpIG9wdGlvbnMub25EaXNwb3NlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvRGlzcG9zZSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGRlZmF1bHQ6XG4gXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5leGNlcHRpb24gdHlwZSBcIiArIHJlc3VsdC50eXBlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChhYm9ydEVycm9yKSB7XG4gXHRcdFx0XHRcdGhvdFNldFN0YXR1cyhcImFib3J0XCIpO1xuIFx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoYWJvcnRFcnJvcik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9BcHBseSkge1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IGhvdFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgcmVzdWx0Lm91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdFx0XHRcdGZvciAobW9kdWxlSWQgaW4gcmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0XHRcdFx0aWYgKFxuIFx0XHRcdFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHRcdFx0XHQpXG4gXHRcdFx0XHRcdFx0KSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdID0gW107XG4gXHRcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvRGlzcG9zZSkge1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIFtyZXN1bHQubW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSB3YXJuVW5leHBlY3RlZFJlcXVpcmU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxuIFx0XHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRtb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSAmJlxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHQpXG4gXHRcdFx0XHRvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMucHVzaCh7XG4gXHRcdFx0XHRcdG1vZHVsZTogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdGVycm9ySGFuZGxlcjogaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHRcdH0pO1xuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImRpc3Bvc2VcIik7XG4gXHRcdE9iamVjdC5rZXlzKGhvdEF2YWlsYWJsZUZpbGVzTWFwKS5mb3JFYWNoKGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gPT09IGZhbHNlKSB7XG4gXHRcdFx0XHRob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHR9KTtcblxuIFx0XHR2YXIgaWR4O1xuIFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcbiBcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdGlmICghbW9kdWxlKSBjb250aW51ZTtcblxuIFx0XHRcdHZhciBkYXRhID0ge307XG5cbiBcdFx0XHQvLyBDYWxsIGRpc3Bvc2UgaGFuZGxlcnNcbiBcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdGNiID0gZGlzcG9zZUhhbmRsZXJzW2pdO1xuIFx0XHRcdFx0Y2IoZGF0YSk7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXSA9IGRhdGE7XG5cbiBcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxuIFx0XHRcdG1vZHVsZS5ob3QuYWN0aXZlID0gZmFsc2U7XG5cbiBcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcbiBcdFx0XHRkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyB3aGVuIGRpc3Bvc2luZyB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgZGlzcG9zZSBoYW5kbGVyXG4gXHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGNoaWxkID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGUuY2hpbGRyZW5bal1dO1xuIFx0XHRcdFx0aWYgKCFjaGlsZCkgY29udGludWU7XG4gXHRcdFx0XHRpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSB7XG4gXHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gcmVtb3ZlIG91dGRhdGVkIGRlcGVuZGVuY3kgZnJvbSBtb2R1bGUgY2hpbGRyZW5cbiBcdFx0dmFyIGRlcGVuZGVuY3k7XG4gXHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcztcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcbiBcdFx0XHRcdFx0XHRpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcbiBcdFx0XHRcdFx0XHRpZiAoaWR4ID49IDApIG1vZHVsZS5jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIE5vdCBpbiBcImFwcGx5XCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiYXBwbHlcIik7XG5cbiBcdFx0aG90Q3VycmVudEhhc2ggPSBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRcdC8vIGluc2VydCBuZXcgY29kZVxuIFx0XHRmb3IgKG1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFwcGxpZWRVcGRhdGUsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBhcHBsaWVkVXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBjYWxsIGFjY2VwdCBoYW5kbGVyc1xuIFx0XHR2YXIgZXJyb3IgPSBudWxsO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV07XG4gXHRcdFx0XHRcdFx0Y2IgPSBtb2R1bGUuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBlbmRlbmN5XTtcbiBcdFx0XHRcdFx0XHRpZiAoY2IpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChjYWxsYmFja3MuaW5kZXhPZihjYikgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGNiKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGNiID0gY2FsbGJhY2tzW2ldO1xuIFx0XHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0XHRjYihtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyk7XG4gXHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXSxcbiBcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdG1vZHVsZUlkID0gaXRlbS5tb2R1bGU7XG4gXHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdGlmICh0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVycik7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGVycjIpIHtcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMixcbiBcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyMjtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBoYW5kbGUgZXJyb3JzIGluIGFjY2VwdCBoYW5kbGVycyBhbmQgc2VsZiBhY2NlcHRlZCBtb2R1bGUgbG9hZFxuIFx0XHRpZiAoZXJyb3IpIHtcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJmYWlsXCIpO1xuIFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gXHRcdH1cblxuIFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuIFx0XHRcdHJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGhvdDogaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSxcbiBcdFx0XHRwYXJlbnRzOiAoaG90Q3VycmVudFBhcmVudHNUZW1wID0gaG90Q3VycmVudFBhcmVudHMsIGhvdEN1cnJlbnRQYXJlbnRzID0gW10sIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCksXG4gXHRcdFx0Y2hpbGRyZW46IFtdXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBfX3dlYnBhY2tfaGFzaF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhvdEN1cnJlbnRIYXNoOyB9O1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIGhvdENyZWF0ZVJlcXVpcmUoXCIuL2luZGV4LmpzXCIpKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9pbmRleC5qc1wiKTtcbiIsImV4cG9ydCBjb25zdCBzaWRlbmF2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaWRlbmF2V3JhcHBlclwiKTtcclxuZXhwb3J0IGNvbnN0IGJhY2tkcm9wID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiYWNrZHJvcFwiKTtcclxuZXhwb3J0IGNvbnN0IGJhY2tkcm9wMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmFja2Ryb3AxXCIpO1xyXG5leHBvcnQgY29uc3QgdGFiQ29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YWJcIik7XHJcbmV4cG9ydCBjb25zdCBsb2FuRGV0YWlsc05vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvYW5EZXRhaWxzXCIpO1xyXG5leHBvcnQgY29uc3QgdGFiTWVudU5hdmlnYXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhYk1lbnVOYXZpZ2F0aW9uXCIpO1xyXG5leHBvcnQgY29uc3QgZW1haWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVtYWlsXCIpO1xyXG5leHBvcnQgY29uc3QgcGFzc3dvcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBhc3N3b3JkXCIpO1xyXG5cclxuIiwiZXhwb3J0IGNvbnN0IHNpZGVkcmF3ZXJCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lkZWRyYXdlcicpO1xyXG5leHBvcnQgY29uc3QgYmFja0Ryb2JCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmFja2Ryb3AnKTtcclxuZXhwb3J0IGNvbnN0IGJhY2tEcm9iQnRuMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYWNrZHJvcDEnKTtcclxuZXhwb3J0IGNvbnN0IGJhY2tEcm9iQnRuMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYWNrZHJvcDInKTtcclxuZXhwb3J0IGNvbnN0IHNpZ251cEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWdudXBCdG4nKTtcclxuZXhwb3J0IGNvbnN0IHNpZ25pbkJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWduaW5CdG4nKTtcclxuZXhwb3J0IGNvbnN0IHRhYk1lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFiTWVudScpO1xyXG5leHBvcnQgY29uc3QgdGFiTWVudTIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFiTWVudTInKTtcclxuIiwiY29uc3QgY2FwaXRhbGl6ZUZpcnN0TGV0dGVyID0gKG5hbWUpID0+IHtcclxuICBjb25zdCBmaXJzdExldHRlciA9IG5hbWVbMF0udG9VcHBlckNhc2UoKTtcclxuICBjb25zdCBhcnIgPSBuYW1lLnNwbGl0KCcnKTtcclxuICBjb25zdCBsZW4gPSBhcnIubGVuZ3RoO1xyXG4gIGNvbnN0IG90aGVyTGV0dGVycyA9IGFyci5zbGljZSgxLCBsZW4pLmpvaW4oJycpO1xyXG4gIGNvbnN0IG5ld1dvcmQgPSBmaXJzdExldHRlciArIG90aGVyTGV0dGVycztcclxuICByZXR1cm4gbmV3V29yZDtcclxufTtcclxuY29uc3QgY2FwaXRhbGl6ZVdvcmRzID0gKHN0cmluZykgPT4ge1xyXG4gIGlmIChzdHJpbmcuaW5jbHVkZXMoJyAnKSkge1xyXG4gICAgY29uc3Qgc3BsaXROYW1lID0gc3RyaW5nLnNwbGl0KCcgJyk7XHJcbiAgICBjb25zdCBmb3JtYXRlZFN0cmluZyA9IFtdO1xyXG4gICAgc3BsaXROYW1lLmZvckVhY2goKG5hbWUpID0+IHtcclxuICAgICAgaWYgKG5hbWUgIT09ICcnKSB7XHJcbiAgICAgICAgY29uc3QgbmFtID0gY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKG5hbWUpO1xyXG4gICAgICAgIGZvcm1hdGVkU3RyaW5nLnB1c2gobmFtKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGZvcm1hdGVkU3RyaW5nLmpvaW4oJyAnKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBjYXBpdGFsaXplRmlyc3RMZXR0ZXIoc3RyaW5nKTtcclxufTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjYXBpdGFsaXplV29yZHM7XHJcbiIsImV4cG9ydCBjb25zdCBvcGVuTG9hbkRldGFpbHMgPSAoKSA9PiB7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvYW5EZXRhaWxzJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYWNrZHJvcDEnKS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JhY2tkcm9wMScpLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9hbkRldGFpbHMnKS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgY2xvc2VMb2FuRGV0YWlscyA9ICgpID0+IHtcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9hbkRldGFpbHMnKS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JhY2tkcm9wMScpLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9hbkRldGFpbHMnKS5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JhY2tkcm9wMScpLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBvcGVuTG9hbk1zZyA9ICgpID0+IHtcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9hbk1zZycpLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmFja2Ryb3AyJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYWNrZHJvcDInKS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvYW5Nc2cnKS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgY2xvc2VMb2FuTXNnID0gKCkgPT4ge1xyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2FuTXNnJykuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYWNrZHJvcDInKS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvYW5Nc2cnKS5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JhY2tkcm9wMicpLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcclxufTtcclxuIiwiZXhwb3J0IGNvbnN0IG9wZW5TaWRlTmF2ID0gKHNpZGVuYXYsIGJhY2tkcm9wKSA9PiB7XHJcbiAgICBiYWNrZHJvcC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XHJcbiAgICBzaWRlbmF2LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGVTaWRlTmF2Jyk7XHJcbiAgICBiYWNrZHJvcC5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICBzaWRlbmF2LmNsYXNzTGlzdC5hZGQoJ3Nob3dTaWRlTmF2Jyk7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBoaWRlU2lkZU5hdiA9IChzaWRlbmF2LCBiYWNrZHJvcCkgPT4ge1xyXG4gICAgYmFja2Ryb3AuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4gICAgc2lkZW5hdi5jbGFzc0xpc3QucmVtb3ZlKCdzaG93U2lkZU5hdicpO1xyXG4gICAgYmFja2Ryb3AuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xyXG4gICAgc2lkZW5hdi5jbGFzc0xpc3QuYWRkKCdoaWRlU2lkZU5hdicpO1xyXG59IiwiY29uc3Qgc2lnbmluID0gKGV2ZW50LCBlbWFpbCwgcGFzc3dvcmQpID0+e1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIGlmKGVtYWlsID09PSAnJyAmJiBwYXNzd29yZCA9PT0gJycpe1xyXG4gICAgICAgIHJldHVybiB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGAuL3VzZXIuaHRtbGBcclxuICAgIH0gZWxzZSBpZihlbWFpbD09PSdhZG1pbkBtYWlsLmNvbScgJiYgcGFzc3dvcmQgPT09J2FkbWluJyl7XHJcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYC4vYWRtaW4uaHRtbGBcclxuICAgIH1cclxuICAgIFxyXG4gICAgXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHNpZ25pbjsiLCJjb25zdCBzaWdudXAgPSAoZXZlbnQpID0+e1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIHJldHVybiB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGAuL3NpZ25pbi5odG1sYFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBzaWdudXA7IiwiaW1wb3J0IHsgb3BlbkxvYW5Nc2cgfSBmcm9tICcuL2xvYW5EZXRhaWxzJztcclxuXHJcbmZ1bmN0aW9uIHRvZ2dsZVN0YXR1cyhldnQsIHN0YXR1czEsIHN0YXR1czIsIG1zZ3AsIC4uLmFyZ3MpIHtcclxuICBsZXQgaW5kZXg7XHJcbiAgY29uc3QgbGVuMSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoc3RhdHVzMSkubGVuZ3RoO1xyXG4gIGNvbnN0IG1zZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2FuTXNnJyk7XHJcbiAgZm9yIChsZXQgY291bnRlciA9IDA7IGNvdW50ZXIgPCBsZW4xOyBjb3VudGVyKyspIHtcclxuICAgIGlmIChldnQuY3VycmVudFRhcmdldC5pZCA9PT0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShzdGF0dXMxKVtjb3VudGVyXS5pZCkge1xyXG4gICAgICBpbmRleCA9IGNvdW50ZXI7XHJcbiAgICAgIGNvbnN0IGlkMSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoc3RhdHVzMSlbY291bnRlcl0uaWQ7XHJcbiAgICAgIGNvbnN0IGlkMiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoc3RhdHVzMilbY291bnRlcl0uaWQ7XHJcbiAgICAgIGlmIChzdGF0dXMxID09PSAnYXBwcm92ZScpIHtcclxuICAgICAgICBtc2cuaW5uZXJIVE1MID0gbXNncDtcclxuICAgICAgfSBlbHNlIGlmIChzdGF0dXMxID09PSAnY2FuY2VsJykge1xyXG4gICAgICAgIG1zZy5pbm5lckhUTUwgPSBtc2dwO1xyXG4gICAgICB9IGVsc2UgaWYgKHN0YXR1czEgPT09ICd2ZXJpZnknKSB7XHJcbiAgICAgICAgbXNnLmlubmVySFRNTCA9IG1zZ3A7XHJcbiAgICAgIH0gZWxzZSBpZiAoc3RhdHVzMSA9PT0gJ3VudmVyaWZ5Jykge1xyXG4gICAgICAgIG1zZy5pbm5lckhUTUwgPSBtc2dwO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoYXJncy5sZW5ndGggPiAzKSB7XHJcbiAgICAgICAgY29uc3QgW3N0YXR1czMsIGNvbG9yMSwgY29sb3IyLCBjb2xvcjNdID0gYXJncztcclxuICAgICAgICBjb25zdCBpZDMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHN0YXR1czMpW2NvdW50ZXJdLmlkO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkMykuc3R5bGUuY29sb3IgPSBjb2xvcjM7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQxKS5zdHlsZS5jb2xvciA9IGNvbG9yMTtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZDIpLnN0eWxlLmNvbG9yID0gY29sb3IyO1xyXG4gICAgICAgIG1zZy5pbm5lckhUTUwgPSBtc2dwO1xyXG4gICAgICB9IGVsc2UgaWYgKGFyZ3MubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgY29uc3QgW2NvbG9yMSwgY29sb3IyXSA9IGFyZ3M7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQxKS5zdHlsZS5jb2xvciA9IGNvbG9yMTtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZDIpLnN0eWxlLmNvbG9yID0gY29sb3IyO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIG9wZW5Mb2FuTXNnKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRvZ2dsZVN0YXR1cztcclxuIiwiaW1wb3J0IGNhcEZpcnN0TGV0dGVyIGZyb20gJy4vY2FwRmlyc3RMZXR0ZXInO1xyXG5cclxuZnVuY3Rpb24gb3BlblRhYihldnQsIHRhYk5hbWUpIHtcclxuICAvLyBEZWNsYXJlIGFsbCB2YXJpYWJsZXNcclxuICBsZXQgaTsgbGV0IHRhYmNvbnRlbnQ7IGxldFxyXG4gICAgdGFibGlua3M7XHJcblxyXG4gIC8vIEdldCBhbGwgZWxlbWVudHMgd2l0aCBjbGFzcz1cInRhYmNvbnRlbnRcIiBhbmQgaGlkZSB0aGVtXHJcbiAgdGFiY29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3RhYmNvbnRlbnQnKTtcclxuICBmb3IgKGkgPSAwOyBpIDwgdGFiY29udGVudC5sZW5ndGg7IGkrKykge1xyXG4gICAgdGFiY29udGVudFtpXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gIH1cclxuXHJcbiAgLy8gR2V0IGFsbCBlbGVtZW50cyB3aXRoIGNsYXNzPVwidGFibGlua3NcIiBhbmQgcmVtb3ZlIHRoZSBjbGFzcyBcImFjdGl2ZVwiXHJcbiAgdGFibGlua3MgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd0YWJsaW5rcycpO1xyXG4gIGZvciAoaSA9IDA7IGkgPCB0YWJsaW5rcy5sZW5ndGg7IGkrKykge1xyXG4gICAgdGFibGlua3NbaV0uY2xhc3NOYW1lID0gdGFibGlua3NbaV0uY2xhc3NOYW1lLnJlcGxhY2UoJyBhY3RpdmUnLCAnJyk7XHJcbiAgfVxyXG4gIGxldCBuYW1lO1xyXG4gIGlmIChldnQuY3VycmVudFRhcmdldC5pbm5lckhUTUwgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgbmFtZSA9IGNhcEZpcnN0TGV0dGVyKHRhYk5hbWUpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RhYkhlYWRlcicpLmlubmVySFRNTCA9IGAke25hbWV9YDtcclxuICB9IGVsc2Uge1xyXG4gICAgbmFtZSA9IGNhcEZpcnN0TGV0dGVyKGV2dC5jdXJyZW50VGFyZ2V0LmlubmVySFRNTCk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFiSGVhZGVyJykuaW5uZXJIVE1MID0gYCR7bmFtZX1gO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vIFNob3cgdGhlIGN1cnJlbnQgdGFiLCBhbmQgYWRkIGFuIFwiYWN0aXZlXCIgY2xhc3MgdG8gdGhlIGJ1dHRvbiB0aGF0IG9wZW5lZCB0aGUgdGFiXHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFiTmFtZSkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgZXZ0LmN1cnJlbnRUYXJnZXQuY2xhc3NOYW1lICs9ICcgYWN0aXZlJztcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgb3BlblRhYjtcclxuIiwiXHJcbmV4cG9ydCBjb25zdCBvcGVuVGFiTWVudU5hdiA9ICh0YWJNZW51TmF2aWdhdGlvbiwgdGFiTWVudSwgdGFiTWVudTIpID0+IHtcclxuICB3aW5kb3cudGFiTWVudVN0YXR1cyA9IDA7XHJcblxyXG4gIHRhYk1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4gIHRhYk1lbnUuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xyXG4gIHRhYk1lbnUyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcclxuICB0YWJNZW51Mi5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgdGFiTWVudU5hdmlnYXRpb24uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xyXG4gIHRhYk1lbnVOYXZpZ2F0aW9uLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBoaWRlVGFiTWVudU5hdiA9ICh0YWJNZW51TmF2aWdhdGlvbiwgdGFiTWVudSwgdGFiTWVudTIpID0+IHtcclxuICB3aW5kb3cudGFiTWVudVN0YXR1cyA9IDE7XHJcblxyXG4gIHRhYk1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xyXG4gIHRhYk1lbnUuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gIHRhYk1lbnUyLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICB0YWJNZW51Mi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XHJcbiAgdGFiTWVudU5hdmlnYXRpb24uY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4gIHRhYk1lbnVOYXZpZ2F0aW9uLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBzaG93VGFiID0gKGV2dCwgdGFiTmFtZSkgPT4ge1xyXG4gIC8vIERlY2xhcmUgYWxsIHZhcmlhYmxlc1xyXG4gIGxldCB0YWJOYXY7XHJcbiAgb3BlblRhYihldnQsIHRhYk5hbWUpO1xyXG5cclxuICAvLyBjbG9zZSB0YWIgbmF2aWdhdGlvblxyXG4gIHRhYk5hdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YWJNZW51TmF2aWdhdGlvbicpO1xyXG4gIHRhYk5hdi5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgdGFiTmF2LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcclxuICAvLyByZW1vdmUgYWN0aXZlIGZyb20gcHJldmlvdXMgdGFiIGxpbmtcclxuICBpZiAod2luZG93LnRhYk5hdkxpbmtJbm5lckhUTUwgIT09IGV2dC5jdXJyZW50VGFyZ2V0LmlubmVySFRNTCkge1xyXG4gICAgd2luZG93LnRhYk5hdkxpbmsuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGV2dC5jdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gIH1cclxuICB3aW5kb3cudGFiTmF2TGlua0lubmVySFRNTCA9IGV2dC5jdXJyZW50VGFyZ2V0LmlubmVySFRNTDtcclxuICB3aW5kb3cudGFiTmF2TGluayA9IGV2dC5jdXJyZW50VGFyZ2V0O1xyXG59O1xyXG4iLCJmdW5jdGlvbiB0b2dnbGVyKCkge1xyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHJvcGRvd25cIikuY2xhc3NMaXN0LnRvZ2dsZShcInNob3dcIik7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRvZ2dsZXIiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCJpbXBvcnQgJy4vaW5kZXguY3NzJztcclxuaW1wb3J0IHtcclxuICBzaWRlZHJhd2VyQnRuLCBiYWNrRHJvYkJ0biwgYmFja0Ryb2JCdG4xLCBiYWNrRHJvYkJ0bjIsIHNpZ251cEJ0biwgc2lnbmluQnRuLCB0YWJNZW51LCB0YWJNZW51MixcclxufSBmcm9tICcuL2Fzc2V0cy9qcy9idXR0b25zJztcclxuaW1wb3J0IHtcclxuICBzaWRlbmF2LCBiYWNrZHJvcCwgdGFiQ29uLCB0YWJNZW51TmF2aWdhdGlvbiwgZW1haWwsIHBhc3N3b3JkLCBsb2FuRGV0YWlsc05vZGUsXHJcbn0gZnJvbSAnLi9hc3NldHMvanMvVUknO1xyXG5pbXBvcnQgeyBvcGVuU2lkZU5hdiwgaGlkZVNpZGVOYXYgfSBmcm9tICcuL2Fzc2V0cy9qcy9ldmVudHMvc2lkZWRyYXdlcic7XHJcbmltcG9ydCB7XHJcbiAgb3BlbkxvYW5EZXRhaWxzLCBjbG9zZUxvYW5EZXRhaWxzLCBjbG9zZUxvYW5Nc2csXHJcbn0gZnJvbSAnLi9hc3NldHMvanMvZXZlbnRzL2xvYW5EZXRhaWxzJztcclxuaW1wb3J0IHsgb3BlblRhYk1lbnVOYXYsIGhpZGVUYWJNZW51TmF2LCBzaG93VGFiIH0gZnJvbSAnLi9hc3NldHMvanMvZXZlbnRzL3RhYk1lbnUnO1xyXG5pbXBvcnQgc2lnbnVwIGZyb20gJy4vYXNzZXRzL2pzL2V2ZW50cy9zaWdudXAnO1xyXG5pbXBvcnQgc2lnbmluIGZyb20gJy4vYXNzZXRzL2pzL2V2ZW50cy9zaWduaW4nO1xyXG5pbXBvcnQgb3BlblRhYiBmcm9tICcuL2Fzc2V0cy9qcy9ldmVudHMvdGFiJztcclxuaW1wb3J0IHRvZ2dsZVN0YXR1cyBmcm9tICcuL2Fzc2V0cy9qcy9ldmVudHMvc3RhdHVzRXZ0JztcclxuaW1wb3J0IHRvZ2dsZXIgZnJvbSAnLi9hc3NldHMvanMvZXZlbnRzL3RvZ2dsZXInO1xyXG5cclxuXHJcbndpbmRvdy5vcGVuVGFiID0gb3BlblRhYjtcclxud2luZG93LnNob3dUYWIgPSBzaG93VGFiO1xyXG53aW5kb3cub3BlbkxvYW5EZXRhaWxzID0gb3BlbkxvYW5EZXRhaWxzO1xyXG53aW5kb3cudG9nZ2xlciA9IHRvZ2dsZXI7XHJcbndpbmRvdy50YWJOYXZMaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndGFiTWVudS1uYXZpZ2F0aW9uX19saW5rJylbMF07XHJcblxyXG5pZiAoc2lkZWRyYXdlckJ0bikge1xyXG4gIHNpZGVkcmF3ZXJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBvcGVuU2lkZU5hdihzaWRlbmF2LCBiYWNrZHJvcCkpO1xyXG59XHJcblxyXG5pZiAoYmFja0Ryb2JCdG4xKSB7XHJcbiAgYmFja0Ryb2JCdG4xLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VMb2FuRGV0YWlscyk7XHJcbn1cclxuaWYgKGJhY2tEcm9iQnRuMikge1xyXG4gIGJhY2tEcm9iQnRuMi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlTG9hbk1zZyk7XHJcbn1cclxuXHJcbmlmIChiYWNrRHJvYkJ0bikge1xyXG4gIGJhY2tEcm9iQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gaGlkZVNpZGVOYXYoc2lkZW5hdiwgYmFja2Ryb3ApKTtcclxufVxyXG5cclxuXHJcbmlmIChzaWdudXBCdG4pIHtcclxuICBzaWdudXBCdG4ub25jbGljayA9IGV2ZW50ID0+IHNpZ251cChldmVudCk7XHJcbn1cclxuXHJcbmlmIChzaWduaW5CdG4pIHtcclxuICBzaWduaW5CdG4ub25jbGljayA9IGV2ZW50ID0+IHNpZ25pbihldmVudCwgZW1haWwudmFsdWUudHJpbSgpLCBwYXNzd29yZC52YWx1ZS50cmltKCkpO1xyXG59XHJcblxyXG5pZiAodGFiQ29uICYmIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PT0gJy9RdWljay1DcmVkaXQvZGlzdC9wcm9maWxlLmh0bWwnKSB7XHJcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiBvcGVuVGFiKGV2ZW50LCAnYWNjb3VudCcpKTtcclxufVxyXG5cclxuaWYgKHRhYkNvbiAmJiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT09ICcvUXVpY2stQ3JlZGl0L2Rpc3QvbWFuYWdlbG9hbi5odG1sJykge1xyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4gb3BlblRhYihldmVudCwgJ2FsbExvYW5zJykpO1xyXG59XHJcblxyXG5pZiAodGFiTWVudSkge1xyXG4gIHRhYk1lbnUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBvcGVuVGFiTWVudU5hdih0YWJNZW51TmF2aWdhdGlvbiwgdGFiTWVudSwgdGFiTWVudTIpKTtcclxufVxyXG5cclxuaWYgKHRhYk1lbnUyKSB7XHJcbiAgdGFiTWVudTIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBoaWRlVGFiTWVudU5hdih0YWJNZW51TmF2aWdhdGlvbiwgdGFiTWVudSwgdGFiTWVudTIpKTtcclxufVxyXG5cclxuaWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PT0gJy8nKSB7XHJcbiAgd2luZG93LnRvZ2dsZVN0YXR1cyA9IHRvZ2dsZVN0YXR1cztcclxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKCkgPT4ge1xyXG4gICAgaWYgKHdpbmRvdy5zY3JvbGxZID4gMTUwKSB7XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoZWFkZXInKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiKDMsIDc1LCA3NSknO1xyXG4gICAgfSBlbHNlIGlmICh3aW5kb3cuc2Nyb2xsWSA8IDE1MCkge1xyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGVhZGVyJykuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyc7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==