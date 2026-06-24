package com.studentconnect.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class NLQueryRequest {

    @NotBlank(message = "Query prompt is required")
    private String prompt;
}
