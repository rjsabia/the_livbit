export const SIGNED_IN = 'SIGNED_IN';

export function logUser(email) {
	const action = {
		type: SIGNED_IN,
		email
	}
	return action;
}