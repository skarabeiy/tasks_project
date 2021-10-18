package itransition.project.common.configuration;

import itransition.project.common.security.jwt.configurer.JwtConfigurer;
import itransition.project.common.security.jwt.provider.JwtTokenProvider;
import itransition.project.user.model.Role;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@Slf4j
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtTokenProvider jwtTokenProvider;
    private static final String ADMIN = "ADMIN";
    private static final String USER = "USER";
    private static final String ADMIN_ENDPOINT = "/api/admin/**";
    private static final String LOGIN_ENDPOINT = "/api/auth/login";
    private static final String REGISTER_ENDPOINT = "/api/users/**";
    private static final String ACHIEVEMENTS_ENDPOINT = "/api/achievements/**";  //???
    private static final String PERSONAL_PAGE = "/api/personalPage/**";    //
    private static final String RATINGS_ENDPOINT = "/api/ratings/**";
    private static final String ANSWERS_ENDPOINT = "/api/answers/**";

    @Autowired
    public SecurityConfig(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .httpBasic().disable()
                .cors().and()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers(LOGIN_ENDPOINT).permitAll()
                .antMatchers(REGISTER_ENDPOINT).permitAll()

                .antMatchers(ACHIEVEMENTS_ENDPOINT).hasRole(USER)
                .antMatchers(PERSONAL_PAGE).hasRole(USER)
                .antMatchers(RATINGS_ENDPOINT).hasRole(USER)
                .antMatchers(ANSWERS_ENDPOINT).hasRole(USER)

                .antMatchers(ADMIN_ENDPOINT).hasRole(ADMIN)
                .anyRequest().authenticated()
                .and()
                .apply(new JwtConfigurer(jwtTokenProvider));
    }
}
