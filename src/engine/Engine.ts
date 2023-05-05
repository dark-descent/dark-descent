import { Game, GameClass } from "./Game";
import { InputSystem } from "./InputSystem";
import { RenderSystem } from "./RenderSystem";
import { System, SystemClass } from "./System";

declare global
{
	namespace Engine
	{
		interface Event
		{
			"system-configured": System;
			"system-terminated": System;
		}

		type EventHandler<K extends string = keyof Engine.Event> = (...args: K extends keyof Engine.Event ? Engine.Event[K] : any[]) => void | Promise<void>;
	}
}

export class Engine<T extends Game<T> = any>
{
	public static readonly load = async <T extends Game<T>>(GameClass: GameClass<T>): Promise<Engine<T>> =>
	{
		console.log(`Loading game ${GameClass.name}...`);
		const engine = new Engine(GameClass);

		console.log(`Configuring engine...`);
		await engine.configure();

		return engine;
	}

	public readonly game: Readonly<T>;

	public readonly systems = new Map<SystemClass<any>, System>;

	private readonly eventHandlers: { [event: string]: Engine.EventHandler<string>[]; } = {};

	private constructor(GameClass: GameClass<T>)
	{
		this.game = new GameClass(this);

		this.registerSystem(RenderSystem);
		this.registerSystem(InputSystem);
	}

	protected registerSystem<T extends System>(SystemClass: SystemClass<T>)
	{
		if (this.systems.has(SystemClass))
			throw new Error(`${SystemClass.name} is already registered!`);

		this.systems.set(SystemClass, new SystemClass(this));
	}

	public getSystem<T extends System>(SystemClass: SystemClass<T>)
	{
		const system = this.systems.get(SystemClass);

		if (!system)
			throw new Error(`${SystemClass.name} is not registered!`);

		return system;
	}

	private async configure()
	{
		console.groupCollapsed("Configuring systems...");

		await Promise.all(Array.from(this.systems.values()).map(async (system) => 
		{
			await system.configure();
			this.emitEvent("system-configured", system);
		}));

		console.log("Systems configured!");
	}

	public async start() 
	{
		console.log(`Starting game...`);


		Array.from(this.systems.values()).map((system) => system.run());
	};

	public async stop() 
	{
		console.log(`Stopping game...`);
		await this.terminate();
	};

	private async terminate()
	{
		console.log("Terminating systems...");

		await Promise.all(Array.from(this.systems.values()).map(async system =>
		{
			await system.terminate();
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