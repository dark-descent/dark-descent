import { KeyCode, createKeyCodeMap } from "./KeyCode";
import { System } from "./System";
/**
 * Class for keeping track/managing all input events for Keyboard, Mouse, Joysticks etc...
 * @extends System
 */
export class InputSystem extends System
{
	/** An object to keep track of al the keys that are pressed. */
	private readonly keyDownMap = createKeyCodeMap(false);

	/**
	 * To keep track of which keys went down this frame we need 2 buffers. 
	 * 1 buffer (object) for the active frame (which will not be modified on this run) 
	 * and 1 for the next frame (recording).
	*/
	private readonly keyDownFrameMaps = [createKeyCodeMap(false), createKeyCodeMap(false)];

	/**
	 * To keep track of which keys went up this frame we need 2 buffers. 
	 * 1 buffer (object) for the active frame (which will not be modified on this run) 
	 * and 1 for the next frame (recording).
	*/
	private readonly keyUpFrameMaps = [createKeyCodeMap(false), createKeyCodeMap(false)];

	/** 
	 * Keep track of all the keys that went down this 
	 * frame to be able to reset them for the next frame.
	 */
	private keyDownList: KeyCode[] = [];

	/** 
	 * Keep track of all the keys that went up this 
	 * frame to be able to reset them for the next frame.
	 */
	private keyUpList: KeyCode[] = [];

	/** The index for the frameMap that is currently running ("active"). */
	private activeFrame = 0;

	/** The index for the frameMap where the new input is registered. */
	private recordFrame = 1;

	/** Gets called by the engine when configuring all the sub systems. */
	public override async configure(): Promise<void>
	{
		window.addEventListener("keydown", this.onKeyDown);
		window.addEventListener("keyup", this.onKeyUp);
	}

	
	/** Gets called by the engine when running all the sub systems. */
	public override run(): void
	{
		const temp = this.recordFrame;
		this.recordFrame = this.activeFrame;
		this.activeFrame = temp;

		this.keyDownList.forEach(k => this.keyDownFrameMaps[this.recordFrame][k] = false);
		this.keyUpList.forEach(k => this.keyUpFrameMaps[this.recordFrame][k] = false);

		this.keyUpList = [];
		this.keyDownList = [];
	}

	/** Gets called by the engine when terminating all the sub systems. */
	public override async terminate(): Promise<void>
	{
		window.removeEventListener("keydown", this.onKeyDown);
		window.removeEventListener("keyup", this.onKeyUp);
	}

	/** Callback for when a key is pressed. */
	private readonly onKeyDown = (e: KeyboardEvent) =>
	{
		const c = e.code as KeyCode;
		this.keyDownMap[c] = true;
		this.keyDownFrameMaps[this.recordFrame][c] = true;
		this.keyDownList.push(c);
	}

	/** Callback for when a key is released. */
	private readonly onKeyUp = (e: KeyboardEvent) =>
	{
		const c = e.code as KeyCode;
		this.keyDownMap[c] = false;
		this.keyUpFrameMaps[this.recordFrame][c] = true;
		this.keyUpList.push(c);
	}

	/**
	 * @param {KeyCode} key The KeyCode to check.
	 * @returns {boolean} `true` the key is pressed, `false` otherwise.
	 */
	public readonly isKeyDown = (key: KeyCode): boolean =>
	{
		return this.keyDownMap[key];
	}

	/**
	 * @param {KeyCode} key The KeyCode to check.
	 * @returns {boolean} `true` if the key was pressed past frame, `false` otherwise.
	 */
	public readonly getKeyDown = (key: KeyCode): boolean =>
	{
		return this.keyDownFrameMaps[this.activeFrame][key];
	}

	/**
	 * @param {KeyCode} key The KeyCode to check.
	 * @returns {boolean} `true` if the key is released, `false` otherwise.
	 */
	public readonly isKeyUp = (key: KeyCode): boolean =>
	{
		return !this.keyDownMap[key];
	}

	/**
	 * @param {KeyCode} key The KeyCode to check.
	 * @returns {boolean} `true` if the key was released past frame, `false` otherwise.
	 */
	public readonly getKeyUp = (key: KeyCode): boolean =>
	{
		return this.keyUpFrameMaps[this.activeFrame][key];
	}
}