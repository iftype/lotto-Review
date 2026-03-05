import Money from "../domain/models/Money.js";
import Lotto from "../domain/models/Lotto.js";
import Rank from "../domain/models/Rank.js";
import WinningNumber from "../domain/models/WinningNumber.js";

export default class LottoService {
  #lottoSession;
  #lottoMachine;

  constructor({ lottoSession, lottoMachine }) {
    this.#lottoSession = lottoSession;
    this.#lottoMachine = lottoMachine;
  }

  buyLottos(amount) {
    const money = new Money(amount);
    const lottos = this.#lottoMachine.generate(money.purchaseLotto());
    this.#lottoSession.saveLottos(lottos);
    return lottos;
  }

  createWinning(numbers, bonus) {
    const winningLotto = new Lotto(numbers);
    const winningNumber = new WinningNumber(winningLotto, bonus);
    this.#lottoSession.saveWinningNumber(winningNumber);
  }

  calculateResult() {
    const lottos = this.#lottoSession.getLottos();
    if (!lottos?.length) {
      throw new Error("로또를 먼저 구매해 주세요.");
    }

    const winningNumber = this.#lottoSession.getWinningNumber();
    if (!winningNumber) {
      throw new Error("당첨 번호를 먼저 입력해 주세요.");
    }

    const amount = lottos.length * Money.UNIT;

    const ranks = lottos.map((lotto) => {
      const { matchCount, hasBonus } = winningNumber.match(lotto);
      return Rank.getRank(matchCount, hasBonus);
    });

    const totalPrize = ranks.reduce((sum, rank) => sum + rank.getPrize(), 0);
    const yieldRate = ((totalPrize / amount) * 100).toFixed(1);

    return { ranks, yieldRate };
  }

  reset() {
    this.#lottoSession.reset();
  }
}
