"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "fr" | "es" | "tw";

type Dictionary = Record<string, Record<string, string>>;

const dictionary: Dictionary = {
  en: {
    // Navbar
    "nav.patients": "Patients",
    "nav.hospitals": "Hospitals",
    "nav.donors": "Donors",
    "nav.contact": "Contact",
    "nav.login": "Login",
    "nav.register": "Register",
    "nav.donate": "Donate",
    
    // Hero
    "hero.badge": "Emergency Response Active",
    "hero.title1": "Your Donation,",
    "hero.title2": "Their Survival",
    "hero.subtitle": "Connecting real-time blood needs with a community of verified heroes. Locate nearby donors or hospitals in seconds.",
    "hero.searchPlaceholder": "Enter city or...",
    "hero.searchAllBlood": "All Blood",
    "hero.searchBtn": "Search",
    "hero.socialProof": "Trusted by 12,000+ donors and 450 hospitals nationwide.",
    "hero.criticalNeed": "CRITICAL NEED",
    "hero.criticalNeedText": "Type O- Shortage",

    // Services
    "services.title": "Streamlined Access",
    "services.subtitle": "Quickly navigate to our core services to manage your contribution or request urgent assistance.",
    "services.findDonorsTitle": "Find Donors",
    "services.findDonorsDesc": "Instantly locate and connect with compatible, verified blood donors in your immediate local area.",
    "services.findDonorsBtn": "Search Donors",
    "services.requestBloodTitle": "Request Blood",
    "services.requestBloodDesc": "Post an urgent public appeal for blood requests to notify nearby matching donors in real time.",
    "services.requestBloodBtn": "Create Request",
    "services.registerHospitalTitle": "Register Hospital",
    "services.registerHospitalDesc": "Onboard your healthcare clinic to sync inventories, post requests, and coordinate with local donors.",
    "services.registerHospitalBtn": "Register Center",
    "services.donateBloodTitle": "Donate Blood",
    "services.donateBloodDesc": "Schedule your next donation appointment, track your health metrics, and view your verified badge status.",
    "services.donateBloodBtn": "Book Appointment",

    // Live Updates
    "live.badge": "LIVE NETWORK ACTIVITY",
    "live.title": "Real-Time Coordination",
    "live.subtitle": "Our network links donor registries directly to clinical points of care. Watch active matching and urgent requests resolve as hospitals and donors connect.",
    "live.statMatch": "Average Match",
    "live.statFulfillment": "Fulfillment",
    "live.headerTitle": "Active Requests",
    "live.headerBadge": "4 Active Now",
    "live.matched": "Matched",
    "live.pending": "Pending Match",
    "live.justNow": "Just now",
    "live.minsAgo": "mins ago",
    "live.hoursAgo": "hours ago",
    "live.surgery": "Emergency Surgery",
    "live.thalassemia": "Thalassemia Treatment",
    "live.operation": "Scheduled Operation",
    "live.plasma": "Plasma Transfusion",

    // Footer
    "footer.desc": "Connecting real-time blood needs with verified donors to save lives when seconds count.",
    "footer.newsletter": "Join our emergency alert network",
    "footer.subscribeBtn": "Join",
    "footer.subscribed": "Subscribed!",
    "footer.columnAbout": "About",
    "footer.columnResources": "Resources",
    "footer.columnHospitals": "Hospitals",
    "footer.copyright": "VitaNova Inc. Built to secure public health. All rights reserved.",

    // Hospitals
    "hospitals.bannerTitle": "Our Services",
    "hospitals.bannerDesc": "Advanced blood coordination solutions crafted for life-critical medical environments. Connecting donors, hospitals, and patients through a unified, vigilant infrastructure.",
    "hospitals.card1Title": "Blood Donation",
    "hospitals.card1Desc": "Facilitating safe and efficient donor registration, health screening, and appointment scheduling across our network of certified centers.",
    "hospitals.card2Title": "Emergency Logistics",
    "hospitals.card2Desc": "Rapid response delivery systems for critical blood units, utilizing real-time GPS tracking and temperature-controlled transport units.",
    "hospitals.card3Title": "Hospital Coordination",
    "hospitals.card3Desc": "Integrated inventory management platforms that allow hospitals to request and track supply in real-time, reducing waste and shortages.",
    "hospitals.card4Title": "Patient Support",
    "hospitals.card4Desc": "Dedicated assistance for patients requiring rare blood types or long-term transfusion support, ensuring compassionate care and guidance.",
    "hospitals.card5Title": "Blood Screening",
    "hospitals.card5Desc": "Rigorous laboratory testing for infectious diseases and antibody profiling, maintaining the highest international safety standards.",
    "hospitals.card6Title": "Community Education",
    "hospitals.card6Desc": "Outreach programs designed to raise awareness about the constant need for donors and debunking common myths about blood donation.",
    "hospitals.cardLearnMore": "Learn more",
    "hospitals.ctaBadge": "JOIN THE MISSION",
    "hospitals.ctaTitle": "Ready to make a difference?",
    "hospitals.ctaDesc": "Every donation can save up to three lives. Join our network of over 50,000 verified donors today and receive real-time updates on when your blood type is most needed.",
    "hospitals.ctaBtnRegister": "Register as a Donor",
    "hospitals.ctaBtnCenters": "View Donation Centers",

    // Contact
    "contact.title": "Contact Support",
    "contact.subtitle": "We're here to help. Send us a message and we'll respond within 24 hours. Our mission is to keep the blood supply chain moving safely and efficiently.",
    "contact.formTitle": "Send us a message",
    "contact.labelName": "Full Name",
    "contact.labelEmail": "Email Address",
    "contact.labelSubject": "Subject",
    "contact.placeholderSubject": "Select a subject",
    "contact.labelMessage": "Message",
    "contact.placeholderMessage": "Tell us how we can help...",
    "contact.btnSubmit": "Submit Message",
    "contact.cardGetInTouch": "Get in touch",
    "contact.labelPhone": "Phone",
    "contact.labelOffice": "Office",
    "contact.cardQuickLinks": "Quick links",
    "contact.cardVisualText": "Join our 10k+ life savers.",

    // Login
    "login.backBtn": "Back",
    "login.cardTitle": "Welcome back",
    "login.cardSubtitle": "Sign in to your account",
    "login.labelEmail": "Email",
    "login.labelPassword": "Password",
    "login.linkForgot": "Forgot password?",
    "login.labelRemember": "Remember me",
    "login.btnSignIn": "Sign In",
    "login.promptSignUp": "Don't have an account?",
    "login.linkSignUp": "Sign up",
    "login.footerSupport": "Support",
    "login.footerLegal": "Legal",

    // Signup
    "signup.backBtn": "Back to Home",
    "signup.cardTitle": "Create your account",
    "signup.cardSubtitle": "Join our network of life-savers and start donating.",
    "signup.labelName": "Full name",
    "signup.labelEmail": "Email",
    "signup.labelBloodType": "Blood Type",
    "signup.placeholderBloodType": "Select Type",
    "signup.labelLocation": "Location",
    "signup.labelPassword": "Password",
    "signup.labelConfirmPassword": "Confirm password",
    "signup.labelTerms": "I agree to the Terms of Service and Privacy Policy. I understand that my data will be used to coordinate urgent blood donations.",
    "signup.btnSignUp": "Sign Up →",
    "signup.promptSignIn": "Already have an account?",
    "signup.linkSignIn": "Sign in",
    "signup.badgeSecure": "Secure Data Encryption",
    "signup.badgePartner": "Certified Healthcare Partner"
  },
  fr: {
    // Navbar
    "nav.patients": "Patients",
    "nav.hospitals": "Hôpitaux",
    "nav.donors": "Donateurs",
    "nav.contact": "Contact",
    "nav.login": "Connexion",
    "nav.register": "S'inscrire",
    "nav.donate": "Donner",

    // Hero
    "hero.badge": "Réponse d'urgence active",
    "hero.title1": "Votre Don,",
    "hero.title2": "Leur Survie",
    "hero.subtitle": "Connecter les besoins de sang en temps réel avec une communauté de héros vérifiés. Localisez des donneurs ou hôpitaux en quelques secondes.",
    "hero.searchPlaceholder": "Entrez la ville...",
    "hero.searchAllBlood": "Tout Sang",
    "hero.searchBtn": "Chercher",
    "hero.socialProof": "Recommandé par 12 000+ donateurs et 450 hôpitaux.",
    "hero.criticalNeed": "BESOIN CRITIQUE",
    "hero.criticalNeedText": "Pénurie de type O-",

    // Services
    "services.title": "Accès Simplifié",
    "services.subtitle": "Accédez rapidement à nos services pour gérer vos dons ou demander une assistance urgente.",
    "services.findDonorsTitle": "Trouver des Donneurs",
    "services.findDonorsDesc": "Localisez et connectez-vous instantanément avec des donneurs de sang compatibles dans votre région.",
    "services.findDonorsBtn": "Chercher Donneurs",
    "services.requestBloodTitle": "Demander du Sang",
    "services.requestBloodDesc": "Publiez un appel public urgent pour informer en temps réel les donneurs compatibles à proximité.",
    "services.requestBloodBtn": "Créer Demande",
    "services.registerHospitalTitle": "Enregistrer un Hôpital",
    "services.registerHospitalDesc": "Intégrez votre clinique pour synchroniser les stocks, publier des demandes et coordonner.",
    "services.registerHospitalBtn": "Enregistrer Centre",
    "services.donateBloodTitle": "Donner du Sang",
    "services.donateBloodDesc": "Planifiez votre prochain rendez-vous, suivez vos mesures de santé et votre statut.",
    "services.donateBloodBtn": "Prendre RDV",

    // Live Updates
    "live.badge": "ACTIVITÉ RÉSEAU EN DIRECT",
    "live.title": "Coordination en Temps Réel",
    "live.subtitle": "Notre réseau relie directement les registres de donneurs aux points de soins. Regardez les correspondances actives se résoudre.",
    "live.statMatch": "Correspondance Moyenne",
    "live.statFulfillment": "Réalisation",
    "live.headerTitle": "Demandes Actives",
    "live.headerBadge": "4 Actives",
    "live.matched": "Correspondance établie",
    "live.pending": "En attente",
    "live.justNow": "À l'instant",
    "live.minsAgo": "min",
    "live.hoursAgo": "h",
    "live.surgery": "Chirurgie d'urgence",
    "live.thalassemia": "Traitement Thalassémie",
    "live.operation": "Opération planifiée",
    "live.plasma": "Transfusion de Plasma",

    // Footer
    "footer.desc": "Connecter les besoins de sang en temps réel avec des donneurs vérifiés pour sauver des vies.",
    "footer.newsletter": "Rejoignez notre réseau d'alerte",
    "footer.subscribeBtn": "Rejoindre",
    "footer.subscribed": "Abonné!",
    "footer.columnAbout": "À Propos",
    "footer.columnResources": "Ressources",
    "footer.columnHospitals": "Hôpitaux",
    "footer.copyright": "VitaNova Inc. Conçu pour sécuriser la santé publique. Tous droits réservés.",

    // Hospitals
    "hospitals.bannerTitle": "Nos Services",
    "hospitals.bannerDesc": "Solutions de coordination avancées pour environnements médicaux critiques. Connecter donneurs, hôpitaux et patients.",
    "hospitals.card1Title": "Don de Sang",
    "hospitals.card1Desc": "Faciliter l'inscription sécurisée, le dépistage de santé et la prise de rendez-vous dans nos centres certifiés.",
    "hospitals.card2Title": "Logistique d'Urgence",
    "hospitals.card2Desc": "Systèmes de livraison rapide pour poches de sang critiques, avec suivi GPS et transport thermique.",
    "hospitals.card3Title": "Coordination Hôpitaux",
    "hospitals.card3Desc": "Gestion de stocks intégrée permettant de demander et de suivre l'inventaire en temps réel.",
    "hospitals.card4Title": "Soutien aux Patients",
    "hospitals.card4Desc": "Assistance dédiée pour les patients ayant besoin de groupes sanguins rares ou transfusions à long terme.",
    "hospitals.card5Title": "Dépistage du Sang",
    "hospitals.card5Desc": "Analyses rigoureuses pour maladies infectieuses, respectant les normes de sécurité internationales.",
    "hospitals.card6Title": "Éducation Communautaire",
    "hospitals.card6Desc": "Sensibilisation aux dons réguliers et déconstruction des mythes courants sur le don de sang.",
    "hospitals.cardLearnMore": "En savoir plus",
    "hospitals.ctaBadge": "REJOINDRE LA MISSION",
    "hospitals.ctaTitle": "Prêt à faire la différence?",
    "hospitals.ctaDesc": "Chaque don sauve jusqu'à trois vies. Rejoignez notre réseau de donateurs vérifiés dès aujourd'hui.",
    "hospitals.ctaBtnRegister": "Devenir Donateur",
    "hospitals.ctaBtnCenters": "Voir les Centres",

    // Contact
    "contact.title": "Contacter le Support",
    "contact.subtitle": "Nous sommes là pour vous. Envoyez-nous un message et nous vous répondrons sous 24 heures.",
    "contact.formTitle": "Envoyez-nous un message",
    "contact.labelName": "Nom Complet",
    "contact.labelEmail": "Adresse Email",
    "contact.labelSubject": "Sujet",
    "contact.placeholderSubject": "Sélectionnez un sujet",
    "contact.labelMessage": "Message",
    "contact.placeholderMessage": "Dites-nous comment nous pouvons vous aider...",
    "contact.btnSubmit": "Envoyer le Message",
    "contact.cardGetInTouch": "Contactez-nous",
    "contact.labelPhone": "Téléphone",
    "contact.labelOffice": "Bureau",
    "contact.cardQuickLinks": "Liens rapides",
    "contact.cardVisualText": "Rejoignez nos 10k+ sauveteurs.",

    // Login
    "login.backBtn": "Retour",
    "login.cardTitle": "Bon retour",
    "login.cardSubtitle": "Connectez-vous à votre compte",
    "login.labelEmail": "Email",
    "login.labelPassword": "Mot de passe",
    "login.linkForgot": "Mot de passe oublié?",
    "login.labelRemember": "Se souvenir de moi",
    "login.btnSignIn": "Se Connecter",
    "login.promptSignUp": "Pas encore de compte?",
    "login.linkSignUp": "S'inscrire",
    "login.footerSupport": "Support",
    "login.footerLegal": "Mentions Légales",

    // Signup
    "signup.backBtn": "Retour à l'Accueil",
    "signup.cardTitle": "Créer votre compte",
    "signup.cardSubtitle": "Rejoignez notre réseau de sauveteurs et commencez à donner.",
    "signup.labelName": "Nom complet",
    "signup.labelEmail": "Email",
    "signup.labelBloodType": "Groupe Sanguin",
    "signup.placeholderBloodType": "Choisir",
    "signup.labelLocation": "Localisation",
    "signup.labelPassword": "Mot de passe",
    "signup.labelConfirmPassword": "Confirmer mot de passe",
    "signup.labelTerms": "J'accepte les Conditions d'Utilisation et la Politique de Confidentialité. Je comprends que mes données serviront à la coordination d'urgence.",
    "signup.btnSignUp": "S'inscrire →",
    "signup.promptSignIn": "Déjà un compte?",
    "signup.linkSignIn": "Se connecter",
    "signup.badgeSecure": "Cryptage Sécurisé des Données",
    "signup.badgePartner": "Partenaire Santé Certifié"
  },
  es: {
    // Navbar
    "nav.patients": "Pacientes",
    "nav.hospitals": "Hospitales",
    "nav.donors": "Donantes",
    "nav.contact": "Contacto",
    "nav.login": "Iniciar Sesión",
    "nav.register": "Registrarse",
    "nav.donate": "Donar",

    // Hero
    "hero.badge": "Respuesta de Emergencia Activa",
    "hero.title1": "Tu Donación,",
    "hero.title2": "Su Supervivencia",
    "hero.subtitle": "Conectando necesidades de sangre en tiempo real con una comunidad de héroes verificados. Localiza donantes u hospitales en segundos.",
    "hero.searchPlaceholder": "Ingresar ciudad...",
    "hero.searchAllBlood": "Toda la Sangre",
    "hero.searchBtn": "Buscar",
    "hero.socialProof": "Confianza de más de 12,000 donantes y 450 hospitales.",
    "hero.criticalNeed": "NECESIDAD CRÍTICA",
    "hero.criticalNeedText": "Escasez de Tipo O-",

    // Services
    "services.title": "Acceso Simplificado",
    "services.subtitle": "Navega rápidamente por nuestros servicios para gestionar tus aportes o solicitar ayuda urgente.",
    "services.findDonorsTitle": "Buscar Donantes",
    "services.findDonorsDesc": "Localiza y conéctate al instante con donantes de sangre compatibles y verificados en tu área.",
    "services.findDonorsBtn": "Buscar Donantes",
    "services.requestBloodTitle": "Solicitar Sangre",
    "services.requestBloodDesc": "Publica un llamado de emergencia para alertar en tiempo real a los donantes compatibles cercanos.",
    "services.requestBloodBtn": "Crear Solicitud",
    "services.registerHospitalTitle": "Registrar Hospital",
    "services.registerHospitalDesc": "Integra tu clínica para sincronizar inventarios, publicar solicitudes y coordinar.",
    "services.registerHospitalBtn": "Registrar Centro",
    "services.donateBloodTitle": "Donar Sangre",
    "services.donateBloodDesc": "Agenda tu próxima cita de donación, realiza un seguimiento de tu salud y estado.",
    "services.donateBloodBtn": "Agendar Cita",

    // Live Updates
    "live.badge": "ACTIVIDAD RED EN VIVO",
    "live.title": "Coordinación en Tiempo Real",
    "live.subtitle": "Nuestra red conecta registros de donantes con puntos clínicos de atención. Observa las coincidencias activas.",
    "live.statMatch": "Coincidencia Promedio",
    "live.statFulfillment": "Cumplimiento",
    "live.headerTitle": "Solicitudes Activas",
    "live.headerBadge": "4 Activas Ahora",
    "live.matched": "Coincidencia establecida",
    "live.pending": "Esperando coincidencia",
    "live.justNow": "Ahora mismo",
    "live.minsAgo": "min",
    "live.hoursAgo": "h",
    "live.surgery": "Cirugía de Emergencia",
    "live.thalassemia": "Tratamiento de Talasemia",
    "live.operation": "Operación Programada",
    "live.plasma": "Transfusión de Plasma",

    // Footer
    "footer.desc": "Conectando necesidades de sangre con donantes verificados para salvar vidas cuando el tiempo apremia.",
    "footer.newsletter": "Únete a nuestra red de alerta",
    "footer.subscribeBtn": "Unirse",
    "footer.subscribed": "¡Suscrito!",
    "footer.columnAbout": "Nosotros",
    "footer.columnResources": "Recursos",
    "footer.columnHospitals": "Hospitales",
    "footer.copyright": "VitaNova Inc. Creado para asegurar la salud pública. Todos los derechos reservados.",

    // Hospitals
    "hospitals.bannerTitle": "Nuestros Servicios",
    "hospitals.bannerDesc": "Soluciones avanzadas de coordinación para entornos médicos críticos. Conectando donantes, hospitales y pacientes.",
    "hospitals.card1Title": "Donación de Sangre",
    "hospitals.card1Desc": "Facilitando el registro seguro, análisis de salud y programación de citas en nuestros centros certificados.",
    "hospitals.card2Title": "Logística de Emergencia",
    "hospitals.card2Desc": "Sistemas de entrega rápida para unidades de sangre críticas, usando GPS en tiempo real y cajas térmicas.",
    "hospitals.card3Title": "Coordinación Hospitalaria",
    "hospitals.card3Desc": "Plataforma de inventario integrado para solicitar y rastrear suministros médicos en tiempo real.",
    "hospitals.card4Title": "Soporte al Paciente",
    "hospitals.card4Desc": "Asistencia dedicada para pacientes que necesitan tipos de sangre raros o transfusiones continuas.",
    "hospitals.card5Title": "Tamizaje de Sangre",
    "hospitals.card5Desc": "Pruebas de laboratorio rigurosas contra enfermedades infecciosas, cumpliendo altos estándares internacionales.",
    "hospitals.card6Title": "Educación Comunitaria",
    "hospitals.card6Desc": "Campañas de concientización pública sobre la importancia de donar y mitos habituales.",
    "hospitals.cardLearnMore": "Aprender más",
    "hospitals.ctaBadge": "ÚNETE A LA MISIÓN",
    "hospitals.ctaTitle": "¿Listo para hacer la diferencia?",
    "hospitals.ctaDesc": "Cada donación puede salvar hasta tres vidas. Únete hoy a nuestra red de donantes verificados.",
    "hospitals.ctaBtnRegister": "Registrarse como Donante",
    "hospitals.ctaBtnCenters": "Ver Centros de Donación",

    // Contact
    "contact.title": "Contactar Soporte",
    "contact.subtitle": "Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos en menos de 24 horas.",
    "contact.formTitle": "Envíanos un mensaje",
    "contact.labelName": "Nombre Completo",
    "contact.labelEmail": "Correo Electrónico",
    "contact.labelSubject": "Asunto",
    "contact.placeholderSubject": "Selecciona un asunto",
    "contact.labelMessage": "Mensaje",
    "contact.placeholderMessage": "Dinos cómo podemos ayudarte...",
    "contact.btnSubmit": "Enviar Mensaje",
    "contact.cardGetInTouch": "Ponte en contacto",
    "contact.labelPhone": "Teléfono",
    "contact.labelOffice": "Oficina",
    "contact.cardQuickLinks": "Enlaces rápidos",
    "contact.cardVisualText": "Únete a nuestros 10k+ salvavidas.",

    // Login
    "login.backBtn": "Volver",
    "login.cardTitle": "Bienvenido de nuevo",
    "login.cardSubtitle": "Inicia sesión en tu cuenta",
    "login.labelEmail": "Correo",
    "login.labelPassword": "Contraseña",
    "login.linkForgot": "¿Olvidaste tu contraseña?",
    "login.labelRemember": "Recordarme",
    "login.btnSignIn": "Iniciar Sesión",
    "login.promptSignUp": "¿No tienes una cuenta?",
    "login.linkSignUp": "Regístrate",
    "login.footerSupport": "Soporte",
    "login.footerLegal": "Legal",

    // Signup
    "signup.backBtn": "Volver al Inicio",
    "signup.cardTitle": "Crea tu cuenta",
    "signup.cardSubtitle": "Únete a nuestra red de salvavidas y comienza a donar.",
    "signup.labelName": "Nombre completo",
    "signup.labelEmail": "Correo",
    "signup.labelBloodType": "Tipo de Sangre",
    "signup.placeholderBloodType": "Seleccionar",
    "signup.labelLocation": "Ubicación",
    "signup.labelPassword": "Contraseña",
    "signup.labelConfirmPassword": "Confirmar contraseña",
    "signup.labelTerms": "Acepto los Términos de Servicio y la Política de Privacidad. Entiendo que mis datos se usarán para coordinar donaciones urgentes.",
    "signup.btnSignUp": "Registrarse →",
    "signup.promptSignIn": "¿Ya tienes una cuenta?",
    "signup.linkSignIn": "Inicia sesión",
    "signup.badgeSecure": "Cifrado de Datos Seguro",
    "signup.badgePartner": "Socio de Salud Certificado"
  },
  tw: {
    // Navbar
    "nav.patients": "Ayafoɔ",
    "nav.hospitals": "Ayresabea",
    "nav.donors": "Adɔfoɔ",
    "nav.contact": "Nkitahodi",
    "nav.login": "Kɔ mu",
    "nav.register": "Twerɛ wo din",
    "nav.donate": "Kyɛ Mogya",

    // Hero
    "hero.badge": "Ɔhaw Ho Mmuaeɛ Areyɛ Adwuma",
    "hero.title1": "Wo Mogya Akyɛdeɛ,",
    "hero.title2": "Wɔn Nkwagyeɛ",
    "hero.subtitle": "Yɛka mogya a ɛho hia seesei bom gu baabi koro de boa adɔfoɔ. Hu mogya kyɛdefoɔ anaa ayresabea wɔ ha seesei.",
    "hero.searchPlaceholder": "Twerɛ wo kurom...",
    "hero.searchAllBlood": "Mogya Nyinaa",
    "hero.searchBtn": "Hwehwɛ",
    "hero.socialProof": "Mogya kyɛdefoɔ 12,000+ ne ayresabea 450 gye yɛn di wɔ ɔman no mu.",
    "hero.criticalNeed": "MOGYA A ƐHO HIA KƐSEƐ",
    "hero.criticalNeedText": "Type O- Poti Areyɛ Asa",

    // Services
    "services.title": "Nhyehyɛeɛ a Ɛnyɛ Den",
    "services.subtitle": "Kɔ yɛn nnwuma so ntɛm na woatumi ama mogya anaa woahwehwɛ mmoa ntɛm.",
    "services.findDonorsTitle": "Hwehwɛ Kyɛdefoɔ",
    "services.findDonorsDesc": "Hu mogya kyɛdefoɔ a wɔne wo mogya hyia wɔ wo mpɔtam hɔ seesei ara.",
    "services.findDonorsBtn": "Hwehwɛ Kyɛdefoɔ",
    "services.requestBloodTitle": "Hwehwɛ Mogya",
    "services.requestBloodDesc": "Twerɛ biribi gu ha seesei na ama mogya kyɛdefoɔ a wɔbɛn wo anya nkae ntɛm.",
    "services.requestBloodBtn": "Twerɛ Nhwehwɛeɛ",
    "services.registerHospitalTitle": "Twerɛ Ayresabea",
    "services.registerHospitalDesc": "Twerɛ w'ayresabea din wɔ ha na hu mogya a ɛwɔ hɔ na ne kyɛdefoɔ nso.",
    "services.registerHospitalBtn": "Twerɛ Ayresabea",
    "services.donateBloodTitle": "Kyɛ Mogya",
    "services.donateBloodDesc": "Hyehyɛ da a wobɛba abama mogya, na hwɛ w'apɔmuden ho nsɛm seesei.",
    "services.donateBloodBtn": "Hyehyɛ Berɛ",

    // Live Updates
    "live.badge": "AFIE MOGYA HO NSƐM",
    "live.title": "Nkitahodi a Ɛkɔ So Seesei Ara",
    "live.subtitle": "Yɛn afie nkitahodi no ka mogya kyɛdefoɔ ne ayresabea bom. Hwɛ nhyehyɛeɛ a ɛrekɔ so seesei ara.",
    "live.statMatch": "Match Mmerɛ",
    "live.statFulfillment": "Fulfillment",
    "live.headerTitle": "Requests a Ɛkɔ So",
    "live.headerBadge": "Requests 4 Reba",
    "live.matched": "Ahyia",
    "live.pending": "Ɛretwɛn Nhyehyɛeɛ",
    "live.justNow": "Seesei ara",
    "live.minsAgo": "min a atwam",
    "live.hoursAgo": "dɔnhwere atwam",
    "live.surgery": "Oprehyɛn a Ɛho Hia Ntɛm",
    "live.thalassemia": "Ayaresa a Ɛkɔ So",
    "live.operation": "Oprehyɛn Nhyehyɛeɛ",
    "live.plasma": "Mogya Ayaresa titiriw",

    // Footer
    "footer.desc": "Yɛka mogya a ɛho hia seesei bom gu baabi koro na yɛatumi agye nkwa wɔ berɛ a ɛsɛ mu.",
    "footer.newsletter": "Kɔ yɛn emergency alert network no mu",
    "footer.subscribeBtn": "Kɔ Mu",
    "footer.subscribed": "Wobaa mu!",
    "footer.columnAbout": "Yɛn Ho Nsɛm",
    "footer.columnResources": "Nhyehyɛeɛ",
    "footer.columnHospitals": "Ayresabea",
    "footer.copyright": "VitaNova Inc. Yɛyɛe na yɛde abɔ apɔmuden ho ban. All rights reserved.",

    // Hospitals
    "hospitals.bannerTitle": "Yɛn Nnwuma",
    "hospitals.bannerDesc": "Mogya nkitahodi ho nnwuma a ɛho hia kɛseɛ. Nkyekyɛmu ma kyɛdefoɔ, ayresabea ne ayafoɔ.",
    "hospitals.card1Title": "Mogya Akyɛdeɛ",
    "hospitals.card1Desc": "Ɛma ɛnyɛ den sɛ wobɛtwerɛ wo din, wobɛhwɛ w'apɔmuden na woahyehyɛ berɛ wɔ yɛn mmeaeɛ.",
    "hospitals.card2Title": "Mogya Kɔ ne Mmaeɛ",
    "hospitals.card2Desc": "Nhyehyɛeɛ a ɛma mogya kodu baabi a ɛsɛ ntɛmtɛm, a yɛde GPS di akyi.",
    "hospitals.card3Title": "Ayresabea Nkitahodi",
    "hospitals.card3Desc": "Hwɛ mogya a ɛwɔ hɔ na gye ebi seesei ara, a ɛsɛe mogya gu ase.",
    "hospitals.card4Title": "Mmoa ma Ayafoɔ",
    "hospitals.card4Desc": "Mmoa titiriw ma ayafoɔ a wɔrehwehwɛ mogya a ɛnyɛ na anaa ayaresa a ɛkyɛ.",
    "hospitals.card5Title": "Mogya Hwɛbea",
    "hospitals.card5Desc": "Yɛhwɛ mogya yie wɔ laboratory na ama yɛahu sɛ yadeɛ biara nni mu ansa na yɛde ama.",
    "hospitals.card6Title": "Amanfoɔ Nkyerɛkyerɛ",
    "hospitals.card6Desc": "Nnwuma a yɛyɛ de nkyerɛkyerɛ amanfoɔ wɔ mogya akyɛdeɛ ho nsɛm pa.",
    "hospitals.cardLearnMore": "Sua pii",
    "hospitals.ctaBadge": "KƆ MISSION NO MU",
    "hospitals.ctaTitle": "Wopɛ sɛ woboa anaa?",
    "hospitals.ctaDesc": "Mogya akyɛdeɛ koro biara tumi gye nkwa mmiensa. Kɔ yɛn verified kyɛdefoɔ mu nnɛ.",
    "hospitals.ctaBtnRegister": "Twerɛ wo din sɛ Kyɛdefoɔ",
    "hospitals.ctaBtnCenters": "Hwɛ Mmeaeɛ a Yɛwɔ",

    // Contact
    "contact.title": "Kasa kyerɛ Mmoabea",
    "contact.subtitle": "Yɛwɔ ha sɛ yɛbɛboa wo. Twerɛ nkra gu ha na yɛbɛbua wo wɔ dɔnhwere 24 mu. Yɛn adwuma ne sɛ mogya bɛkɔ baabi a ɛsɛ.",
    "contact.formTitle": "Twerɛ nkra gu ha",
    "contact.labelName": "Wo Din Nyinaa",
    "contact.labelEmail": "Wo Email Address",
    "contact.labelSubject": "Asɛm Ti",
    "contact.placeholderSubject": "Yi asɛm ti bi",
    "contact.labelMessage": "Nkra",
    "contact.placeholderMessage": "Twerɛ sɛnea yɛbɛtumi aboa wo...",
    "contact.btnSubmit": "Mene Nkra no kɔ",
    "contact.cardGetInTouch": "Nkitahodi Mmeaeɛ",
    "contact.labelPhone": "Tɛlɛfoun",
    "contact.labelOffice": "Ɔfese",
    "contact.cardQuickLinks": "Links Nnwuma",
    "contact.cardVisualText": "Kɔ yɛn 10k+ life savers no mu.",

    // Login
    "login.backBtn": "San kɔ akyi",
    "login.cardTitle": "Akwaaba san ba",
    "login.cardSubtitle": "Kɔ wo account mu seesei",
    "login.labelEmail": "Email",
    "login.labelPassword": "Password",
    "login.linkForgot": "W'awiri wo password?",
    "login.labelRemember": "Kae me",
    "login.btnSignIn": "Kɔ Mu",
    "login.promptSignUp": "Wo nni account ansa?",
    "login.linkSignUp": "Twerɛ wo din",
    "login.footerSupport": "Mmoa",
    "login.footerLegal": "Mmara",

    // Signup
    "signup.backBtn": "San kɔ Fie",
    "signup.cardTitle": "Twerɛ wo din",
    "signup.cardSubtitle": "Kɔ yɛn life-savers mu na hyɛ aseɛ kyɛ mogya.",
    "signup.labelName": "Wo din nyinaa",
    "signup.labelEmail": "Email",
    "signup.labelBloodType": "Wo Mogya",
    "signup.placeholderBloodType": "Yi biribi",
    "signup.labelLocation": "Baabi a wowɔ",
    "signup.labelPassword": "Password",
    "signup.labelConfirmPassword": "Si Password no pi",
    "signup.labelTerms": "Mepene Mmara ne Privacy Policy so. Megye tom sɛ yɛde me nsɛm bɛyɛ adwuma wɔ mogya akyɛdeɛ ho seesei.",
    "signup.btnSignUp": "Twerɛ wo din →",
    "signup.promptSignIn": "Woakɔ mu pɛn?",
    "signup.linkSignIn": "Kɔ mu seesei",
    "signup.badgeSecure": "Secure Data Encryption",
    "signup.badgePartner": "Certified Health Partner"
  }
};

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("en");

  // Load preferred language from localStorage if client-side
  useEffect(() => {
    const storedLang = localStorage.getItem("vitanova_lang") as Language;
    if (storedLang && ["en", "fr", "es", "tw"].includes(storedLang)) {
      setLanguageState(storedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("vitanova_lang", lang);
  };

  const t = (key: string): string => {
    return dictionary[language]?.[key] || dictionary["en"]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
