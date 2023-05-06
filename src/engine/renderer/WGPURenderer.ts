import { RenderConfig } from "engine/RenderSystem";
import { Renderer, RendererConfig, WithRendererConfig } from "./Renderer";

export class WGPURenderer extends Renderer<WGPURendererConfig>
{
	private adapter!: GPUAdapter;
	private device!: GPUDevice;
	private ctx!: GPUCanvasContext;
	private presentationFormat!: GPUTextureFormat;
	private module!: GPUShaderModule;
	private pipeline!: GPURenderPipeline;
	private renderPassDescriptor!: GPURenderPassDescriptor;

	protected override async configure(config: RenderConfig)
	{
		if (!isWebGPUConfig(config))
			throw new Error(`Invalid Renderer config!`);

		const assert = <T>(val: T, message: string): NonNullable<T> => 
		{
			if (!val)
				throw new Error(message);
			return val;
		}
		
		const gpu = assert(navigator.gpu as any, "Needs a browser that supports WebGPU!");

		this.adapter = assert(await gpu.requestAdapter(), "Could not get adapter!");
		this.device = assert(await this.adapter.requestDevice(), "Could not get device!");

		this.ctx = assert(this.canvas.getContext("webgpu") as any, "Cold not get webgpu context!");

		this.presentationFormat = gpu.getPreferredCanvasFormat()

		this.ctx.configure({
			device: this.device,
			format: this.presentationFormat,
		});

		this.module = this.device.createShaderModule({
			label: 'our hardcoded red triangle shaders',
			code: `
			  @vertex fn vs(
				@builtin(vertex_index) vertexIndex : u32
			  ) -> @builtin(position) vec4f {
				var pos = array<vec2f, 3>(
				  vec2f( 0.0,  0.5),  // top center
				  vec2f(-0.5, -0.5),  // bottom left
				  vec2f( 0.5, -0.5)   // bottom right
				);
		 
				return vec4f(pos[vertexIndex], 0.0, 1.0);
			  }
		 
			  @fragment fn fs() -> @location(0) vec4f {
				return vec4f(0.9, 0.2, 0.2, 1.0);
			  }
			`,
		});

		this.pipeline = this.device.createRenderPipeline({
			label: 'our hardcoded red triangle pipeline',
			layout: 'auto',
			vertex: {
				module: this.module,
				entryPoint: 'vs',
			},
			fragment: {
				module: this.module,
				entryPoint: 'fs',
				targets: [{ format: this.presentationFormat }],
			},
		});

		this.renderPassDescriptor = {
			label: 'our basic canvas renderPass',
			colorAttachments: [
				{
					view: this.ctx.getCurrentTexture().createView(),
					clearValue: [0.1, 0.1, 0.1, 1],
					loadOp: 'clear',
					storeOp: 'store',
				},
			],
		};

	}

	protected override onResize(size: [number, number])
	{
		console.log(`canvas resized ${size[0] + ":" + size[1]}`);
	}

	public override render()
	{
		const ca = Array.from(this.renderPassDescriptor.colorAttachments)[0];
		if (ca)
		{
			const view = this.ctx.getCurrentTexture().createView();
			if (!view)
				throw new Error("Could not get canvas view!");

			ca.view = view;
		}

		const encoder = this.device.createCommandEncoder({ label: 'our encoder' });

		const pass = encoder.beginRenderPass(this.renderPassDescriptor);
		pass.setPipeline(this.pipeline);
		pass.draw(3);
		pass.end();

		const commandBuffer = encoder.finish();
		this.device.queue.submit([commandBuffer]);
	}

	public override terminate()
	{

	}

}

export const isWebGPUConfig = (config: RendererConfig<any>): config is WGPURendererConfig => config.type === "wgpu";

export type WGPURendererConfig = WithRendererConfig<"wgpu", {

}>;