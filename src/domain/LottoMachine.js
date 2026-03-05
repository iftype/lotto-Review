import Lotto from "./models/Lotto.js";

class LottoMachine {
  #picker;

  constructor({ picker }) {
    this.#picker = picker;
  }

  generate(count) {
    return Array.from({ length: count }, () => {
      return new Lotto(this.#picker());
    });
  }
}

export default LottoMachine;
