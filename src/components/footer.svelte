<script>
	import logoIcon from "../lib/icons/logo-dark.webp";
</script>

<div class="footerContent">
	<footer>
		<div class="ftrStart">
			<div class="pageLogo">
				<a href="/">
					<img
						class="logoIcon"
						src={logoIcon}
						alt="Ukrdisk"
					/>
				</a>
				<a href="/"><p class="logoTitle">Ukrdisk</p></a>
			</div>
		</div>
		<nav class="navList">
			<ul>
				<li>
					<a
						target="_self"
						href="/rims/InziAone?selectedDiameters=all">Диски InziAone</a
					>
				</li>
				<li>
					<a
						target="_self"
						href="/rims/Kosei?selectedDiameters=all">Диски Kosei</a
					>
				</li>
				<li>
					<a
						target="_self"
						href="/rims/Marcello?selectedDiameters=all">Диски Marcello</a
					>
				</li>
				<li>
					<a
						target="_self"
						href="/rims/MKW?selectedDiameters=all">Диски MKW</a
					>
				</li>
				<li>
					<a
						target="_self"
						href="/rims/Replica?selectedDiameters=all">Диски Replica</a
					>
				</li>
				<li>
					<a
						target="_self"
						href="/search">Подбор дисков по авто</a
					>
				</li>
				<li>
					<a
						target="_self"
						href="/about-us">О нас</a
					>
				</li>
			</ul>
		</nav>
		<div class="ftrEnd">
			<p>
				<a href="mailto:blokhvova@gmail.com">blokhvova@gmail.com</a>
			</p>
			<p>
				<a href="tel:+380503403726">(050) 340-37-26</a>
			</p>
		</div>
	</footer>
</div>

<style>
	p {
		margin: 0px 0px 8px;
	}
	li a:hover,
	p a:hover {
		text-decoration: underline;
	}
	a {
		text-decoration: none;
		color: #7a8999;
	}
	ul {
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		list-style-type: none;
		font-size: 14px;
		font-weight: 400;
	}
	a {
		text-decoration: none;
	}
	.pageLogo {
		margin: 6px 0px 0px 0px;
		padding: 2px 16px;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		color: #fff;
	}
	.logoTitle {
		margin: 0px 0px 0px 16px;
		font-family: "Rubik", sans-serif;
		font-size: 24px;
		font-weight: 400;
		line-height: 48px;
		color: #7a8999;
		white-space: nowrap;
	}
	.logoIcon {
		height: 32px;
		width: 36px;
	}
	footer {
		width: 100%;
		padding-top: 8px;
		max-width: 1024px;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		font-family: inherit;
		color: #7a8999;
		border-top: 1px solid #e4e8ed;
	}
	.footerContent {
		padding-bottom: 20px;
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		background-color: #f0f0f0;
	}
	.ftrEnd {
		height: 100%;
		display: flex;
		flex-direction: column;
		font-size: 14px;
		font-weight: 400;
	}
	@media (max-width: 1023px) {
		footer {
			width: 90%;
			flex-direction: column;
		}
		ul li {
			padding-top: 2px;
			height: 24px;
			text-align: center;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
		.ftrEnd {
			padding-top: 24px;
			height: 24px;
			text-align: center;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
	}
	@media (min-width: 1024px) {
		ul li {
			width: 100%;
			height: 17px;
			margin: 3px 2px;
		}
		footer {
			height: 190px;
		}
		.ftrStart {
			height: 100%;
			min-height: 100%;
			min-width: 261px;
		}
		.navList {
			width: 491px;
			height: 100%;
		}
		.ftrEnd {
			width: 256px;
			height: 100%;
			min-height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: flex-end;
			font-size: 14px;
			font-weight: 400;
		}
	}
</style>
