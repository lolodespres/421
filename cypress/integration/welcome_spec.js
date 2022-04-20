const URL = 'http://localhost:8001';
var validPlayer, titlePlayer;

describe('Player 1 action => ', () => {
    it('Test check name', () => {
        cy.visit(URL)
        titlePlayer = cy.get("#player-box > h2");
        titlePlayer.invoke('text').should("equal", 'Joueur 1');

        validPlayer = cy.contains('Valider');
        validPlayer.click();

        cy.on('window:alert', (str) => {
            expect(str).to.equal(`Le nom du joueur doit contenir entre 1 et 8 lettres`)
        })
        cy.get('#name').invoke('val', 'player1').then(val => {
            validPlayer.click();
            cy.on('window:alert', (str) => {
                expect(str).to.equal(`Veuilez choisir un avatar en cliquant sur un des differants choix`)
            })
        });

    })
    it('All avatar can be choose by player 1', () => {
        const avatars = cy.get("#avatars-box img");
        avatars.each((item, index, list) => {
            list[index].click();
            const srcAvatar = list[index].attributes.src.nodeValue;
            cy.get("#avatar-player img").invoke("attr", 'src').then(src => {
                expect(Cypress.$(item)[0].src).to.equal(`${URL}/${srcAvatar}`)
            });
        });
        cy.log("All of 8 avatar can be choose for player one");
        validPlayer = cy.get('#start');
        validPlayer.click();
        validPlayer.should('have.text', 'start');
        titlePlayer = cy.get("#player-box > h2");
        titlePlayer.should("have.text", 'Joueur 2');
        cy.log("Player 1 ready and change text for player 2 is done")
    });

});
describe('Player 2 action => ', () => {
    it('Test check name', () => {
        titlePlayer = cy.get("#player-box > h2");
        titlePlayer.invoke('text').should("equal", 'Joueur 2');
        validPlayer = cy.contains('start');
        validPlayer.click();
        cy.get('#name').invoke('val', 'hgytlkjhu').then(val => {
            validPlayer.click();
            cy.on('window:alert', (str) => {
                expect(str).to.equal(`Le nom du joueur doit contenir entre 1 et 8 lettres`);
                cy.get('#name').invoke('val', 'player 2').then(val => {
                    validPlayer.click();
                    cy.on('window:alert', (str) => { expect(str).to.equal(`Veuilez choisir un avatar en cliquant sur un des differants choix`) })
                });
            })
        });
    });
    it('All avatar can be choose by player 2', () => {
        const avatars = cy.get("#avatars-box img");
        avatars.each((item, index, list) => {
            list[index].click();
            const srcAvatar = list[index].attributes.src.nodeValue;
            cy.get("#avatar-player img").invoke("attr", 'src').then(src => {
                expect(Cypress.$(item)[0].src).to.equal(`${URL}/${srcAvatar}`)
            });
        });
        cy.log("All of 8 avatar can be choose for player one");
        validPlayer = cy.contains('start');
        validPlayer.should('have.text', 'start');
        titlePlayer = cy.get("#player-box > h2");
        titlePlayer.should("have.text", 'Joueur 2');
        cy.get('#name').invoke('val', 'player2').then(val => {
            validPlayer.click();
        });
        cy.log("Player 1 ready and change text for player 2 is done")
    });
    

});
describe('421 game => ', () => {
    it('Starting game', () => {
        cy.contains('start').click();
        console.log(validPlayer,localStorage);
    });
});