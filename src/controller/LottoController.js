import { Validator } from "../utils/Validator.js";
import Lotto from "../domain/models/Lotto.js";

export default class LottoController {
  #lottoService;

  constructor({ lottoService }) {
    this.#lottoService = lottoService;
  }

  buy(amount) {
    const parsed = Number(amount);
    Validator.isNumber(parsed);
    return this.#lottoService.buyLottos(parsed);
  }

  parseWinningNumbers(input) {
    const numbers = input.split(",").map((n) => Number(n.trim()));
    new Lotto(numbers); // 재입력용 에러검사기
    return numbers;
  }

  parseBonus(input, numbers) {
    const bonus = Number(input);
    Validator.isNumber(bonus);
    if (numbers.includes(bonus)) {
      throw new Error("보너스 번호는 당첨 번호와 중복될 수 없습니다.");
    }
    return bonus;
  }

  createWinning(numbers, bonus) {
    return this.#lottoService.createWinning(numbers, bonus);
  }

  getResult() {
    return this.#lottoService.calculateResult();
  }

  reset() {
    this.#lottoService.reset();
  }
}
