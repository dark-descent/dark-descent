import { Resource, ResourceClass } from "./Resource";
import { Scene } from "./Scene";
import { SubSystem } from "./SubSystem";

/**
 * Class for keeping track/managing of all resources.
 * @extends SubSystem
 */
export class ResourceManager extends SubSystem<ResourceManagerConfig>
{
	private readonly resources: { [path: string]: [Resource<any>, number] } = {};

	private loadPromises: Promise<void>[] = [];

	public override async configure(): Promise<void>
	{
		this.addEventListener("scene-loaded", this.loadPending);
	}

	public override run(): void
	{

	}

	public override async terminate(): Promise<void>
	{
		this.removeEventListener("scene-loaded", this.loadPending);
	}

	public readonly load = <T extends Resource<any>>(type: ResourceClass<T>, paths: `./${string}`[]): T[] =>
	{
		return paths.map(p => 
		{
			if (!this.resources[p])
			{
				this.resources[p] = [new type(this.config.context, p), 1];
				this.loadPromises.push(this.resources[p][0].load());
			}
			else
			{
				this.resources[p][1]++;
			}

			return this.resources[p][0] as T;
		});
	}

	public readonly loadPending = async () => 
	{
		await Promise.all(this.loadPromises);
		this.loadPromises = [];
	}
}

export type ResourceManagerConfig = {
	context: ImportContext;
};

export type ImportContext = {
	keys(): string[];
	(id: string): any;
	<T>(id: string): T;
	resolve(id: string): string;
	id: string;
};