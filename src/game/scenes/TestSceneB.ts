import { Scene } from "engine/Scene";

export class TestSceneB extends Scene
{
	public override onLoad(): void | Promise<void>
	{
		console.log("Loaded scene B");
	}
	
	public override onUnload(): void | Promise<void>
	{
		console.log("Unloaded scene B");
	}
	
}