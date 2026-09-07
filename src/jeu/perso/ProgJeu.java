package jeu.perso;

import jeu.perso.entities.Personnage;

public class ProgJeu {
	public static void main(String[] args) {
		Personnage p = new Personnage();
		p.saluer();
		p.definirNom("Arthur");
		p.saluer();
	}
}
