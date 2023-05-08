import { Resource } from "./Resource";

export class Texture extends Resource<Uint8Array>
{
	/** TODO: Check if the image is loaded correctly!!! */
	protected override async onLoad(): Promise<Uint8Array>
	{
		const url = await this.loadRawData();
		const data = await fetch(url);
		const blob = await data.blob();
		const uintArray = await blob.arrayBuffer();
		return new Uint8Array(uintArray);
	}

}
