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
import { Session } from '../../OpenVidu/Session';


/**
 * Defines event `sessionDisconnected` dispatched by [[Session]]
 */
export class SessionDisconnectedEvent extends Event {

    /**
     * - "disconnect": you have called `Session.disconnect()`
     * - "networkDisconnect": your network connection has dropped
     */
    reason: string;

    /**
     * @hidden
     */
    constructor(target: Session, reason: string) {
        super(true, target, 'sessionDisconnected');
        this.reason = reason;
    }

    /**
     * @hidden
     */
    callDefaultBehaviour() {

        console.info("Calling default behaviour upon '" + this.type + "' event dispatched by 'Session'");

        const session = <Session>this.target;

        // Dispose and delete all remote Connections
        for (const connectionId in session.remoteConnections) {
            if (!!session.remoteConnections[connectionId].stream) {
                session.remoteConnections[connectionId].stream.disposeWebRtcPeer();
                session.remoteConnections[connectionId].stream.disposeMediaStream();
                session.remoteConnections[connectionId].stream.removeVideo();
                delete session.remoteStreamsCreated[session.remoteConnections[connectionId].stream.streamId];
                session.remoteConnections[connectionId].dispose();
            }
            delete session.remoteConnections[connectionId];
        }
    }

}