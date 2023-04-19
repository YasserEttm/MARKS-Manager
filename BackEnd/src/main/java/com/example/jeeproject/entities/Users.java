package com.example.jeeproject.entities;

import com.fasterxml.jackson.annotation.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "TYPE_USER",discriminatorType = DiscriminatorType.STRING,length = 2)
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME,include =JsonTypeInfo.As.PROPERTY,property = "type")

@JsonSubTypes({
        @JsonSubTypes.Type(name = "PR",value = Professeur.class),
        @JsonSubTypes.Type(name = "AD",value = Administrateur.class)
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public abstract class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String cin;
    private String nom;
    private String prenom;
    private String email;
    @OneToOne(mappedBy = "user",fetch = FetchType.LAZY)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Compte compte;

    public Users(Long id,String cin, String nom, String prenom,Compte compte,String email) {
        this.id=id;
        this.cin = cin;
        this.nom = nom;
        this.prenom = prenom;
        this.email=email;
    }
}
