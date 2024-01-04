<script lang="ts">
	import logoIcon from "../lib/icons/logo.webp";
	import ContactModal from "../components/modals/modalContacts.svelte";
	import { isContactActive } from "$lib/stores";

	export let ifMain: boolean;
</script>

<ContactModal />
<header class={ifMain ? "headerBar nonColored" : "headerBar colored"}>
	<div class="headerContent">
		<div>
			<a href="/">
				<div class="pageLogo">
					<img
						class="logoIcon"
						src={logoIcon}
						alt="Ukrdisk"
					/>
					<p class={`logoTitle ${ifMain ? "main" : "notMain"}`}>Ukrdisk</p>
				</div>
			</a>
		</div>
		<div>
			<button
				aria-label="Контакты-button"
				aria-labelledby="Контакты"
				class="contactBtn"
				on:click={() => {
					isContactActive.update(el => !el);
				}}>Контакты</button
			>
		</div>
	</div>
</header>

<style>
	.contactBtn:hover {
		text-decoration: underline;
	}

	.contactBtn {
		cursor: pointer;
		padding: 16px 2px 16px 0px;
		height: 48px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		text-align: center;
		text-decoration: none;
		font-family: inherit;
		font-size: 16px;
		font-weight: 500;
		letter-spacing: 0.6px;
		color: white;
		background: transparent;
		border: none;
	}
	.colored {
		height: 48px;
		background-color: #517399;
		box-shadow:
			#0000004d 0px 1px 6px,
			#0000004d 0px 1px 4px;
	}
	.nonColored {
		letter-spacing: 0.9px;
		padding-top: 8px;
		height: 32px;
		background-color: transparent;
	}
	.headerBar {
		position: relative;
		top: 0px;
		width: 100%;
		display: flex;
		flex-direction: column-reverse;
		justify-content: space-between;
		align-items: center;
		z-index: 5;
	}
	a {
		text-decoration: none;
	}
	.pageLogo {
		margin: 0;
		padding: 2px;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		color: #fff;
	}
	.notMain {
		margin: 0px 0px 0px 16px;
	}
	.main {
		margin: -4px 0px 0px 16px;
	}
	.logoTitle {
		font-family: "Rubik", Helvetica, Arial, sans-serif;
		font-size: 24px;
		font-weight: 400;
		line-height: 48px;
		color: #fff;
		white-space: nowrap;
	}
	.logoIcon {
		height: 32px;
		width: 36px;
	}
	.headerContent {
		box-sizing: border-box;
		height: inherit;
		margin: 0px auto;
		width: calc(100% - 10px);
		max-width: 1024px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		background-color: transparent;
	}
	@media (min-width: 300px) and (max-width: 499px) {
		.headerContent {
			width: calc(100% - 16px);
		}
		.colored {
			position: fixed;
		}
	}
	@media (min-width: 500px) and (max-width: 1023px) {
		.headerContent {
			width: calc(100% - 22px);
		}
	}
	@media (min-width: 1024px) {
		.headerContent {
			padding: 0px 14px;
		}
	}
</style>
