/**
 * PORTFOLIO DE RAPHAEL MARMOL
 * SCRIPT JAVASCRIPT PRINCIPAL
 *
 * Ce script gère toutes les fonctionnalités interactives du portfolio :
 * - Navigation mobile (menu hamburger)
 * - Animations au défilement
 * - Comportement du formulaire
 * - Défilement fluide entre les sections
 * - Mise en évidence des liens de navigation actifs
 */

/**
 * GESTION DU MENU MOBILE
 *
 * Cette section gère l'ouverture et la fermeture du menu hamburger sur les appareils mobiles.
 * L'icône bascule entre un hamburger et une croix, et le menu s'affiche/se masque en conséquence.
 */
// Sélectionne l'icône du menu et la liste de navigation
const menu = document.querySelector("#menu");
const nav = document.querySelector(".links");

// Lorsqu'on clique sur l'icône du menu
menu.onclick = () => {
	// Bascule la classe "bx-x" pour changer l'icône hamburger en icône de fermeture
	menu.classList.toggle("bx-x");
	// Bascule la classe "active" pour afficher/masquer le menu
	nav.classList.toggle("active");
};

/**
 * FERMETURE AUTOMATIQUE DU MENU MOBILE APRÈS CLIC SUR UN LIEN
 *
 * Cette fonction améliore l'expérience utilisateur en fermant automatiquement
 * le menu mobile après que l'utilisateur a cliqué sur un lien de navigation.
 */
// Sélectionne tous les liens dans la navigation
const navLinks = document.querySelectorAll(".links a");

// Ajoute un écouteur d'événements à chaque lien
navLinks.forEach((link) => {
	link.addEventListener("click", () => {
		// Si le menu est ouvert (en mode mobile), le fermer
		if (nav.classList.contains("active")) {
			// Retire la classe active pour masquer le menu
			nav.classList.remove("active");
			// Restaure l'icône du menu hamburger
			menu.classList.remove("bx-x");
		}
	});
});

/**
 * ANIMATIONS AU DÉFILEMENT
 *
 * Ces fonctions gèrent l'apparition progressive des éléments lors du défilement
 * de la page, créant un effet visuel attrayant et moderne.
 */
document.addEventListener("DOMContentLoaded", () => {
	/**
	 * Fonction pour vérifier si un élément est visible dans la fenêtre
	 * @param {HTMLElement} element - L'élément à vérifier
	 * @return {boolean} - Vrai si l'élément est visible dans la fenêtre
	 */
	const isInViewport = (element) => {
		// Obtient les coordonnées de l'élément par rapport à la fenêtre
		const rect = element.getBoundingClientRect();

		// Considère l'élément comme visible s'il est à 80% du haut de la fenêtre et pas complètement sorti par le haut
		return (
			rect.top <=
				(window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
			rect.bottom >= 0
		);
	};

	// Sélectionne les éléments à animer
	const sections = document.querySelectorAll("section");
	const skillCards = document.querySelectorAll(".skill-card");
	const projectBoxes = document.querySelectorAll(".box");

	/**
	 * Fonction pour ajouter la classe "visible" aux éléments qui entrent dans le viewport
	 * Cette classe déclenche les animations définies en CSS
	 */
	const addVisibleClass = () => {
		// Animation des sections
		sections.forEach((section) => {
			if (isInViewport(section) && !section.classList.contains("visible")) {
				section.classList.add("visible");
			}
		});

		// Animation des cartes de compétences avec délai progressif
		skillCards.forEach((card) => {
			if (isInViewport(card) && !card.classList.contains("visible")) {
				// Ajoute la classe pour déclencher l'animation
				card.classList.add("visible");

				// Calcule un délai progressif basé sur l'index de la carte
				// pour créer un effet d'apparition en cascade
				const delay = Array.from(skillCards).indexOf(card) * 0.1;
				card.style.transitionDelay = `${delay}s`;
			}
		});

		// Animation des projets avec délai progressif
		projectBoxes.forEach((box) => {
			if (isInViewport(box) && !box.classList.contains("visible")) {
				// Ajoute la classe pour déclencher l'animation
				box.classList.add("visible");

				// Un délai plus long pour les projets
				const delay = Array.from(projectBoxes).indexOf(box) * 0.2;
				box.style.transitionDelay = `${delay}s`;
			}
		});
	};

	// Exécute la fonction immédiatement pour animer les éléments déjà visibles au chargement
	addVisibleClass();

	// Ajoute un écouteur d'événements pour exécuter la fonction lors du défilement
	window.addEventListener("scroll", addVisibleClass);
});

/**
 * GESTION DU FORMULAIRE DE CONTACT
 *
 * Ces fonctions gèrent le comportement du formulaire, notamment l'animation
 * du bouton d'envoi et la validation de base des champs.
 */
const contactForm = document.querySelector("#contact form");
if (contactForm) {
	contactForm.addEventListener("submit", (e) => {
		// Vous pouvez ajouter ici une logique de validation supplémentaire
		// Par exemple: vérification des formats d'email, longueur minimale des messages, etc.

		// Animation du bouton lors de la soumission
		const button = contactForm.querySelector('button[type="submit"]');
		if (button) {
			// Change le texte du bouton pour montrer que l'envoi est en cours
			button.innerHTML = "Envoi en cours...";

			// Note: Comme vous utilisez web3forms, nous ne faisons qu'ajouter une animation
			// La logique d'envoi est gérée par le formulaire lui-même
		}
	});
}

/**
 * DÉFILEMENT FLUIDE POUR LES LIENS D'ANCRAGE
 *
 * Cette fonction assure un défilement fluide et agréable lorsque l'utilisateur
 * clique sur un lien de navigation qui pointe vers une section de la page.
 */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	// Ajoute un écouteur d'événements à chaque lien d'ancrage
	anchor.addEventListener("click", function (e) {
		// Empêche le comportement par défaut (saut brusque)
		e.preventDefault();

		// Obtient l'ID de la cible à partir de l'attribut href
		const targetId = this.getAttribute("href");
		// Sélectionne l'élément cible
		const targetElement = document.querySelector(targetId);

		// Si l'élément cible existe, défile jusqu'à lui
		if (targetElement) {
			window.scrollTo({
				// Calcule la position en tenant compte de la hauteur de la barre de navigation fixe
				top: targetElement.offsetTop - 100,
				// Utilise un défilement fluide au lieu d'un saut brusque
				behavior: "smooth",
			});
		}
	});
});

/**
 * MISE EN ÉVIDENCE DE LA NAVIGATION ACTIVE
 *
 * Cette fonction met en évidence le lien de navigation correspondant
 * à la section actuellement visible à l'écran, améliorant ainsi
 * l'expérience utilisateur en fournissant un repère visuel.
 */
const highlightNavOnScroll = () => {
	// Sélectionne toutes les sections et tous les liens de navigation
	const sections = document.querySelectorAll("section");
	const navLinks = document.querySelectorAll(".links a");

	// Variable pour stocker l'ID de la section actuellement visible
	let currentSection = "";

	// Pour chaque section, vérifie si elle est actuellement visible
	sections.forEach((section) => {
		// Calcule la position du haut de la section avec un décalage pour la barre de navigation
		const sectionTop = section.offsetTop - 150;
		// Obtient la hauteur de la section
		const sectionHeight = section.clientHeight;
		// Obtient la position actuelle de défilement
		const scrollPosition = window.scrollY;

		// Si la position de défilement est dans la plage de la section, considère cette section comme active
		if (
			scrollPosition >= sectionTop &&
			scrollPosition < sectionTop + sectionHeight
		) {
			currentSection = section.getAttribute("id");
		}
	});

	// Met à jour la classe des liens de navigation
	navLinks.forEach((link) => {
		// Retire d'abord la classe active de tous les liens
		link.classList.remove("active-link");

		// Extrait l'ID de section à partir de l'attribut href (en supprimant le #)
		const href = link.getAttribute("href").substring(1);

		// Si ce lien pointe vers la section actuellement visible, ajoute la classe active
		if (href === currentSection) {
			link.classList.add("active-link");
		}
	});
};

// Exécute la fonction de mise en évidence au chargement de la page
window.addEventListener("load", highlightNavOnScroll);
// Et à chaque défilement
window.addEventListener("scroll", highlightNavOnScroll);

/**
 * AFFICHAGE DE L'ANNÉE ACTUELLE DANS LE COPYRIGHT
 *
 * Cette fonction met à jour dynamiquement l'année dans le copyright
 * pour qu'elle soit toujours actuelle sans avoir à mettre à jour le code.
 */
document.addEventListener("DOMContentLoaded", () => {
	// Récupère l'élément qui doit contenir l'année
	const yearElement = document.getElementById("year");

	// Si l'élément existe, mettre à jour avec l'année actuelle
	if (yearElement) {
		const currentYear = new Date().getFullYear();
		yearElement.textContent = currentYear;
	}
});
