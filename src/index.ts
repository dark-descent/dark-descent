import { Engine } from "./engine";
import { Game } from "./game";

const engine = await Engine.load(Game);

engine.start();

(window as any).engine = engine;