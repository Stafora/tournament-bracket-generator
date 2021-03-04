
export const ObjectHelper = {
    issetInObject(obj, props) {
        var props = props.split('.');
        var self = obj; /* note that self is usually the window object */

        for (var ii = 0; ii < props.length; ++ii)
        {
            var prop = props[ii];
            var hasMoreComing = ii < props.length - 1 ? true : false;

            if (self[prop] !== null && typeof self[prop] === 'object' && hasMoreComing)
            {
                self = self[prop];
                continue;   // Move up one level.
            }
            else if (hasMoreComing)
                return false;    // ..because user queries a subproperty of a value type

            return self.hasOwnProperty(prop);
        }
    },
}