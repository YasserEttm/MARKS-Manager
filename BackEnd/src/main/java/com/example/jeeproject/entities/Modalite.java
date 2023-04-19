package com.example.jeeproject.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class Modalite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String libele;
    private double coefficient ;
    @ManyToOne
    @JsonIgnore

    private Element element;

    public Modalite(Long id , String libele, double coefficient) {
        this.id=id;
        this.libele = libele;
        this.coefficient = coefficient;
    }
}
