export declare function del<T>(arr: T[], elem: T): boolean;
export declare function computeIfAbsent<K, V>(map: Map<K, V>, key: K, missingValComputer: (k: K) => V): V;
export declare function pop<K, V>(map: Map<K, V>): V | null;
export declare function getSetting<T>(key: string, defaultVal: T, converter: (val: string) => T): T;
