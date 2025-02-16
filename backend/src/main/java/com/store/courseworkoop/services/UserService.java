package com.store.courseworkoop.services;

import com.store.courseworkoop.constants.Messages;
import com.store.courseworkoop.dto.*;
import com.store.courseworkoop.models.User;
import com.store.courseworkoop.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Create user
    public CreateUserResponseDto create(CreateUserDto dto) {
        if (userRepository.existsByPhoneNumber(dto.getPhoneNumber())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, Messages.PHONE_NUMBER_ALREADY_EXISTS);
        }

        User user = new User();
        user.setEmail(dto.getEmail());
        user.setPassword(BCrypt.hashpw(dto.getPassword(), BCrypt.gensalt()));
        user.setFullName(dto.getFullName());
        user.setPhoneNumber(dto.getPhoneNumber());
        user.setShippingAddress(dto.getShippingAddress());
        user.setVerificationCode(dto.getVerificationCode());

        User savedUser = userRepository.save(user);
        return new CreateUserResponseDto(savedUser);
    }

    // Find user by email
    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    // Find user by ID
    public ResponseDto<User> findMe(String email) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            return new ResponseDto<>(HttpStatus.NOT_FOUND.value(), Messages.USER_NOT_FOUND, null);
        }
        return new ResponseDto<>(HttpStatus.OK.value(), Messages.USER_GET_SUCCESSFULLY, user);
    }


    // Find user by phone number
    public User findByPhoneNumber(String phoneNumber) {
        return userRepository.findByPhoneNumber(phoneNumber).orElse(null);
    }

    // Update user's verification code
    public ResponseDto<Void> updateVerificationCode(String userId, Integer newCode) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, Messages.USER_NOT_FOUND));

        if (newCode == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, Messages.INVALID_VERIFICATION_CODE);
        }
        user.setVerificationCode(newCode);
        userRepository.save(user);
        return new ResponseDto<>(HttpStatus.OK.value(), Messages.SEND_VERIFICATION_CODE, null);
    }


    // Update profile
    public ResponseDto<User> updateProfile(String email, UpdateUserDto dto) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, Messages.USER_NOT_FOUND));

        if (dto.getPhoneNumber() != null) {
            Optional<User> userWithPhone = userRepository.findByPhoneNumber(dto.getPhoneNumber());
            if (userWithPhone.isPresent() && !userWithPhone.get().getEmail().equals(email)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, Messages.PHONE_NUMBER_ALREADY_EXISTS);
            }
        }

        if (dto.getFullName() != null) user.setFullName(dto.getFullName());
        if (dto.getPhoneNumber() != null) user.setPhoneNumber(dto.getPhoneNumber());
        if (dto.getShippingAddress() != null) user.setShippingAddress(dto.getShippingAddress());

        userRepository.save(user);
        return new ResponseDto<>( HttpStatus.OK.value(), Messages.USER_UPDATED_SUCCESSFULLY, user);
    }

    // Change password
    public ResponseDto<Void> changePassword(String email, ChangePasswordDto dto) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, Messages.USER_NOT_FOUND));

        if (!BCrypt.checkpw(dto.getOldPassword(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, Messages.INCORRECT_PASSWORD);
        }

        user.setPassword(BCrypt.hashpw(dto.getNewPassword(), BCrypt.gensalt()));
        userRepository.save(user);
        return new ResponseDto<>( HttpStatus.OK.value(), Messages.PASSWORD_UPDATED,null);
    }

    // Delete user
    public ResponseDto<Void> delete(String userId) {
        if (!userRepository.existsById(userId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, Messages.USER_NOT_FOUND);
        }
        userRepository.deleteById(userId);
        return new ResponseDto<>( HttpStatus.OK.value(), Messages.USER_DELETED, null);
    }

    /**
     * Loads user details for authentication by email.
     * Throws an exception if the user is not found.
    */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .roles(user.getRole().name())
                .build();
    }
}
