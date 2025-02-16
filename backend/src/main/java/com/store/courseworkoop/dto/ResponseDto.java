package com.store.courseworkoop.dto;

public class ResponseDto<T> {
    private int statusCode;
    private String message;
    private T data;

    public ResponseDto(int statusCode, String message, T data) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public static <T> ResponseDto<T> success(String message, T data) {
        return new ResponseDto<>(200, message, data);
    }

    public static <T> ResponseDto<T> error(String message) {
        return new ResponseDto<>(500, message, null);
    }
}
