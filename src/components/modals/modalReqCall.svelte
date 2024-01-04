<script lang="ts">
	import { tick } from "svelte";
	import { aiApi } from "../../api";
	import { isActiveOrderCall, phoneErr } from "$lib/stores";
	import { clickOutsidePhCall } from "$lib/modalHelpers";

	let phoneNumber = "";

	export const phoneCall = async () => {
		if (phoneNumber.replaceAll(" ", "").length < 9) {
			phoneErr.set(true);
		} else {
			await aiApi.sendOrderPhCall({ phone: phoneNumber });
			clickOutsidePhCall();
		}
	};

	$: {
		if (typeof document !== "undefined") {
			tick().then(() => {
				document.body.style.overflow = $isActiveOrderCall ? "hidden" : "auto";
			});
		}
		if (phoneNumber.replaceAll(" ", "").length >= 9) {
			phoneErr.set(false);
		}
	}
</script>

{#if $isActiveOrderCall}
	<!-- svelte-ignore a11y-click-events-have-key-events --><!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="overlay"
		on:click={clickOutsidePhCall}
	/>
	<div class="modal">
		<div class="modalCard">
			<div class="modalHeader">
				<p class="headerTitle">Обратный звонок</p>
			</div>
			<div class="content">
				<input
					placeholder="Ваш номер телефона"
					required={true}
					maxlength="20"
					class={`inputField ${$phoneErr ? "error" : "normal"}`}
					type="tel"
					bind:value={phoneNumber}
					name="tel"
				/>
				<p class={$phoneErr ? "errorMessage phMessage" : "hideErrMessage"}>Пожалуйста, введите номер формата 098 222 65 21</p>
				<button
					aria-label="submit-button"
					aria-labelledby="submit"
					class="orderBtn"
					on:click={phoneCall}>Заказать звонок</button
				>
			</div>
		</div>
	</div>
{/if}

<style>
	.phMessage {
		bottom: 58px;
	}
	.hideErrMessage {
		display: none;
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
		padding: 8px 14px;
		width: 90%;
		font-family: inherit;
		font-weight: 400;
		font-size: 14px;
		text-align: left;
		color: #909090;
		border-radius: 4px;
		background-color: #fff;
	}
	.headerTitle {
		margin: 0px 12px;
		text-align: center;
	}
	.orderBtn:hover {
		opacity: 1;
	}
	.orderBtn {
		align-self: flex-end;
		cursor: pointer;
		margin-top: 16px;
		width: 50%;
		height: 32px;
		font-family: inherit;
		font-size: 14px;
		letter-spacing: 0.5px;
		font-weight: 500;
		opacity: 0.9;
		border: none;
		border-radius: 4px;
		color: #fff;
		background-color: #507298;
	}
	.content {
		position: relative;
		align-items: center;
		padding: 24px;
		flex-direction: column;
		display: flex;
		width: 316px;
		border-bottom-left-radius: 4px;
		border-bottom-right-radius: 4px;
		background-color: #eceff1;
		box-shadow:
			#00000040 0px 14px 45px,
			#00000038 0px 10px 18px;
	}
	.modalHeader {
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
		z-index: 2;
	}
	.modalCard {
		width: 364px;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 4px;
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
</style>
