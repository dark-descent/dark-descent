import { Engine } from "./Engine";

export abstract class SubSystem<Config extends {}>
{
	public readonly engine: Engine<any>;

	protected readonly config: Readonly<Config>;
	
	// #region Event functions
	protected readonly addEventListener: <K extends keyof Engine.Event>(event: K, callback: Engine.EventHandler<K>) => void;
	protected readonly removeEventListener: <K extends keyof Engine.Event>(event: K, callback: Engine.EventHandler<K>) => void;
	protected readonly emitEvent: <K extends keyof Engine.Event>(event: K, data: Engine.Event[K]) => Promise<void>;
	// #endregion

	public constructor(engine: Engine<any>, config: Config)
	{
		this.engine = engine;
		this.config = config;
		this.addEventListener = this.engine.addEventListener
		this.removeEventListener = this.engine.removeEventListener
		this.emitEvent = this.engine.emitEvent
	}

	public abstract configure(config: Config): Promise<void>;
	public abstract run(): void;
	public abstract terminate(): Promise<void>;

}



export type SubSystemClass<T extends SubSystem<any>> = new (engine: Engine<any>) => T;

export type SubSystemConfig<T extends SubSystem<any>> = T extends SubSystem<infer Config> ? Config : never;