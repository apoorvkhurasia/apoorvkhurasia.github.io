export function del(arr, elem) {
    const index = arr.indexOf(elem);
    if (index >= 0) {
        arr.splice(index, 1);
        return true;
    }
    return false;
}
export function computeIfAbsent(map, key, missingValComputer) {
    let val = map.get(key);
    if (!val) {
        val = missingValComputer(key);
    }
    map.set(key, val);
    return val;
}
export function pop(map) {
    if (map.size > 0) {
        const [key, val] = map.entries().next().value;
        map.delete(key);
        return val;
    }
    return null;
}
//# sourceMappingURL=utils.js.map