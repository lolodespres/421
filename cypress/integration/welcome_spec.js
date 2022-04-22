const URL = 'http://localhost:8001';
var validPlayer, titlePlayer;
function checkAvatarCanBeChoose() {
    const avatars = cy.get("#avatars-box img");
    avatars.each((item, index, list) => {
        list[index].click();
        const srcAvatar = list[index].attributes.src.nodeValue;
        cy.get("#avatar-player img").invoke("attr", 'src').then(src => {
            expect(Cypress.$(item)[0].src).to.equal(`${URL}/${srcAvatar}`)
        });
    });
}
function checkSession(nbPlayer) {
    cy.window().then(win => {
        const playerSession = JSON.parse(win.sessionStorage.getItem(`player${nbPlayer}Info`));
        expect(playerSession.name).to.equal(`player${nbPlayer}`);
        expect(playerSession.avatarPath).to.equal('images/avatars/av8.png');
    });
}
function checkPlayerBox(nbPlayer) {
    cy.contains(`h2#name${nbPlayer}`, `player${nbPlayer}`);
    cy.get(`img#avatar${nbPlayer}`).invoke('attr', 'src').should('eq', `images/avatars/av8.png`);
    cy.get(`.token-p${nbPlayer}`).each(($el, index, $list) => {
        expect($list.length).to.equal(21);
    });
}
describe('421 game => ', () => {

    describe('Player 1 action => ', () => {
        it('Test check name', () => {
            cy.visit('/')
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
            checkAvatarCanBeChoose();
            cy.log("All of 8 avatar can be choose for player one");
            validPlayer = cy.get('#start');
            validPlayer.click();
            validPlayer.should('have.text', 'start');
            titlePlayer = cy.get("#player-box > h2");
            titlePlayer.should("have.text", 'Joueur 2');
            cy.log("Player 1 ready and change text for player 2 is done")
        });

        it('Info player 1 in session storage', () => {
            checkSession(1);
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
            checkAvatarCanBeChoose();
            cy.log("All of 8 avatar can be choose for player 2");
            validPlayer = cy.contains('start');
            titlePlayer = cy.get("#player-box > h2");
            titlePlayer.should("have.text", 'Joueur 2');
            cy.get('#name').invoke('val', 'player2').then(val => {
                validPlayer.click();
            });
            cy.log("Player 2 ready go next test")
        });

        it('Info player 2 in session storage', () => {
            checkSession(2);
        });

    });
    describe('Check starter view => ', () => {
        before('Start game', function () {
            cy.get('button#start').click();
        });
        it('Check header => ', () => {
            cy.contains("#title1", 'player1');
            cy.contains("#title2", 'player2');
            cy.contains("button#set-players", 'Accueil');
            cy.contains("button#restart", 'Recommencer');
            cy.contains("button#btn-rules", 'Règles');
        });
        it('Check head game => ', () => {
            cy.contains("button#validate-shot", 'garder le coup');
            cy.contains("h2#game-round", 'Charge');
            cy.contains("button#auto-charge", 'Charge auto');
            cy.contains("button#roll-dices", 'Jeter');
        });
        it('Check gameboard => ', () => {
            describe("Player 1 box", () => {
                checkPlayerBox(1);
            })
        });
    });
});
            // });