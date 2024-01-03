<script>
	import ReqCall from "../../../components/modals/modalReqCall.svelte";
	import AskQuestion from "../../../components/modals/modalAskQuestion.svelte";
	import { clickHandle } from "$lib";

	let showAskQuest = false;
	let showReqCall = false;
</script>

<AskQuestion bind:showAskQuest />
<ReqCall bind:showReqCall />

<div class="content">
	<p class="titleText">О нас</p>
	<p class="text">
		Наша компания основана 24 февраля 2004 года в г. Днепр.<br />
		Мы занимаемся поставкой и продажами легкосплавных колесных дисков и комплектующим к ним.<br />
		За время работы мы стали эксклюзивным представителем компаний
		<a href="/rims/Kosei?selectedDiameters=all">Kosei aluminium (Япония)</a>,
		<a href="/rims/MKW?selectedDiameters=all">MKW (Mi-tech)</a>,
		<a href="/rims/Marcello?selectedDiameters=all">Marcello wheels</a>, Zent и
		<a href="/rims/InziAone?selectedDiameters=all">Inzi Aone (Корея)</a>
		в Украине.<br />
		Наш ассортимент - легкосплавные, литые диски высокого качества, сертифицированные ISO, TUV, SAE, JWL и VIA.<br />
		У нас на сайте вы можете легко подбрать диски на свое авто прямо <a href="/">здесь</a>.
	</p>

	<p class="titleText">Как с нами связаться?</p>
	<p class="text">
		Закажите обратный звонок
		<button
			on:click={() => {
				showReqCall = clickHandle(showReqCall);
			}}>здесь</button
		><br />
		Напишите нам прямо
		<button
			on:click={() => {
				showAskQuest = clickHandle(showAskQuest);
			}}>на сайте</button
		><br />
		Свяжитесь с нами напрямую:<br />
		+38 (050) 340 37 26<br />
		blokhvova@gmail.com<br />
	</p>
	<p class="titleText">Где мы находимся?</p>
	<p class="text">Днепр, Запорожское Шоссе 26</p>
	<!-- svelte-ignore a11y-missing-attribute -->
	<div class="map">
		<iframe
			src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d286.0194968181417!2d35.022059715701204!3d48.41905745516649!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDjCsDI1JzA4LjciTiAzNcKwMDEnMjAuMCJF!5e0!3m2!1sru!2sua!4v1689573442366!5m2!1sru!2sua"
			width="100%"
			height="100%"
			referrerpolicy="no-referrer-when-downgrade"
			style="border: none;"
		>
		</iframe>
	</div>
</div>

<style>
	button {
		background-color: transparent;
		border: none;
	}
	p a:hover,
	p button:hover {
		cursor: pointer;
	}
	a,
	button {
		text-decoration: underline;
		margin: 0px;
		padding: 1px 0px;
		font-size: 15px;
		letter-spacing: 0.5px;
		font-family: inherit;
		color: #425f80;
	}
	.map {
		margin-top: 8px;
		width: 100%;
		height: 400px;
		background-color: rgb(240, 241, 241);
	}
	.text {
		margin: 0px;
		padding: 1px 0px;
		font-size: 15px;
		letter-spacing: 0.5px;
		font-family: inherit;
		color: #000000de;
	}
	.titleText {
		margin: 16px 0px;
		width: 100%;
		font-family: inherit;
		font-size: 19px;
		letter-spacing: 0.6px;
		font-weight: normal;
		color: #000000de;
	}
	.content {
		display: flex;
		margin: 16px auto 16px;
		padding: 2px 16px 16px;
		width: calc(100% - 16px);
		min-width: 230px;
		max-width: 960px;
		min-height: auto;
		background-color: #fefeff;
		box-shadow:
			#0000001f 0px 1px 6px,
			#0000001f 0px 1px 4px;
		border-radius: 4px;
		flex-direction: column;
		align-items: flex-start;
	}
	@media (max-width: 1044px) {
		.content {
			margin: 16px auto 16px;
			width: 80%;
		}
	}
</style>
