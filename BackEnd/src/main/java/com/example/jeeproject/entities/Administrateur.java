package com.example.jeeproject.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@Data
@NoArgsConstructor
@DiscriminatorValue("AD")
public class Administrateur extends Users{
    public Administrateur(Long id,String cin, String nom, String prenom,Compte compte,String email) {
        super(id,cin, nom, prenom,compte,email);
    }
}
