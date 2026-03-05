import { Console } from "@woowacourse/mission-utils";
import Rank from "../domain/models/Rank.js";

export default class ConsoleOutputView {
  static ERROR_PREFIX = "[ERROR] ";

  static printLottos(lottos) {
    Console.print(`${lottos.length}개를 구매했습니다.`);
    lottos.forEach((lotto) => {
      Console.print(`[${lotto.getNumbers().join(", ")}]`);
    });
  }

  static printResult({ ranks, yieldRate }) {
    Console.print("\n당첨 통계");
    Console.print("--------------------");
    Rank.order.forEach((rank) => {
      const count = ranks.filter((r) => r === rank).length;
      Console.print(ConsoleOutputView.#formatRank(rank, count));
    });
    Console.print(`총 수익률은 ${yieldRate}%입니다.`);
  }

  static #formatRank(rank, count) {
    const prize = rank.getPrize().toLocaleString();
    if (rank === Rank.SECOND) {
      return `5개 일치, 보너스 볼 일치 (${prize}원) - ${count}개`;
    }
    return `${rank.getMatchCount()}개 일치 (${prize}원) - ${count}개`;
  }

  static printErrorMessage(errorMsg) {
    Console.print(ConsoleOutputView.ERROR_PREFIX + errorMsg);
  }
}
