import { Resource, ResourceClass } from "./Resource";
import { SubSystem } from "./SubSystem";

/**
 * Class for keeping track/managing of all resources.
 * @extends SubSystem
 */
export class ResourceManager extends SubSystem<{}>
{
	private readonly resources: { [path: string]: [Resource<any>, number] } = {};

	private readonly loadPromises: Promise<void>[] = [];

	public override async configure(): Promise<void>
	{

	}

	public override run(): void
	{

	}

	public override async terminate(): Promise<void>
	{

	}

	public readonly load = <T extends Resource<any>>(type: ResourceClass<T>, path: string): T =>
	{
		if (!this.resources[path])
		{
			this.resources[path] = [new type(path), 1];
			this.loadPromises.push(this.resources[path][0].load());
		}
		else
		{
			this.resources[path][1]++;
		}

		return this.resources[path][0] as T;
	}
}