class StorageHandler {

	/** @param {string} name */
	store(value, name) {
		try {
			localStorage.setItem(name, JSON.stringify(value))
		} catch (e) {
			console.warn("Unable to store value to localstorage")
		}
	}

	/** @param {string} name */
	get(name) {
		try {
			return JSON.parse(localStorage.getItem(name))
		} catch (e) {
			console.warn("Unable to load value from localstorage")
			return null
		}
	}

}