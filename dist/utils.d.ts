export declare type Path = string | (string | number)[];
export declare function isPlainObject(obj: object): boolean;
export declare function omit(src: any, key: string | number): any;
export declare function rec(src: any, path: Path, value: any, idx: number): any;
export declare function parsePath(path: Path): (string | number)[];
export declare function existy(v: any): boolean;
