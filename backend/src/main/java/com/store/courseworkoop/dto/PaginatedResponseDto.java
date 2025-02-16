package com.store.courseworkoop.dto;

import java.util.List;

public class PaginatedResponseDto<T> {
    private List<T> data;
    private long total;

    public PaginatedResponseDto() {
    }

    public PaginatedResponseDto(List<T> data, long total) {
        this.data = data;
        this.total = total;
    }

    // getters and setters
    public List<T> getData() {
        return data;
    }

    public void setData(List<T> data) {
        this.data = data;
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }
}
