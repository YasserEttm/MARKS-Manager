package com.example.jeeproject.dto;

import com.example.jeeproject.entities.Etudiant;
import com.example.jeeproject.entities.Modalite;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NoteDto {
    private Long id;
    private double noteFinal;
    private double noteCc;
    private double noteTP;
    private double noteProjet;
    private Etudiant etudiant;
    private Long idElement;
    private List<Modalite> modalite;
    private boolean estValide;


}