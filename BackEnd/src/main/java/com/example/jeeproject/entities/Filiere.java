package com.example.jeeproject.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Filiere {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idFiliere;
    private String nomFiliere;
    @OneToMany(mappedBy = "filiere")
    private List<Module>modules;


    public Filiere(Long idFiliere, String nomFiliere) {
        this.idFiliere = idFiliere;
        this.nomFiliere = nomFiliere;
    }
}
