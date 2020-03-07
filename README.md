# TyranixTV website
Based on **[spa_framework](https://github.com/nicolas-maitre/spa_framework)**

# Comment cloner le projet en local
1. Télécharger git (https://git-scm.com/downloads)
2. Ouvrir un terminal dans le dossier où sera placé le projet. (click droit -> "git bash here" sur Windows)
3. Executer la commande de clone: `git clone https://github.com/tyranix/tyranix-website.git`

# Comment créer une page
1. Ajouter la page dans `config/pagesConfig.js`
2. Créer une vue avec le nom de la page dans `views/`
3. Ajouter une feuille de style avec le nom de la page `styles/pages/`
4. (optionel) Si c'est un serveur Apache, ajouter le nom de la page dans le `.htaccess`

# Comment démarrer le serveur de développement local
1. Intaller nodejs (https://nodejs.org/en/download/)
2. Ouvrir un terminal dans le dossier du projet ("terminal -> new terminal" sur visual studio code)
3. Lancer la commande `node .\_other\http_test_server\start_server.js`