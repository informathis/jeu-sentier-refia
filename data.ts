import { Challenge, AmbitionLevel, OptionItem } from './types';

export const COMMON_SAFEGUARDS: OptionItem[] = [
  { 
    id: 'transparency', 
    label: "Transparence et explicabilité (informer l'apprenant)",
    educationalFeedback: "Essentiel pour la confiance. L'utilisateur doit savoir qu'il interagit avec un système IA (règle éthique de base)."
  },
  { 
    id: 'human_loop', 
    label: "Supervision humaine (validation finale par un formateur)",
    educationalFeedback: "Le garde-fou ultime. L'IA propose, le formateur dispose. Cela évite les erreurs de contexte que la machine ne voit pas."
  },
  { 
    id: 'contest', 
    label: "Droit au recours / contestation",
    educationalFeedback: "Permet de corriger les erreurs de l'IA et donne un sentiment de contrôle aux apprenants."
  },
  { 
    id: 'privacy', 
    label: "Anonymisation des données / RGPD strict",
    educationalFeedback: "Obligatoire dès qu'on touche aux données personnelles. Attention à la ré-identification possible via les métadonnées."
  },
  { 
    id: 'impact_eval', 
    label: "Évaluation indépendante de l'impact",
    educationalFeedback: "Ne croyez pas sur parole les promesses de la solution. Mesurez l'impact réel sur les apprenants après 6 mois."
  },
  { 
    id: 'no_auto', 
    label: "Interdiction de décision purement automatisée",
    educationalFeedback: "Crucial pour respecter l'article 22 du RGPD. Aucune décision affectant l'avenir d'un élève ne doit être prise sans humain."
  }
];

export const CHALLENGES: Challenge[] = [
  {
    id: 'c1',
    title: "Versants de l'Avenir",
    description: "Orientation et affectation des jeunes",
    context: "Les conseillers sont submergés et les jeunes manquent de visibilité sur les filières porteuses.",
    publics: ["Collégiens", "Lycéens", "Conseillers d'orientation"],
    difficulty: 2,
    expertComment: "L'orientation est un domaine à 'Haut Risque' au sens de l'AI Act européen. Le danger est d'enfermer l'élève dans un destin statistique basé sur son passé, au lieu de lui ouvrir des horizons inattendus.",
    suggestedUseCases: [
      { id: 'reco', label: "IA de recommandation de filières basée sur les notes et intérêts", riskFactor: 4, educationalFeedback: "Classique mais risqué : l'IA tend à reproduire les stéréotypes passés (filles = littéraire, garçons = sciences) si on ne la corrige pas activement." },
      { id: 'chat', label: "Chatbot 24/7 pour répondre aux questions sur les métiers", riskFactor: 2, educationalFeedback: "Bon point d'entrée pour l'information, tant qu'il ne donne pas de conseils personnalisés engageants." },
      { id: 'trend', label: "Analyse prédictive des tendances de l'emploi pour ajuster la carte des formations", riskFactor: 3, educationalFeedback: "Outil stratégique puissant pour les décideurs, moins risqué pour l'individu direct." }
    ],
    suggestedBenefits: [
      { id: 'match', label: "Meilleure adéquation profil / formation" },
      { id: 'access', label: "Réduction des inégalités d'information" },
      { id: 'eff', label: "Gain de temps pour les conseillers" }
    ],
    suggestedRisks: [
      { id: 'bias', label: "Biais algorithmique (reproduire des stéréotypes sociaux/genres)", riskFactor: 5, educationalFeedback: "Risque majeur ici. Nécessite un audit des données d'entraînement." },
      { id: 'bubble', label: "Enfermement dans une bulle de suggestions", riskFactor: 3, educationalFeedback: "L'effet 'Netflix' appliqué à l'avenir pro : on ne vous propose que ce que vous aimez déjà." },
      { id: 'dep', label: "Perte d'autonomie dans le choix", riskFactor: 4 }
    ],
    suggestedData: [
      { id: 'grades', label: "Notes et bulletins scolaires" },
      { id: 'social', label: "Données socio-démographiques (CSP parents, adresse)", educationalFeedback: "Attention : l'usage de données sociales (CSP, Quartier) pour orienter est éthiquement très discutable (déterminisme social)." },
      { id: 'interests', label: "Questionnaires d'intérêts déclaratifs" }
    ]
  },
  {
    id: 'c2',
    title: "Col de la Transition",
    description: "Reconversion vers les métiers verts",
    context: "Besoin massif de former des adultes aux métiers de la transition écologique, mais les profils sont hétérogènes.",
    publics: ["Demandeurs d'emploi", "Salariés en reconversion"],
    difficulty: 3,
    expertComment: "La reconversion est un moment de vulnérabilité. L'IA doit agir comme une boussole bienveillante, pas comme un portique de sélection automatique. L'approche par 'compétences' (skills) est plus inclusive que l'approche par 'diplômes'.",
    suggestedUseCases: [
      { id: 'gap', label: "IA d'analyse des compétences (gap analysis) pour cibler les modules manquants", riskFactor: 3, educationalFeedback: "Excellent usage : permet de personnaliser les parcours et de valoriser les acquis non formels." },
      { id: 'match_job', label: "Matching automatique CV / Offres agroécologie", riskFactor: 3, educationalFeedback: "Efficace, mais attention aux 'trous' dans les CV que les algorithmes pénalisent souvent injustement." },
      { id: 'coach', label: "Coach virtuel motivationnel pour le parcours de formation", riskFactor: 2 }
    ],
    suggestedBenefits: [
      { id: 'speed', label: "Accélération du retour à l'emploi" },
      { id: 'custom', label: "Parcours 100% personnalisés" },
      { id: 'terr', label: "Réponse précise aux besoins du territoire" }
    ],
    suggestedRisks: [
      { id: 'exclusion', label: "Exclusion des profils atypiques non reconnus par l'IA", riskFactor: 4, educationalFeedback: "Si l'IA est entraînée sur des parcours standards, elle rejettera les profils en reconversion radicale." },
      { id: 'data_sec', label: "Fuite de données personnelles sensibles", riskFactor: 5 },
      { id: 'human', label: "Déshumanisation de l'accompagnement", riskFactor: 3, educationalFeedback: "Rien ne remplace l'empathie d'un conseiller pour lever les freins périphériques (logement, garde d'enfants)." }
    ],
    suggestedData: [
      { id: 'cv', label: "CV et lettres de motivation" },
      { id: 'market', label: "Données du marché du travail (offres)" },
      { id: 'softskills', label: "Résultats de tests psychométriques", educationalFeedback: "Données très sensibles et subjectives. À manipuler avec une extrême précaution." }
    ]
  },
  {
    id: 'c3',
    title: "Sentier de la Persévérance",
    description: "Lutte contre le décrochage",
    context: "Repérer les signaux faibles de décrochage chez les apprenants à distance ou en difficulté.",
    publics: ["Apprenants fragiles", "Équipes pédagogiques"],
    difficulty: 3,
    expertComment: "Le paradoxe de la prédiction : prédire l'échec d'un élève peut précipiter cet échec (effet Pygmalion/étiquetage). L'information doit aller au tuteur, pas brutalement à l'élève.",
    suggestedUseCases: [
      { id: 'alert', label: "Système d'alerte précoce (Early Warning System) basé sur l'assiduité et les notes", riskFactor: 4, educationalFeedback: "Classique des LMS. Utile si l'alerte déclenche une aide humaine, dangereux si elle déclenche une sanction administrative." },
      { id: 'sentiment', label: "Analyse de sentiment dans les forums de discussion", riskFactor: 5, educationalFeedback: "Intrusif et souvent peu fiable sur l'ironie ou l'argot des jeunes. Risque de surveillance perçu." },
      { id: 'tutor', label: "Affectation automatique de tuteurs aux élèves à risque", riskFactor: 2, educationalFeedback: "Bonne pratique d'allocation de ressources, orientée vers l'aide." }
    ],
    suggestedBenefits: [
      { id: 'prevention', label: "Intervention rapide avant l'échec" },
      { id: 'resource', label: "Optimisation des ressources d'accompagnement" },
      { id: 'success', label: "Amélioration des taux de réussite" }
    ],
    suggestedRisks: [
      { id: 'stig', label: "Stigmatisation / Prophétie autoréalisatrice", riskFactor: 5, educationalFeedback: "Si l'enseignant voit une étiquette rouge sur un élève, il risque inconsciemment de moins s'investir." },
      { id: 'surveil', label: "Sentiment de surveillance généralisée", riskFactor: 4 },
      { id: 'error', label: "Faux positifs (alerter pour rien)", riskFactor: 2 }
    ],
    suggestedData: [
      { id: 'lms', label: "Logs de connexion (LMS)", educationalFeedback: "Donnée brute fiable mais pauvre : on peut être connecté sans apprendre." },
      { id: 'comms', label: "Contenu des messages / emails", educationalFeedback: "Attention au secret de la correspondance et à la vie privée !" },
      { id: 'hist', label: "Historique scolaire complet" }
    ]
  },
  {
    id: 'c4',
    title: "Pic Pédagogique",
    description: "Soutien à la création pédagogique",
    context: "Les formateurs manquent de temps pour diversifier leurs supports et créer des exercices variés.",
    publics: ["Formateurs", "Ingénieurs pédagogiques"],
    difficulty: 1,
    expertComment: "Ici l'IA est un 'assistant de production' (copilote). Le risque éthique est faible si le formateur vérifie tout (Human-in-the-loop). Le vrai risque est la qualité (hallucinations) et la propriété intellectuelle.",
    suggestedUseCases: [
      { id: 'gen_quiz', label: "Génération automatique de quiz à partir de cours PDF", riskFactor: 1, educationalFeedback: "Usage à faible risque et fort gain de temps. Le formateur doit juste valider la pertinence." },
      { id: 'sim', label: "Création de scénarios de jeux de rôle pour la formation", riskFactor: 2, educationalFeedback: "Très bon pour la créativité. L'IA aide à sortir de la page blanche." },
      { id: 'adapt', label: "Simplification automatique de textes pour niveaux différents (FALC)", riskFactor: 2, educationalFeedback: "Formidable levier d'inclusion pour les publics DYS ou allophones." }
    ],
    suggestedBenefits: [
      { id: 'time', label: "Gain de temps majeur pour les formateurs" },
      { id: 'divers', label: "Diversification des modalités pédagogiques" },
      { id: 'inc', label: "Meilleure inclusion (adaptation des supports)" }
    ],
    suggestedRisks: [
      { id: 'qual', label: "Hallucinations / Erreurs factuelles dans le contenu", riskFactor: 3, educationalFeedback: "L'IA générative invente des faits avec aplomb. La relecture experte est non négociable." },
      { id: 'prop', label: "Problèmes de propriété intellectuelle", riskFactor: 2, educationalFeedback: "À qui appartient le cours généré ? Et les données fournies à l'IA sont-elles protégées ?" },
      { id: 'stand', label: "Standardisation excessive des cours", riskFactor: 1 }
    ],
    suggestedData: [
      { id: 'content', label: "Supports de cours existants" },
      { id: 'open', label: "Ressources éducatives libres (REL)", educationalFeedback: "Source idéale : libre de droits et souvent de qualité." },
      { id: 'ext', label: "Données du web (modèles généralistes)", educationalFeedback: "Attention aux biais culturels des modèles entraînés sur le web global (souvent anglo-centrés)." }
    ]
  },
  {
    id: 'c5',
    title: "Vallée des Métiers",
    description: "Adaptation de l'offre de formation",
    context: "L'offre de formation publique peine à s'aligner rapidement sur les besoins économiques locaux.",
    publics: ["Décideurs", "Responsables d'établissements"],
    difficulty: 2,
    expertComment: "Piloter par la donnée (Data-driven) est séduisant mais le passé ne prédit pas toujours le futur. Une rupture technologique ou écologique peut rendre obsolètes les tendances d'hier.",
    suggestedUseCases: [
      { id: 'predict', label: "Prédiction des compétences critiques à 3 ans par territoire", riskFactor: 3, educationalFeedback: "Complexe. Nécessite des données très propres. Utile comme aide à la décision, pas comme vérité absolue." },
      { id: 'ingest', label: "Analyse sémantique des offres d'emploi pour mettre à jour les référentiels", riskFactor: 2, educationalFeedback: "Très pertinent pour réduire l'écart école-entreprise. Permet de repérer les nouveaux mots-clés." },
      { id: 'comp', label: "Comparaison automatique avec l'offre de formation privée", riskFactor: 1 }
    ],
    suggestedBenefits: [
      { id: 'strat', label: "Pilotage stratégique éclairé" },
      { id: 'react', label: "Réactivité accrue de l'institution" },
      { id: 'employ', label: "Meilleure employabilité des sortants" }
    ],
    suggestedRisks: [
      { id: 'myopia', label: "Pilotage à court terme (dictature de la demande immédiate)", riskFactor: 3, educationalFeedback: "L'école doit aussi former des citoyens et donner une culture générale, pas juste répondre au besoin immédiat d'une entreprise." },
      { id: 'blackbox', label: "Décisions stratégiques basées sur des modèles opaques", riskFactor: 4 },
      { id: 'data_bias', label: "Biais dans les données du marché (offres non publiées)", riskFactor: 2, educationalFeedback: "Le 'marché caché' (recrutement par réseau) n'est pas visible par l'IA." }
    ],
    suggestedData: [
      { id: 'partners', label: "Données des partenaires économiques" },
      { id: 'scrape', label: "Scraping de sites d'emploi", educationalFeedback: "Attention à la légalité du scraping (CGU des sites) et à la qualité hétérogène des annonces." },
      { id: 'alum', label: "Enquêtes d'insertion des anciens" }
    ]
  }
];

export const getAmbitionLabel = (level: AmbitionLevel) => {
  switch(level) {
    case AmbitionLevel.LOCAL: return "Petit sentier local (Expérimentation établissement)";
    case AmbitionLevel.PILOT: return "Traversée (Pilote inter-établissements)";
    case AmbitionLevel.NONE: return "Bivouac (Pas d'IA, renforcement de l'existant)";
    default: return "";
  }
};