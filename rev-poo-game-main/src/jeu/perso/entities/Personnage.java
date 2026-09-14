package jeu.perso.entities;

import java.util.ArrayList;
import java.util.List;

public class Personnage {
	private String nom;
	private int pointDevie;
	public static int maxPointDevie=15;
	private List<Fiole> sac;
	
	
	public Personnage() {
		this("No name");
	}
	
	public Personnage(String nom) {
		this(nom,maxPointDevie);
	}
	
	public Personnage (String nom, int pv) {
		this.sac= new ArrayList<Fiole>();
		this.pointDevie=pv;
		this.nom=nom;		
	}
	
	public void saluer() {
		System.out.println("Bonjour, je suis "+nom);
	}
	
	public void prendre(Fiole fiole) {
		sac.add(fiole);
	}
	
	public void setNom(String nom) {
		this.nom=nom;
	}
	
	public String getNom() {
		return nom;
	}
	
	public int getPointDevie() {
		return this.pointDevie;
	}
	
	/**
	 * Boit un pv à partir d'une fiole de son sac
	 * @return vrai si la quantité a été bue
	 */
	public boolean boire() {
		return false;
	}
	
	/**
	 * Boit une certaine quantité de pv à partir d'une fiole de son sac
	 * @param quantite la quantité bue
	 * @return vrai si la quantité a été bue
	 */
	public boolean boire(int quantite) {
		return false;
	}
	
		
	public void boire(Fiole fiole,boolean force) {
		if(force) {
			pointDevie+=fiole.getPointDeVie();
			fiole.setPointDeVie(0);
		}
	}
}
