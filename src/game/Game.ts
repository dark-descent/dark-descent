import * as Engine from "engine";
import { TestSceneA, TestSceneB } from "./scenes";

export class Game extends Engine.Game<Game>
{
	public override async start()
	{
		this.engine.addEventListener("scene-loaded", (scene) => console.log(scene.constructor.name, " loaded"));
		
		const { sceneManager } = this.engine.subSystems;

		await sceneManager.loadScene(TestSceneA);
	}

	public override stop()
	{
	}
}