function validateName(name) {
	if (!name) return false;
	const pattern = /^[a-z ,.'-]+$/i;
	return pattern.test(name);
}

function validateEmail(email) {
	if (!email) return false;
	const pattern =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return pattern.test(email);
}

function validatePhoneNumber(phoneNumber) {
	if (!phoneNumber) return false;
	const pattern = /^(0)(5|6|7)[0-9]{8}$/;
	return pattern.test(phoneNumber);
}

export { validateName, validateEmail, validatePhoneNumber };
