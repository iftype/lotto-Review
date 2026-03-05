import { Random } from "@woowacourse/mission-utils";
import Lotto from "./models/Lotto.js";

export const randomPicker = () => {
  const { MAX_RANGE, MIN_RANGE, SIZE } = Lotto;
  return Random.pickUniqueNumbersInRange(MIN_RANGE, MAX_RANGE, SIZE);
};

export const fixedPicker = (numbers) => () => numbers;
