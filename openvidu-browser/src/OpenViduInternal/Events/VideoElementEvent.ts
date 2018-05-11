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

import { Event } from './Event';
import { Publisher } from '../../OpenVidu/Publisher';
import { Subscriber } from '../../OpenVidu/Subscriber';


/**
 * Defines the following events:
 * - `videoElementCreated`: dispatched by [[Publisher]] and [[Subscriber]]
 * - `videoElementDestroyed`: dispatched by [[Publisher]] and [[Subscriber]]
 * - `videoPlaying`: dispatched by [[Publisher]] and [[Subscriber]]
 * - `remoteVideoPlaying`: dispatched by [[Publisher]] if `Publisher.subscribeToRemote()` was called before `Session.publish(Publisher)`
 */
export class VideoElementEvent extends Event {

    /**
     * Video element that was created, destroyed or started playing
     */
    element: HTMLVideoElement;

    /**
     * @hidden
     */
    constructor(element: HTMLVideoElement, target: Publisher | Subscriber, type: string) {
        super(false, target, type);
        this.element = element;
    }

    /**
     * @hidden
     */
    // tslint:disable-next-line:no-empty
    callDefaultBehaviour() { }

}