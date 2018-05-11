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

package io.openvidu.server.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configurers.ExpressionUrlAuthorizationConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	OpenviduConfig openviduConf;

	@Override
	protected void configure(HttpSecurity http) throws Exception {

		// Security for API REST
		ExpressionUrlAuthorizationConfigurer<HttpSecurity>.ExpressionInterceptUrlRegistry conf = http.csrf().disable()
				.authorizeRequests().antMatchers(HttpMethod.POST, "/api/sessions").authenticated()
				.antMatchers(HttpMethod.POST, "/api/tokens").authenticated()
				.antMatchers(HttpMethod.POST, "/api/recordings/start").authenticated()
				.antMatchers(HttpMethod.POST, "/api/recordings/stop").authenticated()
				.antMatchers(HttpMethod.GET, "/api/recordings").authenticated()
				.antMatchers(HttpMethod.GET, "/api/recordings/**").authenticated()
				.antMatchers(HttpMethod.DELETE, "/api/recordings/**").authenticated()
				.antMatchers(HttpMethod.GET, "/config/**").authenticated().antMatchers("/").authenticated();

		// Security for layouts
		conf.antMatchers("/layouts/*").authenticated();

		// Security for recorded videos
		if (openviduConf.getOpenViduRecordingPublicAccess()) {
			conf = conf.antMatchers("/recordings/*").permitAll();
		} else {
			conf = conf.antMatchers("/recordings/*").authenticated();
		}

		conf.and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().httpBasic();
	}

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		auth.inMemoryAuthentication().withUser("OPENVIDUAPP").password(openviduConf.getOpenViduSecret()).roles("ADMIN");
	}

}