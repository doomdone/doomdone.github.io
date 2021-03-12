export const minSize = 10;
export const defaultSpeed = 100;

export function speed(x,y) {
    this.x = x;
    this.y = y;
    // this.reverse = false;
}


export function width(size) {
    return 2 * minSize**2/size;
}

export function getDefault() {
    console.log("set default params for hail");
    this.x = 5000;
    this.y = 5000;
    this.size = 30;
    this.color = "#00FF40";
    this.speed = defaultSpeed;
}