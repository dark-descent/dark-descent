import { Engine } from "./Engine";

class Vector2
{
    components: any;
    static add: any;
    static subtract: any;
    public argument: number;

    
    // constructor for components and arguments 
    constructor(components: any,  argument:number   )
    {
        this.components = components
        this.argument = argument
    }

}

const direction2d = new Vector2(10,20);
const direction3d = new Vector2(20,49);

