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
public class Etudiant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String code;
    private String nom;
    private String email;
    private String prenom;
    @OneToMany(mappedBy = "etudiant")
    @JsonIgnore
    private List<Note> notes;

    public Etudiant(Long id , String code, String nom, String prenom) {
        this.id=id;
        this.code = code;
        this.nom = nom;
        this.prenom = prenom;
    }
}
