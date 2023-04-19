package com.example.jeeproject.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.Collection;
import java.util.List;

@Entity
@DiscriminatorValue("PR")
@Data
@NoArgsConstructor
public class Professeur extends Users{
    private String specialite;
    @OneToMany(mappedBy = "professeur")
    private List<Element> elements;
    public Professeur(Long id ,String cin, String nom, String prenom, String specialite,Compte compte,String email) {
        super(id,cin, nom, prenom,compte,email);
        this.specialite = specialite;
    }
}
