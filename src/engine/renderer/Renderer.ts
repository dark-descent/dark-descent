import { Engine } from "engine/Engine";
import { RenderSystem } from "engine/RenderSystem";

export abstract class Renderer<Config extends RendererConfig<string>>
{
	protected readonly engine: Engine<any>;
	protected readonly canvas: HTMLCanvasElement;
	protected readonly renderSystem: RenderSystem;
	
	public constructor(renderSystem: RenderSystem, canvas: HTMLCanvasElement, config: Config)
	{
		this.engine = renderSystem.engine;
		this.canvas = canvas;
		this.renderSystem = renderSystem;
	}

	protected abstract configure(config: Config): Promise<void> | void;
	public abstract render(): Promise<void> | void;
	public abstract terminate(): Promise<void> | void;

	protected onResize(size: [number, number]) { }

}

export type RendererConfig<Type extends string> = {
	type: Type;
};

export type WithRendererConfig<Type extends string, Config> = RendererConfig<Type> & Config;