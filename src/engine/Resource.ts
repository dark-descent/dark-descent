export abstract class Resource<Data>
{
	public readonly path: string;

	public get data(): Data | null
	{
		if (!this.data)
			throw new Error(`Resource is not loaded yet!`);

		return this._data;
	}

	private _data: Data | null = null;

	public constructor(path: string)
	{
		this.path = path;
	}

	protected abstract onLoad(): Promise<Data> | Data;

	public readonly load = async () =>
	{
		if(this._data)
			return;

		this._data = await this.onLoad();
	}
}

export type ResourceClass<T extends Resource<any>> = new (path: string) => T;