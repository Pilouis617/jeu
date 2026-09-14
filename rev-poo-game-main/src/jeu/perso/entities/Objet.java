package jeu.perso.entities;

public class Objet {
	
	private String nom;
	
	public Objet() {
		this("no name");
	}
	public Objet (String nom) {
		this.nom = nom;
	}
	public void setNom(String nom) {
		this.nom = nom;
	}
	public String getNom() {
		return nom;
	}
}
	
	
