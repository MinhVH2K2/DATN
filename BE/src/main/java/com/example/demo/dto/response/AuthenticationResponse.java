package com.example.demo.dto.response;

import com.example.demo.dto.request.AuthenticationRequest;
import com.example.demo.model.User;
import com.example.demo.service.UserService;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Collection;
import java.util.Date;
import java.util.StringJoiner;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Service
public class AuthenticationResponse {
    private String token;

    @Autowired
    UserService userService;

    @Autowired
    PasswordEncoder passwordEncoder;
    @NonFinal
    @Value("${jwt.signerKey}")
    protected String SIGNER_KEY;

    public String authentication(AuthenticationRequest request) throws Exception {
        User user = userService.findByUserName(request.getUserName());

        boolean authencation = passwordEncoder.matches(request.getPassWord(), user.getPassWord());
        if (!authencation) {
            throw new Exception("Tài khoản hoặc mật khẩu không chính xác");
        }

        return token = generateToken(user);


    }

    private String generateToken(User user) {
        //header token
        JWSHeader jwsHeader = new JWSHeader(JWSAlgorithm.HS512);

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(user.getUserName())
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(1, ChronoUnit.HOURS).toEpochMilli()
                ))
                .claim("scope", buildSpoce(user))
                .build();

        // payload token
        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        //ky token
        JWSObject jwsObject = new JWSObject(jwsHeader, payload);
        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            throw new RuntimeException(e);
        }

    }

    private String buildSpoce(User user) {

        StringJoiner stringJoiner = new StringJoiner(" ");
        if (!user.equals(null)) ;
        stringJoiner.add("ROLE_"+user.getRoles().getRoleName());
        if (!CollectionUtils.isEmpty(user.getRoles().getShopMenus())) ;
        user.getRoles().getShopMenus().forEach(shopMenu -> stringJoiner.add(shopMenu.getMenuName()));
        return stringJoiner.toString();

    }
}
