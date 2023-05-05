module.exports = {
    getParentFilePath: function () {
        try {
            const stack = new Error().stack.split('\n');

            /**
             * We are picking 3rd index of stack trace.
             * Error -> getParentFilePath() -> index.js -> parent module calling index.js
             * [0] -> [1] -> [2] -> [3]
             * Ref: https://stackoverflow.com/a/63039252
             */
            return stack[3].slice(
                stack[3].lastIndexOf('(')+1,
                stack[3].lastIndexOf('.js')+3
            )
        } catch (err) {
            return '';
        }
    }
}
