import { Console } from "@woowacourse/mission-utils";
import generateLottos from "../domain/LottoMachine.js";
import ConsoleInputView from "../console/ConsoleInputView.js";
import Money from "../domain/Money.js";
import WinningNumber from "../domain/WinningNumber.js";
import Lotto from "../domain/Lotto.js";
import ConsoleOutView from "../console/ConsoleOutputView.js";

export class App {
  async run() {
    do {
      const money = await this.#readMoney();
      const lottos = generateLottos(money.purchaseLotto());
      ConsoleOutView.printLottos(lottos);
      const winningLotto = await this.#readWinningLotto();
      const winningNumber = await this.#readWinningNumber(winningLotto);
      // TODO: 통계 출력
    } while (await this.#readIsRetry());
  }

  async #readMoney() {
    return this.#retryUntilSuccess(async () => {
      const amount = await ConsoleInputView.readPurchaseAmount();
      return new Money(amount);
    });
  }

  async #readWinningLotto() {
    return this.#retryUntilSuccess(async () => {
      const numbers = await ConsoleInputView.readWinningNumbers();
      return new Lotto(numbers);
    });
  }

  async #readWinningNumber(winningLotto) {
    return this.#retryUntilSuccess(async () => {
      const bonus = await ConsoleInputView.readBonusNumber();
      return new WinningNumber(winningLotto, bonus);
    });
  }

  async #readIsRetry() {
    return this.#retryUntilSuccess(async () => {
      return ConsoleInputView.readIsRetry();
    });
  }

  async #retryUntilSuccess(action) {
    while (true) {
      try {
        return await action();
      } catch (e) {
        Console.print(e.message);
      }
    }
  }
}
