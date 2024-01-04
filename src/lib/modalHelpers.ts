import { aiApi } from "../api";
import {
	emailErr,
	isActiveOrderCall,
	isActiveOrderQuestion,
	isActiveOrderRim,
	phoneErr,
	questionErr,
	showTHXField,
} from "./stores";

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const clickOutsidePhCall = () => {
	isActiveOrderCall.update(el => !el);
	phoneErr.set(false);
};

export const clickOutsideOrderRim = () => {
	isActiveOrderRim.update(el => false);
	showTHXField.set(false);
	phoneErr.set(false);
	emailErr.set(false);
};

export const clickOutsideQuestion = () => {
	isActiveOrderQuestion.update(el => !el);
	questionErr.set(false);
	phoneErr.set(false);
	emailErr.set(false);
};

export const sendQuestToApi = async (question: string, phone: string, email: string) => {
	let requestData: {
		question: string;
		phone: string;
		email?: string;
	};

	if (email.length > 0) {
		requestData = { question, phone, email };
	} else {
		requestData = { question, phone };
	}
	await aiApi.sendOrderQuest(requestData);
	return;
};
