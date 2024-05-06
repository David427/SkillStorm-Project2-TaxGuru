package com.skillstorm.taxguruplatform.domain.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdjustmentDto {

    private Long id;
    private Boolean stdDeduction;

}
