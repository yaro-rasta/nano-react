/**
 * Convert data to JSON.
 * @param {Object|Array} data - The data to be converted to JSON.
 * @returns {string} The JSON representation of the data.
 */
export const toJSON = (data) => {
	if (Array.isArray(data)) {
		return JSON.stringify(data.map(item => {
			if ('function' === typeof item?.toObject) return item.toObject();
			if ('function' === typeof item?.toJSON) return item.toJSON();
			return item;
		}));
	}
	if ('function' === typeof data?.toObject) {
		return JSON.stringify(data.toObject());
	}
	if ('function' === typeof data?.toJSON) {
		return data.toJSON();
	}
	return JSON.stringify(data);
};

/**
 * Convert JSON data to an object or array.
 * @param {string} data - The JSON data as a string.
 * @param {Function|undefined} fn - A class with static transformation methods.
 * @returns {Object|Array|false} The parsed and transformed object or array.
 */
export const fromJSON = (data, fn) => {
	try {
		const parsedData = JSON.parse(data);

		if (Array.isArray(parsedData) && 'function' === typeof fn?.from) {
			return parsedData.map(item => fn.from(item));
		}
		if (Array.isArray(parsedData) && 'function' === typeof fn?.fromJSON) {
			return parsedData.map(item => fn.fromJSON(JSON.stringify(item)));
		}
		if ('function' === typeof fn?.from) {
			return fn.from(parsedData);
		}
		if ('function' === typeof fn?.fromJSON) {
			return fn.fromJSON(data);
		}
		if ('function' === typeof fn) {
			return fn(parsedData);
		}
		return parsedData;
	} catch (err) {
		console.error(`Cannot parse JSON data`, data);
		console.debug(err.stack);
	}
	return false;
};
