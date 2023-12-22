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
	import { fitToCar, sleep } from '$lib';
	import { onMount } from 'svelte';

    const diameter = $page.url.searchParams.get('diameter');
    const width = $page.url.searchParams.get('width');
    const pcd = $page.url.searchParams.get('pcd');

    const carBrand = $page.url.searchParams.get('carBrand') || '';
    const carModel = $page.url.searchParams.get('carModel') || '';
    const carYear = $page.url.searchParams.get('carYear') || '';

    let rimByCar = typeof window !== 'undefined' && window.innerWidth < 550 ? `/search` : carBrand.length > 0 ? `/rims-by-car?brand=${carBrand}&model=${carModel}&year=${carYear}&rimBrand=all&selectedDiameters=all` :"/rims?selectedDiameters=all"
    let currentConfig: RimConfig

    export let data
    const {rimInfo} = data

    let fitToClientCar: boolean
    let showReqCall = false
    let showAskQuest = false
    let showOrderField = false
    let photo = rimInfo.images[0]
	let newPhoto = rimInfo.images[0]
	let firstLoad = true;
	let crossFading = false;
    let currentIndex = 0

    rimInfo.config.forEach(el =>{
        if (el.boltPattern === pcd && el.diameter ===diameter && el.width === width) {
            currentConfig = el
        }
    })

    const changeConfig = async (config: RimConfig) => {
        const newUrl = new URL($page.url);
        newUrl.searchParams.set('diameter',config.diameter);
        newUrl.searchParams.set('width', config.width);
        newUrl.searchParams.set('pcd', config.boltPattern);
        history.replaceState(history.state, '', newUrl.toString());
        currentConfig = config
        fitToClientCar = await fitToCar(rimInfo.brand, carBrand, carModel, carYear, config)
        
    };
    
    const setMainImage = (imageUrl:string) => {
		newPhoto = imageUrl;
        currentIndex = rimInfo.images.indexOf(imageUrl)
    };
    
    const nextImg = () => {
        if(currentIndex + 1 < rimInfo.images.length) {
            newPhoto = rimInfo.images[currentIndex+1]
            currentIndex+=1
        } else {
            newPhoto = rimInfo.images[0]
            currentIndex=0
        }
    };

    const previousImg = () => {
        if(currentIndex - 1 >= 0) {
            newPhoto = rimInfo.images[currentIndex-1]
            currentIndex-=1
        } else {
            newPhoto = rimInfo.images.slice(-1)[0]
            currentIndex=rimInfo.images.length-1
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

    const onLoad = async () =>{	
		crossFading = true;
		await sleep(150);
		photo = newPhoto;
		crossFading = false;
	}
    onMount(async ()=>{
        if (carBrand.length && carModel.length && carYear.length) {
            fitToClientCar = await fitToCar(rimInfo.brand, carBrand, carModel, carYear, currentConfig)
        } else {
            fitToClientCar = false
        }
    })
</script>

<OrderRim bind:showOrderField = {showOrderField} rimInfo={rimInfo} rimConfig={currentConfig} rimlink={$page.url.href}/>
<AskQuestion bind:showAskQuest = {showAskQuest}/>
<ReqCall bind:showReqCall = {showReqCall}/>

<div class=page>
    <!-- svelte-ignore a11y-missing-attribute -->
    <div class='singleSlot'>
    <div class="mainCard">
        {#if photo}
            <div class:firstLoad>
                <figure class="orig">
                    <img class="mainRimImg" src={photo} alt="" on:load={onLoad} >
                </figure>
                {#if newPhoto !== photo}
                    <figure class="new" class:crossFading >
                        <img class="mainRimImg" src={newPhoto} alt="" on:load={onLoad}>
                    </figure>
                {/if}
            </div>
            {/if}
            {#if rimInfo.images.length > 1}
                <button class="btn1" on:click={()=>{previousImg()}}>
                    <img  class="arrows" src={lftArrow}>
                </button>
                <button class="btn2" on:click={()=>{nextImg()}}>
                    <img  class="arrows" src={rghtArrow}>
                </button>
        {/if}
        <div class="images">
            {#each  rimInfo.images as image }
            <!-- svelte-ignore a11y-click-events-have-key-events --><!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                <img class="secondaryRimImg" src={image} alt="rim" on:click={() => setMainImage(image)}>
            {/each}
        </div>
    </div>
    <div class="sideCards">
        <div class="orderRim">
            <p class="rimName">{`${rimInfo.brand} - ${rimInfo.name}`}</p>
            <div class="infoLine">
                <p class="standartText">Размер: </p>
                <p class="rimTextSmall">{`${currentConfig.diameter}’’ диаметр и ${currentConfig.width}’’ ширина`}</p>
            </div>
            <div class={rimInfo.config.length > 2 ? "configs" : rimInfo.config.length === 1 ? "configsForOne" : "configsForTwo"}>
                {#each rimInfo.config as el}
                    <!-- svelte-ignore a11y-click-events-have-key-events --><!-- svelte-ignore a11y-no-static-element-interactions -->
                    <div on:click={()=>{changeConfig(el)}}  class="{isEqual(currentConfig, el) ? "active configEl" : "normal configEl"}">
                        <p class="elText big">{`${el.diameter}’’/`}</p><p class="elText small">{`${el.width.includes(".0") || el.width.includes(".5") ? el.width : el.width+".0"}`}</p>
                    </div>
                {/each}
            </div>
            {#if carBrand.length && carModel.length && carYear.length && fitToClientCar}
                <div class="fitToyourCar">
                    <p class="standartText forYourCar">Подходят для вашей машины</p>
                    <div class="clientCar">
                        <p class="carInfo">{`${carBrand} ${carModel} ${carYear}`}</p>
                        <a href={rimByCar} class="standartText change">изменить</a>
                    </div>
                </div>
            {/if}
            <div class="priceInfo">
                <p class="priceSingle">{`${currentConfig.price} грн`}</p>
                <p class="priceAll">{`${currentConfig.price*4} грн за комплект*`}</p>
                <button  class="order product" on:click={clickOrderRim}>ЗАКАЗАТЬ В 1 КЛИК</button>
                <p class="endBlocTxt">*Вам перезвонит менеджер и уточнит детали</p>
            </div>
        </div>
        <div class="orderInfo">
            <img class="questImg" src={questImg} alt="questionSection">
            <div class="infoText">
                <p class="t1">Есть вопрос?</p>
                <p class="t2">Мы с удовольствием ответим на все!</p>
                <div class="grButtons">
                    <button  class="order call" on:click={clickReqCall}>Заказать звонок</button>
                    <button  class="order question" on:click={clickAskQuest}>Задать вопрос</button>
                </div>
                
            </div>
        </div>
    </div>
</div>
</div>

<style>
    .big{
        font-size: 18px;
    }
    .small{
        font-size: 14px;
    }
    figure {
		position: absolute;
        top: 0;
        left: 0;
        margin: 0;
	}
	.firstLoad figure.orig img {
		opacity: 1;
        
	}
	figure.new {
		z-index: 1;
	}
	figure.new.crossFading img {
		opacity: 1;
	}
	
    a.standartText{
        margin: 0;
        text-decoration: none;
    }
    a:hover{
        text-decoration: underline;
    }
    .carInfo{
        margin: 0px;
        font-size: 14px;
        letter-spacing: 0.5px;
        text-align: left;
        color: #000;
        font-family: 'Helvetica Neue', sans-serif;
        font-weight: 500;
    }
    .clientCar{
        margin-top: 8px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 70%;
        padding: 12px;
        border-radius: 2px;
        border: solid 1px #ccc;
        background-color: #f7f7f7;
    }
    .fitToyourCar{
        display: flex;
        border-radius: 2px;
        flex-direction: column;
    }
    .endBlocTxt{
        height: 14px;
        margin-top: 8px;
        margin-bottom: 16px;
        letter-spacing: 0.43px;
        font-family: 'Helvetica Neue', sans-serif;
        font-weight: 300;
        font-size: 12.5px;
        color: #a0a0a0;
    }
    .priceAll{
        margin-top: 0;
        margin-bottom: 24px;
        letter-spacing: 0.5px;
        font-family: 'Helvetica Neue', sans-serif;
        font-size: 14px;
        color: #888888;
    }
    .priceSingle{
        margin-top: 20px;
        margin-bottom: 2px;
        color: #000;
        letter-spacing: 0.86px;
        font-family: 'Helvetica Neue', sans-serif;
        font-weight: 500;
        font-size: 24px;
    }
    .priceInfo{
        display: flex;
        text-align: center;
        margin-top: 10px;
        border-top: solid 1px #ccc;
        flex-direction: column;
        align-items: center;
    }
    .configsForTwo{
        width: 100%;
        margin-top: 8px;
        margin-bottom: 20px;
        display: grid;
        justify-content: flex-start;
        grid-template-columns: auto auto; 
        margin-bottom: 12px;
    }
    .configsForOne{
        width: 100%;
        margin-top: 8px;
        margin-bottom: 20px;
        display: grid;
        justify-content: flex-start;
        margin-bottom: 12px;
    }
    .configs{
        width: 100%;
        margin-top: 8px;
        margin-bottom: 20px;
        display: grid;
        justify-content: space-evenly;
        grid-template-columns: auto auto auto; 
    }
    .elText{
        font-family: 'Helvetica Neue', sans-serif;
        margin: 0;
        letter-spacing: 1.2px;
    }
    .active{
        color: #000;
        border: solid 1px #3a9bfc;
        background-color: #e8f3fe; 
    }
    .normal{
        color: #666666;
        border: solid 1px #ccc;
        background-color: #f7f7f7;
    }
    .configEl{
        display: flex;
        cursor: pointer;
        margin: 4px;
        width: 80px; 
        text-align: center;
        padding: 11px 8px;
        border-radius: 2px;
        justify-content: center;
        align-items: center;
    }
    .infoLine {
        height: 17px;
        display: flex;
        align-items: center;
        margin: 0;
    }
    .change{
        letter-spacing: 0.43px;
        font-size: 12px;
    }
    .standartText, .rimTextSmall {
        margin: 0;
        font-size: 14px;
        letter-spacing: 1.2px;
    }
    .forYourCar{
        letter-spacing: 0.5px;
    }
    .rimTextSmall{
        margin: 0px 0px 0px 8px ;
        color: #000000;
        font-family: 'Helvetica Neue', sans-serif;
        font-weight: 500;
    }
    .standartText{
        font-family: 'Helvetica Neue', sans-serif;
        color: #888888;
    }
    .rimName{
        width: 100%;
        height: 28px;
        margin-bottom: 20px;
        margin-top: 0;
        font-family: 'Helvetica Neue', sans-serif;
        font-weight: 500;
        font-size: 23px;
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
        z-index: 4;
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
        z-index: 4;
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

    .images{
        padding: 16px;
        display: grid;
        grid-template-columns: auto auto auto auto auto auto;
        align-content: space-evenly;
        justify-items: center;
        justify-content: start;
    }
    .secondaryRimImg:hover{
        outline: 2px solid #7a8997;
    }
    .secondaryRimImg{
        border-radius: 2px;
        cursor: pointer;
        margin: 4px;
        object-fit: contain;
        width: 48px;
        height: 48px;
        border: 1px solid #507299;
    }
    .questImg{
        width: 125px;
        height: 125px;
    }
    .mainRimImg{
        object-fit: contain;
        width: 656px;
        height: 656px;  
		opacity: 0;
		transition: all 1s cubic-bezier(0.23, 1, 0.32, 1) 0ms;
    }
    .order:hover{
        opacity: 0.8;
    }
    .question{
        width: 100%;
        height: 30px;
        background-color: #ebf1f4;
        color: #425f8f;
        height: 32px;
    }
    .product{
        
        width: 288px;
        height: 40px;
        background-color: #507298;
        color: #fff;
        height: 40px;
    }
    .call{
        width: 100%;
        height: 30px;
        background-color: #507298;
        color: #fff;
        height: 32px;
    }
    .order{
        cursor: pointer;
        margin-top: 8px;
        font-family: 'Helvetica Neue', sans-serif;
        font-size: 14px;
        letter-spacing: 0.5px;
        opacity: 1;
        border: none;
        border-radius: 2px;
    }
    .t2{
        font-family: 'Helvetica Neue', sans-serif;
        text-align: center;
        width: 100%;
        margin-top: 2px;
        margin-bottom: 4px;
        font-size: 13px;
        color: #757575;
        letter-spacing: 0.5px;
    }
    .t1{
        font-family: 'Helvetica Neue', sans-serif;
        text-align: center;
        margin-top: 4px;
        margin-bottom: 2px;
        font-size: 15px;
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
        margin: 16px 0px 0px 0px;
        padding: 17px 16px 12px;
        object-fit: contain;
        border-radius: 4px;
        box-shadow: 0 2px 4px 0 #51739833;
        background-color: #fff;
    }
    .orderRim{
        display: flex;
        width: 320px;
        min-height: 350px;
        height: auto;
        margin: 0px;
        padding: 17px 16px 12px;
        border-radius: 4px;
        box-shadow: 0 2px 4px 0 #51739833;
        background-color: #fff;
        flex-direction: column;
        justify-content: flex-start;
        align-content: center;
        flex-wrap: wrap;
    }
    .sideCards{
        height: 719px;
        display: flex;
        flex-direction: column;
    }   
    .page{
        gap: 16px;
        display: flex;
        justify-content: center;
        margin-top: 16px;
        margin-bottom: 24px;
    }
    .mainCard{
        margin: 0px;
        display: flex;
        position: relative;
        width: 656px;
        height: 750px;
        border-radius: 4px;
        box-shadow: 0 2px 4px 0 #51739833;
        background-color: #fff;
        flex-direction: column;
        justify-content: space-between;
    }
    .singleSlot{
        gap: 16px;
        display: flex;
    }
    
    @media (min-width: 500px) and (max-width: 759px){
        .grButtons{
            display: flex;
            flex-direction: row;
            justify-content: space-around;
        }
        .question, .call{
            font-size: 12px;
            letter-spacing: 0;
            width: 48%;
        }
    }
    @media (min-width: 350px) and (max-width: 499px){
        .grButtons{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center
        }
        .question, .call{
            width: 90%;
        }
    }
    @media (min-width: 360px) and (max-width: 750px){
        .page{
            margin: 0;
        }
        .orig{
            position: relative;
        }
        .singleSlot{
            gap: 0px;
            display: flex;
            flex-direction: column;
            width: 100%;
            align-items: center;
        }
        .mainCard{
            width: 100%;
            height: auto;
            margin-bottom: 8px;
        }
        .btn1, .btn2{
            display: none;
        }
        
        .infoLine {
            height: 14px;
        }
        .orderInfo{
            box-shadow: 0 2px 6px 0 #51739833, 0 1px 4px 0 #51739833;
            margin-top: 8px;
            padding: 12px;
            width: calc(100% - 24px);
        }
        .orderRim{
            box-shadow: 0 2px 4px 0 #51739833, 0 1px 6px 0 #51739833;
            padding: 12px;
            width: calc(100% - 24px);
            justify-content: center;
        }
        .mainRimImg{
            width: 100%;
            height: auto;
        }
        .sideCards{
            width: 100%;
            height: auto;
            align-items: center;
        }
        .images{
            grid-template-columns: auto auto auto auto auto auto;
            height: 44px;
        }
        .secondaryRimImg{
            width: 40px;
            height: 40px;
        }
    }
    @media (min-width: 760px) and (max-width: 1023px){
        .singleSlot{
            gap: 0px;
            justify-content: space-evenly
        }
        .btn1, .btn2{
            top: 45%;
            transform: translateY(-55%);
            opacity: 1;
        }
        .infoLine {
            height: 14px;
        }
        .page{
            flex-direction: column;
            align-items: center;
        }
        .orderInfo{
            width: 85%;
        }
        .orderRim{
            width: 85%;
            height: auto;
            justify-content: center;
        }
        .mainRimImg{
            width: 405px;
            height: 405px;
        }
        .mainCard{
            margin-left: 10px;
            width: 405px;
            height: 520px;
        }
        .sideCards{
            align-items: center;
            width: 45%;
            height: auto;
        }
    }
    
    /* @media (min-width: 350px) and (max-width: 449px){
      
        .infoLine {
            height: 12px;
        }
        .page{
            flex-direction: column;
            align-items: center;
        }
        .orderInfo{
            width: calc(100% - 24px);
        }
        .orderRim{
            height: auto;
            justify-content: center;
        }
        .mainRimImg{
            width: 350px;
            height: 350px;
        }
        .mainCard{
            width: 350px;
            height: 350px;
        }
        .sideCards{
            width: 350px;
            height: auto;
        }
    } */
</style>