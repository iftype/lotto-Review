// ConsoleRunner.js
import InputView from "./ConsoleInputView.js";
import OutputView from "./ConsoleOutputView.js";

export default class ConsoleRunner {
  #controller;

  constructor({ controller }) {
    this.#controller = controller;
  }

  async run() {
    do {
      await this.#playOnce();
      this.#controller.reset();
    } while (await this.#readIsRetry());
  }

  async #playOnce() {
    await this.#processPurchase();
    await this.#processWinning();
    await this.#processResult();
  }

  async #processPurchase() {
    const lottos = await this.#retry(async () => {
      const amount = await InputView.readPurchaseAmount();
      return this.#controller.buy(amount);
    });
    OutputView.printLottos(lottos);
  }

  async #processWinning() {
    const numbers = await this.#retry(async () => {
      const input = await InputView.readWinningNumbers();
      return this.#controller.parseWinningNumbers(input);
    });
    const bonus = await this.#retry(async () => {
      const input = await InputView.readBonusNumber();
      return this.#controller.parseBonus(input, numbers);
    });
    this.#controller.createWinning(numbers, bonus);
  }

  async #processResult() {
    const result = this.#controller.getResult();
    OutputView.printResult(result);
  }

  async #readIsRetry() {
    return this.#retry(() => InputView.readIsRetry());
  }

  async #retry(action) {
    while (true) {
      try {
        return await action();
      } catch (e) {
        OutputView.printErrorMessage(e.message);
      }
    }
  }
}
