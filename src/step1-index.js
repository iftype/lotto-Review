import LottoSession from "./domain/LottoSession.js";
import LottoMachine from "./domain/LottoMachine.js";
import LottoService from "./service/LottoService.js";
import { randomPicker } from "./domain/pickers.js";
import ConsoleRunner from "./console/ConsoleRunner.js";
import LottoController from "./controller/LottoController.js";

const lottoMachine = new LottoMachine({ picker: randomPicker });
const lottoSession = new LottoSession();
const lottoService = new LottoService({ lottoSession, lottoMachine });
const lottoController = new LottoController({ lottoService });

new ConsoleRunner({ controller: lottoController }).run();
