// domain/LottoSession.js
class LottoSession {
  #lottos;
  #winningNumber;

  constructor() {
    this.#lottos = [];
    this.#winningNumber = null;
  }

  saveLottos(lottos) {
    this.#lottos = lottos;
  }

  saveWinningNumber(winningNumber) {
    this.#winningNumber = winningNumber;
  }

  getLottos() {
    return this.#lottos;
  }

  getWinningNumber() {
    return this.#winningNumber;
  }

  reset() {
    this.#lottos = null;
    this.#winningNumber = null;
  }
}

export default LottoSession;
