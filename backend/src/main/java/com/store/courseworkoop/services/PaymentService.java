package com.store.courseworkoop.services;

import com.store.courseworkoop.constants.Messages;
import com.store.courseworkoop.dto.CreatePaymentDto;
import com.store.courseworkoop.dto.ResponseDto;
import com.store.courseworkoop.enums.PaymentStatus;
import com.store.courseworkoop.models.Payment;
import com.store.courseworkoop.models.Order;
import com.store.courseworkoop.repositories.OrderRepository;
import com.store.courseworkoop.repositories.PaymentRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;

    public PaymentService(PaymentRepository paymentRepository, OrderRepository orderRepository) {
        this.paymentRepository = paymentRepository;
        this.orderRepository = orderRepository;
    }

    // Retrieves a payment record associated with a given order ID.
    public ResponseDto<Payment> findByOrderId(String orderId) {
        Optional<Payment> payment = paymentRepository.findByOrderId(orderId);
        if (payment.isPresent()) {
            return new ResponseDto<>(HttpStatus.OK.value(), Messages.PAYMENT_RETRIEVED, payment.get());
        } else {
            return new ResponseDto<>(HttpStatus.NOT_FOUND.value(), Messages.PAYMENT_NOT_FOUND, null);
        }
    }

    // Creates a new payment record if it does not exist, or updates an existing payment.
    @Transactional
    public ResponseDto<Payment> create(CreatePaymentDto createPaymentDto) {
        String orderId = createPaymentDto.getOrderId();
        int totalAmount = createPaymentDto.getTotalAmount();

        // Check if a payment already exists for the given order
        ResponseDto<Payment> existingPayment = findByOrderId(orderId);

        if (existingPayment.getData() != null) {
            return update(existingPayment.getData().getId(), totalAmount, orderId);
        } else {
            // Generate a new transaction ID and determine payment statu
            String transactionId = generateTransactionId();
            PaymentStatus paymentStatus = generatePaymentStatus();

            // Create new payment record
            Payment newPayment = new Payment();
            Order order = orderRepository.findById(orderId).orElseThrow();
            newPayment.setOrder(order);
            newPayment.setTotalAmount(totalAmount);
            newPayment.setPaymentStatus(paymentStatus);
            newPayment.setTransactionId(transactionId);

            paymentRepository.save(newPayment);

            // Update order's payment status
            order.setPaymentStatus(paymentStatus);
            orderRepository.save(order);

            return new ResponseDto<>(HttpStatus.CREATED.value(), Messages.PAYMENT_CREATED, newPayment);
        }
    }

    // Updates an existing payment record with a new amount, status, and transaction ID.
    @Transactional
    public ResponseDto<Payment> update(String paymentId, int totalAmount, String orderId) {
        String transactionId = generateTransactionId();
        PaymentStatus paymentStatus = generatePaymentStatus();

        // Fetch the payment and associated order
        Payment payment = paymentRepository.findById(paymentId).orElseThrow();
        Order order = orderRepository.findById(orderId).orElseThrow();
        // Update order payment status
        order.setPaymentStatus(paymentStatus);
        orderRepository.save(order);

        // Update payment details
        payment.setTotalAmount(totalAmount);
        payment.setPaymentStatus(paymentStatus);
        payment.setTransactionId(transactionId);
        paymentRepository.save(payment);

        return new ResponseDto<>(HttpStatus.OK.value(), Messages.PAYMENT_UPDATED, payment);
    }

    // Generates a unique transaction ID using UUID.
    private String generateTransactionId() {
        return UUID.randomUUID().toString();
    }

    // Randomly generates a payment status (SUCCESS or FAILED) to simulate a real-world payment processing outcome.
    private PaymentStatus generatePaymentStatus() {
        return Math.random() < 0.5 ? PaymentStatus.SUCCESS : PaymentStatus.FAILED;
    }
}
