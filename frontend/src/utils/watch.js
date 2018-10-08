export const watch = (idMovie, ids) => {
    let ret = 0
    ids.map(
        id => {
            if(id.idMovie === idMovie){
                ret = 1;
                return ret;
            }
            return ret
        }
    )
    return ret
}