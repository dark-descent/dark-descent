import { Scene } from "engine/Scene";
import { Texture } from "engine/Texture";

export class TestSceneA extends Scene
{
	public override onLoad(): void | Promise<void>
	{
		this.subSystems.resourceManager.load(Texture, ["./text1.png", "./text2.jpeg","./text3.jpeg"]);
	}
	
	public override onUnload(): void | Promise<void>
	{
		console.log("Unloaded scene A");
	}
	
}