import { aiApi } from "../api";
import { isInputFocused, userInput } from "./stores";

export const handleInput = async (event: Event) => {
	const inputEvent = event as InputEvent & { target: HTMLInputElement };
	const userInput = inputEvent.target.value;
	if (userInput.length > 0) {
		const apiSearch = await aiApi.search(userInput);
		return { userInput, searchResult: apiSearch.message };
	} else {
		return { userInput, searchResult: [] };
	}
};

export const onInput = () => {
	isInputFocused.update(() => true);
	let input = "";
	userInput.subscribe(value => (input = value));
	return input;
};

export const offInput = (inputValue: string) => {
	userInput.update(() => inputValue);
	isInputFocused.update(() => false);
	return "";
};
