import { SubSystem } from "./SubSystem";
import { Renderer, RendererConfig } from "./renderer/Renderer";
import { WGPURenderer, WGPURendererConfig } from "./renderer/WGPURenderer";

const isFullscreenConfig = (config: BaseRenderConfig): config is FullScreenConfig => "fullscreen" in config;

const isResizableConfig = (config: BaseRenderConfig): config is ResizableScreenConfig => "resizable" in config;

const isFixedConfig = (config: BaseRenderConfig): config is FixedScreenConfig => "width" in config;

export class RenderSystem extends SubSystem<RenderConfig>
{
	public readonly canvas: HTMLCanvasElement = document.createElement("canvas");

	private renderer: Renderer<RenderConfig> | null = null;

	public override async configure(config: RenderConfig): Promise<void>
	{
		window.addEventListener("resize", this.onResize);

		config.mountElement.append(this.canvas);

		if(isResizableConfig(config))
		{
			this.onResize();
		}
		else if (isFullscreenConfig(config))
		{
			await new Promise<void>((resolve) => 
			{
				const fullscreenEl = document.createElement("h1");
				fullscreenEl.style.position = "absolute";
				fullscreenEl.innerText = "Click once to start in fullscreen mode!";
				document.body.append(fullscreenEl);

				const goFullScreen = () => 
				{
					fullscreenEl.remove();
					this.canvas.requestFullscreen({ navigationUI: "hide" });
					window.removeEventListener("click", goFullScreen);
					resolve();
				};

				window.addEventListener("click", goFullScreen);
			});

			this.onResize();
		}
		else if(isFixedConfig(config))
		{
			this.canvas.width = config.width;
			this.canvas.height = config.height;
			this.canvas.style.width = `${config.width}px`;
			this.canvas.style.height = `${config.height}px`;
		}

		switch (config.type)
		{
			case "wgpu":
				{
					this.renderer = new WGPURenderer(this, this.canvas, config);
					await this.renderer["configure"](config);
				}
				break;
			default:
				throw new Error(`No Renderer implemented for ${config.type}!`);
		};
	}

	public override run(): void
	{
		this.renderer?.render();
	}

	public override async terminate(): Promise<void>
	{
		window.removeEventListener("resize", this.onResize);
	}

	private readonly onResize = () =>
	{
		if(isFixedConfig(this.config))
			return;
		
		if(isFullscreenConfig(this.config))
		{
			this.canvas.style.width = `${this.canvas.clientWidth}px`;
			this.canvas.style.height = `${this.canvas.clientHeight}px`;	
		}
		else if(isResizableConfig(this.config))
		{
			const p = this.canvas.parentElement!;
			
			if(p.clientWidth === this.canvas.clientWidth && p.clientHeight === this.canvas.clientHeight)
				return;

			this.canvas.style.width = `${this.canvas.width = p.clientWidth}px`;
			this.canvas.style.height = `${this.canvas.height = p.clientHeight}px`;	
		}
		
		this.renderer && this.renderer["onResize"]([this.canvas.clientWidth, this.canvas.clientHeight]);
	}
}

type BaseRenderConfig = FullScreenConfig | FixedScreenConfig | ResizableScreenConfig;

type WithRenderConfig<T extends RendererConfig<string>> = T & BaseRenderConfig;

type FullScreenConfig = {
	fullscreen: true;
	mountElement: HTMLElement;
};

type FixedScreenConfig = {
	width: number;
	height: number;
	mountElement: HTMLElement;
};

type ResizableScreenConfig = {
	resizable: true;
	mountElement: HTMLElement;
}

export type RenderConfig = WithRenderConfig<WGPURendererConfig>;