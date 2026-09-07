package jeu.perso.entities;

public class Personnage {
	private String nom;
	private int pointDevie;
	
	public void saluer() {
		System.out.println("Bonjour, je suis "+nom);
	}
	
	public void definirNom(String nom) {
		this.nom=nom;
	}
	public String getNom() {
		return this.nom;
	}
	
	public int getPointDevie() {
		return this.pointDevie;
	}
}