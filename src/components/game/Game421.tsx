import React, {useEffect, useState} from 'react';
import Header from '../Header';
import PlayerBoxGame from './PlayerBoxGame';
import store from '../../store';
import "./game.css";
export interface IPropsGame421 {

}
export default function Game421(props: IPropsGame421) {
    const [p1, setp1] = useState(store.getState().players.p1);
    const [p2, setp2] = useState(store.getState().players.p2);
    useEffect(() => {
        console.log(p1,p2)
    })
    return (
        <>
            <Header view="game"></Header>
            <main className="main-container container">
                <PlayerBoxGame name={p1.name} numberPlayer={1} pathAvatar={p1.avatarPath}></PlayerBoxGame>
                <div id="dice-box-1" className="dice-box container">
                    <canvas className="dices" id="d1-p1" width="34" height="34"></canvas>
                    <canvas className="dices" id="d2-p1" width="34" height="34"></canvas>
                    <canvas className="dices" id="d3-p1" width="34" height="34"></canvas>
                </div>
                <div className="gameboard">
                    <div id="pot" className="container tokens-box">
                        <canvas id="tb-1" className="token-board token" width="20" height="20"></canvas>
                        <canvas id="tb-2" className="token-board token" width="20" height="20"></canvas>
                        <canvas id="tb-3" className="token-board token" width="20" height="20"></canvas>
                        <canvas id="tb-4" className="token-board token" width="20" height="20"></canvas>
                        <canvas id="tb-5" className="token-board token" width="20" height="20"></canvas>
                        <canvas id="tb-6" className="token-board token" width="20" height="20"></canvas>
                        <canvas id="tb-7" className="token-board token" width="20" height="20"></canvas>
                        <canvas id="tb-8" className="token-board token" width="20" height="20"></canvas>
                        <canvas id="tb-9" className="token-board token" width="20" height="20"></canvas>
                        <canvas id="tb-10" className="token-board token" width="20" height="20"></canvas>
                        <canvas id="tb-11" className="token-board token" width="20" height="20"></canvas>
                        <canvas id="tb-12" className="token-board token" width="20" height="20"></canvas>
                        <canvas id="tb-13" className="token-board token" width="20" height="20"></canvas>
                        <canvas id="tb-14" className="token-board token" width="20" height="20"></canvas>
                        <canvas id="tb-15" className="token-board token" width="20" height="20"></canvas>
                        <canvas id="tb-16" className="token-board token" width="20" height="20"></canvas>
                        <canvas id="tb-17" className="token-board token" width="20" height="20"></canvas>
                        <canvas id="tb-18" className="token-board token" width="20" height="20"></canvas>
                        <canvas id="tb-19" className="token-board token" width="20" height="20"></canvas>
                        <canvas id="tb-20" className="token-board token" width="20" height="20"></canvas>
                        <canvas id="tb-21" className="token-board token" width="20" height="20"></canvas>
                    </div>
                    <div id="dice-box-board">
                        <div className="scene-d1 scene">
                            <canvas className="dices" id="d1-board" width="34" height="34"></canvas>
                            <div id="cube-d1" className="cube">
                                <div className="cube__face cube__face--front"></div>
                                <div className="cube__face cube__face--back"></div>
                                <div className="cube__face cube__face--right"></div>
                                <div className="cube__face cube__face--left"></div>
                                <div className="cube__face cube__face--top"></div>
                                <div className="cube__face cube__face--bottom"></div>
                            </div>
                        </div>

                        <div className="scene-d2 scene">
                            <canvas className="dices" id="d2-board" width="34" height="34"></canvas>
                            <div id="cube-d2" className="cube">
                                <div className="cube__face cube__face--front"> </div>
                                <div className="cube__face cube__face--back"> </div>
                                <div className="cube__face cube__face--right"> </div>
                                <div className="cube__face cube__face--left"> </div>
                                <div className="cube__face cube__face--top"> </div>
                                <div className="cube__face cube__face--bottom"> </div>
                            </div>
                        </div>

                        <div className="scene-d3 scene">
                            <canvas className="dices" id="d3-board" width="34" height="34"></canvas>
                            <div id="cube-d3" className="cube">
                                <div className="cube__face cube__face--front"> </div>
                                <div className="cube__face cube__face--back"> </div>
                                <div className="cube__face cube__face--right"> </div>
                                <div className="cube__face cube__face--left"> </div>
                                <div className="cube__face cube__face--top"> </div>
                                <div className="cube__face cube__face--bottom"> </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="dice-box-2" className="dice-box container">
                    <canvas className="dices" id="d1-p2" width="34" height="34"></canvas>
                    <canvas className="dices" id="d2-p2" width="34" height="34"></canvas>
                    <canvas className="dices" id="d3-p2" width="34" height="34"></canvas>
                </div>
                <PlayerBoxGame name={p2.name} numberPlayer={2} pathAvatar={p2.avatarPath}/>
            </main>
            <footer>
                <div id="dialog-box" className="container">Durant la charge les joueur lance les dés chacun leur tour le gagnant
                    recommence</div>
                <div id="score" className="container"></div>
            </footer>
            <div id="rules" className="modal">
                <div className="modal-content">
                    <span className="close">&times;</span>
                    <h2>Comment jouer au 421</h2>
                    <p>
                        On joue généralement le <strong>421</strong> en deux manches, la "charge" et la "décharge". L’ensemble des
                        jetons est appelé le "pot".
                    </p>
                    <p>
                        Lors de la première partie du jeu, la "charge", les joueurs vont se répartir les 21
                        jetons entre eux en espérant en récupérer le moins possible. Lors de la deuxième partie,
                        la "décharge", les joueurs devront se débarrasser du plus de jetons possible.
                    </p>
                    <p>
                        Le joueur à gauche démarrera la partie en lançant les trois dés.
                    </p>
                    <h3>La Charge</h3>
                    <p> les joueur lance chacun leur tour les 3 dés, la comparaisons des combinaisons détermine qui perd et obtiens
                        des jetons.</p>
                    <h3>La Décharge</h3>
                    <p>
                        Le dernier vianqueur de la charge commence.<br />
                        Pour chacun des trois dés il peut choisir de relancer ou non. S’il ne relance pas il aura
                        effectué un seul lancer. Le joueur peut, si il le désire, relancer une deuxième et une
                        troisième fois tout ou partie des trois dés.<br />
                        Lorsqu’un joueur est satisfait de sa combinaison il click sur le boutton "Garder le coup".
                        Cela lui permet de valider sa combinaison.<br />
                        Ainsi, si le premier joueur à lancé trois fois les dés l'autre joueur devrat obtenir plus fort avec le même
                        nombre de coup ou moins.</p>
                    <p>La combinaison 2,2,1 est appelée "nénette". C’est la plus faible des combinaisons. Peu importe la meilleure
                        combinaison qui a été réalisée, celui qui fait une "nénette" reçoit d’office 2 jetons.
                    </p><p>Lorsqu’un joueur n’a plus de jetons la partie se termine et il est
                        déclaré vainqueur.
                    </p><h2> Force et Valeur des combinaisons par ordre décroissant:</h2>
                    <table cellSpacing="0" cellPadding="0">
                        <tbody>
                            <tr className="ligne-head">
                                <th className="cell-combi">Combinaison</th>
                                <th className="cell-value">Valeur</th>
                            </tr>
                            <tr className="ligne">
                                <td className="cell-combi">421</td>
                                <td className="cell-value">10 jetons</td>
                            </tr>
                            <tr className="ligne">
                                <td className="cell-combi">3 As (se dit "Mac 1")</td>
                                <td className="cell-value">7 jetons</td>
                            </tr>
                            <tr className="ligne">
                                <td className="cell-combi">2 As et Six (se dit "Mac 6")</td>
                                <td className="cell-value" rowSpan={2}>6 jetons</td>
                            </tr>
                            <tr className="ligne">
                                <td className="cell-combi">3 Six (se dit "brelan de 6")</td>

                            </tr>
                            <tr className="ligne">
                                <td className="cell-combi">2 As et Cinq (se dit "Mac 5")</td>
                                <td className="cell-value" rowSpan={2}>5 jetons</td>
                            </tr>
                            <tr className="ligne">
                                <td className="cell-combi">3 Cinq (se dit "brelan de 5")</td>

                            </tr>
                            <tr className="ligne">
                                <td className="cell-combi">2 As et Quatre (se dit "Mac 4")</td>
                                <td className="cell-value" rowSpan={2}>4 jetons</td>
                            </tr>
                            <tr className="ligne">
                                <td className="cell-combi">3 Quatre (se dit "brelan de 4")</td>

                            </tr>
                            <tr className="ligne">
                                <td className="cell-combi">2 As et Trois (se dit "Mac 3")</td>
                                <td className="cell-value" rowSpan={2}>3 jetons</td>
                            </tr>
                            <tr className="ligne">
                                <td className="cell-combi">3 Trois (se dit "brelan de 3")</td>

                            </tr>
                            <tr className="ligne">
                                <td className="cell-combi">2 As et Deux (se dit "Mac 2")</td>
                                <td className="cell-value" rowSpan={6}>2 jetons</td>
                            </tr>
                            <tr className="ligne">
                                <td className="cell-combi">3 Deux (se dit "brelan de 2")</td>

                            </tr>
                            <tr className="ligne">
                                <td className="cell-combi">Quatre, Cinq, Six (se dit suite aux 6)</td>

                            </tr>
                            <tr className="ligne">
                                <td className="cell-combi">Trois, Quatre, Cinq (se dit suite aux 5)</td>

                            </tr>
                            <tr className="ligne">
                                <td className="cell-combi">Deux, Trois, quatre (se dit suite aux 4)</td>

                            </tr>
                            <tr className="ligne">
                                <td className="cell-combi">As, Deux, Trois (se dit suite aux 3)</td>

                            </tr>
                            <tr className="ligne">
                                <td className="cell-combi">As, Deux, Deux (se dit nénette)</td>
                                <td className="cell-value"> -2 jetons</td>
                            </tr>
                            <tr className="ligne">
                                <td className="cell-rest">
                                    Toutes autres combinaisons (Du + au -) <br />selon le principe (Six, Trois, As = 631 plus
                                    fort que Six, Deux, As = 621)
                                </td>
                                <td className="cell-value">1 jetons</td>
                            </tr>
                        </tbody>
                    </table >
                </div >
            </div >
        </>);
}