import { Game, GameClass } from "./Game";
import { InputSystem } from "./InputSystem";
import { RenderSystem } from "./RenderSystem";
import { ResourceManager } from "./ResourceManager";
import { SceneManager } from "./SceneManager";
import { SubSystem, SubSystemConfig } from "./SubSystem";

export class Engine<T extends Game<T>>
{
	private static readonly defaultConfig: Engine.Config = {
		input: {},
		renderer: {
			type: "wgpu",
			mountElement: document.body,
			fullscreen: true
		},
		resourceManager: {},
		sceneManager: {},
	};

	public static readonly load = async <T extends Game<T>>(GameClass: GameClass<T>, config: Partial<Engine.Config> = {}): Promise<Engine<T>> =>
	{
		const engineConfig = { ...this.defaultConfig, ...config } as Engine.Config;
		const engine = new Engine<T>(GameClass, engineConfig);

		await engine.configure(engineConfig);

		return engine;
	}

	public readonly game: Readonly<T>;

	public readonly subSystems: Engine.SubSystems;

	private readonly eventHandlers: { [event: string]: Engine.EventHandler<string>[]; } = {};

	private constructor(GameClass: GameClass<T>, config: Engine.Config)
	{
		this.game = new GameClass(this);

		this.subSystems = {
			input: new InputSystem(this, config.input),
			renderer: new RenderSystem(this, config.renderer),
			resourceManager: new ResourceManager(this, config.resourceManager),
			sceneManager: new SceneManager(this, config.sceneManager)
		};
	}

	private readonly iterateSubSystems = <R>(callback: <K extends keyof Engine.SubSystems>(system: Engine.SubSystems[K], key: K) => R): R[] => Object.keys(this.subSystems).map(s => callback((this.subSystems as any)[s] as any, s as any));

	private async configure(config: Engine.Config)
	{
		console.groupCollapsed("Configuring subSystems...");

		await Promise.all(this.iterateSubSystems(async (system, name) => 
		{
			console.log(`Configuring subsystem ${name}...`);
			await system.configure(config[name] as any);
			console.log(`Subsystem ${name} configured!`);

			this.emitEvent("system-configured", system);
		}));

		console.log("Systems configured!");
		console.groupEnd();
	}

	public async start() 
	{
		console.log(`Starting game...`);
		setInterval(() => 
		{
			this.iterateSubSystems(s => s.run());
		}, 1000 / 60);
	}

	public async stop() 
	{
		console.log(`Stopping game...`);
		await this.terminate();
	}

	private async terminate()
	{
		console.log("Terminating subSystems...");

		await Promise.all(this.iterateSubSystems(async (system, name) => 
		{
			console.log(`Terminating subsystem ${name}...`);
			await system.terminate();
			console.log(`Subsystem ${name} terminated!`);

			this.emitEvent("system-terminated", system);
		}));

		console.log("Systems terminated!");
	}

	public addEventListener<K extends keyof Engine.Event>(event: K, callback: Engine.EventHandler<K>)
	{
		if (!this.eventHandlers[event])
			this.eventHandlers[event] = [];
		if (!this.eventHandlers[event].includes(callback))
			this.eventHandlers[event].push(callback);
	}

	public removeEventListener<K extends keyof Engine.Event>(event: K, callback: Engine.EventHandler<K>)
	{
		const index = this.eventHandlers[event].indexOf(callback);

		if (index > -1)
			this.eventHandlers[event].splice(index, 1);
	}

	public async emitEvent<K extends keyof Engine.Event>(event: K, data: Engine.Event[K])
	{
		if (this.eventHandlers[event])
			await Promise.all(this.eventHandlers[event].map(callback => callback(data)));
	}
}

export namespace Engine
{
	export type SubSystems = {
		input: InputSystem;
		renderer: RenderSystem;
		sceneManager: SceneManager;
		resourceManager: ResourceManager;
	};

	export type Config = {
		[K in keyof SubSystems]: SubSystemConfig<SubSystems[K]>;
	};

	export interface Event
	{
		"system-configured": SubSystem<any>;
		"system-terminated": SubSystem<any>;
	}

	export type EventHandler<K extends string = keyof Engine.Event> = (...args: K extends keyof Engine.Event ? Engine.Event[K] : any[]) => void | Promise<void>;
}