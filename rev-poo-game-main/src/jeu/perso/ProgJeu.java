package jeu.perso;

import jeu.perso.entities.Fiole;
import jeu.perso.entities.Personnage;

public class ProgJeu {
	public static void main(String[] args) {
		
		Personnage.maxPointDevie=20;
		
		Personnage p = new Personnage();
		p.saluer();
		p.prendre(new Fiole());
		p.boire();
	}
}
