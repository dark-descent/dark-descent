import { Engine } from "./Engine";

export abstract class Scene
{
	protected readonly subSystems: Engine.SubSystems; 

	public constructor(subSystems: Engine.SubSystems)
	{
		this.subSystems = subSystems;
	}

	public abstract onLoad(): Promise<void> | void;
	public abstract onUnload(): Promise<void> | void;
}

export type SceneClass<T extends Scene> = new (subSystems: Engine.SubSystems) => T;