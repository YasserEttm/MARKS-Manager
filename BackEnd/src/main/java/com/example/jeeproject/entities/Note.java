package com.example.jeeproject.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private double noteFinal;
    @ManyToOne
    private Etudiant etudiant;
    @ManyToOne
    private Element element;
    private double noteCc;
    private double noteProjet;
    private double noteTP;

    public Note(Long id, double noteFinal, double noteCc, double noteProjet, double noteTP) {
        this.id = id;
        this.noteFinal = noteFinal;
        this.noteCc = noteCc;
        this.noteProjet = noteProjet;
        this.noteTP = noteTP;
    }
}
