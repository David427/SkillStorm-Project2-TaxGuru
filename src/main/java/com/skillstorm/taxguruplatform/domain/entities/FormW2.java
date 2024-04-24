package com.skillstorm.taxguruplatform.domain.entities;

import com.skillstorm.taxguruplatform.utils.enums.State;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "form_w2_data")
public class FormW2 {

    @Id
    @SequenceGenerator(
            name = "form_w2_data_id_seq",
            allocationSize = 1
    )
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "form_w2_data_id_seq")
    private int id;

    private String eid;
    private String employerName;
    private String streetAddress;
    private String city;

    @Column(name = "employer_state")
    private State state;

    private String zipCode;
    private double wages;
    private double taxWithheld;

    @OneToOne(mappedBy = "formW2")
    private FinancialData financialData;

}
