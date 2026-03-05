import { Console } from "@woowacourse/mission-utils";
import { INFO } from "../constants/messages.js";

export default class ConsoleInputView {
  static async readPurchaseAmount() {
    return Console.readLineAsync(INFO.PURCHASE_AMOUNT);
  }

  static async readWinningNumbers() {
    return Console.readLineAsync(INFO.WINNING_NUMBERS);
  }

  static async readBonusNumber() {
    return Console.readLineAsync(INFO.BONUS_NUMBER);
  }

  static async readIsRetry() {
    const input = await Console.readLineAsync(INFO.ASK_RETRY);
    const answer = input.toLowerCase().trim();
    if (answer === "y") return true;
    if (answer === "n") return false;
    throw new Error("y 또는 n을 입력해 주세요.");
  }
}
