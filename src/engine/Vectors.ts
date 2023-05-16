import { Engine } from "./Engine";

class Vector2
{
    public x : number;
    public y : number;


    // let distance = Vector2.distance(a,b);

     
    // constructor for components and arguments 
    constructor(  x:number, y:number )
    {
        this.x = x
        this.y = y     
    }

    // add operator (+)
    public static add (a: Vector2, b: Vector2): Vector2{
        
        return new Vector2( a.x + b.x, a.y + b.y); 
    }

    // substraction operator(-)
    public static subtract (a:Vector2, b:Vector2): Vector2{
        return new Vector2( a.x, -a.y -b.y); 
    }
    
    // multiply operator(*)
    public static multiply (a:Vector2, b:Vector2): Vector2{
        return new Vector2(a.x * a.x, a.y * b.y); 
    }
    // division operator(/)
    public static divide (a:Vector2, b:Vector2): Vector2{
        return new Vector2(a.x/ a.x, a.y /b.y); 
    }
}
const a = new Vector2(10,20);
const b = new Vector2(10,20);







