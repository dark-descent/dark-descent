import { Scene, SceneClass } from "./Scene";
import { SubSystem } from "./SubSystem";

/**
 * Class for keeping track/managing all scenes.
 * @extends SubSystem
 */
export class SceneManager extends SubSystem<{}>
{
	private loadingScene: Scene | null = null;
	private activeScene: Scene | null = null;

	public override async configure(): Promise<void>
	{

	}

	public override run(): void
	{

	}

	public override async terminate(): Promise<void>
	{

	}

	public async loadScene<T extends Scene>(sceneClass: SceneClass<T>, force: boolean = false)
	{
		if (this.loadingScene)
		{
			if(this.loadingScene.constructor === sceneClass)
			{
				console.warn(`Did not load already loading scene ${this.loadingScene.constructor.name}!`);
				return;
			}
			
			// TODO: stop loading currently loading scene
		}

		if ((this.activeScene && this.activeScene.constructor === sceneClass))
		{
			console.warn(`Did not load already loaded scene ${this.activeScene.constructor.name}!`);
			return;
		}

		const scene = new sceneClass(this.engine.subSystems);
		this.loadingScene = scene;

		await scene.onLoad();

		await this.engine.subSystems.resourceManager.loadPending();

		this.loadingScene = null;
		this.activeScene = scene;
	}

}