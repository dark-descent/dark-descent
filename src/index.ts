import { Engine } from "./engine";
import { Game } from "./game";

const engine = await Engine.load(Game, {
	renderer: {
		type: "wgpu",
		mountElement: document.body,
		resizable: true
	},
	resourceManager: {
		context: require.context("./game/assets", true, /\.(png|jpg|jpeg)$/, "lazy-once")
	}
});

engine.start();

(window as any).engine = engine;