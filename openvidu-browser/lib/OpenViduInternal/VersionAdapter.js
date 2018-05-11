"use strict";
/*
 * (C) Copyright 2017-2018 OpenVidu (https://openvidu.io/)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
exports.__esModule = true;
var VideoInsertMode_1 = require("./Enums/VideoInsertMode");
function solveIfCallback(methodName, completionHandler, promise) {
    if (!!completionHandler) {
        console.warn("DEPRECATION WANING: In future releases the 'completionHandler' parameter will be removed from method '" + methodName + "'. Refactor your callbacks to Promise API (see https://openvidu.io/api/openvidu-browser/index.html)");
    }
    return new Promise(function (resolve, reject) {
        if (!!completionHandler && typeof completionHandler === 'function') {
            promise.then(function () {
                completionHandler(undefined);
            })["catch"](function (error) {
                completionHandler(error);
            });
        }
        else {
            promise.then(function () {
                return resolve();
            })["catch"](function (error) {
                return reject(error);
            });
        }
    });
}
exports.solveIfCallback = solveIfCallback;
function adaptPublisherProperties(properties) {
    if ('audio' in properties ||
        'video' in properties ||
        'audioActive' in properties ||
        'videoActive' in properties ||
        'quality' in properties ||
        'screen' in properties) {
        console.warn("DEPRECATION WANING: In future releases the properties passed to 'OpenVidu.initPublisher' method must match PublisherProperties interface (see https://openvidu.io/api/openvidu-browser/interfaces/publisherproperties.html)");
    }
    var scr = (typeof properties.screen !== 'undefined' && properties.screen === true);
    var res = '';
    if (typeof properties.quality === 'string') {
        switch (properties.quality) {
            case 'LOW':
                res = '320x240';
                break;
            case 'MEDIUM':
                res = '640x480';
                break;
            case 'HIGH':
                res = '1280x720';
                break;
        }
    }
    var publisherProperties = {
        audioSource: (typeof properties.audio !== 'undefined' && properties.audio === false) ? false : ((typeof properties.audioSource !== 'undefined') ? properties.audioSource : undefined),
        frameRate: (typeof properties.frameRate !== 'undefined') ? properties.frameRate : undefined,
        insertMode: (typeof properties.insertMode !== 'undefined') ? properties.insertMode : VideoInsertMode_1.VideoInsertMode.APPEND,
        mirror: (typeof properties.mirror !== 'undefined') ? properties.mirror : true,
        publishAudio: (typeof properties.audioActive !== 'undefined' && properties.audioActive === false) ? false : (typeof properties.publishAudio !== 'undefined') ? properties.publishAudio : true,
        publishVideo: (typeof properties.videoActive !== 'undefined' && properties.videoActive === false) ? false : (typeof properties.publishVideo !== 'undefined') ? properties.publishVideo : true,
        resolution: !!res ? res : ((typeof properties.resolution !== 'undefined') ? properties.resolution : '640x480'),
        videoSource: scr ? 'screen' : ((typeof properties.video !== 'undefined' && properties.video === false) ? false : ((typeof properties.videoSource !== 'undefined') ? properties.videoSource : undefined))
    };
    return publisherProperties;
}
exports.adaptPublisherProperties = adaptPublisherProperties;
//# sourceMappingURL=VersionAdapter.js.map