export const enum KeyCode
{
	BACKSPACE = "Backspace",
	TAB = "Tab",
	ENTER = "Enter",
	SHIFT_LEFT = "ShiftLeft",
	SHIFT_RIGHT = "ShiftRight",
	CONTROL_LEFT = "ControlLeft",
	CONTROL_RIGHT = "ControlRight",
	ALT_LEFT = "AltLeft",
	ALT_RIGHT = "AltRight",
	PAUSE = "Pause",
	CAPS_LOCK = "CapsLock",
	ESCAPE = "Escape",
	SPACE = "Space",
	PAGE_UP = "PageUp",
	PAGE_DOWN = "PageDown",
	END = "End",
	HOME = "Home",
	ARROW_LEFT = "ArrowLeft",
	ARROW_UP = "ArrowUp",
	ARROW_RIGHT = "ArrowRight",
	ARROW_DOWN = "ArrowDown",
	PRINT_SCREEN = "PrintScreen",
	INSERT = "Insert",
	DELETE = "Delete",
	ALPHA_0 = "Digit0",
	ALPHA_1 = "Digit1",
	ALPHA_2 = "Digit2",
	ALPHA_3 = "Digit3",
	ALPHA_4 = "Digit4",
	ALPHA_5 = "Digit5",
	ALPHA_6 = "Digit6",
	ALPHA_7 = "Digit7",
	ALPHA_8 = "Digit8",
	ALPHA_9 = "Digit9",
	A = "KeyA",
	B = "KeyB",
	C = "KeyC",
	D = "KeyD",
	E = "KeyE",
	F = "KeyF",
	G = "KeyG",
	H = "KeyH",
	I = "KeyI",
	J = "KeyJ",
	K = "KeyK",
	L = "KeyL",
	M = "KeyM",
	N = "KeyN",
	O = "KeyO",
	P = "KeyP",
	Q = "KeyQ",
	R = "KeyR",
	S = "KeyS",
	T = "KeyT",
	U = "KeyU",
	V = "KeyV",
	W = "KeyW",
	X = "KeyX",
	Y = "KeyY",
	Z = "KeyZ",
	META_LEFT = "MetaLeft",
	META_RIGHT = "MetaRight",
	CONTEXT_MENU = "ContextMenu",
	NUMPAD_0 = "Numpad0",
	NUMPAD_1 = "Numpad1",
	NUMPAD_2 = "Numpad2",
	NUMPAD_3 = "Numpad3",
	NUMPAD_4 = "Numpad4",
	NUMPAD_5 = "Numpad5",
	NUMPAD_6 = "Numpad6",
	NUMPAD_7 = "Numpad7",
	NUMPAD_8 = "Numpad8",
	NUMPAD_9 = "Numpad9",
	NUMPAD_MULTIPLY = "NumpadMultiply",
	NUMPAD_ADD = "NumpadAdd",
	NUMPAD_SUBTRACT = "NumpadSubtract",
	NUMPAD_DECIMAL = "NumpadDecimal",
	NUMPAD_DIVIDE = "NumpadDivide",
	F1 = "F1",
	F2 = "F2",
	F3 = "F3",
	F4 = "F4",
	F5 = "F5",
	F6 = "F6",
	F7 = "F7",
	F8 = "F8",
	F9 = "F9",
	F10 = "F10",
	F11 = "F11",
	F12 = "F12",
	NUM_LOCK = "NumLock",
	SCROLL_LOCK = "ScrollLock",
	SEMICOLON = "Semicolon",
	EQUAL = "Equal",
	COMMA = "Comma",
	MINUS = "Minus",
	PERIOD = "Period",
	SLASH = "Slash",
	BACKQUOTE = "Backquote",
	BRACKET_LEFT = "BracketLeft",
	BACKSLASH = "Backslash",
	BRACKET_RIGHT = "BracketRight",
	QUOTE = "Quote",
}

export const createKeyCodeMap = <T>(initValue: T): { [key in KeyCode]: T } => ({
	Backspace: initValue,
	Tab: initValue,
	Enter: initValue,
	ShiftLeft: initValue,
	ShiftRight: initValue,
	ControlLeft: initValue,
	ControlRight: initValue,
	AltLeft: initValue,
	AltRight: initValue,
	Pause: initValue,
	CapsLock: initValue,
	Escape: initValue,
	Space: initValue,
	PageUp: initValue,
	PageDown: initValue,
	End: initValue,
	Home: initValue,
	ArrowLeft: initValue,
	ArrowUp: initValue,
	ArrowRight: initValue,
	ArrowDown: initValue,
	PrintScreen: initValue,
	Insert: initValue,
	Delete: initValue,
	Digit0: initValue,
	Digit1: initValue,
	Digit2: initValue,
	Digit3: initValue,
	Digit4: initValue,
	Digit5: initValue,
	Digit6: initValue,
	Digit7: initValue,
	Digit8: initValue,
	Digit9: initValue,
	KeyA: initValue,
	KeyB: initValue,
	KeyC: initValue,
	KeyD: initValue,
	KeyE: initValue,
	KeyF: initValue,
	KeyG: initValue,
	KeyH: initValue,
	KeyI: initValue,
	KeyJ: initValue,
	KeyK: initValue,
	KeyL: initValue,
	KeyM: initValue,
	KeyN: initValue,
	KeyO: initValue,
	KeyP: initValue,
	KeyQ: initValue,
	KeyR: initValue,
	KeyS: initValue,
	KeyT: initValue,
	KeyU: initValue,
	KeyV: initValue,
	KeyW: initValue,
	KeyX: initValue,
	KeyY: initValue,
	KeyZ: initValue,
	MetaLeft: initValue,
	MetaRight: initValue,
	ContextMenu: initValue,
	Numpad0: initValue,
	Numpad1: initValue,
	Numpad2: initValue,
	Numpad3: initValue,
	Numpad4: initValue,
	Numpad5: initValue,
	Numpad6: initValue,
	Numpad7: initValue,
	Numpad8: initValue,
	Numpad9: initValue,
	NumpadMultiply: initValue,
	NumpadAdd: initValue,
	NumpadSubtract: initValue,
	NumpadDecimal: initValue,
	NumpadDivide: initValue,
	F1: initValue,
	F2: initValue,
	F3: initValue,
	F4: initValue,
	F5: initValue,
	F6: initValue,
	F7: initValue,
	F8: initValue,
	F9: initValue,
	F10: initValue,
	F11: initValue,
	F12: initValue,
	NumLock: initValue,
	ScrollLock: initValue,
	Semicolon: initValue,
	Equal: initValue,
	Comma: initValue,
	Minus: initValue,
	Period: initValue,
	Slash: initValue,
	Backquote: initValue,
	BracketLeft: initValue,
	Backslash: initValue,
	BracketRight: initValue,
	Quote: initValue,
});