import { Engine } from "./Engine";

class Vector2
{
    public x : number;
    public y : number;
    public argument: number;
    static add: any;
    static subtract: any;


    
    // constructor for components and arguments 
    constructor( argument:number, x:number, y:number )
    {
        this.x = x
        this.y = y
        this.argument = argument
    }

}

const direction2d = new Vector2(10,20);
const direction3d = new Vector2(20,49);





