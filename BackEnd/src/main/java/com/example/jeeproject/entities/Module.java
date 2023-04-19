package com.example.jeeproject.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Module {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nomModule;

    @OneToMany(mappedBy = "module",fetch = FetchType.LAZY)
    private List<Element> elements;
    @Enumerated(value = EnumType.STRING)

    private Semestre semestre;
    @ManyToOne
    @JsonIgnore

    private Filiere filiere;

    public Module(Long id, String nomModule,Semestre semestre) {
        this.id = id;
        this.nomModule = nomModule;
        this.semestre=semestre;
    }
}
