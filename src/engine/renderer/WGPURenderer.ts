import { RenderConfig } from "engine/RenderSystem";
import { Renderer, WithRendererConfig } from "./Renderer";

export class WGPURenderer extends Renderer<WGPURendererConfig>
{
	protected override configure(config: RenderConfig)
	{
		if(config.type !== "wgpu")
			throw new Error(`Invalid Renderer config!`);

		
	}

	protected override onResize(size: [number, number])
	{
		console.log(`canvas resized ${size[0] + ":" + size[1]}`);
	}

	public override render()
	{
		
	}

	public override terminate()
	{
		
	}

}

export type WGPURendererConfig = WithRendererConfig<"wgpu", {

}>;