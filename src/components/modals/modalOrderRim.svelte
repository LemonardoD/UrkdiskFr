<script lang="ts">
	import { tick } from "svelte";
	import logoIcon from "../../lib/icons/logo.webp";
	import type { OneRimInfo, RimConfig } from "../../lib/types";
	import { emailRegex } from "$lib";
	import { aiApi } from "../../api";

	export let showOrderField: boolean;
	export let rimInfo: OneRimInfo;
	export let rimConfig: RimConfig;
	export let rimlink: string;

	let name = "";
	let phoneNumber = "";
	let email = "";

	let showTHXField = false;
	let showPhoneError = false;
	let emailError = false;

	const clickOutside = () => {
		showTHXField = false;
		showOrderField = false;
		phoneNumber = "";
		name = "";
		email = "";
		showPhoneError = false;
		emailError = false;
	};

	const orderRim = async () => {
		if (!emailRegex.test(email)) {
			emailError = true;
		} else if (phoneNumber.replaceAll(" ", "").length < 9) {
			showPhoneError = true;
		} else {
			await aiApi.sendOrderToApi({
				name,
				phone: phoneNumber,
				email,
				orderConfig: { ...rimConfig, link: rimlink, rimId: rimInfo.rimId },
			});
			showOrderField = false;
			showTHXField = true;
			emailError = false;
			showPhoneError = false;
			phoneNumber = "";
			email = "";
			name = "";
		}
	};

	$: {
		if (typeof document !== "undefined") {
			tick().then(() => {
				document.body.style.overflow = showOrderField ? "hidden" : "auto";
			});
		}
		if (phoneNumber.replaceAll(" ", "").length <= 9) {
			showPhoneError = false;
		}
		if (emailRegex.test(email)) {
			emailError = false;
		}
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events --><!-- svelte-ignore a11y-no-static-element-interactions -->
{#if showOrderField}
	<div
		class="overlay"
		on:click={clickOutside}
	/>
	<div class="modal">
		<div class="modalCard">
			<div class="modalHeader">
				<div class="blockNaming">
					<img
						class="rimImg"
						src={rimInfo.images[0]}
						alt="rim"
					/>
					<div class="naming">
						<p class="rimNaming">{rimInfo.name}</p>
						<p class="rimNaming">{rimInfo.brand}</p>
					</div>
					<div class="rimPrice">
						<p class="rimCount price">{`${rimConfig.price} грн.`}</p>
						<p class="rimCount quant">4 шт.</p>
					</div>
				</div>
				<div class="total">
					<div class="line" />
					<div class="rimPrice">
						<p
							class="rimCount price"
							style="font-weight: 700;"
						>
							{`${rimConfig.price * 4} грн.`}
						</p>
						<p class="rimCount quant">Всего</p>
					</div>
				</div>
			</div>
			<div class="content">
				<input
					placeholder="Ваше имя"
					class="inputField normal"
					bind:value={name}
					name="name"
				/>
				<input
					placeholder="Ваш телефон(прим: 098 222 65 21)"
					required={true}
					maxlength="30"
					class={`inputField ${showPhoneError ? "error" : "normal"}`}
					type="tel"
					bind:value={phoneNumber}
					name="tel"
				/>
				<p class={showPhoneError ? "errorMessage phMessage" : "hideErrMessage"}>
					Пожалуйста, введите номер формата 098 222 65 21
				</p>
				<input
					placeholder="Ваш email"
					maxlength="90"
					required={true}
					class={`inputField ${emailError ? "error" : "normal"}`}
					type="email"
					bind:value={email}
					name="email"
				/>
				<p class={emailError ? "errorMessage emailMessage" : "hideErrMessage"}>Пожалуйста, введите верний формат почты</p>
				<button
					aria-label="submit-button"
					aria-labelledby="submit"
					class="orderBtn"
					on:click={orderRim}>Оформить заказ</button
				>
			</div>
		</div>
	</div>
	<button
		class="cancelBth"
		on:click={clickOutside}>Отменить</button
	>
{/if}

{#if showTHXField}
	<!-- svelte-ignore a11y-click-events-have-key-events --><!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="overlay"
		on:click={clickOutside}
	/>
	<div class="modalTXH">
		<div class="modalCardTHX">
			<div class="modalHeaderTXH">
				<img
					class="logo"
					src={logoIcon}
					alt="Ukrdisk"
				/>
				<p class="headerTitle">Ukrdisk</p>
			</div>
			<div class="contentTXH">
				<p class="title">Спасибо за заказ!</p>
				<p class="thxText">Мы свяжемся с вами в ближайшее время для уточнения деталей.</p>
				<p class="titleSecondary">Контактные данные</p>
				<div>
					<p class="contact">
						<a href="mailto:blokhvova@gmail.com">blokhvova@gmail.com</a>
					</p>
					<p class="contact">
						<a href="tel:+380503403726">(050) 340-37-26</a>
					</p>
				</div>
				<p class="titleSecondary">Детали заказа</p>
				<div class="detailsTHX">
					<div class="thxLine" />
					<div class="blockNaming">
						<img
							class="rimImg"
							src={rimInfo.images[0]}
							alt="rim"
						/>
						<div class="naming">
							<p class="rimNaming">{rimInfo.brand}</p>
							<p class="rimNaming">{rimInfo.name}</p>
						</div>
						<div class="rimPriceTHX">
							<p class="rimCount price">{`${rimConfig.price} грн.`}</p>
							<p class="rimCount quant">4 шт.</p>
						</div>
					</div>
					<div class="thxLine" />
				</div>
				<div class="totalTHX">
					<p class="thxPrice">Сумма</p>
					<p class="thxPrice">{`${rimConfig.price * 4} грн.`}</p>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.s {
		display: flex;
	}
	.rimPriceTHX {
		margin-left: 350px;
		display: flex;
		flex-direction: column;
	}
	.detailsTHX {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		height: 80px;
	}
	.thxLine {
		width: 590px;
		border-bottom: solid 1px #c4c8cc;
	}
	.thxPrice {
		margin: 0;
		font-family: inherit;
		font-size: 18px;
		font-weight: 500;
		letter-spacing: 0.64px;
		color: #7a8999;
	}
	.contact {
		margin: 4px 0px 4px 0px;
	}
	.totalTHX {
		margin: 24px 0px 0px 0px;
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;
	}
	p {
		margin: 0;
	}
	p a:hover {
		text-decoration: underline;
	}
	p a {
		text-decoration: none;
		font-family: inherit;
		font-size: 14px;
		letter-spacing: 0.5px;
		color: #7a8999;
		margin: 0px;
	}
	.titleSecondary {
		margin: 24px 0px 4px 0px;
		font-family: inherit;
		font-size: 18px;
		font-weight: 500;
		letter-spacing: 0.64px;
		color: #7a8999;
	}
	.thxText {
		width: 70%;
		margin: 5px 0px 6px 0px;
		font-family: inherit;
		font-size: 18px;
		font-weight: 500;
		letter-spacing: 0.64px;
		color: #a4afba;
	}
	.title {
		margin: 0;
		font-family: inherit;
		font-size: 24px;
		font-weight: 500;
		letter-spacing: 0.86px;
		color: #7a8999;
	}
	.logo {
		margin-left: 20px;
		height: 32px;
		width: 36px;
	}
	.headerTitle {
		width: 94px;
		font-family: "Rubik", sans-serif;
		font-size: 24px;
		font-weight: 500;
		letter-spacing: 0.86px;
		color: #fff;
		margin: 0px 12px;
		text-align: center;
	}
	.contentTXH {
		position: relative;
		align-items: flex-start;
		padding: 24px;
		flex-direction: column;
		display: flex;
		width: 592px;
		border-bottom-left-radius: 2px;
		border-bottom-right-radius: 2px;
		background-color: #fff;
	}
	.modalHeaderTXH {
		display: flex;
		align-items: center;
		color: #fff;
		font-family: inherit;
		font-size: 16px;
		text-align: center;
		width: 100%;
		margin: 0;
		height: 40px;
		border-top-right-radius: 4px;
		border-top-left-radius: 4px;
		background-color: #507299;
	}
	.modalTXH {
		position: fixed;
		opacity: 0.7;
		top: 45%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 1000;
		transition: all 0.3s ease;
		animation: floatIn 0.3s ease-in-out 0s forwards;
	}
	.cancelBth {
		z-index: 100;
		left: 48.2%;
		top: 68%;
		position: fixed;
		cursor: pointer;
		font-family: inherit;
		font-size: 16px;
		letter-spacing: 0.5px;
		font-weight: 500;
		padding: 0;
		margin: 0;
		opacity: 0.7;
		border: none;
		color: #fff;
		background-color: transparent;
		transition: all 0.3s ease;
		animation: floatInButton 0.3s ease-in-out 0s forwards;
	}
	.rimPrice {
		margin-left: 55px;
		display: flex;
		flex-direction: column;
	}
	.total {
		display: flex;
		flex-direction: column;
	}
	.line {
		width: 300px;
		border-bottom: solid 1px #c4c8cc;
	}
	.blockNaming {
		display: flex;
	}
	.naming {
		display: flex;
		flex-direction: column;
	}
	.price {
		margin: 4px 0px;
		font-size: 14px;
		letter-spacing: 0.5px;
		color: #7a8999;
	}
	.quant {
		margin: 0px;
		font-size: 12px;
		letter-spacing: 0.43px;
		color: #a4afba;
	}
	.rimCount {
		font-family: inherit;
		text-align: right;
	}
	.rimImg {
		object-fit: contain;
		width: 48px;
		height: 48px;
	}
	.rimNaming {
		margin: 0px 32px 4px 8px;
		font-family: inherit;
		font-size: 14px;
		letter-spacing: 0.5px;
		color: #7a8999;
	}
	.hideErrMessage {
		display: none;
	}
	.emailMessage {
		bottom: 84px;
	}
	.phMessage {
		bottom: 136px;
	}
	.errorMessage {
		position: absolute;
		margin: 0;
		font-family: inherit;
		font-size: 10.5px;
		color: red;
	}
	.normal {
		border: solid 1px #ccc;
	}
	.error {
		border: 1px solid red;
	}
	.inputField.error:focus {
		background-color: #eceff1;
		border: 1px solid red;
		outline: none;
	}
	.inputField:focus {
		background-color: #eceff1;
		border: 1px solid #c4c8cc;
		outline: none;
	}

	.inputField {
		margin: 0px 0px 12px;
		padding: 10.5px 14px;
		width: 280px;
		font-family: inherit;
		font-weight: 400;
		font-size: 14px;
		text-align: left;
		color: #909090;
		border-radius: 2px;
		background-color: #fff;
	}

	.orderBtn:hover {
		opacity: 1;
	}
	.orderBtn {
		margin-top: 20px;
		width: 310px;
		cursor: pointer;
		height: 40px;
		font-family: inherit;
		font-size: 16px;
		letter-spacing: 0.5px;
		font-weight: 500;
		opacity: 0.9;
		border: none;
		border-radius: 2px;
		color: #fff;
		background-color: #507298;
	}
	.content {
		position: relative;
		align-items: center;
		padding: 24px;
		flex-direction: column;
		display: flex;
		width: 302px;
		border-bottom-left-radius: 2px;
		border-bottom-right-radius: 2px;
		background-color: #eceff1;
	}
	.modalHeader {
		flex-direction: column;
		display: flex;
		justify-content: space-between;
		width: 302px;
		height: 124px;
		margin: 0px;
		padding: 24px 24px 6px 24px;
		border-top-left-radius: 2px;
		border-top-right-radius: 2px;
		background-color: #eceff1;
		border-bottom: solid 1px #c4c8cc;
	}
	.modalCard {
		width: 350px;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 2px;
	}
	.overlay {
		z-index: 10;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: #00000080;
	}

	.modal {
		position: fixed;
		opacity: 0.7;
		top: 45%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 1000;
		transition: all 0.3s ease;
		animation: floatIn 0.3s ease-in-out 0s forwards;
	}
	@keyframes floatIn {
		to {
			opacity: 1;
			top: 50%;
		}
	}
	@keyframes floatInButton {
		to {
			opacity: 1;
			top: 74%;
		}
	}
	@media (min-width: 1250px) and (max-width: 1350px) {
		.cancelBth {
			left: 47.5%;
		}
	}

	@media (min-width: 1111px) and (max-width: 1249px) {
		.cancelBth {
			left: 47%;
		}
	}

	@media (min-width: 810px) and (max-width: 1110px) {
		.cancelBth {
			left: 46%;
		}
	}

	@media (min-width: 670px) and (max-width: 809px) {
		.cancelBth {
			left: 44%;
		}
	}
	@media (min-width: 450px) and (max-width: 669px) {
		.cancelBth {
			left: 43%;
		}
	}
	@media (min-width: 350px) and (max-width: 449px) {
		.cancelBth {
			left: 42%;
		}
	}
	@media (min-width: 350px) and (max-width: 809px) {
		@keyframes floatInButton {
			to {
				opacity: 1;
				top: 77%;
			}
		}
		.contentTXH {
			width: 307px;
		}
		.thxLine {
			width: 305px;
		}
		.rimPriceTHX {
			margin-left: 65px;
		}
	}
</style>
