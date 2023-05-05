import { Engine } from "./Engine";

export abstract class System
{
	public readonly engine: Engine<any>;
	
	// #region Event functions
	protected readonly addEventListener: <K extends keyof Engine.Event>(event: K, callback: Engine.EventHandler<K>) => void;
	protected readonly removeEventListener: <K extends keyof Engine.Event>(event: K, callback: Engine.EventHandler<K>) => void;
	protected readonly emitEvent: <K extends keyof Engine.Event>(event: K, data: Engine.Event[K]) => void;
	// #endregion

	public constructor(engine: Engine<any>)
	{
		this.engine = engine;
		this.addEventListener = this.engine.addEventListener
		this.removeEventListener = this.engine.removeEventListener
		this.emitEvent = this.engine.emitEvent
	}

	public abstract configure(): Promise<void>;
	public abstract run(): void;
	public abstract terminate(): Promise<void>;

}



export type SystemClass<T extends System> = new (engine: Engine<any>) => T;