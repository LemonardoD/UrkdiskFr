<script lang="ts">
    import { page } from '$app/stores';
    import isEqual from "lodash/isEqual";
	import type { RimConfig } from '../../../types';
    import lftArrow from "../../../lib/icons/left-arrow.png";
    import rghtArrow from "../../../lib/icons/right-arrow.png";
    import questImg from "../../../lib/icons/questionsImg.webp";
    import ReqCall from "../../../components/modals/modalReqCall.svelte";
    import AskQuestion from "../../../components/modals/modalAskQuestion.svelte";
    import OrderRim from "../../../components/modals/modalOrderRim.svelte";
    
    const diameter = $page.url.searchParams.get('diameter');
    const width = $page.url.searchParams.get('width');
    const pcd = $page.url.searchParams.get('pcd');
    let currentConfig: RimConfig

    export let data
    const {rimInfo} = data
    let crossfading = true
    let showReqCall = false
    let showAskQuest = false
    let showOrderField = false

    rimInfo.config.forEach(el =>{
        if (el.boltPattern === pcd && el.diameter ===diameter && el.width === width) {
            currentConfig = el
        }
    })
    const changeConfig = (config: RimConfig) => {
        const newUrl = new URL($page.url);
        newUrl.searchParams.set('diameter',config.diameter);
        newUrl.searchParams.set('width', config.width);
        newUrl.searchParams.set('pcd', config.boltPattern);
        history.replaceState({}, '', newUrl.toString());

        currentConfig = config
    };
    let mainImage = rimInfo.images[0]
    let currentIndex = 0

    const  sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

    const load = async () => {
        crossfading = false
        await sleep(500)
        crossfading = true
    };

    const setMainImage = (imageUrl:string) => {
		mainImage = imageUrl;
        currentIndex = rimInfo.images.indexOf(imageUrl)
    };
    
    const nextImg = () => {
        if(currentIndex + 1 < rimInfo.images.length) {
            mainImage = rimInfo.images[currentIndex+1]
            currentIndex+=1
        }
    };

    const previousImg = () => {
        if(currentIndex - 1 >= 0) {
            mainImage = rimInfo.images[currentIndex-1]
            currentIndex-=1
        }
    };

    const clickReqCall = () => {
        showReqCall =  !showReqCall;
    };
    const clickAskQuest = () => {
        showAskQuest =  !showAskQuest;
    };
    const clickOrderRim = () => {
        showOrderField =  !showOrderField;
    };

</script>

<OrderRim bind:showOrderField = {showOrderField} rimInfo={rimInfo} rimConfig={currentConfig} rimlink={$page.url.href}/>
<AskQuestion bind:showAskQuest = {showAskQuest}/>
<ReqCall bind:showReqCall = {showReqCall}/>

<div class=page>
    <!-- svelte-ignore a11y-missing-attribute -->
    <div class="mainCard">
        <img class:crossfading  class="mainRimImg" on:load={load} src={mainImage} alt="rim" >
        {#if rimInfo.images.length > 1}
            <button class="btn1" on:click={()=>{previousImg()}}>
                <img  class="arrows" src={lftArrow}>
            </button>
            <button class="btn2" on:click={()=>{nextImg()}}>
                <img  class="arrows" src={rghtArrow}>
            </button>
        {/if}
        <div class="rimInfo">
            <div class="images">
                {#if rimInfo.images.length > 1}
                    {#each  rimInfo.images as image }
                        <!-- svelte-ignore a11y-click-events-have-key-events --><!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                        <img class="secondaryRimImg" src={image} alt="rim" on:click={() => setMainImage(image)}>
                    {/each}
                {/if}
            </div>
            <div>
            </div>
        </div>
    </div>
    <div class="sideCards">
        <div class="orderRim">
            <p class="rimName">{`${rimInfo.brand} - ${rimInfo.name}`}</p>
            <div class="infoLine">
                <p class="standartText">Цвет: </p>
                <p class="rimTextSmall">{rimInfo.name}</p>
            </div>
            <div class="infoLine">
                <p class="standartText">Размер: </p>
                <p class="rimTextSmall">{`${currentConfig.diameter}’’ диаметр и ${currentConfig.width}’’ ширина`}</p>
            </div>
            <div class={rimInfo.config.length > 2 ? "configs" : rimInfo.config.length === 1 ? "configsForOne" : "configsForTwo"}>
                {#each rimInfo.config as el}
                    <!-- svelte-ignore a11y-click-events-have-key-events --><!-- svelte-ignore a11y-no-static-element-interactions -->
                    <div on:click={()=>{changeConfig(el)}}  class="{isEqual(currentConfig, el) ? "activeConfig" : "configEl"}">
                        <p class="elText">{`${el.diameter}’’/${el.width.includes(".0") || el.width.includes(".5") ? el.width : el.width+".0"}`}</p>
                    </div>
                {/each}
            </div>
            <div class="fitToyourCar">
            </div>
            <div class="priceInfo">
                <p class="priceSingle">{`${currentConfig.price} грн/шт`}</p>
                <p class="priceAll">{`${currentConfig.price*4} грн за комплект*`}</p>
                <button  class="order product" on:click={clickOrderRim}>Заказать в 1 клик</button>
                <p class="endBlocTxt">*Вам перезвонит менеджер и уточнит детали</p>
            </div>
        </div>
        <div class="orderInfo">
            <img class="questImg" src={questImg} alt="questionSection">
            <div class="infoText">
                <p class="t1">Есть вопросы?</p>
                <p class="t2">Мы ответим на все!</p>
                <button  class="order call" on:click={clickReqCall}>Заказать звонок</button>
                <button  class="order question" on:click={clickAskQuest}>Заказать вопрос</button>
            </div>
        </div>
    </div>
</div>

<style>
    .fitToyourCar{
        display: flex;
        align-items: center;
        margin: 20px 10px;
        padding: 12px 75px;
        border-radius: 2px;
    }
    .endBlocTxt{
        margin-top: 8px;
        margin-bottom: 8px;
        letter-spacing: 0.24px;
        font-family: inherit;
        font-size: 12px;
        color: #a0a0a0;
    }
    .priceAll{
        margin: 0;
        letter-spacing: 0.14px;
        font-family: inherit;
        font-size: 14px;
        color: #888888;
    }
    .priceSingle{
        margin-top: 24px;
        margin-bottom: 4px;
        color: #000;
        font-family: inherit;
        font-size: 24px;
    }
    .priceInfo{
        text-align: center;
        margin-top: 20px;
        border-top: solid 1px #ccc;
    }
    .configsForTwo{
        width: 100%;
        margin: auto;
        display: grid;
        justify-content: flex-start;
        grid-template-columns: auto auto; 
        margin-bottom: 80px;
    }
    .configsForOne{
        width: 100%;
        margin: auto;
        display: grid;
        justify-content: flex-start;
        margin-bottom: 80px;
    }
    .configs{
        width: 100%;
        margin: auto;
        display: grid;
        justify-content: space-evenly;
        grid-template-columns: auto auto auto; 
    }
    .elText{
        color: #000;
        font-family: inherit;
        font-size: 16px;
        margin: 0;
    }
    .activeConfig{
        cursor: pointer;
        margin: 4px;
        width: 80px; 
        text-align: center;
        padding: 8px;
        border-radius: 2px;
        border: solid 1px #3a9bfc;
        background-color: #e8f3fe;
    }
    .configEl{
        cursor: pointer;
        margin: 4px;
        width: 80px; 
        text-align: center;
        padding: 8px;
        border-radius: 2px;
        border: solid 1px #ccc;
        background-color: #f7f7f7;
    }
    .infoLine {
        display: flex;
        align-items: center;
    }
    .standartText, .rimTextSmall {
        margin-top: 10px;
        font-family: inherit;
        font-size: 12px;
        letter-spacing: 0.24px;
        font-weight: 500;
    }
    .rimTextSmall{
        margin-left: 8px;
        color: #000000;
    }
    .standartText{
        color: #888888;
    }
    .rimName{
        width: 100%;
        height: 35px;
        margin: auto;
        font-family: inherit;
        font-size: 26px;
        font-weight: 500;
        text-align: left;
        color: #000;
    }
    .mainCard:hover .btn1,
    .mainCard:hover .btn2 {
        opacity: 1;
    }
    .btn1:hover,
    .btn2:hover {
        background-color: #000;
    }
    .arrows{
        width: 16px;
        height: 16px;
        opacity: 1;
        display: block;
        margin: auto;
    }
    .btn1{
        padding: 0;
        cursor: pointer;
        position: absolute;
        top: 40%;
        left: 0;
        transform: translateY(-60%);
        width: 43px;
        height: 83px;
        border-radius: 0px 4px 4px 0px;
        border: none;
        user-select: none;
        background-color: #00000099;
        opacity: 0;
        transition: all 0.2s ease-in-out
    }
    .btn2{
        padding: 0;
        cursor: pointer;
        position: absolute;
        top: 40%;
        right: 0;
        transform: translateY(-60%);
        width: 43px;
        height: 83px;
        border: none;
        border-radius: 4px 0px 0px 4px;
        background-color: #00000099;
        opacity: 0;
        transition: all 0.2s ease-in-out
    }
    .crossfading {
		opacity: 1;
	}
   
    .rimInfo{
        height: 192px;
        display: flex;
    }
    .images{
        display: grid;
        grid-template-columns: auto auto auto;
        align-content: space-evenly;
        margin: 36px;
    }
    .secondaryRimImg:hover{
        outline: 2px solid #7a8997;
    }
    .secondaryRimImg{
        opacity: 1;
        border-radius: 2px;
        cursor: pointer;
        margin: 4px;
        object-fit: contain;
        width: 48px;
        height: 48px;
        border: 1px solid #507299;
    }
    .questImg{
        opacity: 1;
        width: 125px;
        height: 125px;
    }
    .mainRimImg{
        transition: all 0.7s cubic-bezier(0, 0.5, 0.68, 1);
        object-fit: contain;
        width: 656px;
        height: 656px;
    }
    .order:hover{
        opacity: 0.8;
    }
    .question{
        background-color: #ebf1f4;
        color: #425f8f;
        height: 32px;
    }
    .product{
        background-color: #507298;
        color: #fff;
        height: 40px;
    }
    .call{
        background-color: #507298;
        color: #fff;
        height: 32px;
    }
    .order{
        cursor: pointer;
        margin-top: 8px;
        width: 100%;
        font-family: inherit;
        font-size: 14px;
        letter-spacing: 0.5px;
        font-weight: 500;
        opacity: 1;
        border: none;
        border-radius: 4px;
    }
    .t2{
        text-align: center;
        width: 100%;
        margin-top: 2px;
        margin-bottom: 4px;
        font-size: 16px;
        color: #757575;
        letter-spacing: 0.5px;
    }
    .t1{
        text-align: center;
        margin-top: 4px;
        margin-bottom: 2px;
        font-size: 18px;
        font-weight: 400;
        letter-spacing: 0.6px;
        color: #000;
    }
    .infoText{
        width: 90%;
        display: flex;
        flex-direction: column;
    }
    .orderInfo{
        align-items: center;
        display: flex;
        width: 320px;
        height: 145px;
        margin: 16px 144px 0px 16px;
        padding: 17px 16px 12px;
        object-fit: contain;
        border-radius: 4px;
        box-shadow: 0 2px 4px 0 #51739833;
        background-color: #fff;
    }
    .orderRim{
        width: 320px;
        height: 443px;
        margin: 0px 144px 16px 16px;
        padding: 17px 16px 12px;
        border-radius: 4px;
        box-shadow: 0 2px 4px 0 #51739833;
        background-color: #fff;
    }
    .sideCards{
        display: flex;
        flex-direction: column;
    }
    .page{
        display: flex;
        justify-content: center;
    }
    .mainCard{
        position: relative;
        width: 656px;
        height: 824px;
        margin: 0px 16px 16px 144px;
        padding: 0 0 24px;
        border-radius: 4px;
        box-shadow: 0 2px 4px 0 #51739833;
        background-color: #fff;
    }
    img{
        opacity: 0;
    }
</style>