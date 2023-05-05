import { Engine } from "./Engine";

export abstract class Game<T extends Game<T>>
{
	public readonly engine: Readonly<Engine<T>>;

	public constructor(engine: Engine<T>)
	{
		this.engine = engine;
	}
}

export type GameClass<T extends Game<T>> = new (engine: Engine<T>) => T;