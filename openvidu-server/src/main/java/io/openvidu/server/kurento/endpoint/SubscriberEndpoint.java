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

package io.openvidu.server.kurento.endpoint;

import org.kurento.client.MediaPipeline;
import org.kurento.client.MediaType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.openvidu.client.OpenViduException;
import io.openvidu.client.OpenViduException.Code;
import io.openvidu.server.kurento.core.KurentoParticipant;

/**
 * Subscriber aspect of the {@link MediaEndpoint}.
 *
 * @author <a href="mailto:rvlad@naevatec.com">Radu Tom Vlad</a>
 */
public class SubscriberEndpoint extends MediaEndpoint {
  private final static Logger log = LoggerFactory.getLogger(SubscriberEndpoint.class);

  private boolean connectedToPublisher = false;

  private PublisherEndpoint publisher = null;

  public SubscriberEndpoint(boolean web, KurentoParticipant owner, String endpointName,
      MediaPipeline pipeline) {
    super(web, owner, endpointName, pipeline, log);
  }

  public synchronized String subscribe(String sdpOffer, PublisherEndpoint publisher) {
    registerOnIceCandidateEventListener();
    String sdpAnswer = processOffer(sdpOffer);
    gatherCandidates();
    publisher.connect(this.getEndpoint());
    setConnectedToPublisher(true);
    setPublisher(publisher);
    return sdpAnswer;
  }

  public boolean isConnectedToPublisher() {
    return connectedToPublisher;
  }

  public void setConnectedToPublisher(boolean connectedToPublisher) {
    this.connectedToPublisher = connectedToPublisher;
  }

  public PublisherEndpoint getPublisher() {
    return publisher;
  }

  public void setPublisher(PublisherEndpoint publisher) {
    this.publisher = publisher;
  }

  @Override
  public synchronized void mute(io.openvidu.server.kurento.MutedMediaType muteType) {
    if (this.publisher == null) {
      throw new OpenViduException(Code.MEDIA_MUTE_ERROR_CODE, "Publisher endpoint not found");
    }
    switch (muteType) {
      case ALL :
        this.publisher.disconnectFrom(this.getEndpoint());
        break;
      case AUDIO :
        this.publisher.disconnectFrom(this.getEndpoint(), MediaType.AUDIO);
        break;
      case VIDEO :
        this.publisher.disconnectFrom(this.getEndpoint(), MediaType.VIDEO);
        break;
    }
    resolveCurrentMuteType(muteType);
  }

  @Override
  public synchronized void unmute() {
    this.publisher.connect(this.getEndpoint());
    setMuteType(null);
  }
}
