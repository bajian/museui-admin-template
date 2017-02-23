
     /**
     * objArr欲去重对象数组
     * key 去重key
     * @author bajian
     * @param  
     * @return 
     */
export const unique=function(objArr,key){
      var hash={}
      return objArr.reduce(function(item, next) {
        hash[next[key]] ? '' : hash[next[key]] = true && item.push(next);
        return item
      }, [])
    }
