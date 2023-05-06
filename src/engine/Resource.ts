import { ImportContext } from "./ResourceManager";

export abstract class Resource<Data>
{
	// public static load(importContext: ImportContext, path: string)
	// {
	// 	return new (this as any)(importContext, path);
	// }

	public readonly path: string;

	public get data(): Data | null
	{
		if (!this._data)
			throw new Error(`Resource is not loaded yet!`);

		return this._data;
	}

	protected readonly importContext: ImportContext;

	private _data: Data | null = null;

	public constructor(importContext: ImportContext, path: string)
	{
		this.importContext = importContext;
		this.path = path;
	}

	protected readonly loadRawData = async () => {
		const data = await this.importContext(this.path);
		return data.default;
	};

	protected abstract onLoad(): Promise<Data> | Data;

	public readonly load = async () =>
	{
		if(this._data)
			return;

		this._data = await this.onLoad();
	}
}

export type ResourceClass<T extends Resource<any>> = new (importContext: ImportContext, path: string) => T;