import Lotto from "./Lotto.js";

class WinningNumber {
  #winningLotto;
  #bonusNumber;

  constructor(lotto, bonusNumber) {
    this.#validate(lotto, bonusNumber);
    this.#winningLotto = lotto;
    this.#bonusNumber = Number(bonusNumber);
  }

  #validate(lotto, bonusNumber) {
    const bonus = Number(bonusNumber);
    if (bonus < Lotto.MIN_RANGE || bonus > Lotto.MAX_RANGE) {
      throw new Error("[ERROR] 보너스 번호는 1~45 사이의 숫자여야 합니다.");
    }
    if (lotto.hasNumber(bonus)) {
      throw new Error("[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.");
    }
  }

  match(lotto) {
    const matchCount = this.#winningLotto
      .getNumbers()
      .filter((num) => lotto.hasNumber(num)).length;
    const hasBonus = lotto.hasNumber(this.#bonusNumber);
    return { matchCount, hasBonus };
  }
}

export default WinningNumber;
