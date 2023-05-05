export abstract class Scene
{
	public abstract onLoad(): Promise<void> | void;

}