
export const HelperBinaryTree = {
    /**
     * recursion search id in object tree
     * @param {String} element
     * @param {String} treeId
     * @return {Object}
     */
    search(element, treeId = null){
        if(element.id == treeId){
            return element;
        } else if (element.children != null){
            let result = null;
            for(let i=0; result == null && i < element.children.length; i++){
                result = this.search(element.children[i], treeId);
            }
            return result;
        }
        return null;
    },
}