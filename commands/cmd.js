const AddGuilde = require('./guild/addGuilde')
const Guildes = require('./guild/guildes')
const Help = require('./utils/help')
const TierList = require('./utils/tierList')
const MaGuilde = require('./guild/maGuilde')
const QuitterGuilde = require('./guild/quitterGuilde')
//const SupprimerGuilde = require('./guild/supprimerGuilde')
const Presentations = require('./utils/presentations')
const TransfererGuilde = require('./guild/transfererGuilde')
const AddMembre = require('./guild/addMember')
const RemoveMembre = require('./guild/removeMember')

module.exports = [
    {
        name: 'guildes',
        description: 'La liste des Guildes présentent sur le serveur.',
        execute(message) {
            Guildes.parse(message);
        },
    },
    {
        name: 'ajouterGuilde',
        description: 'Permet de créer une nouvelle Guilde.',
        execute(message) {
            AddGuilde.parse(message);
        },
    },
    {
        name: 'transfererGuilde',
        description: 'Permet de transferer son role de chef à un autre membre de la guilde. *Réservé aux chefs de Guilde.*',
        execute(message, args) {
            TransfererGuilde.parse(message,args);
        },
    },
    {
        name: 'ajouterMembre',
        description: 'Permet d\'ajouter un membre à sa guilde. *Réservé aux chefs de Guilde.*',
        execute(message, args) {
            AddMembre.parse(message,args);
        },
        chefOnly:true,
        args: true,
        argsType:'@Membre',
        commandForm:': *@Nom du Membre1* : *@Nom du Membre2*...'
    },
    {
        name: 'supprimerMembre',
        description: 'Permet de supprimer un membre de sa guilde. *Réservé aux chefs de Guilde.*',
        execute(message, args) {
            RemoveMembre.parse(message,args);
        },
        chefOnly:true,
        args: true,
        argsType:'@Membre',
        commandForm:': *@Nom du Membre1* : *@Nom du Membre2*...'
    },
    // {
    //     name: 'supprimerGuilde',
    //     description: 'Permet de supprimer une guilde. *Seul un Chef de guilde peut supprimer sa guilde.*',
    //     execute(message, args) {
    //         SupprimerGuilde.parse(message, args);
    //     },
    //     chefOnly: true,
    // },
    {
        name: 'maGuilde',
        description: 'Permet de changer sa guilde.',
        execute(message) {
            MaGuilde.parse(message);
        },
    },
    {
        name: 'quitterGuilde',
        description: 'Permet de quitter sa guilde.',
        execute(message) {
            QuitterGuilde.parse(message);
        },
    },
    {
        name: 'help',
        description: 'La liste des commandes comprisent par RivenBot.',
        execute(message) {
            Help.parse(message);
        },
    },
    {
        name: 'tierList',
        description: 'La tierList de Rivengard.',
        execute(message) {
            TierList.parse(message);
        },
    },
    {
        name: 'presentation',
        description: 'Active le message de présentation de RivenBot.',
        execute(message) {
            Presentations.parse(message);
        },
    },

]