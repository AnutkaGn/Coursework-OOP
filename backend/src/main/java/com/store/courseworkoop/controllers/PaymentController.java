package com.store.courseworkoop.controllers;

import com.store.courseworkoop.dto.ResponseDto;
import com.store.courseworkoop.dto.CreatePaymentDto;
import com.store.courseworkoop.models.Payment;
import com.store.courseworkoop.services.PaymentService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping
    public ResponseDto<Payment> createOrUpdatePayment(@RequestBody CreatePaymentDto createPaymentDto) {
        return paymentService.create(createPaymentDto);
    }
}
