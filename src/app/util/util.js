export const findMatchingProps=(object,prop,matchingProps)=>{

    for (var property in object) {
        if (object.hasOwnProperty(property)) {
            if(isNaN(property) && property.indexOf(prop)!==-1){
                matchingProps.push({key:property,value:object[property]});
            }
            if(typeof object[property] == "object"){
                findMatchingProps(object[property],prop,matchingProps)
            }
        }
    }
}