package com.store.courseworkoop.security;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

// Handle cases where a user tries to access a protected resource without the required permissions.
@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException {
        response.setStatus(HttpServletResponse.SC_FORBIDDEN); // Sets HTTP status to 403 Forbidden
        response.setContentType("application/json"); // Ensures response is in JSON format
        response.getWriter().write("{\"message\": \"access denied, no permissions required\"}"); // Custom error message
    }
}

