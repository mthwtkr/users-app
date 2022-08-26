const createUserCard = user => {
	const parser = new DOMParser()

	const userCard = `<dl id="user-${user.id}" class="users"><p>ID: <span>${user.id}</span></p><p>Name: <span>${user.name}</span></p><p>Email: <span>${user.email}</span></p></dl>`

	const doc = parser.parseFromString(userCard, 'text/html')

	return doc.body.firstChild
}

// Handle Create User Form
const userCreateSubmit = async e => {
	// Prevent default form behavior of redirecting
	e.preventDefault();

	// Fetch the input data from the submitted form
	const data = new FormData(e.target)

	// Send user data to backend
	await fetch('http://localhost:5000/users', {
		body: JSON.stringify(Object.fromEntries(data)),
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST'
	})
		.then(response => response.json())
		.then(data => {
			const usersDiv = document.getElementById('users')

			const userCard = createUserCard(data)

			usersDiv.append(userCard)

			e.target.reset()
		})
		.catch(error => console.log(error))
}


// Handle Enter || Escape key to edit input
const handleInputKeyEvent = e => {
	if (e.key === 'Enter' || e.key === 'Escape') {
		editInput(e)
	}
}

// Convert clicked field into text box
// Attach event listeners to new HTML elements
const editField = async ({ target, target: { dataset }}) => {
	const key = Object.keys(dataset)[0]

	const inputElement = `<input data-id="${dataset['id']}"  class="edit-input" onfocus="this.select()" type="text" name="${key}" value="${dataset[key]}"/>`

	target.innerHTML = inputElement

	// Auto focus the editting input
	target.childNodes[0].focus()

	// Attach event listeners to new HTML input element
	target.childNodes[0].addEventListener('keydown', e => handleInputKeyEvent(e))
}

// Update the existing HTML element with the new values
const updateInput = async (target, key, value) => {
	// Update data-{key} value
	target.parentNode.dataset[key] = value

	// Update html text to new value
	target.parentNode.innerHTML = value
}

// Save changes applied to the field
const editInput = async ({ target }) => {
	const key = target.name

	// Fetch parent value incase user
	// tries to enter an invalid value
	const parentValue = target.parentNode.dataset[key]

	// If no change made then apply previous value
	// Otherwise make changes to field values
	const validValue = target.value !== undefined && target.value !== ''

	// element has a valid value then use it
	// otherwise default to the previous value from parent
	const newValue = validValue ? target.value : parentValue

	const userId = target.dataset['id']

	await fetch(`http://localhost:5000/users/${userId}`, {
		body: JSON.stringify(
			{ [key]: newValue }
		),
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'PUT'
	})
		.then(response => response.json())
		.then(data => updateInput(target, key, newValue))
		.catch(error => console.log(error))
}

// Handle Delete User Form
const userDeleteSubmit = async (e, userId) => {
	await fetch(`http://localhost:5000/users/${userId}`, {
		method: 'DELETE'
	})
		.then(response => response.json())
		.then(data => {
			document.getElementById(`user-${userId}`).remove()
		})
		.catch(error => console.log(error))
}

// Main Immediate Function
(() => {
	const editableFields = document.querySelectorAll('.edit-field')

	editableFields.forEach(field => {
		field.addEventListener('click', e => editField(e))
	})
})()