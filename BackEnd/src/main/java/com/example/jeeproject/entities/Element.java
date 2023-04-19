package com.example.jeeproject.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Collection;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Element {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nomElement;
    private double coefficient;
    private boolean estValide;
    @ManyToOne
    @JsonIgnore
    private Module module;
    @OneToMany(mappedBy = "element")
    private List<Modalite> modalite;
    @ManyToOne(cascade=CascadeType.PERSIST)
    @JoinColumn(name="professeur_id")
    @JsonIgnore

    private Professeur professeur;
    @OneToMany(mappedBy = "element")
    @JsonIgnore
    private List<Note> notes;

    public Element(Long id, String nomElement, double coefficient, boolean estValide) {
        this.id=id;
        this.nomElement = nomElement;
        this.coefficient = coefficient;
        this.estValide = estValide;
    }
}
