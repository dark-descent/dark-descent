import { Engine } from "./Engine";
import { System } from "./System";

export class RenderSystem extends System
{
	private readonly canvas: HTMLCanvasElement;

	private ctx_: CanvasRenderingContext2D | null = null;

	public get ctx()
	{
		if (!this.ctx_)
			throw new Error(`Context is not configured!`);
		return this.ctx_;
	}

	public constructor(engine: Engine)
	{
		super(engine);
		this.canvas = document.createElement("canvas");
	}

	public override async configure(): Promise<void>
	{
		document.body.append(this.canvas);
		this.ctx_ = this.canvas.getContext("2d");

		window.addEventListener("resize", this.onResize);

		this.onResize();

		this.canvas.style.backgroundColor = "red";
	}

	private readonly onResize = () =>
	{
		const p = this.canvas.parentElement!;
		this.canvas.style.width = `${p.clientWidth}px`;
		this.canvas.style.height = `${p.clientHeight}px`;
	}

	public override run(): void
	{

	}

	public override async terminate(): Promise<void>
	{
		window.removeEventListener("resize", this.onResize);
		this.canvas.remove();
	}
}